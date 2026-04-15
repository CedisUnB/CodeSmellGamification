---
title: "Classe Grande"
description: "Classes com muitas responsabilidades e muito código"
category: "bloaters"
icon: "🏛️"
---

## O que é?

Classes com muitos campos ou muito código são terreno fértil para duplicação e dificuldade de manutenção. Elas tendem a misturar múltiplas responsabilidades em um único lugar.

## Como identificar

- Classes com mais de 200-300 linhas
- Muitos campos (10+)
- Muitos métodos (20+)
- Nomes genéricos como `Utils`, `Manager`, `Handler`

## Exemplo Ruim

```javascript
class UserManager {
    // Dados do usuário
    constructor() {
        this.name = '';
        this.email = '';
        this.password = '';
    }
    
    // Validação
    validateName() { /* ... */ }
    validateEmail() { /* ... */ }
    validatePassword() { /* ... */ }
    
    // Banco de dados
    saveToDatabase() { /* ... */ }
    loadFromDatabase() { /* ... */ }
    deleteFromDatabase() { /* ... */ }
    
    // Email
    sendWelcomeEmail() { /* ... */ }
    sendResetEmail() { /* ... */ }
    
    // Autenticação
    login() { /* ... */ }
    logout() { /* ... */ }
    resetPassword() { /* ... */ }
}
```

## Como Refatorar

```javascript
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}

class UserValidator {
    static validate(user) { /* ... */ }
}

class UserRepository {
    save(user) { /* ... */ }
    load(id) { /* ... */ }
}

class EmailService {
    sendWelcome(user) { /* ... */ }
    sendReset(user) { /* ... */ }
}

class AuthService {
    login(credentials) { /* ... */ }
    logout() { /* ... */ }
}
```

## Técnicas de Refatoração

- **Extract Class** - Extrair responsabilidades
- **Extract Superclass** - Criar classe base
- **Replace Type Code with Subclasses** - Substituir por subclasses

## Benefícios

- Responsabilidades bem definidas
- Facilita testes
- Código mais organizado
- Reutilização mais fácil