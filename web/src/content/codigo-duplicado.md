---
title: "Código Duplicado"
description: "A mesma estrutura de código aparece em múltiplos lugares"
category: "dispensables"
icon: "🔄"
---

## O que é?

Código duplicado ocorre quando a mesma estrutura de código aparece em diferentes partes do sistema. Essa duplicação exige que o desenvolvedor leia cuidadosamente cada cópia para identificar diferenças e, quando necessário modificar, encontrar todas as ocorrências.

## Como identificar

Você pode identificar código duplicado observando blocos de código idênticos ou muito similares em diferentes partes do sistema. Outro sinal é quando uma mesma lógica precisa ser alterada em vários lugares para implementar uma única mudança.

Esse mau cheiro é causado principalmente pela prática de copiar e colar código e pela falta de abstração adequada.

## Exemplo Ruim

```javascript
function calcularTotalCarrinho(itens) {
  let total = 0;
  for (let i = 0; i < itens.length; i++) {
    total += itens[i].preco * itens[i].quantidade;
  }
  return total;
}

function calcularTotalPedido(itens) {
  let soma = 0;
  for (let i = 0; i < itens.length; i++) {
    soma += itens[i].preco * itens[i].quantidade;
  }
  return soma;
}

function calcularTotalComDesconto(itens) {
  let resultado = 0;
  for (let i = 0; i < itens.length; i++) {
    resultado += itens[i].preco * itens[i].quantidade;
  }
  return resultado * 0.9;
}
```

## Como Refatorar

```javascript
function calcularSubtotal(itens) {
  return itens.reduce((total, item) => 
    total + (item.preco * item.quantidade), 0);
}

function calcularTotalCarrinho(itens) {
  return calcularSubtotal(itens);
}

function calcularTotalPedido(itens) {
  return calcularSubtotal(itens);
}

function calcularTotalComDesconto(itens) {
  return calcularSubtotal(itens) * 0.9;
}
```

## Técnicas de Refatoração

As seguintes técnicas são indicadas para refatorar código duplicado:

- **Extract Function**: Extraia o código duplicado para uma função reutilizável.
- **Pull Up Method**: Quando a duplicação ocorre em classes irmãs, mova o método para a superclasse.

## Benefícios

Após a refatoração os benefícios são:

- Redução do tamanho do código
- Uma única fonte de verdade para cada lógica
- Mudanças precisam ser feitas em apenas um local
- Facilita a manutenção e evolução do sistema

## Referências

FOWLER, Martin; BECK, Kent. **Refatoração: Aperfeiçoando o Design de Códigos Existentes**. 2. ed. São Paulo: Novatec, 2018.
