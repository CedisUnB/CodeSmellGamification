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

      // Cria um mapa de respostas corretas (linha -> smell esperado)
      const correctMap = new Map()
      for (const answer of correctAnswers) {
        correctMap.set(answer.line, answer.smellType)
      }

      // Calcula acertos e erros
      let correctCount = 0
      let incorrectCount = 0
      let correctSmellsCount = 0
      const matchedLines = []
      const uniqueCorrectSmells = new Set()

      for (const userAttempt of attempt) {
        const expectedSmell = correctMap.get(userAttempt.line)

        if (expectedSmell && expectedSmell === userAttempt.smell) {
          // Acertou: linha tem smell e o usuário classificou corretamente
          correctCount++
          if (!matchedLines.includes(userAttempt.line)) {
            matchedLines.push(userAttempt.line)
          }
          uniqueCorrectSmells.add(userAttempt.smell)
        } else if (expectedSmell && expectedSmell !== userAttempt.smell) {
          // Errou: linha tem smell mas o usuário classificou errado
          incorrectCount++
        } else if (!expectedSmell) {
          // Errou: linha não tem smell mas o usuário classificou
          incorrectCount++
        }
      }

      // Conta quantas linhas corretas o usuário deixou de marcar
      const allCorrectLines = correctAnswers.map(a => a.line)
      const userMarkedLines = new Set(attempt.map(a => a.line))
      const missedLines = allCorrectLines.filter(line => !userMarkedLines.has(line))

      // Penalidade por linhas não marcadas
      const missedCount = missedLines.length

      // Total de acertos possíveis (linhas com smell)
      const totalPossible = correctAnswers.length

      // Cálculo do score: (acertos - erros - misses) / totalPossible
      let netScore = correctCount - incorrectCount - missedCount
      netScore = Math.max(0, netScore)
      const score = totalPossible > 0 ? (netScore / totalPossible) * 100 : 0
      correctSmellsCount = uniqueCorrectSmells.size

      await prisma.attempt.create({
        data: {
          userId: userId,
          exerciseId: exerciseId,
          correctLines: correctCount,
          correctSmells: correctSmellsCount,
          attemptData: attempt,
          score: score
        }
      })

      // Adiciona moedas baseado no score
      let bonus = 0;
      if (score === 100) bonus = 5;
      else if (score >= 80) bonus = 4;
      else if (score >= 60) bonus = 3;
      else if (score >= 40) bonus = 2;
      else if (score >= 20) bonus = 1;

      const user = await prisma.user.update({
        where: { id: userId },
        data: { coins: { increment: bonus } },
        select: {
          id: true,
          name: true,
          email: true,
          coins: true,
          isAnonymous: true,
        }

      });

      return res.json({
        success: true,
        correctLines: correctCount,
        correctSmells: correctSmellsCount,
        matchedLines,
        score,
        bonus,
        user
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