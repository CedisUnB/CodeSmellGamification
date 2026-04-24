---
title: "Dados Mutáveis"
description: "Alterações frequentes em dados que podem levar a consequências inesperadas e bugs complexos"
category: "change-preventers"
icon: "🎲"
---

## O que é?

Dados mutáveis ocorrem quando variáveis ou objetos podem ser modificados livremente após sua criação. Essas alterações podem levar a consequências inesperadas e bugs complexos, especialmente quando o mesmo dado é compartilhado entre diferentes partes do sistema.

## Como identificar

Você pode identificar problemas com dados mutáveis observando funções que modificam parâmetros recebidos, objetos que são alterados após serem passados para outras funções, ou variáveis que mudam de significado ao longo do tempo. Outro sinal é a dificuldade em rastrear onde e quando um determinado valor foi modificado.

Esse mau cheiro é causado principalmente pelo reuso excessivo de variáveis para diferentes propósitos e pela falta de imutabilidade no design do código.

## Exemplo Ruim

```javascript
function processarPedido(pedido) {
  // Modifica o objeto original diretamente
  pedido.status = "processando";
  pedido.dataProcessamento = new Date();
  
  calcularFrete(pedido);
  aplicarDesconto(pedido);
  
  return pedido;
}

function calcularFrete(pedido) {
  // Modifica o pedido novamente
  pedido.frete = 10;
  pedido.total = pedido.subtotal + pedido.frete;
}

function aplicarDesconto(pedido) {
  // Modifica o pedido mais uma vez
  pedido.total = pedido.total * 0.9;
}

// Uso problemático
const meuPedido = { subtotal: 100, status: "novo" };
processarPedido(meuPedido);
// meuPedido foi modificado em múltiplos lugares
```

## Como Refatorar

```javascript
function processarPedido(pedidoOriginal) {
  // Trabalha com cópias ou retorna novos objetos
  const pedido = { ...pedidoOriginal };
  
  pedido.status = "processando";
  pedido.dataProcessamento = new Date();
  
  const comFrete = calcularFrete(pedido);
  const comDesconto = aplicarDesconto(comFrete);
  
  return comDesconto;
}

function calcularFrete(pedido) {
  // Retorna um novo objeto em vez de modificar o original
  return {
    ...pedido,
    frete: 10,
    total: pedido.subtotal + 10
  };
}

function aplicarDesconto(pedido) {
  // Retorna um novo objeto
  return {
    ...pedido,
    total: pedido.total * 0.9
  };
}

const meuPedido = { subtotal: 100, status: "novo" };
const pedidoProcessado = processarPedido(meuPedido);
// meuPedido permanece inalterado
```

## Técnicas de Refatoração

As seguintes técnicas são indicadas para lidar com dados mutáveis:

- **Encapsulate Variable**: Encapsule a variável para controlar o acesso e as modificações.
- **Split Variable**: Divida variáveis que estão sendo usadas para múltiplos propósitos.
- **Separate Query from Modifier**: Separe métodos que consultam de métodos que modificam estado.
- **Replace Derived Variable with Query**: Substitua variáveis derivadas por consultas para evitar inconsistências.

## Benefícios

Após a refatoração os benefícios são:

- Código mais previsível e fácil de entender
- Redução de efeitos colaterais inesperados
- Facilidade para rastrear modificações
- Melhor testabilidade, pois funções puras são mais fáceis de testar
- Menor incidência de bugs relacionados a estado compartilhado

## Referências

FOWLER, Martin; BECK, Kent. **Refatoração: Aperfeiçoando o Design de Códigos Existentes**. 2. ed. São Paulo: Novatec, 2018.
