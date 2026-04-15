---
title: "Obsessão por Primitivos"
description: "Uso excessivo de tipos primitivos para representar conceitos do domínio"
category: "object-orientation-abusers"
icon: "🔢"
---

## O que é?

Programadores frequentemente relutam em criar seus próprios tipos fundamentais para o domínio. Representar conceitos como dinheiro, telefone ou intervalos como tipos primitivos leva a código frágil e difícil de manter.

## Como identificar

- Strings representando conceitos complexos
- Validação de dados espalhada pelo código
- Formatação repetida do mesmo tipo de dado
- Código duplicado para tratar primitivos

## Exemplo Ruim

```javascript
// Telefone como string
let phoneNumber = "11999999999";

function validatePhone(phone) {
    return phone.length === 11 && /^\d+$/.test(phone);
}

function formatPhone(phone) {
    return `(${phone.slice(0,2)}) ${phone.slice(2,7)}-${phone.slice(7)}`;
}

// Dinheiro como número
let price = 19.90;
let discount = 0.1;
let finalPrice = price * (1 - discount);
```

## Como Refatorar

```javascript
class PhoneNumber {
    constructor(value) {
        if (!this.isValid(value)) {
            throw new Error('Telefone inválido');
        }
        this.value = value;
    }
    
    isValid(phone) {
        return phone.length === 11 && /^\d+$/.test(phone);
    }
    
    format() {
        return `(${this.value.slice(0,2)}) ${this.value.slice(2,7)}-${this.value.slice(7)}`;
    }
}

class Money {
    constructor(value, currency = 'BRL') {
        this.value = value;
        this.currency = currency;
    }
    
    applyDiscount(discount) {
        return new Money(this.value * (1 - discount.value), this.currency);
    }
}
```

## Técnicas de Refatoração

- **Replace Primitive with Object** - Substituir primitivo por objeto

## Benefícios

- Validação centralizada
- Comportamento junto com dados
- Código mais expressivo
- Evita duplicação