import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const COIN_REWARD = 1
const COIN_COOLDOWN_MS = 10000
const coinCollectionTimestamps = new Map()

class UserController {

  async getMe(req, res) {
    const { id } = req.user;

    try {
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          coins: true,
          isAnonymous: true,
        }
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async addCoins(req, res) {
    const { id } = req.user
    const now = Date.now()
    const lastCollectionAt = coinCollectionTimestamps.get(id) || 0
    const nextAllowedAt = lastCollectionAt + COIN_COOLDOWN_MS

    if (now < nextAllowedAt) {
      const retryAfterSeconds = Math.ceil((nextAllowedAt - now) / 1000)
      res.set('Retry-After', retryAfterSeconds.toString())
      return res.status(429).json({ error: 'Aguarde antes de coletar outro petisco.' })
    }

    coinCollectionTimestamps.set(id, now)

    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          coins: {
            increment: COIN_REWARD
          }
        },
        select: {
          id: true,
          name: true,
          email: true,
          coins: true,
          isAnonymous: true,
        }
      })

      if (!updatedUser) {
        return res.status(404).json({ error: 'Usuário nao encontrado' })
      }

      if (coinCollectionTimestamps.size > 10000) {
        for (const [userId, collectedAt] of coinCollectionTimestamps) {
          if (now - collectedAt > 60 * 60 * 1000) {
            coinCollectionTimestamps.delete(userId)
          }
        }
      }

      return res.status(200).json(updatedUser)
    } catch (error) {
      coinCollectionTimestamps.delete(id)
      return res.status(500).json({ error: error.message })
    }
  }
}

export { UserController }
