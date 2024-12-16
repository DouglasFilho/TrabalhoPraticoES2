# trabalhopratico

## Integrantes
- Douglas Rodrigues Fernandes Filho
- Bruno Souza Lages
- Henrique Lucas Gomes Rezende

## Explicação sobre o projeto

Foi construida uma plataforma simples de gestão de despesas pessoais, ela é composta por 4 partes:
  1. Um formulário de cadastro de despesas que possui 3 campos
    - Nome
    - Valor
    - Categoria
  Cada um desses campos possui suas respectivas validações e regras.

  2. Uma tabela de despesas, que é populada pelas despesas criadas no formulário apresentado anteriormente. Essa lista possui um filtro e uma busca com base em nomes e categorias.

  3. Um gráfico que mostra a porcentagem que cada categoria representa do total das despesas cadastradas

  4. Uma listagem mais especifica que traz dados das categorias, como valor total, porcentagem e quantidade de despesas inseridas em cada uma das categorias

## Tecnologias selecionadas

O projeto foi desenvolvido em Vue3 e TypeScript, para os testes foram utilizadas a biblioteca Vitest auxiliada por plugins como o @pinia/testing que foi utilizado para testar partes especificas da aplicação que precisava de mocks especializados. 

Essas tecnologias foram escolhidas por familiaridade e curiosidade de implementar testes no frontend, tendo em vista que na maior parte das vezes nos implementamos teste no back.

## Estrutura base do projeto

A estrutura do projeto é bem simples possuindo uma view base (IndexView.vue) e 4 componentes, se estruturando da seguinte forma:

IndexView.vue
  |_ ExpenseCreator.vue
  |_ ExpenseList.vue
  |_ ExpenseChart.vue
  |_ ExpenseCategoryCard.vue

Os componentes centralizam os dados em um store chamado expenses.ts e as tipagens importantes do projeto estao dentro de src/interfaces.

A estrutura dos teste replica a estrutura dos componentes, existindo um arquivo de teste para cada componente que esta dentro da pasta src/components/__tests__

  __tests__
  |_ ExpenseCreator.test.ts
  |_ ExpenseList.test.ts
  |_ ExpenseChart.test.ts
  |_ ExpenseCategoryCard.test.ts

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
