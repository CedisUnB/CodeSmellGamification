---
title: "Dados Globais"
description: "Presença de variáveis globais que podem ser modificadas de qualquer lugar"
category: "change-preventers"
icon: "🌍"
---

## O que é?

Dados globais representam um dos maus cheiros mais perigosos, pois podem ser modificados de qualquer lugar do código, dificultando o rastreamento de modificações.

## Como identificar

- Variáveis `window.variavel`
- `global` no Node.js
- Módulos com estado global
- Variáveis estáticas públicas

## Exemplo Ruim

```javascript
let userLoggedIn = false;
let currentTheme = 'light';
let apiUrl = 'http://localhost:3000';

function login() {
    userLoggedIn = true; // Qualquer função pode mudar!
}

function logout() {
    userLoggedIn = false; // Efeitos colaterais inesperados
}
```

## Como Refatorar

```javascript
class AppState {
    constructor() {
        this._userLoggedIn = false;
        this._currentTheme = 'light';
    }
    
    isUserLoggedIn() { return this._userLoggedIn; }
    setUserLoggedIn(value) { 
        this._userLoggedIn = value;
        this._notifyListeners();
    }
}

const appState = new AppState();
```

## Técnicas de Refatoração

- **Encapsulate Variable** - Encapsular variáveis globais

## Benefícios

- Controle sobre modificações
- Facilita debugging
- Testes mais previsíveis
- Reduz acoplamento