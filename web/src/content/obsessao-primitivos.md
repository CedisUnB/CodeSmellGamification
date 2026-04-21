---
title: "Obsessão por Primitivos"
description: "Uso excessivo de tipos primitivos para representar conceitos do domínio"
category: "object-orientation-abusers"
icon: "🔢"
---

## O que é?

Obsessão por primitivos ocorre quando o código utiliza tipos primitivos (strings, números, booleanos) para representar conceitos do domínio que seriam melhor expressos como objetos. Isso leva a código frágil, repetitivo e difícil de entender.

## Como identificar

Você pode identificar obsessão por primitivos observando a presença de validações repetidas para o mesmo tipo de dado, formatações espalhadas pelo código, ou grupos de variáveis primitivas que representam um conceito único (como telefone com DDD e número separados).

Esse mau cheiro é causado principalmente pela relutância em criar classes pequenas e pela praticidade inicial de usar tipos simples.

## Exemplo Ruim

```javascript
// Representação de telefone como string e número separados
let ddd = "11";
let numero = "999999999";

function validarTelefone(ddd, numero) {
  if (ddd.length !== 2) return false;
  if (numero.length !== 9) return false;
  return true;
}

function formatarTelefone(ddd, numero) {
  return `(${ddd}) ${numero.slice(0,5)}-${numero.slice(5)}`;
}

// Representação de dinheiro como número
let preco = 19.90;
let desconto = 10;
let precoFinal = preco - (preco * desconto / 100);

// Validação espalhada
if (preco < 0) {
  console.log("Preço inválido");
}
```

## Como Refatorar

```javascript
class Telefone {
  constructor(ddd, numero) {
    this.ddd = ddd;
    this.numero = numero;
  }
  
  validar() {
    return this.ddd.length === 2 && this.numero.length === 9;
  }
  
  formatar() {
    return `(${this.ddd}) ${this.numero.slice(0,5)}-${this.numero.slice(5)}`;
  }
}

class Dinheiro {
  constructor(valor, moeda = "BRL") {
    this.valor = valor;
    this.moeda = moeda;
  }
  
  aplicarDesconto(percentual) {
    const novoValor = this.valor - (this.valor * percentual / 100);
    return new Dinheiro(novoValor, this.moeda);
  }
  
  ehValido() {
    return this.valor >= 0;
  }
  
  formatar() {
    return `${this.moeda} ${this.valor.toFixed(2)}`;
  }
}

const telefone = new Telefone("11", "999999999");
if (telefone.validar()) {
  console.log(telefone.formatar());
}

const preco = new Dinheiro(19.90);
const precoFinal = preco.aplicarDesconto(10);
```

## Técnicas de Refatoração

As seguintes técnicas são indicadas para refatorar obsessão por primitivos:

- **Replace Primitive with Object**: Substitua o tipo primitivo por uma classe que encapsule o comportamento relacionado.
- **Introduce Parameter Object**: Agrupe parâmetros primitivos relacionados em um objeto.
- **Replace Type Code with Class**: Substitua códigos de tipo (números ou strings representando tipos) por classes.

## Benefícios

Após a refatoração os benefícios são:

- Comportamento relacionado aos dados fica centralizado na classe
- Elimina validações e formatações repetidas pelo código
- Código mais expressivo e auto-documentado
- Facilita a evolução e manutenção do domínio

## Referências

FOWLER, Martin; BECK, Kent. **Refatoração: Aperfeiçoando o Design de Códigos Existentes**. 2. ed. São Paulo: Novatec, 2018.
