import { PrismaClient, Difficulty, SmellType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Limpa os dados existentes (opcional)
  await prisma.attempt.deleteMany()
  await prisma.smellLine.deleteMany()
  await prisma.exercise.deleteMany()
  await prisma.user.deleteMany()

  // Cria usuário
  await prisma.user.create({
    data: {
      name: "Ricardo",
      email: "a@b.com",
      password: "123",
      isAnonymous: false,
      coins: 100
    }
  });

  // Cria exercícios com smellLines
  const exercise1 = await prisma.exercise.create({
    data: {
      title: "Long Method",
      description: "Identifique linhas com método muito longo",
      difficulty: Difficulty.EASY,
      code: `
function calcular() {
  let soma = 0;
  for (let i = 0; i < 100; i++) {
    soma += i;
  }    
}
      `,
      smellLines: {
        create: [
          { smellType: SmellType.LONG_METHOD, line: 2 },
          { smellType: SmellType.LONG_METHOD, line: 3 },
          { smellType: SmellType.LONG_METHOD, line: 4 }
        ]
      }
    }
  })

  const exercise2 = await prisma.exercise.create({
    data: {
      title: "Duplicated Code",
      description: "Identifique código duplicado",
      difficulty: Difficulty.HARD,
      code: `
function a() {
  console.log("oi");  
  console.log("oi");
}
      `,
      smellLines: {
        create: [
          { smellType: SmellType.DUPLICATED_CODE, line: 3 },
          { smellType: SmellType.DUPLICATED_CODE, line: 4 }
        ]
      }
    }
  })

  const exercise3 = await prisma.exercise.create({
    data: {
      title: "Duplicated Code 2",
      description: "Identifique código duplicado em funções diferentes",
      difficulty: Difficulty.EASY,
      code: `
function a() {
  console.log("oi");  
  console.log("oi");
}
      `,
      smellLines: {
        create: [
          { smellType: SmellType.DUPLICATED_CODE, line: 3 },
          { smellType: SmellType.DUPLICATED_CODE, line: 4 }
        ]
      }
    }
  })

  const exercise4 = await prisma.exercise.create({
    data: {
      title: "Long Method Complex",
      description: "Identifique linhas com método muito longo e loops aninhados",
      difficulty: Difficulty.MEDIUM,
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
          { smellType: SmellType.LONG_METHOD, line: 2 },
          { smellType: SmellType.LONG_METHOD, line: 4 },
          { smellType: SmellType.LONG_METHOD, line: 8 },
          { smellType: SmellType.DATA_CLUMPS, line: 3 }
        ]
      }
    }
  })

  const exercise5 = await prisma.exercise.create({
    data: {
      title: "Duplicated Code Functions",
      description: "Identifique código duplicado em funções diferentes",
      difficulty: Difficulty.HARD,
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
          { smellType: SmellType.DUPLICATED_CODE, line: 2 },
          { smellType: SmellType.DUPLICATED_CODE, line: 3 },
          { smellType: SmellType.DUPLICATED_CODE, line: 6 },
          { smellType: SmellType.DUPLICATED_CODE, line: 7 }
        ]
      }
    }
  })

  // Exercício adicional com múltiplos smells
  const exercise6 = await prisma.exercise.create({
    data: {
      title: "Processa Preço Pedido",
      description: "Função com múltiplos maus cheiros: método longo, inveja de funcionalidade e agrupamento de dados",
      difficulty: Difficulty.MEDIUM,
      code: `
function processarPedido(pedido) {
  let total = 0;

  for (let item of pedido.itens) {
    total += item.preco * item.quantidade;
  }

  if (pedido.cupom) {
    if (pedido.cupom.tipo === "porcentagem") {
      total -= total * (pedido.cupom.valor / 100);
    } else if (pedido.cupom.tipo === "fixo") {
      total -= pedido.cupom.valor;
    }
  }

  let frete = 0;
  if (pedido.endereco.estado === "SP") frete = 5;
  else if (pedido.endereco.estado === "RJ") frete = 10;
  else frete = 15;

  let imposto = total * 0.1;
  return total + frete + imposto;
}
      `,
      smellLines: {
        create: [
          { smellType: SmellType.LONG_METHOD, line: 2 },
          { smellType: SmellType.LONG_METHOD, line: 4 },
          { smellType: SmellType.LONG_METHOD, line: 8 },
          { smellType: SmellType.LONG_METHOD, line: 14 },
          { smellType: SmellType.LONG_METHOD, line: 20 },
          { smellType: SmellType.LONG_METHOD, line: 24 },
          { smellType: SmellType.FEATURE_ENVY, line: 5 },
          { smellType: SmellType.FEATURE_ENVY, line: 9 },
          { smellType: SmellType.DATA_CLUMPS, line: 21 },
          { smellType: SmellType.DATA_CLUMPS, line: 22 },
          { smellType: SmellType.DATA_CLUMPS, line: 23 }
        ]
      }
    }
  })

  console.log("🌱 Seed executado com sucesso!")
  console.log(`📚 ${await prisma.exercise.count()} exercícios criados`)
  console.log(`📍 ${await prisma.smellLine.count()} smell lines criadas`)
  console.log(`👤 Usuário: a@b.com / 123`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })