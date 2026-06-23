import rateLimit from 'express-rate-limit'

const jsonMessage = (error) => ({ error })

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 500,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: jsonMessage('Muitas requisições. Tente novamente em alguns minutos.')
})

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: jsonMessage('Muitas tentativas de autenticação. Tente novamente em alguns minutos.')
})

export const anonymousLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 60,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: jsonMessage('Muitas sessões anônimas criadas neste IP. Tente novamente em alguns minutos.')
})

export const attemptLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: jsonMessage('Muitas tentativas enviadas. Aguarde um momento antes de tentar novamente.')
})

export const coinLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 8,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: jsonMessage('Muitos petiscos coletados em pouco tempo. Aguarde um momento.')
})
