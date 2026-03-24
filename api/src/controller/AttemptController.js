import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class AttemptController {

  async create(req, res) {
    const { id } = req.user
    const { exerciseId, correctLines, correctSmells } = req.body

    const attempt = await prisma.attempt.create({
      data: {
        userId: id,
        exerciseId,
        correctLines,
        correctSmells
      }
    })

    return res.json(attempt)
  }

}
export { AttemptController }