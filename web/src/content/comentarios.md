---
title: "Comentários"
description: "Comentários que tentam explicar código confuso ou mal escrito"
category: "dispensables"
icon: "💬"
---

## O que é?

Comentários não são um mau cheiro por si só, mas frequentemente indicam código que precisa ser refatorado. Quando um comentário é necessário para explicar o que o código faz, geralmente é melhor extrair uma função ou renomeá-la.

## Como identificar

- Comentários explicando o óbvio
- Código "comentado" (desativado)
- Comentários que mentem sobre o código
- Comentários que poderiam ser nomes de funções

## Exemplo Ruim

```javascript
// Incrementa i em 1
i++;

// Verifica se o usuário tem idade suficiente
if (user.age >= 18) {
    // Permite acesso
    grantAccess();
}

// Calcula o total com base nos itens
let total = 0;
for(let i = 0; i < items.length; i++) {
    total += items[i].price;
}
```

## Como Refatorar

```javascript
// O código fala por si mesmo
i++;

if (user.isAdult()) {
    grantAccess();
}

function calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.price, 0);
}
```

## Quando comentários são úteis

```javascript
// WARNING: Esta função contém lógica de negócio crítica
// Não modificar sem aprovação do time comercial
function calculateRoyaltyPayments() {
    // Implementação complexa...
}

// TODO: Implementar cache após validação de performance
// FIXME: Corrigir bug quando lista está vazia
```

## Técnicas de Refatoração

- **Extract Function** - Substituir comentário por função
- **Rename Variable** - Nome claro elimina comentário
- **Remove Dead Code** - Remover código comentado

## Benefícios

- ✅ Código auto-documentado
- ✅ Menos ruído visual
- ✅ Comentários realmente importantes