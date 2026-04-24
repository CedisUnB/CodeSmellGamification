# Lista de requisições

#### Login/Criação de Usuário Anônimo
**Função:** ```anonymousLogin```
**Endpoint:** POST ```/user/anonymous```
**Body:** ```{ sessionId: string }```
**Retorno:** ```{ userData: payload, token: token }```
**Token Obrigatório:** Não
**Descrição:** Faz login ou cria um novo usuário anônimo no banco e retorna um token de acesso.
**Caso de Uso:** Quando um usuário sem token acessar a plataforma ele cria e cadastra as ações nesse usuário anônimo.

#### Login de Usuário
**Função:** ```login```
**Endpoint:** POST ```/user/login```
**Body:** ```{ email: string, password: string, sessionId: string }```
**Retorno:** ```{ userData: payload, token: token }```
**Token Obrigatório:** Não
**Descrição:** Faz login de um usuário registrado e retorna um token de acesso.
**Caso de Uso:** Quando um usuário fizer login pela pagina de login.

#### Registra um Novo Usuário
**Função:** ```register```
**Endpoint:** POST ```/user/register```
**Body:** ```{ name: string, email: string, password: string, sessionId: string }```
**Retorno:** ```{ userData: payload, token: token }```
**Token Obrigatório:** Não
**Descrição:** Registra um novo usuário e retorna um token de acesso.
**Caso de Uso:** Quando um usuário se cadastrar pela pagina de cadastro.

#### Pegar Dados de Usuário Logado
**Função:** ```getMe```
**Endpoint:** GET ```/user/me```
**Retorno:** ```{ id: string, name: string, email: string, coins: number, isAnonymous: boolean, createdAt: Date, updatedAt: Date }```
**Token Obrigatório:** Sim
**Descrição:** Busca o usuário logado e retorna seus dados.
**Caso de Uso:** Principalmente na navbar ou qualquer momento que o for necessario os dados do usuário.

#### Listar Exercícios
**Função:** ```list```
**Endpoint:** GET ```/exercise```
**Retorno:** ```[{ id: string, title: string, difficulty: string, hasAttempt: boolean }]```
**Token Obrigatório:** Sim
**Descrição:** Busca todos os exercícios disponíveis e retorna seus dados.
**Caso de Uso:** Quando o usuário acessar a pagina de lista de exercicios (Farejador).

#### Buscar um Exercício
**Função:** ```getExerciseById```
**Endpoint:** GET ```/exercise/:id```
**Retorno:** ```{ id: string, title: string, description: string, difficulty: string, code: string}```
**Token Obrigatório:** Sim
**Descrição:** Busca um exercício pelo id e retorna seus dados.
**Caso de Uso:** Quando o usuário acessar a pagina de um exercício.

#### Buscar estatísticas de um Exercício
**Função:** ```getStatistics```
**Endpoint:** GET ```/exercise/:id/statistics```
**Retorno:** ```{ myStats: { attemptsCount: number, bestScore: number, hasAttempts: boolean, rank: number }, communityStats: { totalParticipants: number, avgScore: number } }```
**Token Obrigatório:** Sim
**Descrição:** Busca as estatísticas de um exercício pelo id e retorna diversas informações.
**Caso de Uso:** Quando o usuário acessar a pagina de um exercício e clicar na aba de estatísticas.

#### Fazer uma Tentativa
**Função:** ```makeAttempt```
**Endpoint:** POST ```/exercise/:id/attempt```
**Body:** ```[{ line: number, smell: string }]```
**Retorno:** ```{ correctLines: number, correctSmells: number, matchedLines: [number], score: number, user}```
**Token Obrigatório:** Sim
**Descrição:** Faz uma tentativa de resolver um exercicio e retorna o numero de linhas corretas, o numero de smells corretos, as linhas selecionadas que foram classificadas corretamente e uma pontuação.
**Caso de Uso:** Quando o usuário tentar resolver um exercício.

#### Adicionar Petiscos a Usuario
**Função:** ```addCoin```
**Endpoint:** POST ```/user/coin```
**Body:** ```{ id: string, amount: number }```
**Retorno:** ```{ user }```
**Token Obrigatório:** Sim
**Descrição:** Adiciona coins para o usuario e retorna o numero total de coins do usuario apos a adicao.
**Caso de Uso:** Quando o usuário adicionar receber petiscos por exemplo encontrando na pagina do guia.

#### Pegar Dicas de Exercicios
**Função:** ```getTip```
**Endpoint:** POST ```/exercise/:id/tip```
**Body:** ```{ tipNumber: number }```
**Retorno:** ```{ linesCount: number }``` ou ```{ smellsCount: number }``` ou ```{ smellyLine: number }``` e ```{tip: number, user}```
**Token Obrigatório:** Sim
**Descrição:** Busca uma dica para um exercicio e retorna o numero de linhas com smell, o numero de smells diferentes e uma linha que deve ser selecionada.
**Caso de Uso:** Quando o usuário clicar na aba de dicas de um exercicio.
