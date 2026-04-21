---
title: "Mudança Divergente"
description: "Um módulo que é frequentemente alterado por diferentes razões"
category: "change-preventers"
icon: "🎭"
---

## O que é?

Mudança divergente ocorre quando um mesmo módulo é frequentemente alterado por diferentes razões. Isso indica que contextos separados estão misturados e deveriam ser movidos para módulos distintos.

## Como identificar

Você pode identificar mudança divergente observando que uma mesma classe ou módulo precisa ser modificado para diferentes tipos de mudança no sistema. Por exemplo, alterar a lógica de cálculo de frete, modificar a regra de desconto e atualizar a formatação de relatório todas exigem mudanças na mesma classe.

Esse mau cheiro é causado principalmente pela falta de separação de responsabilidades e por classes que assumem múltiplos papéis.

## Exemplo Ruim

```javascript
class ProcessadorDePedido {
  calcularTotal(pedido) {
    let total = 0;
    for (const item of pedido.itens) {
      total += item.preco * item.quantidade;
    }
    
    if (pedido.cupom === "DESCONTO10") {
      total = total * 0.9;
    } else if (pedido.cupom === "DESCONTO20") {
      total = total * 0.8;
    }
    
    return total;
  }
  
  calcularFrete(pedido) {
    if (pedido.estado === "SP") return 10;
    if (pedido.estado === "RJ") return 15;
    return 25;
  }
  
  gerarNotaFiscal(pedido) {
    const data = new Date();
    const numero = Math.random();
    return { numero, data, valor: pedido.total };
  }
  
  formatarResumo(pedido) {
    return `Pedido ${pedido.id}: 
      ${pedido.itens.length} itens, total R$ ${pedido.total}`;
  }
}
```

## Como Refatorar

```javascript
class CalculadoraDePedido {
  calcularTotal(itens, cupom) {
    let total = 0;
    for (const item of itens) {
      total += item.preco * item.quantidade;
    }
    
    if (cupom === "DESCONTO10") return total * 0.9;
    if (cupom === "DESCONTO20") return total * 0.8;
    return total;
  }
  
  calcularFrete(estado) {
    const fretes = { SP: 10, RJ: 15 };
    return fretes[estado] || 25;
  }
}

class GeradorDeNotaFiscal {
  gerar(pedido) {
    return {
      numero: Math.random(),
      data: new Date(),
      valor: pedido.total
    };
  }
}

class FormatadorDePedido {
  formatarResumo(pedido) {
    return `Pedido ${pedido.id}: 
      ${pedido.itens.length} itens, total R$ ${pedido.total}`;
  }
}
```

## Técnicas de Refatoração

As seguintes técnicas são indicadas para refatorar mudança divergente:

- **Split Phase**: Divida um método que faz diferentes coisas em fases separadas.
- **Move Function**: Mova funções para as classes que devem ser responsáveis por elas.
- **Extract Class**: Extraia grupos de responsabilidades relacionadas para novas classes.

## Benefícios

Após a refatoração os benefícios são:

- Cada classe tem uma responsabilidade única e bem definida
- Mudanças ficam isoladas em classes específicas
- Facilidade para localizar onde alterar o código
- Redução do risco de introduzir bugs ao modificar uma funcionalidade

## Referências

FOWLER, Martin; BECK, Kent. **Refatoração: Aperfeiçoando o Design de Códigos Existentes**. 2. ed. São Paulo: Novatec, 2018.
