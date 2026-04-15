---
title: "Nome Misterioso"
description: "Nomes de funções, variáveis e classes que não comunicam claramente sua finalidade"
category: "bloaters"
icon: "📛"
---

## O que é?

Um dos aspectos mais importantes para um código claro são os bons nomes. Nomes de funções, módulos, variáveis e classes devem comunicar claramente sua finalidade. Quando um nome é confuso ou não revela sua intenção, temos um mau cheiro.

## Como identificar

- Variáveis chamadas `a`, `b`, `x`, `temp`
- Funções com nomes genéricos como `process()`, `handle()`, `do()`
- Abreviações confusas como `usr`, `pmt`, `calc`
- Nomes que mentem sobre o que realmente fazem

## Exemplo Ruim

```javascript
// Que diabos faz esta função?
function xyz(a, b) {
    let c = a * b;
    return c;
}

// O que significa este nome?
function processData(data) {
    // 50 linhas de código...
}
```

## Como Refatorar

```javascript
// Agora sabemos que calcula a área!
function calculateArea(width, height) {
    let area = width * height;
    return area;
}

// Nome específico revela a intenção
function validateUserCredentials(userData) {
    // 50 linhas de validação...
}
```

## Técnicas de Refatoração

- **Change Function Declaration** - Renomear funções
- **Rename Variable** - Renomear variáveis
- **Rename Field** - Renomear campos de classes

## Benefícios

- Código auto-documentado
- Facilita revisão de código
- Reduz necessidade de comentários
- Novos desenvolvedores entendem mais rápido