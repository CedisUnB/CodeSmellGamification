---
title: "Homem do Meio"
description: "Quando uma classe delega excessivamente o trabalho para outra classe"
category: "couplers"
icon: "👨"
---

## O que é?

Homem do meio ocorre quando uma classe se limita a delegar chamadas para outra classe, sem adicionar valor ou comportamento próprio. A classe intermediária serve apenas como um "passador" de mensagens, tornando o código mais complexo sem necessidade.

## Como identificar

Você pode identificar um homem do meio observando classes cujos métodos consistem apenas em chamadas para métodos de outra classe. Outro sinal é quando a remoção da classe intermediária faria o código continuar funcionando normalmente.

Esse mau cheiro é causado principalmente por encapsulamento excessivo, por evolução do código que tornou uma classe obsoleta ou por tentativas de esconder dependências.

## Exemplo Ruim

```javascript
class ServicoDeEmail {
  enviarEmail(destinatario, mensagem) {
    console.log(`Enviando email para ${destinatario}: ${mensagem}`);
  }
}

class Notificador {
  constructor() {
    this.servicoEmail = new ServicoDeEmail();
  }
  
  enviarEmail(destinatario, mensagem) {
    // Apenas delega para o serviço, sem adicionar valor
    this.servicoEmail.enviarEmail(destinatario, mensagem);
  }
  
  enviarEmailComAnexo(destinatario, mensagem, anexo) {
    // Também apenas delega
    this.servicoEmail.enviarEmailComAnexo(destinatario, mensagem, anexo);
  }
}

// Uso problemático
const notificador = new Notificador();
// Poderia chamar serviço diretamente
notificador.enviarEmail("cliente@email.com", "Olá!"); 
```

## Como Refatorar

```javascript
class ServicoDeEmail {
  enviarEmail(destinatario, mensagem) {
    console.log(`Enviando email para ${destinatario}: ${mensagem}`);
  }
  
  enviarEmailComAnexo(destinatario, mensagem, anexo) {
    console.log(`Enviando email com anexo para ${destinatario}`);
  }
}

// Remova a classe intermediária e use o serviço diretamente
const servicoEmail = new ServicoDeEmail();
servicoEmail.enviarEmail("cliente@email.com", "Olá!");
```

## Técnicas de Refatoração

As seguintes técnicas são indicadas para refatorar um homem do meio:

- **Remove Middle Man**: Remova o método intermediário e faça o cliente chamar o método delegado diretamente.

## Benefícios

Após a refatoração os benefícios são:

- Código mais simples e direto
- Redução de classes desnecessárias
- Facilita a compreensão do fluxo de chamadas
- Menor manutenção em classes que não agregam valor

## Referências

FOWLER, Martin; BECK, Kent. **Refatoração: Aperfeiçoando o Design de Códigos Existentes**. 2. ed. São Paulo: Novatec, 2018.
