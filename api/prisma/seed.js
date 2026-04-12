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
  await prisma.exercise.create({
    data: {
      title: "Processador de Pedidos",
      description: `A função \`processarPedido()\` é responsável por calcular o valor final de um pedido. Ela recebe um objeto contendo os itens do carrinho (com preço e quantidade), um cupom de desconto (que pode ser percentual ou valor fixo) e o endereço de entrega (com estado).

A função realiza múltiplas etapas: soma os valores dos itens, aplica o desconto do cupom, calcula o frete baseado no estado, adiciona um imposto fixo de 10%, exibe uma mensagem para pedidos de alto valor e retorna o total.`,
      difficulty: Difficulty.EASY,
      code: `function processarPedido(pedido) {
  let total = 0;

  for (let i = 0; i < pedido.itens.length; i++) {
    total += pedido.itens[i].preco * pedido.itens[i].quantidade;
  }

  if (pedido.cupom) {
    if (pedido.cupom.tipo === "porcentagem") {
      total -= total * (pedido.cupom.valor / 100);
    } else if (pedido.cupom.tipo === "fixo") {
      total -= pedido.cupom.valor;
    }
  }

  let frete = 0;
  if (pedido.endereco.estado === "SP") {
    frete = 10;
  } else if (pedido.endereco.estado === "RJ") {
    frete = 15;
  } else if (pedido.endereco.estado === "MG") {
    frete = 12;
  } else {
    frete = 25;
  }

  let imposto = total * 0.1;

  let valorFinal = total + frete + imposto;

  if (valorFinal > 500) {
    console.log("Pedido com valor alto");
  }

  return valorFinal;
}`,
      smellLines: {
        create: [
          { smellType: SmellType.LONG_METHOD, line: 1 }
        ]
      }
    }
  })

  await prisma.exercise.create({
    data: {
      title: "Calculadora de Totais",
      description: `O sistema possui duas funções que operam sobre listas de itens. A primeira, \`calcularTotalCarrinho()\`, é usada na página do carrinho de compras para exibir o subtotal ao usuário. A segunda, \`calcularTotalPedido()\`, é utilizada internamente no fechamento do pedido para gerar o valor final.

Ambas as funções percorrem uma lista de itens, acessam o preço e a quantidade de cada um, e acumulam o resultado em uma variável.`,
      difficulty: Difficulty.EASY,
      code: `function calcularTotalCarrinho(itens) {
  let total = 0;
  for (let i = 0; i < itens.length; i++) {
    total += itens[i].preco * itens[i].quantidade;
  }
  return total;
}

function calcularTotalPedido(itens) {
  let soma = 0;
  for (let i = 0; i < itens.length; i++) {
    soma += itens[i].preco * itens[i].quantidade;
  }
  return soma;
}`,
      smellLines: {
        create: [
          { smellType: SmellType.DUPLICATED_CODE, line: 1 },
          { smellType: SmellType.DUPLICATED_CODE, line: 2 },
          { smellType: SmellType.DUPLICATED_CODE, line: 3 },
          { smellType: SmellType.DUPLICATED_CODE, line: 4 },
          { smellType: SmellType.DUPLICATED_CODE, line: 5 },
          { smellType: SmellType.DUPLICATED_CODE, line: 6 },
          { smellType: SmellType.DUPLICATED_CODE, line: 7 },
          { smellType: SmellType.DUPLICATED_CODE, line: 9 },
          { smellType: SmellType.DUPLICATED_CODE, line: 10 },
          { smellType: SmellType.DUPLICATED_CODE, line: 11 },
          { smellType: SmellType.DUPLICATED_CODE, line: 12 },
          { smellType: SmellType.DUPLICATED_CODE, line: 13 },
          { smellType: SmellType.DUPLICATED_CODE, line: 14 },
          { smellType: SmellType.DUPLICATED_CODE, line: 15 }
        ]
      }
    }
  })

  await prisma.exercise.create({
    data: {
      title: "Sistema de Relatórios",
      description: `O sistema gera dois tipos diferentes de relatórios financeiros. O primeiro, \`gerarRelatorioVendas()\`, processa uma lista de transações de vendas e calcula o total arrecadado. O segundo, \`gerarRelatorioDevolucoes()\`, processa uma lista de transações de devoluções e calcula o total reembolsado.

Cada função tem suas próprias regras de negócio: uma precisa filtrar por período, a outra não. No entanto, ambas aplicam um desconto especial para clientes VIP da mesma forma.`,
      difficulty: Difficulty.MEDIUM,
      code: `function gerarRelatorioVendas(transacoes) {
  let total = 0;
  
  // Filtra transações dos últimos 30 dias
  const trintaDiasAtras = new Date();
  trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);
  const transacoesFiltradas = transacoes.filter(t => new Date(t.data) > trintaDiasAtras);
  
  for (let i = 0; i < transacoesFiltradas.length; i++) {
    let valor = transacoesFiltradas[i].valor;
    if (transacoesFiltradas[i].clienteVIP) {
      valor = valor * 0.9;
    }
    total += valor;
  }
  
  console.log("Relatório de Vendas gerado");
  return total;
}

function gerarRelatorioDevolucoes(transacoes) {
  let total = 0;
  
  for (let i = 0; i < transacoes.length; i++) {
    let valor = transacoes[i].valor;
    if (transacoes[i].clienteVIP) {
      valor = valor * 0.9;
    }
    total += valor;
  }
  
  console.log("Relatório de Devoluções gerado");
  return total;
}`,
      smellLines: {
        create: [
          { smellType: SmellType.DUPLICATED_CODE, line: 9 },
          { smellType: SmellType.DUPLICATED_CODE, line: 10 },
          { smellType: SmellType.DUPLICATED_CODE, line: 11 },
          { smellType: SmellType.DUPLICATED_CODE, line: 12 },
          { smellType: SmellType.DUPLICATED_CODE, line: 13 },
          { smellType: SmellType.DUPLICATED_CODE, line: 14 },
          { smellType: SmellType.DUPLICATED_CODE, line: 24 },
          { smellType: SmellType.DUPLICATED_CODE, line: 25 },
          { smellType: SmellType.DUPLICATED_CODE, line: 26 },
          { smellType: SmellType.DUPLICATED_CODE, line: 27 },
          { smellType: SmellType.DUPLICATED_CODE, line: 28 },
          { smellType: SmellType.DUPLICATED_CODE, line: 29 },
          { smellType: SmellType.DUPLICATED_CODE, line: 30 }
        ]
      }
    }
  })

  await prisma.exercise.create({
    data: {
      title: "Validador de Dados",
      description: `A função \`validar()\` é usada para verificar se um usuário pode se cadastrar na plataforma. Ela recebe um objeto com informações de cadastro e retorna verdadeiro ou falso.

A função realiza várias verificações: confere se o nome não está vazio, se o email tem formato válido (contém "@" e ponto), se a idade é maior que 18 anos e se a senha tem pelo menos 8 caracteres. No entanto, os nomes das variáveis são pouco descritivos, tornando difícil entender o que cada verificação faz.`,
      difficulty: Difficulty.MEDIUM,
      code: `function validar(d) {
  let a = d.n;
  let b = d.e;
  let c = d.i;
  let e = d.s;
  
  let x = false;
  let y = false;
  let z = false;
  let w = false;
  
  if (a && a.length > 0) {
    x = true;
  }
  
  if (b && b.includes("@") && b.includes(".")) {
    y = true;
  }
  
  if (c && c >= 18) {
    z = true;
  }
  
  if (e && e.length >= 8) {
    w = true;
  }
  
  return x && y && z && w;
}`,
      smellLines: {
        create: [
          { smellType: SmellType.MYSTERIOUS_NAME, line: 1 },
          { smellType: SmellType.MYSTERIOUS_NAME, line: 2 },
          { smellType: SmellType.MYSTERIOUS_NAME, line: 3 },
          { smellType: SmellType.MYSTERIOUS_NAME, line: 4 },
          { smellType: SmellType.MYSTERIOUS_NAME, line: 5 },
          { smellType: SmellType.MYSTERIOUS_NAME, line: 7 },
          { smellType: SmellType.MYSTERIOUS_NAME, line: 8 },
          { smellType: SmellType.MYSTERIOUS_NAME, line: 9 },
          { smellType: SmellType.MYSTERIOUS_NAME, line: 10 }
        ]
      }
    }
  })


  await prisma.exercise.create({
    data: {
      title: "Calculadora de Salário",
      description: `A função \`calcularPagamento()\` é responsável por determinar o valor final que um funcionário receberá no mês. Ela recebe um objeto contendo os dados do funcionário (salário base, cargo, horas extras, faltas) e retorna o valor líquido.

A função realiza múltiplos cálculos: bônus por cargo, adicional por horas extras, desconto por faltas e impostos. Durante esses cálculos, ela acessa repetidamente os dados internos do objeto funcionário, e o código acaba ficando extenso com toda a lógica concentrada em um único lugar.`,
      difficulty: Difficulty.MEDIUM,
      code: `function calcularPagamento(funcionario) {
  let salarioBase = funcionario.salarioBase;
  let cargo = funcionario.cargo;
  let horasExtras = funcionario.horasExtras;
  let faltas = funcionario.faltas;
  
  let bonus = 0;
  if (cargo === "Gerente") {
    bonus = salarioBase * 0.3;
  } else if (cargo === "Coordenador") {
    bonus = salarioBase * 0.2;
  } else if (cargo === "Analista") {
    bonus = salarioBase * 0.1;
  }
  
  let valorHoraExtra = (salarioBase / 160) * 1.5;
  let totalHorasExtras = horasExtras * valorHoraExtra;
  
  let descontoFaltas = (salarioBase / 160) * faltas;
  
  let salarioBruto = salarioBase + bonus + totalHorasExtras - descontoFaltas;
  
  let imposto = 0;
  if (salarioBruto > 5000) {
    imposto = salarioBruto * 0.27;
  } else if (salarioBruto > 3000) {
    imposto = salarioBruto * 0.15;
  } else {
    imposto = salarioBruto * 0.075;
  }
  
  let salarioLiquido = salarioBruto - imposto;
  
  return salarioLiquido;
}`,
      smellLines: {
        create: [
          { smellType: SmellType.FEATURE_ENVY, line: 2 },
          { smellType: SmellType.FEATURE_ENVY, line: 3 },
          { smellType: SmellType.FEATURE_ENVY, line: 4 },
          { smellType: SmellType.FEATURE_ENVY, line: 5 },
          { smellType: SmellType.LONG_METHOD, line: 1 }
        ]
      }
    }
  })

  await prisma.exercise.create({
    data: {
      title: "Calculadora de Desconto",
      description: `A função \`calcular()\` recebe o preço original de um produto, um código de cupom e um indicador de cliente VIP, e retorna o valor final após aplicar os descontos.`,
      difficulty: Difficulty.EASY,
      code: `function calcular(p, c, v) {
  // Inicializa a variável de desconto com valor zero
  // Esta variável vai acumular todos os descontos aplicáveis
  let d = 0;
  
  // Verifica qual tipo de cupom foi informado
  // Cupom BLACK: desconto de 20 reais (melhor desconto disponível)
  if (c === "BLACK") {
    d = 20; // Define desconto como 20
  } 
  // Cupom GOLD: desconto de 15 reais (segundo melhor)
  else if (c === "GOLD") {
    d = 15; // Define desconto como 15
  } 
  // Cupom SILVER: desconto de 10 reais (desconto básico)
  else if (c === "SILVER") {
    d = 10; // Define desconto como 10
  }
 
  // Verifica se o cliente é VIP
  // Clientes VIP ganham um desconto adicional de 5 reais
  if (v) {
    d = d + 5; // Adiciona 5 reais ao desconto existente
  }
  
  // Aplica o desconto calculado ao preço original
  // Subtrai o valor total do desconto do preço do produto
  let r = p - d;
  
  // Valida se o valor final não ficou negativo
  // Caso negativo, ajusta para zero para evitar preços negativos
  // Isso é uma proteção contra descontos excessivos
  if (r < 0) {
    r = 0; // Zera o valor se ficou negativo
  }
  
  // Retorna o valor final calculado para o chamador da função
  return r;
}`,
      smellLines: {
        create: [
          { smellType: SmellType.MYSTERIOUS_NAME, line: 1 },
          { smellType: SmellType.MYSTERIOUS_NAME, line: 4 },
          { smellType: SmellType.MYSTERIOUS_NAME, line: 28 },
          { smellType: SmellType.COMMENTS, line: 2 },
          { smellType: SmellType.COMMENTS, line: 3 },
          { smellType: SmellType.COMMENTS, line: 6 },
          { smellType: SmellType.COMMENTS, line: 7 },
          { smellType: SmellType.COMMENTS, line: 9 },
          { smellType: SmellType.COMMENTS, line: 11 },
          { smellType: SmellType.COMMENTS, line: 13 },
          { smellType: SmellType.COMMENTS, line: 15 },
          { smellType: SmellType.COMMENTS, line: 17 },
          { smellType: SmellType.COMMENTS, line: 20 },
          { smellType: SmellType.COMMENTS, line: 21 },
          { smellType: SmellType.COMMENTS, line: 23 },
          { smellType: SmellType.COMMENTS, line: 26 },
          { smellType: SmellType.COMMENTS, line: 27 },
          { smellType: SmellType.COMMENTS, line: 30 },
          { smellType: SmellType.COMMENTS, line: 31 },
          { smellType: SmellType.COMMENTS, line: 32 },
          { smellType: SmellType.COMMENTS, line: 34 },
          { smellType: SmellType.COMMENTS, line: 37 }
        ]
      }
    }
  })

  await prisma.exercise.create({
    data: {
      title: "Sistema de Reservas",
      description: `O sistema possui funções para gerenciar reservas de hotel. As funções \`calcularDiarias()\` e \`calcularMulta()\` recebem os mesmos parâmetros repetidamente: data de check-in, data de check-out e número de hóspedes.

Além disso, ambas as funções contêm um trecho idêntico que calcula a quantidade de dias entre as duas datas. Esse cálculo aparece nos dois lugares.`,
      difficulty: Difficulty.MEDIUM,
      code: `function calcularDiarias(checkIn, checkOut, hóspedes) {
  // Calcula número de diárias
  const umDia = 24 * 60 * 60 * 1000;
  const diffEmMilissegundos = Math.abs(checkOut - checkIn);
  const diarias = Math.ceil(diffEmMilissegundos / umDia);
  
  const precoBase = 200;
  let total = diarias * precoBase;
  
  if (hóspedes > 2) {
    total += (hóspedes - 2) * 50;
  }
  
  return total;
}

function calcularMulta(checkIn, checkOut, hóspedes) {
  // Calcula número de diárias
  const umDia = 24 * 60 * 60 * 1000;
  const diffEmMilissegundos = Math.abs(checkOut - checkIn);
  const diarias = Math.ceil(diffEmMilissegundos / umDia);
  
  const multaPorDia = 30;
  const multa = diarias * multaPorDia;
  
  return multa;
}`,
      smellLines: {
        create: [
          { smellType: SmellType.DATA_CLUMPS, line: 1 },
          { smellType: SmellType.DATA_CLUMPS, line: 17 },
          { smellType: SmellType.DUPLICATED_CODE, line: 3 },
          { smellType: SmellType.DUPLICATED_CODE, line: 4 },
          { smellType: SmellType.DUPLICATED_CODE, line: 5 },
          { smellType: SmellType.DUPLICATED_CODE, line: 19 },
          { smellType: SmellType.DUPLICATED_CODE, line: 20 },
          { smellType: SmellType.DUPLICATED_CODE, line: 21 }
        ]
      }
    }
  })

  await prisma.exercise.create({
    data: {
      title: "Registro de Temperatura",
      description: `O sistema armazena medições de temperatura de sensores. As funções \`classificarTemperatura()\` e \`ajustarAlerta()\` recebem a temperatura como um número simples e um código de unidade como texto ("C" para Celsius, "F" para Fahrenheit).`,
      difficulty: Difficulty.MEDIUM,
      code: `function classificarTemperatura(valor, unidade) {
  let celsius = valor;
  
  if (unidade === "F") {
    celsius = (valor - 32) * 5 / 9;
  }
  
  if (celsius < 0) {
    return "CONGELANDO";
  } else if (celsius < 15) {
    return "FRIO";
  } else if (celsius < 25) {
    return "AGRADAVEL";
  } else if (celsius < 35) {
    return "QUENTE";
  } else {
    return "MUITO QUENTE";
  }
}

function ajustarAlerta(valor, unidade) {
  let celsius = valor;
  
  if (unidade === "F") {
    celsius = (valor - 32) * 5 / 9;
  }
  
  if (celsius > 35) {
    return "ALERTA_MAXIMO";
  } else if (celsius > 30) {
    return "ATENCAO";
  }
  
  return "NORMAL";
}`,
      smellLines: {
        create: [
          { smellType: SmellType.PRIMITIVE_OBSESSION, line: 1 },
          { smellType: SmellType.PRIMITIVE_OBSESSION, line: 21 },
          { smellType: SmellType.DUPLICATED_CODE, line: 4 },
          { smellType: SmellType.DUPLICATED_CODE, line: 5 },
          { smellType: SmellType.DUPLICATED_CODE, line: 6 },
          { smellType: SmellType.DUPLICATED_CODE, line: 24 },
          { smellType: SmellType.DUPLICATED_CODE, line: 25 },
          { smellType: SmellType.DUPLICATED_CODE, line: 26 }
        ]
      }
    }
  })

  await prisma.exercise.create({
    data: {
      title: "Gerenciador de Biblioteca",
      description: `A classe \`Biblioteca\` é responsável por gerenciar livros, usuários e empréstimos. Ela contém métodos para adicionar livros, cadastrar usuários, registrar empréstimos, devolver livros, gerar relatórios e enviar notificações.

Todas essas responsabilidades estão concentradas em uma única classe, que cresceu ao longo do tempo para atender a diversas funcionalidades do sistema.`,
      difficulty: Difficulty.HARD,
      code: `class Biblioteca {
  constructor() {
    this.livros = [];
    this.usuarios = [];
    this.emprestimos = [];
  }
  
  adicionarLivro(titulo, autor, isbn) {
    this.livros.push({ titulo, autor, isbn, disponivel: true });
  }
  
  cadastrarUsuario(nome, email) {
    this.usuarios.push({ nome, email, id: Date.now() });
  }
  
  registrarEmprestimo(idUsuario, isbnLivro) {
    const livro = this.livros.find(l => l.isbn === isbnLivro && l.disponivel);
    if (!livro) return "Livro indisponível";
    
    livro.disponivel = false;
    this.emprestimos.push({ idUsuario, isbnLivro, data: new Date() });
    return "Empréstimo realizado";
  }
  
  devolverLivro(isbnLivro) {
    const livro = this.livros.find(l => l.isbn === isbnLivro);
    if (livro) livro.disponivel = true;
    
    const emprestimo = this.emprestimos.find(e => e.isbnLivro === isbnLivro);
    if (emprestimo) emprestimo.dataDevolucao = new Date();
  }
  
  gerarRelatorioLivrosMaisEmprestados() {
    const contagem = {};
    this.emprestimos.forEach(e => {
      contagem[e.isbnLivro] = (contagem[e.isbnLivro] || 0) + 1;
    });
    return Object.entries(contagem).sort((a, b) => b[1] - a[1]);
  }
  
  gerarRelatorioUsuariosAtivos() {
    const usuariosAtivos = new Set(this.emprestimos.map(e => e.idUsuario));
    return Array.from(usuariosAtivos);
  }
  
  enviarNotificacaoAtraso(email, diasAtraso) {
    console.log("Enviando email para", email, "sobre atraso de", diasAtraso, "dias");
  }
  
  verificarAtrasos() {
    const hoje = new Date();
    this.emprestimos.forEach(e => {
      if (!e.dataDevolucao) {
        const dias = Math.floor((hoje - e.data) / (1000 * 60 * 60 * 24));
        if (dias > 7) {
          const usuario = this.usuarios.find(u => u.id === e.idUsuario);
          this.enviarNotificacaoAtraso(usuario.email, dias);
        }
      }
    });
  }
}`,
      smellLines: {
        create: [
          { smellType: SmellType.LARGE_CLASS, line: 1 }
        ]
      }
    }
  })

  await prisma.exercise.create({
    data: {
      title: "Sistema de Descontos",
      description: `Um sistema de e-commerce foi desenvolvido rapidamente para uma black friday. Cada tipo de desconto (promoção, aniversário, primeira compra) foi implementado em funções separadas por diferentes desenvolvedores, que copiaram e colaram a lógica de validação de cupom.

Seis meses depois, a equipe de marketing decidiu que os cupons agora terão 8 caracteres em vez de 5. O desenvolvedor deverá alterar as três funções diferentes para aplicar a mudança. Na semana seguinte, a equipe de segurança pediu para adicionar uma verificação de cupom expirado nas funções que aplicam descontos. Mais três alterações.`,
      difficulty: Difficulty.HARD,
      code: `function aplicarDescontoPromocao(valor, cupom) {
  let desconto = 0;
  
  if (cupom && cupom.length === 8 && cupom.startsWith("PROMO")) {
    desconto = valor * 0.15;
  }
  
  return valor - desconto;
}

function aplicarDescontoAniversario(valor, cupom) {
  let desconto = 0;
  
  if (cupom && cupom.length === 8 && cupom.startsWith("ANIVE")) {
    desconto = valor * 0.1;
  }
  
  return valor - desconto;
}

function aplicarDescontoPrimeiraCompra(valor, cupom) {
  let desconto = 0;
  
  if (cupom && cupom.length === 8 && cupom.startsWith("PRIME")) {
    desconto = valor * 0.2;
  }
  
  return valor - desconto;
}`,
      smellLines: {
        create: [
          { smellType: SmellType.SHOTGUN_SURGERY, line: 4 },
          { smellType: SmellType.SHOTGUN_SURGERY, line: 14 },
          { smellType: SmellType.SHOTGUN_SURGERY, line: 24 }
        ]
      }
    }
  })

  await prisma.exercise.create({
    data: {
      title: "Sistema de Notificações",
      description: `A startup tinha um serviço simples de email. Depois, adicionaram SMS, push notification e WhatsApp. Em vez de expor esses serviços diretamente, criaram uma classe \`Notificador\` que só chama os métodos dos serviços reais, sem fazer nada além de repassar chamadas.

Com o tempo, a classe \`Notificador\` ficou cheia de métodos que simplesmente delegam para outras classes. Para adicionar um novo tipo de notificação, o desenvolvedor precisa criar métodos tanto no serviço real quanto no \`Notificador\`. O time percebeu que a classe não agrega valor e só adiciona complexidade desnecessária.`,
      difficulty: Difficulty.MEDIUM,
      code: `class EmailService {
  enviar(destinatario, mensagem) {
    console.log("Enviando email para", destinatario);
  }
}

class SMSService {
  enviar(numero, mensagem) {
    console.log("Enviando SMS para", numero);
  }
}

class PushService {
  enviar(dispositivo, mensagem) {
    console.log("Enviando push para", dispositivo);
  }
}

class WhatsAppService {
  enviar(numero, mensagem) {
    console.log("Enviando WhatsApp para", numero);
  }
}

class Notificador {
  constructor() {
    this.emailService = new EmailService();
    this.smsService = new SMSService();
    this.pushService = new PushService();
    this.whatsAppService = new WhatsAppService();
  }

  enviarEmail(destinatario, mensagem) {
    this.emailService.enviar(destinatario, mensagem);
  }

  enviarSMS(numero, mensagem) {
    this.smsService.enviar(numero, mensagem);
  }

  enviarPush(dispositivo, mensagem) {
    this.pushService.enviar(dispositivo, mensagem);
  }

  enviarWhatsApp(numero, mensagem) {
    this.whatsAppService.enviar(numero, mensagem);
  }
}`,
      smellLines: {
        create: [
          { smellType: SmellType.MIDDLE_MAN, line: 25 },
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