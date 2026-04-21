---
title: "Cirurgia de Espingarda"
description: "Uma mudança que exige pequenos ajustes em muitas classes diferentes"
category: "change-preventers"
icon: "🔫"
---

## O que é?

Cirurgia de espingarda ocorre quando uma única modificação no sistema requer pequenas alterações espalhadas por muitas classes diferentes. É o oposto da mudança divergente, onde várias mudanças afetam uma mesma classe.

## Como identificar

Você pode identificar uma cirurgia de espingarda observando que, ao fazer uma alteração específica no sistema (devido a uma regra de negócio que mudou, por exemplo), você precisa modificar diversos arquivos ou classes diferentes. Cada classe recebe uma pequena mudança, mas nenhuma delas concentra a maior parte da alteração.

Esse mau cheiro é causado principalmente pela falta de encapsulamento e por responsabilidades que estão fragmentadas ao invés de estarem concentradas em um único local.

## Exemplo Ruim

```javascript
// Para alterar o valor do desconto aplicado pelo
// cupom é necessário modificar diversas classes
class CalculadoraDePedido {
  calcularTotal(pedido) {
    let total = pedido.valorItens;
    
    if (pedido.cupom === "DESCONTO10") {
      total = total * 0.9; // Regra de desconto
    }
    
    return total;
  }
}

class RelatorioDeVendas {
  gerar(pedido) {
    let valor = pedido.valorItens;
    
    if (pedido.cupom === "DESCONTO10") {
      valor = valor * 0.9; // Regra de desconto repetida
    }
    
    // gerar relatório
  }
}

class EmailDeConfirmacao {
  enviar(pedido) {
    let valorFinal = pedido.valorItens;
    
    if (pedido.cupom === "DESCONTO10") {
      valorFinal = valorFinal * 0.9; // Regra de desconto repetida
    }
    
    // enviar email
  }
}
```

## Como Refatorar

```javascript
// Centralize o comportamento em uma única classe
class CalculadoraDePedido {
  calcularTotal(pedido) {
    let total = pedido.valorItens;
    total = this.aplicarDesconto(pedido, total);
    return total;
  }
  
  aplicarDesconto(pedido, total) {
    if (pedido.cupom === "DESCONTO10") {
      return total * 0.9;
    }
    return total;
  }
}

class RelatorioDeVendas {
  gerar(pedido, calculadora) {
    let valor = calculadora.calcularTotal(pedido);
    // gerar relatório
  }
}

class EmailDeConfirmacao {
  enviar(pedido, calculadora) {
    let valorFinal = calculadora.calcularTotal(pedido);
    // enviar email
  }
}
```

## Técnicas de Refatoração

As seguintes técnicas são indicadas para refatorar uma cirurgia de espingarda:

- **Move Function**: Mova comportamentos para a classe que deve ser responsável por eles.
- **Move Field**: Mova campos para a classe que deve ser responsável por eles.
- **Combine Functions into Class**: Agrupe funções relacionadas em uma única classe.
- **Combine Functions into Transform**: Agrupe funções relacionadas em uma transformação.

## Benefícios

Após a refatoração os benefícios são:

- Mudanças passam a ser feitas em um único lugar
- Reduz o risco de esquecer de modificar alguma classe
- Facilita a manutenção e evolução do código
- Código mais organizado e com responsabilidades bem definidas

## Referências

FOWLER, Martin; BECK, Kent. **Refatoração: Aperfeiçoando o Design de Códigos Existentes**. 2. ed. São Paulo: Novatec, 2018.
