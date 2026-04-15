import jwt from 'jsonwebtoken'


export function verifyAuth(request, response, next) {
    const { authorization } = request.headers

    if (!authorization) {
        return response.status(401).json({ error: 'Token ausente' })
    }

    const [, token] = authorization.split(' ')

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        request.user = decoded

        next()
    } catch (error) {
        return response.status(401).json({ error: 'Não autorizado' })
    }
}