---
title: "Comentários"
description: "Comentários que tentam explicar código confuso ou mal escrito"
category: "dispensables"
icon: "💬"
---

## O que é?

Comentários não são um mau cheiro por si só, mas frequentemente indicam código que precisa ser refatorado. Quando um comentário é necessário para explicar o que o código faz, geralmente é melhor extrair uma função ou renomear a variável.

## Como identificar

Você pode identificar esse mau cheiro observando comentários que explicam o funcionamento de um trecho de código, que descrevem o que uma variável armazena ou que estão desatualizados em relação ao código. Comentários do tipo "TODO" ou "FIXME" também podem indicar código que precisa ser melhorado.

Esse mau cheiro é causado principalmente por código pouco expressivo e por medo de remover trechos que parecem importantes.

## Exemplo Ruim

```javascript
// Verifica se o usuário é maior de idade
if (usuario.idade >= 18) {
  // Libera acesso ao sistema
  liberarAcesso();
}

// Calcula o total baseado nos itens do carrinho
let total = 0;
for (let i = 0; i < carrinho.itens.length; i++) {
  total += carrinho.itens[i].preco * carrinho.itens[i].quantidade;
}
```

## Como Refatorar

```javascript
if (usuario.ehMaiorDeIdade()) {
  liberarAcesso();
}

function calcularTotal(carrinho) {
  return carrinho.itens.reduce((total, item) => 
    total + (item.preco * item.quantidade), 0);
}

const total = calcularTotal(carrinho);
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

As seguintes técnicas são indicadas para refatorar comentários:

- **Extract Function**: Substitua o comentário por uma função com nome claro.
- **Rename Variable**: Dê nomes significativos para variáveis, eliminando a necessidade de comentários explicativos.

## Benefícios

Após a refatoração os benefícios são:

- Código auto-documentado e mais expressivo
- Redução de ruído visual
- Menor risco de comentários desatualizados
- Facilita a leitura e compreensão do código

## Referências

FOWLER, Martin; BECK, Kent. **Refatoração: Aperfeiçoando o Design de Códigos Existentes**. 2. ed. São Paulo: Novatec, 2018.
