---
title: "Cadeia de Mensagens"
description: "Longas sequências de chamadas de métodos que acoplam o cliente à estrutura de navegação"
category: "couplers"
icon: "⛓️"
---

## O que é?

Cadeia de mensagens ocorre quando um cliente precisa navegar por uma longa sequência de chamadas de métodos para obter um valor ou executar uma ação. Cada chamada depende da anterior, criando um forte acoplamento entre o cliente e a estrutura interna dos objetos.

## Como identificar

Você pode identificar uma cadeia de mensagens observando linhas de código que contêm várias chamadas encadeadas, como `objeto.getX().getY().getZ()`. Esse padrão indica que o cliente conhece demais a estrutura interna dos objetos.

Esse mau cheiro é causado principalmente por violações do princípio de encapsulamento e por responsabilidades espalhadas entre várias classes.

## Exemplo Ruim

```javascript
// Longa cadeia de chamadas
const cidadeDoCliente = pedido.cliente.endereco.cidade;
const cepDoCliente = pedido.cliente.endereco.cep;
const nomeDaRua = pedido.cliente.endereco.rua;

function enviarNotificacao(pedido) {
  const email = pedido.cliente.contato.email;
  const telefone = pedido.cliente.contato.telefone;
  const nome = pedido.cliente.nome;
  
  enviarEmail(email, nome);
  enviarSMS(telefone);
}
```

## Como Refatorar

```javascript
// Delegar as chamadas para os objetos intermediários
class Pedido {
  getCidadeDoCliente() {
    return this.cliente.getCidade();
  }
  
  getEmailDoCliente() {
    return this.cliente.getEmail();
  }
  
  getNomeDoCliente() {
    return this.cliente.getNome();
  }
}

class Cliente {
  getCidade() {
    return this.endereco.cidade;
  }
  
  getEmail() {
    return this.contato.email;
  }
}

function enviarNotificacao(pedido) {
  enviarEmail(pedido.getEmailDoCliente(), pedido.getNomeDoCliente());
}
```

## Técnicas de Refatoração

A seguinte técnica é indicada para refatorar uma cadeia de mensagens:

- **Hide Delegate**: Crie métodos nos objetos intermediários para esconder a delegação, permitindo que o cliente chame diretamente o método desejado.

## Benefícios

Após a refatoração os benefícios são:

- Reduz o acoplamento entre o cliente e a estrutura interna dos objetos
- Facilita a manutenção, pois mudanças internas não afetam diretamente o cliente
- Torna o código mais legível e menos repetitivo

## Referências

FOWLER, Martin; BECK, Kent. **Refatoração: Aperfeiçoando o Design de Códigos Existentes**. 2. ed. São Paulo: Novatec, 2018.
