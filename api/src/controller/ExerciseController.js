import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class ExerciseController {

  async create(req, res) {
    const { title, description, code } = req.body

    const exercise = await prisma.exercise.create({
      data: { title, description, code }
    })

    return res.json(exercise)
  }

  async list(req, res) {
    const exercises = await prisma.exercise.findMany()
    return res.json(exercises)
  }

}
export { ExerciseController }