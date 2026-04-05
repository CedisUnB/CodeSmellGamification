import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

//TODO: verificar se tem que usar o bcrypt ou eu posso usar o login do google como funciona aqui


const prisma = new PrismaClient()

class LoginController {

    async anonymousLogin(request, response) {
        const { sessionId } = request.body
        const anonymousEmail = `anon_${sessionId}@temp.br`

        try {
            let anonymous = await prisma.user.findUnique({
                where: { email: anonymousEmail }
            })

            if (!anonymous) {
                anonymous = await prisma.user.create({
                    data: {
                        email: anonymousEmail,
                        name: "Anônimo",
                        isAnonymous: true,
                    }
                })
            }

            const payload = { id: anonymous.id, email: anonymous.email, isAnonymous: anonymous.isAnonymous }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })
            return response.status(200).json({ userData: payload, token: token })

        } catch (error) {
            return response.status(500).json({ error: error.message })
        }
    }

    async login(request, response) {
        const { email, password, sessionId } = request.body
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            })

            if (!user) {
                return response.status(404).json({ error: 'Usuário não encontrado' })
            }

            // const match = await bcrypt.compare(password, user.password)
            const match = password === user.password // TODO: Criptogtafar a senha e comparar
            if (!match) {
                return response.status(401).json({ error: 'Senha invalida' })
            }

            let transferInfo = null

            // Se forneceu sessionId, tenta migrar dados do anônimo
            if (sessionId && !user.isAnonymous) {
                const anonymousEmail = `anon_${sessionId}@temp.br`
                const anonymousUser = await prisma.user.findUnique({
                    where: { email: anonymousEmail }
                })
                if (anonymousUser && anonymousUser.isAnonymous) {
                    transferInfo = await this.migrateAnonymousData(anonymousUser.id, user.id)
                }
            }

            const payload = { id: user.id, email: user.email, isAnonymous: user.isAnonymous }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })
            return response.status(200).json({
                userData: payload,
                token,
                transferInfo
            })

        } catch (error) {
            return response.status(500).json({ error: error.message })
        }
    }

    async migrateAnonymousData(anonymousUserId, registeredUserId) {
        return await prisma.$transaction(async (prisma) => {
            // Busca o anônimo
            const anonymous = await prisma.user.findUnique({
                where: { id: anonymousUserId },
                include: { attempts: true }
            })

            if (!anonymous || !anonymous.isAnonymous) {
                throw new Error('Usuário anônimo não encontrado');
            }

            // 1. Transfere as moedas
            await prisma.user.update({
                where: { id: registeredUserId },
                data: {
                    coins: {
                        increment: anonymous.coins
                    }
                }
            })

            // 2. Transfere as tentativas
            if (anonymous.attempts.length > 0) {
                await prisma.attempt.updateMany({
                    where: { userId: anonymousUserId },
                    data: { userId: registeredUserId }
                })
            }

            // 3. Marca o anônimo como inativo (soft delete)
            await prisma.user.update({
                where: { id: anonymousUserId },
                data: {
                    email: null,
                    coins: 0,
                    mergedToId: registeredUserId
                }
            })

            return {
                coinsTransferred: anonymous.coins,
                attemptsTransferred: anonymous.attempts.length
            }
        })
    }



    async register(request, response) {
        const { name, email, password, sessionId } = request.body

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return response.status(400).json({ error: 'Email já registrado' })
        }

        try {
            let newUser
            let transferInfo = null

            // Se tem sessionId, primeiro verifica se existe anônimo
            if (sessionId) {
                const anonymousEmail = `anon_${sessionId}@temp.br`
                const anonymousUser = await prisma.user.findUnique({
                    where: { email: anonymousEmail },
                    include: { attempts: true }
                })

                if (anonymousUser && anonymousUser.isAnonymous) {
                    // TRANSFORMA o anônimo em usuário registrado
                    newUser = await prisma.user.update({
                        where: { id: anonymousUser.id },
                        data: {
                            name,
                            email,
                            password, // TODO: Criptografar
                            isAnonymous: false,
                            coins: anonymousUser.coins + 10 // Bônus de registro
                        }
                    })

                    transferInfo = {
                        coinsTransferred: anonymousUser.coins,
                        attemptsTransferred: anonymousUser.attempts.length,
                        bonusCoins: 10
                    }
                }
            }

            // Se não encontrou anônimo, cria novo usuário
            if (!newUser) {
                newUser = await prisma.user.create({
                    data: {
                        name,
                        email,
                        password, // TODO: Criptografar
                        coins: 10,
                        isAnonymous: false
                    }
                })
            }

            const payload = { id: newUser.id, email: newUser.email, isAnonymous: newUser.isAnonymous }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })
            return response.status(201).json({
                userData: payload, token, transferInfo
            })

        } catch (error) {
            return response.status(500).json({ error: error.message })
        }
    }


}

export { LoginController }