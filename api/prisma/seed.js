import { PrismaClient, Difficulty, SmellType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Limpa o banco de dados
  await prisma.smellLine.deleteMany({})
  await prisma.attempt.deleteMany({})
  await prisma.exercise.deleteMany({})
  await prisma.user.deleteMany({})

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
          { smellType: SmellType.DUPLICATED_CODE, line: 15 },
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
      difficulty: Difficulty.HARD,
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
          { smellType: SmellType.COMMENTS, line: 2 },
          { smellType: SmellType.COMMENTS, line: 18 },
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
      difficulty: Difficulty.HARD,
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


  await prisma.exercise.create({
    data: {
      title: "Sistema de Empréstimos",
      description: `A função \`calcularParcela()\` é responsável por calcular o valor das parcelas de um empréstimo bancário. Ela recebe os parâmetros: valor do empréstimo, número de parcelas, taxa de juros mensal, taxa de administração, valor do IOF, percentual de seguro, taxa de abertura de crédito, valor de tarifa bancária, desconto para pagamento antecipado e uma flag para cliente especial.`,
      difficulty: Difficulty.MEDIUM,
      code: `function calcularParcela(
  valor,
  parcelas,
  juros,
  admin,
  iof,
  seguro,
  taxaAbertura,
  tarifa,
  desconto,
  especial
) {
  let taxaTotal = juros + admin + iof;

  if (especial) {
    taxaTotal = taxaTotal - taxaTotal * 0.1;
  }

  let montante = valor * Math.pow(1 + taxaTotal / 100, parcelas);

  if (seguro > 0) {
    let valorSeguro = valor * (seguro / 100);
    montante += valorSeguro;
  }

  if (taxaAbertura > 0) {
    montante += taxaAbertura;
  }

  if (tarifa > 0) {
    montante += tarifa;
  }

  let parcela = montante / parcelas;

  if (desconto && desconto > 0) {
    let descontoValor = parcela * (desconto / 100);
    parcela = parcela - descontoValor;
  }

  return parcela;
}`,
      smellLines: {
        create: [
          { smellType: SmellType.LONG_PARAMETER_LIST, line: 2 },
          { smellType: SmellType.LONG_PARAMETER_LIST, line: 3 },
          { smellType: SmellType.LONG_PARAMETER_LIST, line: 4 },
          { smellType: SmellType.LONG_PARAMETER_LIST, line: 5 },
          { smellType: SmellType.LONG_PARAMETER_LIST, line: 6 },
          { smellType: SmellType.LONG_PARAMETER_LIST, line: 7 },
          { smellType: SmellType.LONG_PARAMETER_LIST, line: 8 },
          { smellType: SmellType.LONG_PARAMETER_LIST, line: 9 },
          { smellType: SmellType.LONG_PARAMETER_LIST, line: 10 },
          { smellType: SmellType.LONG_PARAMETER_LIST, line: 11 }
        ]
      }
    }
  })

  await prisma.exercise.create({
    data: {
      title: "Sistema de Configurações",
      description: `Um sistema web de gestão de usuários precisa controlar qual usuário está logado, o tema visual da interface, o idioma das mensagens, o modo de manutenção do sistema e o tempo de expiração da sessão. Para isso, diversas funções foram implementadas para manipular essas configurações.

Um desenvolvedor novato, ao implementar uma nova funcionalidade de notificações, modificou \`timeoutSessao\` sem saber que isso afetava o tempo de expiração da sessão de todos os usuários logados. O rastreamento de onde e quando cada variável global é alterada se tornou uma tarefa quase impossível, resultando em bugs aleatórios de difícil reprodução.`,
      difficulty: Difficulty.MEDIUM,
      code: `let usuarioLogado = null;
let temaAtual = "claro";
let idioma = "pt-BR";
let modoManutencao = false;
let timeoutSessao = 30;

function fazerLogin(usuario) {
  usuarioLogado = usuario;
  console.log("Usuário logado:", usuarioLogado.nome);
}

function fazerLogout() {
  usuarioLogado = null;
  console.log("Usuário deslogado");
}

function alterarTema(tema) {
  temaAtual = tema;
  document.body.className = tema;
}

function alterarIdioma(novoIdioma) {
  idioma = novoIdioma;
  carregarTraducoes();
}

function ativarManutencao() {
  modoManutencao = true;
  console.log("Sistema em manutenção");
}

function verificarStatus() {
  if (modoManutencao) {
    return "Sistema indisponível";
  }
  return "Sistema operacional";
}

function temUsuarioLogado() {
  return usuarioLogado !== null;
}

function obterTema() {
  return temaAtual;
}

function configurarTimeout(segundos) {
  timeoutSessao = segundos;
  iniciarTimerSessao();
}

function getTimeout() {
  return timeoutSessao;
}`,
      smellLines: {
        create: [
          { smellType: SmellType.GLOBAL_DATA, line: 1 },
          { smellType: SmellType.GLOBAL_DATA, line: 2 },
          { smellType: SmellType.GLOBAL_DATA, line: 3 },
          { smellType: SmellType.GLOBAL_DATA, line: 4 },
          { smellType: SmellType.GLOBAL_DATA, line: 5 }
        ]
      }
    }
  })

  await prisma.exercise.create({
    data: {
      title: "Sistema de Processamento de Pedidos",
      description: `Um sistema de e-commerce processa pedidos de clientes em tempo real. Durante o processamento, o objeto do pedido é passado entre diferentes funções que modificam seus campos diretamente: status, valor total, data de processamento, frete e itens disponíveis.

Um desenvolvedor, ao implementar uma nova regra de desconto, modificou o valor total do pedido dentro de uma função de cálculo de frete. Isso causou inconsistências porque outras funções esperavam que o valor total ainda estivesse inalterado em determinadas etapas do processamento. A dificuldade em rastrear onde e quando cada campo foi modificado tornou o código imprevisível e cheio de efeitos colaterais.`,
      difficulty: Difficulty.MEDIUM,
      code: `function processarPedido(pedido) {
  pedido.status = "processando";
  pedido.dataProcessamento = new Date();
  
  calcularFrete(pedido);
  aplicarDesconto(pedido);
  calcularImposto(pedido);
  
  if (pedido.valorTotal > 500) {
    pedido.status = "aprovado";
  } else {
    pedido.status = "pendente";
  }
  
  return pedido;
}

function calcularFrete(pedido) {
  if (pedido.uf === "SP") {
    pedido.frete = 10;
  } else if (pedido.uf === "RJ") {
    pedido.frete = 15;
  } else {
    pedido.frete = 25;
  }
  pedido.valorTotal = pedido.subtotal + pedido.frete;
}

function aplicarDesconto(pedido) {
  if (pedido.cupom === "DESCONTO10") {
    pedido.valorTotal = pedido.valorTotal * 0.9;
  }
  pedido.descontoAplicado = true;
}

function calcularImposto(pedido) {
  pedido.imposto = pedido.valorTotal * 0.1;
  pedido.valorTotal = pedido.valorTotal + pedido.imposto;
  pedido.impostoCalculado = true;
}`,
      smellLines: {
        create: [
          { smellType: SmellType.MUTABLE_DATA, line: 2 },
          { smellType: SmellType.MUTABLE_DATA, line: 3 },
          { smellType: SmellType.MUTABLE_DATA, line: 10 },
          { smellType: SmellType.MUTABLE_DATA, line: 12 },
          { smellType: SmellType.MUTABLE_DATA, line: 20 },
          { smellType: SmellType.MUTABLE_DATA, line: 22 },
          { smellType: SmellType.MUTABLE_DATA, line: 24 },
          { smellType: SmellType.MUTABLE_DATA, line: 26 },
          { smellType: SmellType.MUTABLE_DATA, line: 31 },
          { smellType: SmellType.MUTABLE_DATA, line: 33 },
          { smellType: SmellType.MUTABLE_DATA, line: 37 },
          { smellType: SmellType.MUTABLE_DATA, line: 38 },
          { smellType: SmellType.MUTABLE_DATA, line: 39 }

        ]
      }
    }
  })

  await prisma.exercise.create({
    data: {
      title: "Processador de Pagamentos",
      description: `Um sistema de pagamentos precisa processar transações usando diferentes provedores (PayPal, Stripe, MercadoPago). A classe \`ProcessadorPagamento\` contém toda a lógica de cálculo de taxas, validação de cartão, registro de transação e envio de notificações.

Quando a equipe precisa alterar a taxa de juros para parcelamento, ela modifica a mesma classe. Quando precisa mudar a validação de cartão, também altera a mesma classe. Quando precisa atualizar o formato do log de transações, novamente a mesma classe é modificada. Mudanças por razões completamente diferentes sempre caem no mesmo lugar.`,
      difficulty: Difficulty.HARD,
      code: `class ProcessadorPagamento {
  processar(transacao, cliente, provedor) {
    let valor = transacao.valor;
    let parcelas = transacao.parcelas;
    let tipoCartao = transacao.cartao.tipo;
    
    // Validação do cartão
    if (tipoCartao === "credito") {
      if (transacao.cartao.validade < new Date()) {
        throw new Error("Cartão expirado");
      }
      if (!validarCVV(transacao.cartao.cvv)) {
        throw new Error("CVV inválido");
      }
    }
    
    // Cálculo de taxa por provedor
    if (provedor === "PayPal") {
      valor = valor + valor * 0.05;
    } else if (provedor === "Stripe") {
      valor = valor + 3.99;
    } else if (provedor === "MercadoPago") {
      if (parcelas > 1) {
        valor = valor + valor * 0.08;
      }
    }
    
    // Cálculo de parcelamento
    if (parcelas > 1) {
      let juros = 0;
      if (parcelas <= 3) {
        juros = 0.02;
      } else if (parcelas <= 6) {
        juros = 0.04;
      } else {
        juros = 0.06;
      }
      valor = valor + valor * juros;
    }
    
    // Verificação de limite do cliente
    if (cliente.limite < valor) {
      throw new Error("Limite insuficiente");
    }
    
    // Registro da transação
    console.log("Transação processada:", {
      id: transacao.id,
      valor: valor,
      cliente: cliente.nome
    });
    
    // Envio de notificação
    if (cliente.email) {
      enviarEmail(cliente.email, "Pagamento aprovado");
    }
    if (cliente.telefone) {
      enviarSMS(cliente.telefone, "Pagamento aprovado");
    }
    
    return valor;
  }
  
  validarCVV(cvv) {
    return cvv && cvv.length === 3;
  }
}`,
      smellLines: {
        create: [
          { smellType: SmellType.DIVERGENT_CHANGE, line: 1 },
          { smellType: SmellType.LONG_METHOD, line: 2 },
          { smellType: SmellType.FEATURE_ENVY, line: 3 },
          { smellType: SmellType.FEATURE_ENVY, line: 4 },
          { smellType: SmellType.FEATURE_ENVY, line: 5 }
        ]
      }
    }
  })


  await prisma.exercise.create({
    data: {
      title: "Sistema de Cálculo de Benefícios",
      description: `Em um sistema de RH, a equipe precisa calcular diferentes benefícios para os funcionários, como o bonus, vale-refeição, plano de saude e horas extras. Cada benefício tem valores diferentes que dependem do cargo do funcionário (estagiário, analista, coordenador ou gerente). Para implementar isso, foram criadas as funções \`calcularBonus()\`, \`calcularValeRefeicao()\`, \`calcularPlanoSaude()\` e \`calcularHorasExtras()\`.

Quando um novo cargo é adicionado ao sistema (ex: "diretor"), a equipe precisa modificar todas essas quatro funções para incluir as novas regras. O processo é repetitivo e propenso a erros, já que é comum esquecer de atualizar uma das funções, resultando em cálculos inconsistentes.`,
      difficulty: Difficulty.MEDIUM,
      code: `function calcularBonus(funcionario) {
  let bonus = 0;
  switch (funcionario.cargo) {
    case "estagiario":
      bonus = 500;
      break;
    case "analista":
      bonus = 1000;
      break;
    case "coordenador":
      bonus = 2000;
      break;
    case "gerente":
      bonus = 5000;
      break;
    default:
      bonus = 0;
  }
  return bonus;
}

function calcularValeRefeicao(funcionario) {
  let vale = 0;
  switch (funcionario.cargo) {
    case "estagiario":
      vale = 15;
      break;
    case "analista":
      vale = 25;
      break;
    case "coordenador":
      vale = 35;
      break;
    case "gerente":
      vale = 45;
      break;
    default:
      vale = 0;
  }
  return vale;
}

function calcularPlanoSaude(funcionario) {
  let plano = 0;
  switch (funcionario.cargo) {
    case "estagiario":
      plano = 150;
      break;
    case "analista":
      plano = 300;
      break;
    case "coordenador":
      plano = 500;
      break;
    case "gerente":
      plano = 800;
      break;
    default:
      plano = 0;
  }
  return plano;
}

function calcularHorasExtras(funcionario) {
  let horaExtra = 0;
  switch (funcionario.cargo) {
    case "estagiario":
      horaExtra = 20;
      break;
    case "analista":
      horaExtra = 35;
      break;
    case "coordenador":
      horaExtra = 50;
      break;
    case "gerente":
      horaExtra = 0;
      break;
    default:
      horaExtra = 0;
  }
  return horaExtra;
}`,
      smellLines: {
        create: [
          { smellType: SmellType.REPEATED_SWITCHES, line: 3 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 4 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 5 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 6 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 7 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 8 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 9 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 10 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 11 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 12 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 13 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 14 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 15 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 16 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 17 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 18 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 24 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 25 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 26 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 27 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 28 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 29 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 30 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 31 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 32 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 33 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 34 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 35 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 36 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 37 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 38 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 39 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 45 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 46 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 47 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 48 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 49 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 50 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 51 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 52 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 53 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 54 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 55 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 56 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 57 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 58 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 59 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 60 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 66 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 67 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 68 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 69 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 70 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 71 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 72 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 73 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 74 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 75 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 76 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 77 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 78 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 79 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 80 },
          { smellType: SmellType.REPEATED_SWITCHES, line: 81 }
        ]
      }
    }
  })

  await prisma.exercise.create({
    data: {
      title: "Sistema de Autenticação",
      description: `Um sistema de autenticação possui uma classe \`ValidadorDeEmail\` que contém apenas um método simples para verificar se um email contém "@" e ".". A classe \`FormatadorDeData\` possui um único método que apenas chama \`toLocaleDateString()\` do JavaScript. A classe \`CalculadoraDeDesconto\` tem um método que simplesmente multiplica o valor por 0.9.

Essas classes foram criadas durante uma fase inicial do projeto com a intenção de que cresceriam, mas nunca receberam funcionalidades adicionais. Atualmente, elas adicionam complexidade desnecessária ao código, exigindo que os desenvolvedores criem instâncias ou naveguem por arquivos extras para entender uma lógica trivial.`,
      difficulty: Difficulty.EASY,
      code: `class ValidadorDeEmail {
  validar(email) {
    return email.includes("@") && email.includes(".");
  }
}

class FormatadorDeData {
  formatar(data) {
    return data.toLocaleDateString();
  }
}

class CalculadoraDeDesconto {
  aplicar(preco) {
    return preco * 0.9;
  }
}

function processarPedido(pedido) {
  const validador = new ValidadorDeEmail();
  const formatador = new FormatadorDeData();
  const calculadora = new CalculadoraDeDesconto();
  
  if (!validador.validar(pedido.email)) {
    return "Email inválido";
  }
  
  const dataFormatada = formatador.formatar(new Date());
  const precoComDesconto = calculadora.aplicar(pedido.preco);
  
  return { ...pedido, precoComDesconto, dataFormatada };
}`,
      smellLines: {
        create: [
          { smellType: SmellType.LAZY_ELEMENT, line: 1 },
          { smellType: SmellType.LAZY_ELEMENT, line: 7 },
          { smellType: SmellType.LAZY_ELEMENT, line: 13 }
        ]
      }
    }
  })

  await prisma.exercise.create({
    data: {
      title: "Sistema de Cálculo Tributário",
      description: `Um sistema financeiro precisa calcular impostos sobre vendas. A função \`calcularImposto()\` foi criada com vários parâmetros pensando em diferentes cenários futuros: tipo de imposto (ICMS, ISS, IPI), regime tributário (Simples, Lucro Presumido), alíquota especial e flag para considerar imposto de renda.

No entanto, em três anos de operação, nunca foi necessário considerar os outros parâmetros. Por isso, o sistema ainda usa a taxa fixa de 10% para o cálculo de todos os impostos.`,
      difficulty: Difficulty.EASY,
      code: `function calcularImposto(
  valor, 
  tipoImposto, 
  regime, 
  aliquotaEspecial, 
  considerarIR
) {
  return valor * 0.1;
}

function processarVenda(produto, quantidade) {
  const subtotal = produto.preco * quantidade;
  const imposto = calcularImposto(subtotal, "ICMS", "Simples", null, false);
  return subtotal + imposto;
}`,
      smellLines: {
        create: [
          { smellType: SmellType.SPECULATIVE_GENERALITY, line: 3 },
          { smellType: SmellType.SPECULATIVE_GENERALITY, line: 4 },
          { smellType: SmellType.SPECULATIVE_GENERALITY, line: 5 },
          { smellType: SmellType.SPECULATIVE_GENERALITY, line: 6 }
        ]
      }
    }
  })

  await prisma.exercise.create({
    data: {
      title: "Sistema de Sons de Animais",
      description: `Um sistema foi desenvolvido para gerenciar sons de animais em um aplicativo educativo. Uma classe base \`Animal\` foi criada com um método abstrato \`falar()\`, antecipando que vários animais seriam implementados no futuro.

No entanto, após o lançamento, o cliente desistiu de adicionar mais animais e focar o aplicativo apenas em cachorros. A classe \`Animal\` e o método abstrato \`falar()\` nunca foram utilizados para outros tipos de animais, tornando-se código morto que só adiciona complexidade sem benefício real.`,
      difficulty: Difficulty.EASY,
      code: `class Animal {
  constructor(nome) {
    this.nome = nome;
  }
  
  falar() {
    throw new Error("Método deve ser implementado");
  }
}

class Cachorro extends Animal {
  falar() {
    return "Au au";
  }
}`,
      smellLines: {
        create: [
          { smellType: SmellType.SPECULATIVE_GENERALITY, line: 1 },
          { smellType: SmellType.SPECULATIVE_GENERALITY, line: 2 },
          { smellType: SmellType.SPECULATIVE_GENERALITY, line: 3 },
          { smellType: SmellType.SPECULATIVE_GENERALITY, line: 4 },
          { smellType: SmellType.SPECULATIVE_GENERALITY, line: 5 },
          { smellType: SmellType.SPECULATIVE_GENERALITY, line: 6 },
          { smellType: SmellType.SPECULATIVE_GENERALITY, line: 7 },
          { smellType: SmellType.SPECULATIVE_GENERALITY, line: 8 },
          { smellType: SmellType.SPECULATIVE_GENERALITY, line: 9 }
        ]
      }
    }
  })

  await prisma.exercise.create({
    data: {
      title: "Sistema de Cálculo de Frete",
      description: `Um sistema de e-commerce calcula o frete com base em diferentes modalidades. A classe \`CalculadoraFrete\` possui campos que são utilizados dependendo do tipo de frete, para cada modalidade é levado em consideração um subconjunto desses campos: \`valorBase\`, \`percentualDesconto\`, \`parcela\`, \`aliquotaEspecial\`, \`pesoExtra\` e \`taxaUrgencia\`.`,
      difficulty: Difficulty.MEDIUM,
      code: `class CalculadoraFrete {
  constructor() {
    this.valorBase = 0;
    this.percentualDesconto = 0;
    this.parcela = 0;
    this.aliquotaEspecial = 0;
    this.pesoExtra = 0;
    this.taxaUrgencia = 0;
  }
  
  calcularComDesconto(valor, desconto) {
    this.valorBase = valor;
    this.percentualDesconto = desconto;
    this.parcela = 1;
    
    return valor * (1 - desconto / 100);
  }
  
  calcularParcelado(valor, parcelas) {
    this.valorBase = valor;
    this.parcela = parcelas;
    
    return valor / parcelas;
  }
  
  calcularFreteUrgente(peso, distancia) {
    this.pesoExtra = peso;
    this.taxaUrgencia = 2.5;
    
    return (peso * distancia * 0.5) * this.taxaUrgencia;
  }
  
  calcularComAliquotaEspecial(valor, aliquota) {
    this.aliquotaEspecial = aliquota;
    
    return valor * (1 + aliquota / 100);
  }
}`,
      smellLines: {
        create: [
          { smellType: SmellType.TEMPORARY_FIELD, line: 3 },
          { smellType: SmellType.TEMPORARY_FIELD, line: 4 },
          { smellType: SmellType.TEMPORARY_FIELD, line: 5 },
          { smellType: SmellType.TEMPORARY_FIELD, line: 6 },
          { smellType: SmellType.TEMPORARY_FIELD, line: 7 },
          { smellType: SmellType.TEMPORARY_FIELD, line: 8 }
        ]
      }
    }
  })

  await prisma.exercise.create({
    data: {
      title: "Sistema de Notificações para Pedidos",
      description: `Um sistema de e-commerce precisa enviar notificações para clientes quando os pedidos são enviados. A função \`enviarNotificacao()\` recebe um pedido como argumento e notifica o cliente sobre o status do pedido. Para isso, ela acessa os campos do cliente, como nome, email e telefone, para enviar as notificações por email e SMS.`,
      difficulty: Difficulty.MEDIUM,
      code: `class Endereco {
  constructor(cidade, estado, cep) {
    this.cidade = cidade;
    this.estado = estado;
    this.cep = cep;
  }
}

class Contato {
  constructor(email, telefone) {
    this.email = email;
    this.telefone = telefone;
  }
}

class Cliente {
  constructor(nome, endereco, contato) {
    this.nome = nome;
    this.endereco = endereco;
    this.contato = contato;
  }
}

class Pedido {
  constructor(cliente, itens, valor) {
    this.cliente = cliente;
    this.itens = itens;
    this.valor = valor;
  }
}

function enviarNotificacao(pedido) {
  const nomeCliente = pedido.cliente.nome;
  const emailCliente = pedido.cliente.contato.email;
  const telefoneCliente = pedido.cliente.contato.telefone;

  enviarEmail(emailCliente, "Olá, " + nomeCliente + "! Seu pedido foi enviado!");
  enviarSMS(telefoneCliente, "Olá, " + nomeCliente + "! Seu pedido foi enviado!");
}`,
      smellLines: {
        create: [
          { smellType: SmellType.MESSAGE_CHAINS, line: 33 },
          { smellType: SmellType.MESSAGE_CHAINS, line: 34 },
          { smellType: SmellType.MESSAGE_CHAINS, line: 35 }
        ]
      }
    }
  })

  console.log("🌱 Seed executado com sucesso!")
  console.log(`📚 ${await prisma.exercise.count()} exercícios criados`)
  console.log(`📍 ${await prisma.smellLine.count()} smell lines criadas`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })