import express from "express"
import { router } from "./routes/index.js"
import cors from 'cors'
import helmet from 'helmet'
import { globalLimiter } from './middleware/rateLimit.js'

const app = express()
const isProduction = process.env.NODE_ENV === 'production'
const allowedOrigins = (process.env.CORS_ORIGIN || (isProduction ? '' : 'http://localhost:5173'))
        .split(',')
        .map(origin => origin.trim())
        .filter(Boolean)

const insecureJwtSecrets = new Set(['change-me-too', 'dev_secret'])
if (!process.env.JWT_SECRET || insecureJwtSecrets.has(process.env.JWT_SECRET) || process.env.JWT_SECRET.length < 32) {
        throw new Error('JWT_SECRET must be set to a strong non-default value with at least 32 characters')
}

app.set('trust proxy', 1)
app.disable('x-powered-by')
app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors((req, callback) => {
        const origin = req.header('Origin')
        const protocol = req.header('X-Forwarded-Proto') || req.protocol
        const sameOrigin = origin === `${protocol}://${req.header('Host')}`

        if (!origin || sameOrigin || allowedOrigins.includes(origin)) {
                return callback(null, { origin: true })
        }

        return callback(new Error('Origem não permitida pelo CORS'))
}))
app.use(globalLimiter)
app.use(express.json({ limit: '64kb' }))
app.use(router)


app.listen(3000, () => {
        console.log('Running server')
})
