---
title: "Nomes Misteriosos"
description: "Nomes de funções, variáveis e classes que não comunicam claramente sua finalidade"
category: "bloaters"
icon: "📛"
---

## O que é?

Um dos aspectos mais importantes para um código claro são os bons nomes. Nomes de funções, módulos, variáveis e classes devem comunicar claramente sua finalidade. Quando um nome é confuso ou não revela sua intenção, temos um mau cheiro.

## Como identificar

- Variáveis chamadas `a`, `b`, `x`, `temp`
- Funções com nomes genéricos como `process()`, `handle()`, `do()`
- Abreviações confusas como `usr`, `pmt`, `calc`
- Nomes que mentem sobre o que realmente fazem

## Exemplo Ruim

```javascript
// Que diabos faz esta função?
function xyz(a, b) {
    let c = a * b;
    return c;
}

// O que significa este nome?
function processData(data) {
    // 50 linhas de código...
}
```

## Como Refatorar

```javascript
// Agora sabemos que calcula a área!
function calculateArea(width, height) {
    let area = width * height;
    return area;
}

// Nome específico revela a intenção
function validateUserCredentials(userData) {
    // 50 linhas de validação...
}
```

## Técnicas de Refatoração

- **Change Function Declaration** - Renomear funções
- **Rename Variable** - Renomear variáveis
- **Rename Field** - Renomear campos de classes

## Benefícios

- ✅ Código auto-documentado
- ✅ Facilita revisão de código
- ✅ Reduz necessidade de comentários
- ✅ Novos desenvolvedores entendem mais rápido


```

## 3. funcao-longa.md

```markdown

```

## 4. dados-globais.md

```markdown
---
title: "Dados Globais"
description: "Variáveis globais que podem ser modificadas de qualquer lugar"
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
- **Move Function** - Mover funções para o contexto correto
- **Module Pattern** - Usar módulos para encapsulamento

## Benefícios

- ✅ Controle sobre modificações
- ✅ Facilita debugging
- ✅ Testes mais previsíveis
- ✅ Reduz acoplamento
```

## 5. inveja-funcionalidade.md

```markdown
---
title: "Inveja de Funcionalidade"
description: "Uma função que se comunica mais com dados de outra classe do que com a sua"
category: "couplers"
icon: "💚"
---

## O que é?

Quando uma função em um módulo comunica-se mais com elementos de outro módulo do que com os do próprio, ela sofre de "inveja". A função "inveja" os dados de outra classe.

## Como identificar

- Função que acessa muitos getters de outro objeto
- Método que usa mais dados de outra classe
- Chamadas frequentes a métodos de outro objeto

## Exemplo Ruim

```javascript
class Customer {
    getAddress() { return this.address; }
    getPhone() { return this.phone; }
    getEmail() { return this.email; }
}

class Invoice {
    sendNotification(customer) {
        // A função inveja os dados de Customer!
        const address = customer.getAddress();
        const phone = customer.getPhone();
        const email = customer.getEmail();
        
        sendEmail(email);
        sendSMS(phone);
        sendMail(address);
    }
}
```

## Como Refatorar

```javascript
class Customer {
    getAddress() { return this.address; }
    getPhone() { return this.phone; }
    getEmail() { return this.email; }
    
    // Move a função para onde os dados estão
    sendNotification() {
        sendEmail(this.email);
        sendSMS(this.phone);
        sendMail(this.address);
    }
}

class Invoice {
    // Agora apenas usa o serviço
    sendNotification(customer) {
        customer.sendNotification();
    }
}
```

## Técnicas de Refatoração

- **Move Function** - Mover função para a classe correta
- **Extract Function** - Extrair partes que não pertencem

## Benefícios

- ✅ Dados e comportamento juntos
- ✅ Melhor encapsulamento
- ✅ Código mais intuitivo
```

## 6. obsessao-primitivos.md

```markdown
---
title: "Obsessão por Primitivos"
description: "Uso excessivo de tipos primitivos para representar conceitos do domínio"
category: "object-orientation-abusers"
icon: "🔢"
---

## O que é?

