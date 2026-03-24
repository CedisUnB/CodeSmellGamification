import { Router } from 'express'

import { LoginController } from '../controller/LoginController.js'
import { UserController } from '../controller/UserController.js'
import { ExerciseController } from '../controller/ExerciseController.js'
import { AttemptController } from '../controller/AttemptController.js'
import { verifyAuth } from '../auth/authMiddleware.js'

const router = Router()

const login = new LoginController()
const user = new UserController()
const exercise = new ExerciseController()
const attempt = new AttemptController()

// Login
router.post('/login', login.login)

// User
router.get('/me', verifyAuth, user.getMe)

// Exercise
// router.post('/exercise', verifyAuth, exercise.create) // TODO: Somente admin, colocar no banco direto?
router.get('/exercise', exercise.list)

// Attempt
router.post('/attempt', verifyAuth, attempt.create)


export { router }