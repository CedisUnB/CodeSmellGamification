import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { comparePassword, hashPassword, passwordNeedsRehash } from '../utils/password.js'

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
        const { password, sessionId } = request.body
        const email = request.body.email.trim().toLowerCase()

        try {
            const user = await prisma.user.findUnique({ where: { email } })
            if (!user || !user.password) {
                return response.status(401).json({ error: 'Credenciais inválidas' })
            }

            const match = await comparePassword(password, user.password)
            if (!match) {
                return response.status(401).json({ error: 'Credenciais inválidas' })
            }

            if (passwordNeedsRehash(user.password)) {
                await prisma.user.update({
                    where: { id: user.id },
                    data: { password: await hashPassword(password) }
                })
            }

            let transferInfo = null

            // Migração: se tem sessionId e usuário NÃO é anônimo
            if (sessionId && !user.isAnonymous) {
                const anonymous = await prisma.user.findUnique({
                    where: { email: `anon_${sessionId}@temp.br` },
                    include: { attempts: true }
                })

                if (anonymous?.isAnonymous) {
                    transferInfo = await prisma.$transaction(async (prisma) => {
                        // Transfere coins
                        await prisma.user.update({
                            where: { id: user.id },
                            data: { coins: { increment: anonymous.coins } }
                        })

                        // Transfere tentativas
                        if (anonymous.attempts.length) {
                            await prisma.attempt.updateMany({
                                where: { userId: anonymous.id },
                                data: { userId: user.id }
                            })
                        }

                        // Desativa anônimo
                        await prisma.user.update({
                            where: { id: anonymous.id },
                            data: { email: null, coins: 0, mergedToId: user.id }
                        })

                        return {
                            coinsTransferred: anonymous.coins,
                            attemptsTransferred: anonymous.attempts.length
                        }
                    })
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

    async register(request, response) {
        const { password, sessionId } = request.body
        const name = request.body.name.trim()
        const email = request.body.email.trim().toLowerCase()

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return response.status(400).json({ error: 'Email já registrado' })
        }

        const hashedPassword = await hashPassword(password)

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
                            password: hashedPassword,
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
                        password: hashedPassword,
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
