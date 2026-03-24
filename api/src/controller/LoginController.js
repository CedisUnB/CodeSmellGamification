import { PrismaClient } from '@prisma/client'

import jwt from 'jsonwebtoken'

//TODO: verificar se tem que usar o bcrypt ou eu posso usar o login do google como funciona aqui


const prisma = new PrismaClient()

class LoginController {

    async login(request, response) {
        const { email, password } = request.body
        try {
            const user = await prisma.user.findFirst({
                where: { email }
            })
            if (!user) {
                return response.status(404).json({ error: 'Usuário não encontrado' })
            }

            const match = await string.compare(password, user.password)
            if (match) {
                return response.status(401).json({ error: 'Senha invalida' })
            }

            const payload = { id: user.id, email: user.email, access: user.access }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })
            return response.status(200).json({ userData: payload, token: token })

        } catch (error) {
            return response.status(500).json({ error: error.message })
        }
    }
}

export { LoginController }