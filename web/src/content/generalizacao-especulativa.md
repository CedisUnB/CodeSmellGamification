---
title: "Generalização Especulativa"
description: "Funcionalidades adicionadas por precaução para necessidades futuras que nunca se materializam"
category: "dispensables"
icon: "🔮"
---

## O que é?

Generalização especulativa ocorre quando funcionalidades são adicionadas ao código "por precaução", antecipando necessidades futuras que nunca se materializam. Essas abstrações desnecessárias tornam o código mais complexo sem trazer benefícios imediatos.

## Como identificar

Você pode identificar generalização especulativa observando classes abstratas com poucas implementações, interfaces com um único método e uma única implementação, parâmetros ou flags que não são utilizados, ou código comentado que "poderá ser útil no futuro".

Esse mau cheiro é causado principalmente por planejamento excessivo, por tentativas de antecipar requisitos que nunca chegam ou por medo de precisar de flexibilidade no futuro.

## Exemplo Ruim

```javascript
// Interface desnecessária com uma única implementação
class InterfaceDePagamento {
  processar(valor) {}
}

class PagamentoComCartao extends InterfaceDePagamento {
  processar(valor) {
    console.log(`Processando pagamento de ${valor} com cartão`);
  }
}

// Classe abstrata desnecessária
class Animal {
  constructor(nome) {
    this.nome = nome;
  }
  
  falar() {
    throw new Error("Método deve ser implementado");
  }
}

class Cachorro extends Animal {
  falar() {
    return "Au au";
  }
}

// Parâmetros não utilizados
function calcularImposto(
  valor, 
  tipoImposto, 
  regime, 
  aliquotaEspecial, 
  considerarIR
) {
  // Apenas valor é usado, os demais parâmetros são especulativos
  return valor * 0.1;
}
```

## Como Refatorar

```javascript
// Remova a abstração desnecessária
class PagamentoComCartao {
  processar(valor) {
    console.log(`Processando pagamento de ${valor} com cartão`);
  }
}

// Remova a hierarquia desnecessária
class Cachorro {
  constructor(nome) {
    this.nome = nome;
  }
  
  falar() {
    return "Au au";
  }
}

// Remova parâmetros não utilizados
function calcularImposto(valor) {
  return valor * 0.1;
}
```

## Técnicas de Refatoração

As seguintes técnicas são indicadas para refatorar generalização especulativa:

- **Collapse Hierarchy**: Quando uma hierarquia de herança é desnecessária, remova a superclasse ou subclasse redundante.
- **Inline Function**: Quando uma função é muito simples e chamada em poucos lugares, incorpore seu corpo diretamente no código chamador.
- **Remove Dead Code**: Remova código que nunca é executado ou que não é utilizado.

## Benefícios

Após a refatoração os benefícios são:

- Código mais simples e direto
- Redução de complexidade desnecessária
- Facilita a compreensão do que o código realmente faz
- Menos manutenção em funcionalidades não utilizadas

## Referências

FOWLER, Martin; BECK, Kent. **Refatoração: Aperfeiçoando o Design de Códigos Existentes**. 2. ed. São Paulo: Novatec, 2018.
