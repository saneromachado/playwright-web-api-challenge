# Desafio de automacao Web + API

Projeto desenvolvido com Playwright Test e TypeScript para automatizar dois cenarios Web no TodoMVC e dois cenarios da API REST do GitHub.

## Pre-requisitos

- Node.js 20 ou superior
- npm

## Instalacao

Em uma maquina limpa, execute na raiz do projeto:

```bash
npm ci
npx playwright install chromium
```

## Execucao

Executar todos os testes:

```bash
npm test
```

Executar somente os testes Web:

```bash
npm run test:web
```

Executar somente os testes de API:

```bash
npm run test:api
```

Executar os testes Web com o navegador visivel:

```bash
npm run test:headed
```

Validar os tipos TypeScript:

```bash
npm run typecheck
```

Depois de uma execucao, abrir o relatorio HTML:

```bash
npm run report
```

## Cenarios automatizados

| ID | Tipo | Cenario |
| --- | --- | --- |
| W1 | Web | Adicionar duas tarefas e validar a lista e o contador de itens restantes |
| W2 | Web | Concluir uma tarefa e validar os filtros `Completed` e `Active` |
| A1 | API | Consultar o usuario `octocat`, validar status 200 e campos da resposta |
| A2 | API | Consultar um usuario inexistente e validar status 404 |

## Estrutura

```text
.
|-- pages/
|   `-- todo.page.ts
|-- tests/
|   |-- api/
|   |   `-- github-users.spec.ts
|   `-- web/
|       `-- todo.spec.ts
|-- playwright.config.ts
|-- tsconfig.json
`-- package.json
```

## Decisoes tecnicas

- Os testes Web e de API foram separados em projetos do Playwright, permitindo execucao conjunta ou isolada.
- O Page Object concentra os seletores e as interacoes com o TodoMVC, mantendo os testes focados no comportamento esperado.
- Os seletores priorizam atributos acessiveis, como `placeholder`, `role` e nome visivel.
- Cada teste Web recebe um contexto de navegador isolado do Playwright, evitando dependencia de estado entre cenarios.
- A API publica do GitHub e usada sem autenticacao, conforme o enunciado. Ela possui limite de requisicoes por IP.
- Trace e captura de tela sao gerados em caso de falha para facilitar o diagnostico.

## Observacao

Os testes dependem de acesso a `https://demo.playwright.dev/todomvc` e `https://api.github.com`.
