import { Router } from 'express'

import { LoginController } from '../controller/LoginController.js'
import { UserController } from '../controller/UserController.js'
import { ExerciseController } from '../controller/ExerciseController.js'
import { AttemptController } from '../controller/AttemptController.js'
import { verifyAuth } from '../middleware/authMiddleware.js'
import {
    validateAnonymousLoginBody,
    validateAttemptBody,
    validateIdParam,
    validateLoginBody,
    validateRegisterBody
} from '../middleware/validation.js'
import {
    anonymousLoginLimiter,
    attemptLimiter,
    authLimiter,
    coinLimiter
} from '../middleware/rateLimit.js'


const router = Router()

const login = new LoginController()
const user = new UserController()
const exercise = new ExerciseController()
const attempt = new AttemptController()

// Login
router.post('/user/anonymous', anonymousLoginLimiter, validateAnonymousLoginBody, login.anonymousLogin)
router.post('/user/login', authLimiter, validateLoginBody, login.login)
router.post('/user/register', authLimiter, validateRegisterBody, login.register)

// User
router.get('/user/me', verifyAuth, user.getMe)
router.post('/user/coin', coinLimiter, verifyAuth, user.addCoins)

// Exercise
router.get('/exercise', verifyAuth, exercise.list)
router.get('/exercise/:id', validateIdParam, verifyAuth, exercise.getById)
router.get('/exercise/:id/tip', validateIdParam, verifyAuth, exercise.getTip)
router.get('/exercise/:id/statistics', validateIdParam, verifyAuth, exercise.getStatistics)

// Attempt
router.post('/exercise/:id/attempt', attemptLimiter, validateIdParam, verifyAuth, validateAttemptBody, attempt.makeAttempt)

export { router }
