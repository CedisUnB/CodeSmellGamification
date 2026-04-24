---
title: "Aglomerado de Dados"
description: "Grupos de dados que frequentemente aparecem juntos em vários lugares do código"
category: "bloaters"
icon: "📦"
---

## O que é?

Aglomerado de dados ocorre quando os mesmos grupos de variáveis aparecem repetidamente em diferentes partes do código. Em vez de manter esses dados separados, eles devem ser combinados em uma única classe ou objeto.

## Como identificar

Você pode identificar um aglomerado de dados observando parâmetros de métodos ou campos de classes que sempre aparecem juntos. Um teste simples é remover um dos valores do grupo e verificar se os outros ainda fazem sentido. Se não fizerem, provavelmente você tem um aglomerado.

Esse mau cheiro é causado principalmente por uma estrutura de código mal organizada e *"copypasta programming"* (cópia e colagem de código).

## Exemplo Ruim

```javascript
// O mesmo grupo de dados aparece em várias funções
function calcularFrete(cep, cidade, estado) {
  // cálculo baseado no endereço
}

function validarEndereco(cep, cidade, estado) {
  // validação do endereço
}

function formatarEndereco(cep, cidade, estado) {
  // formatação para exibição
}
```

## Como Refatorar

```javascript
// Agrupe os dados em uma classe
class Endereco {
  constructor(cep, cidade, estado) {
    this.cep = cep;
    this.cidade = cidade;
    this.estado = estado;
  }
}

function calcularFrete(endereco) {
  // cálculo baseado no endereço
}

function validarEndereco(endereco) {
  // validação do endereço
}

function formatarEndereco(endereco) {
  // formatação para exibição
}
```

## Técnicas de Refatoração

As seguintes técnicas são indicadas para refatorar um aglomerado de dados:

- **Extract Class**: Quando os dados repetidos são campos de uma classe, mova-os para sua própria classe.
- **Introduce Parameter Object**: Quando os mesmos dados são passados como parâmetros, agrupe-os em uma classe.

## Benefícios

Apos a refatoração os benefícios são:

- Código mais organizado e fácil de entender
- Operações sobre os dados ficam centralizadas
- Reduz o tamanho do código

## Referências

FOWLER, Martin; BECK, Kent. **Refatoração: Aperfeiçoando o Design de Códigos Existentes**. 2. ed. São Paulo: Novatec, 2018.
