---
title: "Elemento Preguiçoso"
description: "Elementos do programa que não justificam sua existência por fazerem muito pouco"
category: "dispensables"
icon: "😴"
---

## O que é?

Elemento preguiçoso ocorre quando uma função, classe ou outro elemento do programa existe mas não faz o suficiente para justificar sua própria existência. Esses elementos adicionam complexidade desnecessária ao código sem trazer benefícios proporcionais.

## Como identificar

Você pode identificar um elemento preguiçoso observando funções muito curtas que são chamadas em apenas um lugar, classes que têm poucos métodos ou que delegam todo o trabalho para outra classe, ou hierarquias de herança onde classes filhas não adicionam comportamento novo.

Esse mau cheiro é causado principalmente por planejamento excessivo antecipado, por refatorações incompletas ou por elementos que perderam sua utilidade ao longo do tempo.

## Exemplo Ruim

```javascript
// ValidadorDeEmail.js
class ValidadorDeEmail {
  validar(email) {
    return email.includes("@") && email.includes(".");
  }
}

// FormatadorDeData.js
class FormatadorDeData {
  formatar(data) {
    return data.toLocaleDateString();
  }
}

// CalculadoraDeDesconto.js
class CalculadoraDeDesconto {
  calcular(preco) {
    return preco * 0.9;
  }
}

// main.js
function processarPedido(pedido) {
  const validador = new ValidadorDeEmail();
  const formatador = new FormatadorDeData();
  const calculadora = new CalculadoraDeDesconto();
  
  if (!validador.validar(pedido.email)) {
    return "Email inválido";
  }
  
  const dataFormatada = formatador.formatar(new Date());
  const precoComDesconto = calculadora.calcular(pedido.preco);
  
  return { ...pedido, precoComDesconto, dataFormatada };
}
```

## Como Refatorar

```javascript
// Substitua as classes por funções simples
function validarEmail(email) {
  return email.includes("@") && email.includes(".");
}

function formatarData(data) {
  return data.toLocaleDateString();
}

function calcularDesconto(preco) {
  return preco * 0.9;
}

function processarPedido(pedido) {
  if (!validarEmail(pedido.email)) {
    return "Email inválido";
  }
  
  const dataFormatada = formatarData(new Date());
  const precoComDesconto = calcularDesconto(pedido.preco);
  
  return { ...pedido, precoComDesconto, dataFormatada };
}
```

## Técnicas de Refatoração

As seguintes técnicas são indicadas para refatorar elementos preguiçosos:

- **Inline Function**: Quando uma função é muito simples e chamada em poucos lugares, incorpore seu corpo diretamente no código chamador.
- **Inline Class**: Quando uma classe não faz o suficiente para justificar sua existência, mova suas características para outra classe e a remova.

## Benefícios

Após a refatoração os benefícios são:

- Redução da complexidade desnecessária
- Código mais direto e fácil de navegar
- Menos arquivos e elementos para gerenciar
- Facilita a compreensão do fluxo do programa

## Referências

FOWLER, Martin; BECK, Kent. **Refatoração: Aperfeiçoando o Design de Códigos Existentes**. 2. ed. São Paulo: Novatec, 2018.
