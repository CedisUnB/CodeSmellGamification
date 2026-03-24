import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class UserController {

  async getMe(req, res) {
    const { id } = req.user

    const user = await prisma.user.findUnique({
      where: { id }
    })

    return res.json(user)
  }

}
export { UserController }