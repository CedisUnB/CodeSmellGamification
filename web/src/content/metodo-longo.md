---
title: "Método Longo"
description: "Funções ou métodos que crescem excessivamente, perdendo clareza"
category: "bloaters"
icon: "📝"
---

## O que é?

Métodos longos são funções que fazem muitas coisas diferentes, ultrapassando 20-30 linhas de código.

## Exemplo Ruim

```javascript
function processOrder(order) {
  // Validação
  if (!order.items) throw new Error('Sem itens');
  if (!order.customer) throw new Error('Sem cliente');
  
  // Cálculo de frete
  let shipping = 0;
  if (order.region === 'SP') shipping = 10;
  else if (order.region === 'RJ') shipping = 15;
  else shipping = 30;
  
  // Cálculo do total
  let total = 0;
  for (let item of order.items) {
    total += item.price * item.quantity;
  }
  
  // Aplicar desconto
  if (total > 100) total *= 0.9;
  
  // Gerar nota fiscal...
  // Enviar email...
  // Atualizar estoque...
}
```

## Como identificar

- Funções com mais de 20-30 linhas
- Muitos níveis de indentação
- Várias responsabilidades na mesma função