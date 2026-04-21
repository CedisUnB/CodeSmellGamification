---
title: "Nome Misterioso"
description: "Nomes de funções, variáveis e classes que não comunicam claramente sua finalidade"
category: "bloaters"
icon: "🥸"
---

## O que é?

Nome misterioso ocorre quando funções, módulos, variáveis ou classes recebem nomes que não comunicam claramente sua finalidade. Um código claro depende de bons nomes que revelem a intenção do que está sendo implementado.

## Como identificar

Você pode identificar nomes misteriosos observando abreviações incompreensíveis, nomes muito genéricos como `a`, `b`, `x`, `dados`, `temp` ou `valor`, ou nomes que não condizem com o que a função realmente faz. Outro sinal é a necessidade de ler a implementação para entender o propósito.

Esse mau cheiro é causado principalmente por pressa na implementação, por falta de refatoração de nomes ao longo do tempo ou por códigos que evoluíram e mudaram de propósito sem ter o nome atualizado.

## Exemplo Ruim

```javascript
function proc(d) {
  let x = 0;
  for (let i = 0; i < d.itens.length; i++) {
    x += d.itens[i].preco * d.itens[i].qtd;
  }
  return x;
}

class GDR {
  constructor() {
    this.usr = null;
    this.pwd = "";
  }
  
  auth(u, p) {
    this.usr = u;
    this.pwd = p;
    return this.usr === "admin" && this.pwd === "123";
  }
}

const temp = 100;
const a = temp * 0.9;
```

## Como Refatorar

```javascript
function calcularTotalPedido(pedido) {
  let total = 0;
  for (let i = 0; i < pedido.itens.length; i++) {
    total += pedido.itens[i].preco * pedido.itens[i].quantidade;
  }
  return total;
}

class GerenciadorDeUsuario {
  constructor() {
    this.usuario = null;
    this.senha = "";
  }
  
  autenticar(usuario, senha) {
    this.usuario = usuario;
    this.senha = senha;
    return this.usuario === "admin" && this.senha === "123";
  }
}

const precoOriginal = 100;
const precoComDesconto = precoOriginal * 0.9;
```

## Técnicas de Refatoração

As seguintes técnicas são indicadas para refatorar nomes misteriosos:

- **Change Function Declaration**: Renomeie a função para um nome que revele sua intenção.
- **Rename Variable**: Dê nomes significativos para as variáveis.
- **Rename Field**: Renomeie os campos da classe para nomes claros.

## Benefícios

Após a refatoração os benefícios são:

- Código auto-documentado e mais fácil de entender
- Reduz a necessidade de comentários explicativos
- Facilita a leitura e manutenção do código por outros desenvolvedores
- Menor chance de erros por interpretação equivocada do propósito

## Referências

FOWLER, Martin; BECK, Kent. **Refatoração: Aperfeiçoando o Design de Códigos Existentes**. 2. ed. São Paulo: Novatec, 2018.
