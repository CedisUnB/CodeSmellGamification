---
title: "Dados Globais"
description: "Presença de variáveis globais que podem ser modificadas de qualquer lugar"
category: "change-preventers"
icon: "🌍"
---

## O que é?

Dados globais representam um dos maus cheiros mais perigosos, pois podem ser modificados de qualquer lugar do código, dificultando o rastreamento de quem alterou o valor e quando a alteração ocorreu.

## Como identificar

Você pode identificar dados globais observando variáveis que são acessíveis e modificáveis em diferentes partes do sistema sem controle de acesso. Outros sinais incluem variáveis declaradas no escopo global, variáveis estáticas públicas ou singletons que expõem seu estado diretamente.

Esse mau cheiro é causado principalmente pela praticidade inicial que dados globais oferecem e pela falta de encapsulamento adequado.

## Exemplo Ruim

```javascript
// Variáveis globais acessíveis de qualquer lugar
let usuarioLogado = null;
let temaAtual = "claro";
let moedas = 0;

function fazerLogin(usuario) {
  usuarioLogado = usuario;
  moedas = usuario.saldo;
}

function mudarTema(tema) {
  temaAtual = tema;
}

function comprarItem(valor) {
  if (usuarioLogado) {
    moedas = moedas - valor; // Modifica diretamente a variável global
  }
}

function qualquerOutraFuncao() {
  // Qualquer função pode modificar usuarioLogado, temaAtual ou moedas
  usuarioLogado = null; // Efeito colateral inesperado
}
```

## Como Refatorar

```javascript
class SessaoUsuario {
  constructor() {
    this.usuarioLogado = null;
    this.moedas = 0;
  }
  
  login(usuario) {
    this.usuarioLogado = usuario;
    this.moedas = usuario.saldo;
  }
  
  logout() {
    this.usuarioLogado = null;
    this.moedas = 0;
  }
  
  getMoedas() {
    return this.moedas;
  }
  
  debitarMoedas(valor) {
    if (this.usuarioLogado && this.moedas >= valor) {
      this.moedas -= valor;
      return true;
    }
    return false;
  }
}

class ConfiguracaoTema {
  constructor() {
    this.temaAtual = "claro";
  }
  
  mudarTema(tema) {
    this.temaAtual = tema;
  }
  
  getTema() {
    return this.temaAtual;
  }
}

// Instâncias controladas
const sessao = new SessaoUsuario();
const configuracao = new ConfiguracaoTema();

function comprarItem(valor) {
  if (sessao.debitarMoedas(valor)) {
    // processar compra
  }
}
```

## Técnicas de Refatoração

A seguinte técnica é indicada para refatorar dados globais:

- **Encapsulate Variable**: Encapsule a variável global em um método ou propriedade, limitando o escopo e o acesso aos dados.

## Benefícios

Após a refatoração os benefícios são:

- Controle centralizado sobre modificações nos dados
- Facilidade para rastrear quem alterou o quê
- Redução de efeitos colaterais inesperados
- Melhor testabilidade, pois o estado é isolado
- Código mais previsível e fácil de depurar

## Referências

FOWLER, Martin; BECK, Kent. **Refatoração: Aperfeiçoando o Design de Códigos Existentes**. 2. ed. São Paulo: Novatec, 2018.
