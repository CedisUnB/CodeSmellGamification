import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class ExerciseController {

  async create(req, res) {
    const { title, description, difficulty, code, smellLines } = req.body

    const exercise = await prisma.exercise.create({
      data: {
        title,
        description,
        difficulty,
        code,
        smellLines: {
          create: smellLines // Array de { smellType, line }
        }
      },
      include: {
        smellLines: true
      }
    })

    return res.json(exercise)
  }

  async list(req, res) {
    const { id: userId } = req.user

    // Busca todos os exercícios
    const exercises = await prisma.exercise.findMany({
      select: {
        id: true,
        title: true,
        difficulty: true,
        attempts: {
          where: { userId },
          select: { id: true },
          take: 1
        }
      }
    })

    const completedExercises = exercises.filter(ex => ex.attempts.length > 0)
    const pendingExercises = exercises.filter(ex => ex.attempts.length === 0)

    // Lógica de recomendação:
    // 1. Se não fez nenhum exercício: recomenda 1 exercício fácil
    // 2. Se já fez alguns: recomenda 1 exercício do próximo nível não feito
    let recommendedId = null

    if (completedExercises.length === 0) {
      const firstEasy = pendingExercises.find(ex => ex.difficulty === 'EASY')
      if (firstEasy) recommendedId = firstEasy.id
    } else {
      const hasHard = completedExercises.some(ex => ex.difficulty === 'HARD')
      const hasMedium = completedExercises.some(ex => ex.difficulty === 'MEDIUM')

      if (!hasMedium) {
        const mediumExercise = pendingExercises.find(ex => ex.difficulty === 'MEDIUM')
        if (mediumExercise) recommendedId = mediumExercise.id
      } else if (!hasHard) {
        const hardExercise = pendingExercises.find(ex => ex.difficulty === 'HARD')
        if (hardExercise) recommendedId = hardExercise.id
      } else {
        if (pendingExercises.length > 0) {
          recommendedId = pendingExercises[0].id
        }
      }
    }

    const formattedExercises = exercises.map(exercise => ({
      id: exercise.id,
      title: exercise.title,
      difficulty: exercise.difficulty,
      hasAttempt: exercise.attempts.length > 0,
      recommended: exercise.id === recommendedId
    }))

    return res.json(formattedExercises)
  }

  async getById(req, res) {
    let { id } = req.params
    id = parseInt(id)
    const exercise = await prisma.exercise.findUnique({ where: { id } })
    return res.json(exercise)
  }

  async getStatistics(req, res) { // TODO: Melhorar, trazer mais estatísticas
    const { id: userId } = req.user
    let { id: exerciseId } = req.params
    exerciseId = parseInt(exerciseId)

    return res.json({
      totalAttempts: await prisma.attempt.count({ where: { exerciseId } }),
      userAttempts: await prisma.attempt.count({ where: { exerciseId, userId } })
    })
  }

  async getTip(req, res) {
    const { id: userId } = req.user
    let { id: exerciseId } = req.params
    exerciseId = parseInt(exerciseId)

    let { tipNumber } = req.query // 1, 2 ou 3
    tipNumber = parseInt(tipNumber)

    const TIP_COST = 1

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { coins: true }
      })

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' })
      }

      if (user.coins < TIP_COST) {
        return res.status(400).json({
          error: `Petiscos insuficientes. Você precisa de pelo menos ${TIP_COST} petisco para uma dica`,
          currentCoins: user.coins,
          neededCoins: TIP_COST
        })
      }

      // 3. Busca as smellLines do exercício
      const smellLines = await prisma.smellLine.findMany({
        where: { exerciseId },
        select: {
          line: true,
          smellType: true
        }
      })

      if (smellLines.length === 0) {
        return res.status(404).json({ error: 'Nenhum smell encontrado para este exercício' })
      }

      // 4. Calcula as estatísticas do gabarito
      const uniqueSmells = [...new Set(smellLines.map(s => s.smellType))]
      const uniqueLines = [...new Set(smellLines.map(s => s.line))]

      // 5. Gera a dica baseada no tipNumber
      let tip
      switch (tipNumber) {
        case 1:
          tip = { linesCount: uniqueLines.length }
          break

        case 2:
          tip = { smellsCount: uniqueSmells.length, }
          break

        case 3:
          const randomLine = uniqueLines[Math.floor(Math.random() * uniqueLines.length)]
          tip = { smellyLine: randomLine }
          break

        default:
          return res.status(400).json({ error: 'Número de dica inválido. Use 1, 2 ou 3' })
      }

      // 6. Desconta as coins do usuário
      await prisma.user.update({
        where: { id: userId },
        data: { coins: { decrement: TIP_COST } }
      })

      return res.status(200).json({
        tip,
        tipNumber,
        remainingCoins: user.coins - TIP_COST
      })

    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

}

export { ExerciseController }