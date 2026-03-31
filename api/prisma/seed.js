import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  await prisma.exercise.createMany({
    data: [
      {
        title: "Long Method",
        description: "Identifique linhas com método muito longo",
        difficulty: "facil",
        code: `
function calcular() {
  let soma = 0;
  for (let i = 0; i < 100; i++) {
    soma += i;
  }    
}
      `
      },
      {
        title: "Duplicated Code",
        description: "Identifique código duplicado",
        difficulty: "dificil",
        code: `
function a() {
  console.log("oi");  
  console.log("oi");
}
      `
      },
      {
        title: "Duplicated Code",
        description: "Identifique código duplicado",
        difficulty: "facil",
        code: `
function a() {
  console.log("oi");  
  console.log("oi");
}
      `,
      },
      {
        title: "Long Methoooood",
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
      },
      {
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
      },
    ]
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