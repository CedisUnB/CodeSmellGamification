---
title: "Método Longo"
description: "Funções ou métodos que cresceram excessivamente"
category: "bloaters"
icon: "📏"
---

## O que é?

Métodos longos são funções que fazem muitas coisas diferentes, ultrapassando 20-30 linhas de código.

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

    // Gerar nota fiscal...
    // Enviar email...
    // Atualizar estoque...
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

## Benefícios

- Funções mais simples
- Muito mais testabilidade
- Código mais organizado