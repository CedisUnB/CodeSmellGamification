import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class GuideController {

  async getGuides(req, res) {
    try {
      const guides = await prisma.guide.findMany();
      return res.status(200).json(guides);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export { GuideController }