import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  await prisma.user.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.attempt.deleteMany();

  // Usuários
  const user = await prisma.user.create({
    data: {
      email: "teste@teste.com",
      displayName: "Usuário Teste",
      password: "123",
      coins: 100
    }
  })

  // Exercícios
  const exercise1 = await prisma.exercise.create({
    data: {
      title: "Long Method",
      description: "Identifique linhas com método muito longo",
      difficulty: "facil",
      code: `
function calcular() {
  let soma = 0;
  for (let i = 0; i < 100; i++) {
    soma += i;
  }

  for (let i = 0; i < 100; i++) {
    soma += i * 2;
  }

  console.log(soma);
}
      `,
      smellLines: {
        create: [
          { line: 2, smellType: "Long Method" },
          { line: 6, smellType: "Long Method" }
        ]
      }
    }
  })

  const exercise2 = await prisma.exercise.create({
    data: {
      title: "Duplicated Code",
      description: "Identifique código duplicado",
      difficulty: "dificil",
      code: `
function a() {
  console.log("oi");
}

function b() {
  console.log("oi");
}
      `,
      smellLines: {
        create: [
          { line: 2, smellType: "Duplicated Code" },
          { line: 6, smellType: "Duplicated Code" }
        ]
      }
    }
  })

  console.log("🌱 Seed executado com sucesso")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })