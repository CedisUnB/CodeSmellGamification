import { Router } from 'express'

import { LoginController } from '../controller/LoginController.js'
import { UserController } from '../controller/UserController.js'
import { ExerciseController } from '../controller/ExerciseController.js'
import { AttemptController } from '../controller/AttemptController.js'
import { GuideController } from '../controller/GuideController.js'
import { verifyAuth } from '../auth/authMiddleware.js'

const router = Router()

const login = new LoginController()
const user = new UserController()
const exercise = new ExerciseController()
const attempt = new AttemptController()
const guide = new GuideController()

// Login
router.post('/user/anonymous', login.anonymousLogin)
router.post('/user/login', login.login)
router.post('/user/register', login.register)

// User
router.get('/user/me', verifyAuth, user.getMe)
router.post('/user/coin', verifyAuth, user.addCoins)

// Exercise
// router.post('/exercise', exercise.create) // TODO: Somente admin, colocar no banco direto?
router.get('/exercise', verifyAuth, exercise.list)
router.get('/exercise/:id', verifyAuth, exercise.getById)
router.get('/exercise/:id/tip', verifyAuth, exercise.getTip)
router.get('/exercise/:id/statistics', verifyAuth, exercise.getStatistics) // TODO: Melhorar

// Attempt
router.post('/exercise/:id/attempt', verifyAuth, attempt.makeAttempt)

// Guides
router.get('/guide', guide.getGuides)

export { router }