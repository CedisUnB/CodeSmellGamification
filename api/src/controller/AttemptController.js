import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class AttemptController {

  async makeAttempt(req, res) {
    try {
      const { id: userId } = req.user
      let { id: exerciseId } = req.params
      exerciseId = parseInt(exerciseId)
      const { attempt } = req.body // [{ line: 1, smell: 'LONG_METHOD' }, ...]

      // Busca as respostas corretas do banco
      const correctAnswers = await prisma.smellLine.findMany({
        where: { exerciseId }
      })

      // Calcula acertos
      let correctLinesCount = 0
      let correctSmellsCount = 0
      const matchedLines = []

      for (const userAttempt of attempt) {
        const isCorrect = correctAnswers.some(
          correct => correct.line === userAttempt.line &&
            correct.smellType === userAttempt.smell
        )

        if (isCorrect) {
          correctLinesCount++
          if (!matchedLines.includes(userAttempt.line)) {
            matchedLines.push(userAttempt.line)
          }
        }
      }

      // Conta smells únicos acertados
      const uniqueSmells = new Set()
      for (const userAttempt of attempt) {
        const hasCorrectSmell = correctAnswers.some(
          correct => correct.smellType === userAttempt.smell &&
            correct.line === userAttempt.line
        )
        if (hasCorrectSmell) {
          uniqueSmells.add(userAttempt.smell)
        }
      }
      correctSmellsCount = uniqueSmells.size

      // Salva a tentativa
      await prisma.attempt.create({
        data: {
          userId: userId,
          exerciseId: exerciseId,
          correctLines: correctLinesCount,
          correctSmells: correctSmellsCount
        }
      })

      // Percentual de acerto
      const score = (correctLinesCount / correctAnswers.length) * 100

      // Adiciona moedas
      let bonus = 0;
      if (score === 100) bonus = 5;
      else if (score >= 80) bonus = 4;
      else if (score >= 60) bonus = 3;
      else if (score >= 40) bonus = 2;
      else bonus = 1;
      await prisma.user.update({
        where: { id: userId },
        data: {
          coins: {
            increment: bonus
          }
        }
      });

      return res.json({
        success: true,
        correctLines: correctLinesCount,
        correctSmells: correctSmellsCount,
        matchedLines,
        score,
      })

    } catch (error) {
      console.error('Erro ao processar tentativa:', error)
      return res.status(500).json({
        success: false,
        error: 'Erro interno ao processar tentativa'
      })
    }
  }
}

export { AttemptController }