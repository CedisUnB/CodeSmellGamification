---
title: "Lista de Parâmetros Longa"
description: "Métodos ou funções com muitos parâmetros"
category: "bloaters"
icon: "📋"
---

## O que é?

Lista de parâmetros longa ocorre quando um método ou função possui muitos parâmetros, tornando sua chamada confusa e difícil de entender. Quanto mais parâmetros, maior a chance de erros na ordem ou tipo dos valores passados.

## Como identificar

Você pode identificar uma lista de parâmetros longa observando funções que recebem quatro, cinco ou mais parâmetros. Outro sinal é quando vários parâmetros estão relacionados entre si ou quando você precisa consultar a documentação com frequência para lembrar a ordem dos parâmetros.

Esse mau cheiro é causado principalmente pela tentativa de uma função fazer muitas coisas diferentes ou pela falta de agrupamento de dados relacionados.

## Exemplo Ruim

```javascript
function cadastrarCliente(
  nome,
  email,
  telefone,
  endereco,
  cidade,
  estado,
  cep,
  dataNascimento,
  profissao,
  renda,
  indicacao
) {
  console.log(`Cadastrando ${nome}, ${email}`);
  // lógica de cadastro
}

function processarPedido(
  clienteId,
  produtoId,
  quantidade,
  desconto,
  cupom,
  enderecoEntrega,
  formaPagamento,
  parcelas,
  observacao
) {
  console.log(`Processando pedido para cliente ${clienteId}`);
  // lógica do pedido
}
```

## Como Refatorar

```javascript
class Endereco {
  constructor(rua, cidade, estado, cep) {
    this.rua = rua;
    this.cidade = cidade;
    this.estado = estado;
    this.cep = cep;
  }
}

class DadosCadastro {
  constructor(nome, email, telefone, endereco, dataNascimento) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.endereco = endereco;
    this.dataNascimento = dataNascimento;
  }
}

class DadosProfissionais {
  constructor(profissao, renda, indicacao) {
    this.profissao = profissao;
    this.renda = renda;
    this.indicacao = indicacao;
  }
}

function cadastrarCliente(dadosCadastro, dadosProfissionais) {
  console.log(`Cadastrando ${dadosCadastro.nome}, ${dadosCadastro.email}`);
  // lógica de cadastro
}

class Pedido {
  constructor(clienteId, produtoId, quantidade, enderecoEntrega) {
    this.clienteId = clienteId;
    this.produtoId = produtoId;
    this.quantidade = quantidade;
    this.enderecoEntrega = enderecoEntrega;
  }
}

class OpcoesPagamento {
  constructor(formaPagamento, parcelas, desconto, cupom, observacao) {
    this.formaPagamento = formaPagamento;
    this.parcelas = parcelas;
    this.desconto = desconto;
    this.cupom = cupom;
    this.observacao = observacao;
  }
}

function processarPedido(pedido, opcoesPagamento) {
  console.log(`Processando pedido para cliente ${pedido.clienteId}`);
  // lógica do pedido
}
```

## Técnicas de Refatoração

As seguintes técnicas são indicadas para refatorar listas de parâmetros longas:

- **Replace Parameter with Query**: Quando um parâmetro pode ser obtido através de uma consulta dentro do próprio método, substitua-o pela consulta.
- **Preserve Whole Object**: Quando vários parâmetros vêm de um mesmo objeto, passe o objeto inteiro em vez de seus campos individuais.
- **Introduce Parameter Object**: Agrupe parâmetros relacionados em um objeto próprio.
- **Remove Flag Argument**: Remova parâmetros booleanos que alteram o comportamento do método, substituindo por métodos separados.

## Benefícios

Após a refatoração os benefícios são:

- Código mais legível e fácil de entender
- Redução da chance de erros na ordem dos parâmetros
- Facilita a reutilização de objetos de parâmetros
- Métodos com responsabilidades mais claras e focadas

## Referências

FOWLER, Martin; BECK, Kent. **Refatoração: Aperfeiçoando o Design de Códigos Existentes**. 2. ed. São Paulo: Novatec, 2018.
