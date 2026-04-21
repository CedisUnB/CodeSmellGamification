---
title: "Campo Temporário"
description: "Campos que são definidos apenas em circunstâncias específicas, ficando vazios na maior parte do tempo"
category: "object-orientation-abusers"
icon: "⏰"
---

## O que é?

Campo temporário ocorre quando um campo de uma classe é utilizado apenas em situações específicas, permanecendo vazio ou com valores nulos na maior parte do tempo. Isso dificulta a compreensão do código, pois não fica claro quando o campo realmente contém informações relevantes.

## Como identificar

Você pode identificar um campo temporário observando atributos de classe que frequentemente ficam nulos ou sem valor. Outro sinal é a presença de condicionais que verificam se o campo foi preenchido antes de usá-lo.

Esse mau cheiro é causado principalmente por algoritmos complexos que precisam de variáveis auxiliares e por tentativas de reaproveitar classes em contextos diferentes.

## Exemplo Ruim

```javascript
class CalculadoraDeImposto {
  constructor() {
    this.valorBase = 0;
    this.percentualDesconto = 0;
    this.parcela = 0;
    this.aliquotaEspecial = 0;
  }
  
  calcularComDesconto(valor, desconto) {
    this.valorBase = valor;
    this.percentualDesconto = desconto;
    this.parcela = 1;
    
    return valor * (1 - desconto / 100);
  }
  
  calcularParcelado(valor, parcelas) {
    this.valorBase = valor;
    this.parcela = parcelas;
    
    return valor / parcelas;
  }
  
  calcularComAliquotaEspecial(valor, aliquota) {
    this.aliquotaEspecial = aliquota;
    
    return valor * (1 + aliquota / 100);
  }
}
```

## Como Refatorar

```javascript
// Extraia os campos temporários para classes separadas
class CalculadoraDeImposto {
  calcularComDesconto(valor, desconto) {
    return valor * (1 - desconto / 100);
  }
  
  calcularParcelado(valor, parcelas) {
    return valor / parcelas;
  }
  
  calcularComAliquotaEspecial(valor, aliquota) {
    return valor * (1 + aliquota / 100);
  }
}

// Ou crie classes específicas para cada contexto
class CalculadoraDeDesconto {
  constructor(valor, desconto) {
    this.valorBase = valor;
    this.percentualDesconto = desconto;
  }
  
  calcular() {
    return this.valorBase * (1 - this.percentualDesconto / 100);
  }
}
```

## Técnicas de Refatoração

A seguinte técnica é indicada para refatorar um campo temporário:

- **Extract Class**: Crie uma nova classe para agrupar os campos temporários e os métodos que os utilizam.

## Benefícios

Após a refatoração os benefícios são:

- Código mais claro e intuitivo
- Redução de campos desnecessários na classe principal
- Melhor encapsulamento de comportamentos específicos
- Facilita a compreensão de quando cada campo é realmente utilizado

## Referências

FOWLER, Martin; BECK, Kent. **Refatoração: Aperfeiçoando o Design de Códigos Existentes**. 2. ed. São Paulo: Novatec, 2018.
