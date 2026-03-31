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
router.post('/user', user.addUser)
router.get('/user/:id', verifyAuth, user.getUserById) // TODO: Somente o próprio usuário ou admin

// Exercise
// router.post('/exercise', verifyAuth, exercise.create) // TODO: Somente admin, colocar no banco direto?
router.get('/exercise', exercise.list)

// Attempt
router.post('/attempt', verifyAuth, attempt.create)


export { router }