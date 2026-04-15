---
title: "Código Duplicado"
description: "A mesma estrutura de código aparece em múltiplos lugares"
category: "dispensables"
icon: "🔄"
---

## O que é?

A presença da mesma estrutura de código em múltiplos lugares é um forte indicador de problema. A duplicação exige que o desenvolvedor leia cuidadosamente cada cópia para identificar diferenças e, quando necessário modificar, encontrar todas as ocorrências.

## Como identificar

- Blocos de código idênticos ou muito similares
- Funções que fazem a mesma coisa com pequenas variações
- Lógica repetida em diferentes partes do sistema
- "Copiar e colar" é um sinal claro

## Exemplo Ruim

```javascript
function calculateTotal(items) {
    let total = 0;
    for (let item of items) {
        total += item.price * item.quantity;
    }
    return total;
}

function calculateDiscount(items) {
    let total = 0;
    for (let item of items) {
        total += item.price * item.quantity;
    }
    return total * 0.1;
}
```

## Como Refatorar

```javascript
function calculateSubtotal(items) {
    return items.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0);
}

function calculateTotal(items) {
    return calculateSubtotal(items);
}

function calculateDiscount(items) {
    return calculateSubtotal(items) * 0.1;
}
```

## Técnicas de Refatoração

- **Extract Function** - Extrair código repetido para uma função
- **Pull Up Method** - Subir método para classe pai

## Benefícios

- Uma única fonte de verdade
- Correções afetam todos os lugares
- Código mais enxuto
- Facilita testes