Programadores frequentemente relutam em criar seus próprios tipos fundamentais para o domínio. Representar conceitos como dinheiro, telefone ou intervalos como tipos primitivos leva a código frágil e difícil de manter.

## Como identificar

- Strings representando conceitos complexos
- Validação de dados espalhada pelo código
- Formatação repetida do mesmo tipo de dado
- Código duplicado para tratar primitivos

## Exemplo Ruim

```javascript
// Telefone como string
let phoneNumber = "11999999999";

function validatePhone(phone) {
    return phone.length === 11 && /^\d+$/.test(phone);
}

function formatPhone(phone) {
    return `(${phone.slice(0,2)}) ${phone.slice(2,7)}-${phone.slice(7)}`;
}

// Dinheiro como número
let price = 19.90;
let discount = 0.1;
let finalPrice = price * (1 - discount);
```

## Como Refatorar

```javascript
class PhoneNumber {
    constructor(value) {
        if (!this.isValid(value)) {
            throw new Error('Telefone inválido');
        }
        this.value = value;
    }
    
    isValid(phone) {
        return phone.length === 11 && /^\d+$/.test(phone);
    }
    
    format() {
        return `(${this.value.slice(0,2)}) ${this.value.slice(2,7)}-${this.value.slice(7)}`;
    }
}

class Money {
    constructor(value, currency = 'BRL') {
        this.value = value;
        this.currency = currency;
    }
    
    applyDiscount(discount) {
        return new Money(this.value * (1 - discount.value), this.currency);
    }
}
```

## Técnicas de Refatoração

- **Replace Primitive with Object** - Substituir primitivo por objeto
- **Introduce Parameter Object** - Agrupar parâmetros
- **Replace Type Code with Class** - Substituir código de tipo

## Benefícios

- ✅ Validação centralizada
- ✅ Comportamento junto com dados
- ✅ Código mais expressivo
- ✅ Evita duplicação
```

## 7. comentarios.md

```markdown
---
title: "Comentários"
description: "Comentários que tentam explicar código confuso ou mal escrito"
category: "dispensables"
icon: "💬"
---

## O que é?

Comentários não são um mau cheiro por si só, mas frequentemente indicam código que precisa ser refatorado. Quando um comentário é necessário para explicar o que o código faz, geralmente é melhor extrair uma função ou renomeá-la.

## Como identificar

- Comentários explicando o óbvio
- Código "comentado" (desativado)
- Comentários que mentem sobre o código
- Comentários que poderiam ser nomes de funções

## Exemplo Ruim

```javascript
// Incrementa i em 1
i++;

// Verifica se o usuário tem idade suficiente
if (user.age >= 18) {
    // Permite acesso
    grantAccess();
}

// Calcula o total com base nos itens
let total = 0;
for(let i = 0; i < items.length; i++) {
    total += items[i].price;
}
```

## Como Refatorar

```javascript
// O código fala por si mesmo
i++;

if (user.isAdult()) {
    grantAccess();
}

function calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.price, 0);
}
```

## Quando comentários são úteis

```javascript
// WARNING: Esta função contém lógica de negócio crítica
// Não modificar sem aprovação do time comercial
function calculateRoyaltyPayments() {
    // Implementação complexa...
}

// TODO: Implementar cache após validação de performance
// FIXME: Corrigir bug quando lista está vazia
```

## Técnicas de Refatoração

- **Extract Function** - Substituir comentário por função
- **Rename Variable** - Nome claro elimina comentário
- **Remove Dead Code** - Remover código comentado

## Benefícios

- ✅ Código auto-documentado
- ✅ Menos ruído visual
- ✅ Comentários realmente importantes
```

## 8. classe-grande.md

```markdown
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

- ✅ Responsabilidades bem definidas
- ✅ Facilita testes
- ✅ Código mais organizado
- ✅ Reutilização mais fácil
```

Salve cada um desses arquivos na pasta `src/content/` com os nomes correspondentes (ex: `nomes-misteriosos.md`, `codigo-duplicado.md`, etc.) e eles aparecerão automaticamente no seu guia! 🐕