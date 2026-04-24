# DevDog - Seu Melhor Amigo Desenvolvedor

DevDog é uma plataforma gamificada para aprendizado de identificação de maus cheiros de código (code smells). O projeto foi desenvolvido como Trabalho de Conclusão de Curso e tem como objetivo auxiliar desenvolvedores a treinar seu "faro" para identificar problemas de design de software através de exercícios práticos e teoria fundamentada.

## Objetivo

A plataforma permite que desenvolvedores pratiquem a identificação de code smells em trechos de código reais, recebendo feedback imediato e acumulando pontos (petiscos) para desbloquear dicas. O projeto combina uma área teórica (guias sobre cada mau cheiro) com uma área prática (exercícios interativos).

## Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js (v18 ou superior)
- Docker e Docker Compose
- PostgreSQL (se executar sem Docker)

### Com Docker (Recomendado)

```bash
# Clone o repositório
git clone https://github.com/CedisUnB/CodeSmellGamification.git
cd CodeSmellGamification

# Configure as variáveis de ambiente
cp .env.example .env.development
# Edite o arquivo .env com suas configurações

# Execute os containers
docker compose up -d

# Execute o seed (opcional, para popular com dados iniciais)
docker compose exec api npm run seed

# Acesse a aplicação
# Frontend: http://localhost:5173
# Backend API: http://localhost:3000
```

## Autor

Desenvolvido por Luciano Ricardo da Silva Junior como Trabalho de Conclusão de Curso

Orientador: Prof. Dr. Sergio Antônio Andrade de Freitas

## Agradecimentos

- CEDIS - Centro de Estudos, Desenvolvimento e Inovação em Software
- UnB - Universidade de Brasilia
