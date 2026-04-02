---
title: "Função Longa"
description: "Funções que crescem excessivamente e fazem muitas coisas"
category: "bloaters"
icon: "📏"
---

## O que é?

Programas com funções curtas tendem a ser mais sustentáveis. Funções longas são difíceis de entender, testar e manter. Elas geralmente fazem muitas coisas diferentes.

## Como identificar

- Funções com mais de 20-30 linhas
- Muitos níveis de indentação
- Várias responsabilidades na mesma função
- Comentários explicando blocos de código

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
}
```

## Como Refatorar

```javascript
function processOrder(order) {
    validateOrder(order);
    const shipping = calculateShipping(order.region);
    const subtotal = calculateSubtotal(order.items);
    const total = applyDiscount(subtotal);
    
    generateInvoice(order, total);
    sendConfirmationEmail(order.customer);
    updateInventory(order.items);
}
```

## Técnicas de Refatoração

- **Extract Function** - Extrair partes da função
- **Replace Temp with Query** - Substituir temporárias
- **Introduce Parameter Object** - Agrupar parâmetros

## Dica do DevDog 🐕

> "Sempre que sentir necessidade de comentar algo, escreva uma função no lugar!"