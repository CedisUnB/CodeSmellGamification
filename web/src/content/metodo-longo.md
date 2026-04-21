---
title: "Método Longo"
description: "Funções ou métodos que cresceram excessivamente"
category: "bloaters"
icon: "📏"
---

## O que é?

Método longo ocorre quando uma função ou método cresce excessivamente, acumulando muitas responsabilidades e perdendo clareza. Programas com funções curtas tendem a ser mais sustentáveis, pois cada função tem uma responsabilidade bem definida.

## Como identificar

Você pode identificar um método longo observando funções com muitas linhas de código, muitos níveis de indentação, ou que realizam várias operações distintas. Um bom indicador é a necessidade de comentários para explicar blocos de código.

Esse mau cheiro é causado principalmente pelo acúmulo gradual de funcionalidades ao longo do tempo e pela dificuldade de identificar onde dividir o código.

## Exemplo Ruim

```javascript
function processarPedido(pedido) {
  // Calcula o preço total do pedido
  let total = 0;
  for (let i = 0; i < pedido.itens.length; i++) {
    total += pedido.itens[i].preco * pedido.itens[i].quantidade;
  }

  // ==================================================
  // Aplica o desconto do cupom, se houver
  if (pedido.cupom) {
    if (pedido.cupom.tipo === "porcentagem") {
      total -= total * (pedido.cupom.valor / 100);
    } else if (pedido.cupom.tipo === "fixo") {
      total -= pedido.cupom.valor;
    }
  }
  
  // ==================================================
  // Calcula o frete
  let frete = 0;
  if (pedido.endereco.estado === "SP") {
    frete = 10;
  } else if (pedido.endereco.estado === "RJ") {
    frete = 15;
  } else {
    frete = 25;
  }
  
  // ==================================================
  // Calcula o imposto
  let imposto = total * 0.1;
  let valorFinal = total + frete + imposto;
  
  
  return valorFinal;
}
```

## Como Refatorar

```javascript
function calcularTotalItens(itens) {
  return itens.reduce((total, item) => 
    total + (item.preco * item.quantidade), 0);
}

function aplicarDesconto(total, cupom) {
  if (!cupom) return total;
  
  if (cupom.tipo === "porcentagem") {
    return total - (total * (cupom.valor / 100));
  }
  if (cupom.tipo === "fixo") {
    return total - cupom.valor;
  }
  return total;
}

function calcularFrete(estado) {
  const fretes = { SP: 10, RJ: 15 };
  return fretes[estado] || 25;
}

function processarPedido(pedido) {
  let total = calcularTotalItens(pedido.itens);
  total = aplicarDesconto(total, pedido.cupom);
  
  const frete = calcularFrete(pedido.endereco.estado);
  const imposto = total * 0.1;
  const valorFinal = total + frete + imposto;
  
  return valorFinal;
}
```

## Técnicas de Refatoração

As seguintes técnicas são indicadas para refatorar métodos longos:

- **Extract Function**: Extraia trechos de código para funções separadas com nomes claros sobre sua responsabilidade.
- **Replace Temp with Query**: Substitua variáveis temporárias por consultas quando elas são usadas apenas uma vez.
- **Introduce Parameter Object**: Agrupe parâmetros relacionados em um objeto.

## Benefícios

Após a refatoração os benefícios são:

- Código mais legível e autoexplicativo
- Facilidade para entender e modificar o comportamento
- Reutilização de funções extraídas em outros contextos
- Testes mais simples e focados em cada pequena função

## Referências

FOWLER, Martin; BECK, Kent. **Refatoração: Aperfeiçoando o Design de Códigos Existentes**. 2. ed. São Paulo: Novatec, 2018.
