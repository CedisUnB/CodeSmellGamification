---
title: "Inveja de Funcionalidade"
description: "Uma função que se comunica mais com dados de outra classe do que com a sua"
category: "couplers"
icon: "💚"
---

## O que é?

Quando uma função em um módulo comunica-se mais com elementos de outro módulo do que com os do próprio, ela sofre de "inveja". A função "inveja" os dados de outra classe.

## Como identificar

- Função que acessa muitos getters de outro objeto
- Método que usa mais dados de outra classe
- Chamadas frequentes a métodos de outro objeto

## Exemplo Ruim

```javascript
class Customer {
    getAddress() { return this.address; }
    getPhone() { return this.phone; }
    getEmail() { return this.email; }
}

class Invoice {
    sendNotification(customer) {
        // A função inveja os dados de Customer!
        const address = customer.getAddress();
        const phone = customer.getPhone();
        const email = customer.getEmail();
        
        sendEmail(email);
        sendSMS(phone);
        sendMail(address);
    }
}
```

## Como Refatorar

```javascript
class Customer {
    getAddress() { return this.address; }
    getPhone() { return this.phone; }
    getEmail() { return this.email; }
    
    // Move a função para onde os dados estão
    sendNotification() {
        sendEmail(this.email);
        sendSMS(this.phone);
        sendMail(this.address);
    }
}

class Invoice {
    // Agora apenas usa o serviço
    sendNotification(customer) {
        customer.sendNotification();
    }
}
```

## Técnicas de Refatoração

- **Move Function** - Mover função para a classe correta

## Benefícios

- Dados e comportamento juntos
- Melhor encapsulamento
- Código mais intuitivo