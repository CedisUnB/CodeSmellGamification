---
title: "Switches Repetidos"
description: "A mesma lógica condicional baseada em tipo aparece repetidamente em diferentes partes do código"
category: "object-orientation-abusers"
icon: "🔀"
---

## O que é?

Switches repetidos ocorre quando a mesma estrutura condicional (switch ou sequência de if/else) baseada em um tipo aparece em múltiplos lugares diferentes do código. Cada vez que um novo tipo é adicionado, todas essas estruturas precisam ser modificadas.

## Como identificar

Você pode identificar switches repetidos observando a mesma lógica de decisão baseada em um tipo ou categoria repetida em diferentes métodos ou classes. Outro sinal é quando a adição de um novo tipo exige alterações em vários lugares do sistema.

Esse mau cheiro é causado principalmente pela programação orientada a procedimentos em vez de orientação a objetos e pela falta de uso de polimorfismo.

## Exemplo Ruim

```javascript
class Funcionario {
  constructor(nome, tipo, salarioBase) {
    this.nome = nome;
    this.tipo = tipo; // "estagiario", "analista", "gerente"
    this.salarioBase = salarioBase;
  }
}

function calcularBonus(funcionario) {
  switch (funcionario.tipo) {
    case "estagiario":
      return funcionario.salarioBase * 0.05;
    case "analista":
      return funcionario.salarioBase * 0.1;
    case "gerente":
      return funcionario.salarioBase * 0.2;
    default:
      return 0;
  }
}

function calcularFerias(funcionario) {
  switch (funcionario.tipo) {
    case "estagiario":
      return 20;
    case "analista":
      return 25;
    case "gerente":
      return 30;
    default:
      return 20;
  }
}

function calcularValeRefeicao(funcionario) {
  switch (funcionario.tipo) {
    case "estagiario":
      return 15;
    case "analista":
      return 25;
    case "gerente":
      return 35;
    default:
      return 15;
  }
}
```

## Como Refatorar

```javascript
class Funcionario {
  constructor(nome, salarioBase) {
    this.nome = nome;
    this.salarioBase = salarioBase;
  }
  
  calcularBonus() {
    return 0;
  }
  
  calcularFerias() {
    return 20;
  }
  
  calcularValeRefeicao() {
    return 15;
  }
}

class Estagiario extends Funcionario {
  calcularBonus() {
    return this.salarioBase * 0.05;
  }
}

class Analista extends Funcionario {
  calcularBonus() {
    return this.salarioBase * 0.1;
  }
  
  calcularFerias() {
    return 25;
  }
  
  calcularValeRefeicao() {
    return 25;
  }
}

class Gerente extends Funcionario {
  calcularBonus() {
    return this.salarioBase * 0.2;
  }
  
  calcularFerias() {
    return 30;
  }
  
  calcularValeRefeicao() {
    return 35;
  }
}

// Uso com polimorfismo
function processarFuncionario(funcionario) {
  const bonus = funcionario.calcularBonus();
  const ferias = funcionario.calcularFerias();
  const vale = funcionario.calcularValeRefeicao();
  return { bonus, ferias, vale };
}
```

## Técnicas de Refatoração

As seguintes técnicas são indicadas para refatorar switches repetidos:

- **Replace Conditional with Polymorphism**: Substitua a lógica condicional baseada em tipo por polimorfismo, criando subclasses para cada variação.

## Benefícios

Após a refatoração os benefícios são:

- Elimina a duplicação de estruturas condicionais
- Adicionar um novo tipo requer apenas criar uma nova subclasse
- Comportamentos específicos ficam localizados nas classes apropriadas
- Código mais aberto para extensão e fechado para modificação

## Referências

FOWLER, Martin; BECK, Kent. **Refatoração: Aperfeiçoando o Design de Códigos Existentes**. 2. ed. São Paulo: Novatec, 2018.
