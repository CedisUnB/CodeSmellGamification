import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
    let { coins } = req.body
    coins = parseInt(coins)

    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          coins: {
            increment: coins
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

      return res.status(200).json(updatedUser)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}

export { UserController }