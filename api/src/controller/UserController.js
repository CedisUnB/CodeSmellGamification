import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class UserController {

  async getUserById(request, response) {
    const { id } = request.params;
    try {
      const user = await prisma.user.findUnique({
        select: {
          id: true,
          displayName: true,
          email: true,
          coins: true,
        },
        where: { id }
      });
      return response.status(200).json(user);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }


  async addUser(request, response) {
    const { displayName, email, password } = request.body;

    const newData = {
      displayName,
      email, 
      password, // TODO: Criptografar senha
      // ...(password && { password: await bcrypt.hash(password, 10) }),
    };

    try {
      const user = await prisma.user.create({
        data: newData,
        select: {
          id: true,
          displayName: true,
          email: true,
          coins: true,
        },
      });
      return response.status(200).json(user);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

}
export { UserController }