---
title: "Inveja de Funcionalidade"
description: "Uma função que se comunica mais com dados de outra classe do que com a sua"
category: "couplers"
icon: "💚"
---

## O que é?

Inveja de funcionalidade ocorre quando uma função em um módulo se comunica mais com elementos de outro módulo do que com os do próprio módulo. A função parece "invejar" os dados de outra classe, indicando que ela provavelmente deveria estar na classe que mais utiliza.

## Como identificar

Você pode identificar inveja de funcionalidade observando funções que acessam muitos dados de outra classe, chamam repetidamente métodos de um mesmo objeto externo ou que processam dados que pertencem naturalmente a outra classe.

Esse mau cheiro é causado principalmente pela separação inadequada de responsabilidades e por dados que estão distantes do comportamento que opera sobre eles.

## Exemplo Ruim

```javascript
class Cliente {
  constructor(nome, email, telefone, endereco) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.endereco = endereco;
  }
}

class EnviadorDeNotificacao {
  enviarConfirmacao(cliente, pedido) {
    // A função "inveja" os dados de Cliente
    const nome = cliente.nome;
    const email = cliente.email;
    const endereco = cliente.endereco;
    
    console.log(`Enviando confirmação para ${nome} (${email})`);
    console.log(`Produto será enviado para: ${endereco}`);
    
    if (cliente.telefone) {
      console.log(`SMS enviado para ${cliente.telefone}`);
    }
    
    console.log(`Pedido: ${pedido.itens.length} itens`);
  }
}
```

## Como Refatorar

```javascript
class Cliente {
  constructor(nome, email, telefone, endereco) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.endereco = endereco;
  }
  
  // Mova o comportamento para a classe que possui os dados
  receberConfirmacao(pedido) {
    console.log(`Enviando confirmação para ${this.nome} (${this.email})`);
    console.log(`Produto será enviado para: ${this.endereco}`);
    
    if (this.telefone) {
      console.log(`SMS enviado para ${this.telefone}`);
    }
    
    console.log(`Pedido: ${pedido.itens.length} itens`);
  }
}

// Agora apenas usa o serviço
class EnviadorDeNotificacao {
  enviarConfirmacao(cliente, pedido) {
    cliente.receberConfirmacao(pedido);
  }
}
```

## Técnicas de Refatoração

As seguintes técnicas são indicadas para refatorar inveja de funcionalidade:

- **Move Function**: Mova a função para a classe que contém os dados que ela mais utiliza.

## Benefícios

Após a refatoração os benefícios são:

- Dados e comportamento ficam juntos, seguindo o princípio de coesão
- Redução do acoplamento entre classes
- Código mais intuitivo e fácil de entender
- Facilita a manutenção, pois mudanças ficam localizadas

## Referências

FOWLER, Martin; BECK, Kent. **Refatoração: Aperfeiçoando o Design de Códigos Existentes**. 2. ed. São Paulo: Novatec, 2018.
