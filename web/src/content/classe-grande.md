---
title: "Classe Grande"
description: "Classes com muitas responsabilidades diferentes e muitas linhas de código"
category: "bloaters"
icon: "🏛️"
---

## O que é?

Classe grande ocorre quando uma classe cresce excessivamente, acumulando muitas responsabilidades e uma grande quantidade de código. Classes assim tendem a ser difíceis de entender, testar e manter.

## Como identificar

Você pode identificar uma classe grande observando o número de campos, métodos ou linhas de código. Classes com muitos campos ou métodos distintos são fortes candidatas. Outro sinal é quando a classe possui várias responsabilidades diferentes que poderiam ser separadas.

Esse mau cheiro é causado principalmente pelo acúmulo gradual de funcionalidades ao longo do tempo e pela falta de separação de responsabilidades.

## Exemplo Ruim

```javascript
class Usuario {
  constructor(nome, email, senha) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.logs = [];
  }
  
  // Autenticação
  login(senha) {
    // validar senha
  }
  
  logout() {
    // encerrar sessão
  }
  
  // Validação
  validarEmail() {
    // validar formato do email
  }
  
  validarSenha() {
    // validar força da senha
  }
  
  // Persistência
  salvar() {
    // salvar no banco de dados
  }
  
  carregar(id) {
    // carregar do banco de dados
  }
  
  // Notificações
  enviarEmailBoasVindas() {
    // enviar email
  }
  
  enviarNotificacaoPush() {
    // enviar push
  }
  
  // Relatórios
  gerarHistoricoAcessos() {
    // gerar relatório
  }
  
  gerarEstatisticas() {
    // gerar estatísticas
  }
}
```

## Como Refatorar

```javascript
// Separe as responsabilidades em classes menores
class Usuario {
  constructor(nome, email, senha) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }
}

class Autenticacao {
  login(usuario, senha) {
    // validar senha
  }
  
  logout(usuario) {
    // encerrar sessão
  }
}

class ValidadorDeUsuario {
  validarEmail(email) {
    // validar formato do email
  }
  
  validarSenha(senha) {
    // validar força da senha
  }
}

class RepositorioDeUsuario {
  salvar(usuario) {
    // salvar no banco de dados
  }
  
  carregar(id) {
    // carregar do banco de dados
  }
}
```

## Técnicas de Refatoração

As seguintes técnicas são indicadas para refatorar uma classe grande:

- **Extract Class**: Extraia grupos de campos e métodos relacionados para novas classes.
- **Extract Superclass**: Crie uma classe base para comportamentos comuns.
- **Replace Type Code with Subclasses**: Substitua códigos de tipo por subclasses quando houver comportamento condicional.

## Benefícios

Após a refatoração os benefícios são:

- Classes mais coesas e com responsabilidades bem definidas
- Código mais fácil de entender e manter
- Facilita a localização de funcionalidades
- Reduz duplicação de código
- Melhora a testabilidade

## Referências

FOWLER, Martin; BECK, Kent. **Refatoração: Aperfeiçoando o Design de Códigos Existentes**. 2. ed. São Paulo: Novatec, 2018.
