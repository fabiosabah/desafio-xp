
# Back-End XPinc

Esse projeto é um desafio feito para o processo seletivo da XPinc.

## Features
- Comprar e vender ativos
- Saque e depósito em carteira
- Consulta de ativos geral, por código e por carteira
- Autenticação por login
- Histórico de transações de ativos e saldo de carteira

## Stack
- Typescript
- NestJs
- Prisma
- Postgres
- JWT
- Bcrypt
- Swagger
- class-validator
- class-transformer

# Instruções
## Requisitos 
- nodejs
- docker
- docker-compose

## Instalação

```bash
$ npm install
$ docker-compose up 
```

## Populando o banco de dados para testes

```bash
$ npx prisma migrate -dev
$ npx prisma db seed
```

## Rodando a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
`OBS: Por padrão, o projeto utiliza a porta 3000 para rodar o NestJs e a porta 5432 para rodar o banco de dados Postgres`

## Usando a aplicação
Para utilizar a API, devemos primeiramente gerar um token. Para isso, dê um POST no endpoint `/login` com suas credenciais, por exemplo::

```json
{
	"email": "timbersaw@valve.com",
	"password": "pass123456"
}
```
O token vai ser gerado e será retornado na resposta da requisição, por exemplo:
```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDb2RDbGllbnRlIjoxLCJFbWFpbCI6InRpbWJlcnNhd0B2YWx2ZS5jb20iLCJDYXJ0ZWlyYUlkIjoxLCJpYXQiOjE2NTg3MTU0ODAsImV4cCI6MTY1ODgwMTg4MH0.edbRiSc2XBN235XeHF5aQHrmaI6JGj20fp7UVEwAUbQ"
}
```
Para acessar a maioria das rotas, você deve adicionar na requisição o `header`:
```
Authorization: TOKEN_GERADO
```


# Decisões de projeto
## Tecnologias usadas
Nesse projeto, escolhi trabalhar com o framework `NestJs`, para criar uma aplicação robusta, modular e escalável, além de ampliar meus conhecimentos em `Typescript` e em um dos frameworks de maior ancensão no momento (NestJS)

Comecei a desenvolver esse projeto com `TypeORM`, mas migrei para `Prisma` no meio do processo. O `Prisma` mostrou-se amigável e, ao ler a sua documentação, me interressei pela facilidade de fazer as querys a partir de objetos e criar relações entre entidades de forma mais fácil, além de maior controle na modelagem do Schema.

Outra mudança que ocorreu durante o desenvolvimento, foi trocar a tipagem dos valores referentes a **moeda** no banco de dados. Inicialmente, escolhi utilizar tipos com ponto flutuante, mas após pesquisa, julguei melhor alterá-los para `Int`, devido a maior segurança nas operações aritméticas (risco de overflow ou erros de precisão). Durante a pesquisa, testei bibliotecas como `DecimalJS` e `DineroJS`, mas optei pela simplicidade de utilizar `Int` e adicionei conversões para `Float` (multiplicando e dividindo por 100) nos endpoints, dessa forma a API consome e retorna valores decimais, mas internamente trabalha com inteiros.

## Modelagem do Banco de Dados

Analisando os requisitos do desafio, desenvolvi este diagrama de relação entre entidades.

![Schema](public/dbschema.png)

Além de tabelas para armazenar os dados de Conta, Carteira e Ativo. Criei também duas tabelas para armazenar históricos de operações: uma tabela para armazenar as mudanças nos saldos dos usuários (a partir de depositos e saques) e outra para armazenar o histórico de transações de compra e venda de ativos.

## Rotas 

### Módulos:
As Rotas foram divididas em quatro módulos:

#### Contas 
Todas os endpoints referentes a saque, depósito e consulta de saldos dos usuários.
#### Ativos
Todos os endpoints referentes a consulta de informações de ativos e de carteiras.
#### Investimentos
Todas os endpoints referentes a compra e venda de ativos.
#### Login
O endpoint criado para autenticação e geração de token.

### Validações
Todas as rotas de método `POST` possuem validações nos campos de entrada. Essas validações podem ser encontradas nos `dtos` de seus módulos

### Documentação
A documentação de todas as rotas está disponivel na url /api

![Rotas](public/swagger.png)

# Considerações 
Foi muito desafiador desenvolver esse projeto, pois utilizei tecnologias novas para mim, que não foram abordadas na Trybe. Mas, apesar de não conhecer essas tecnologias, consegui usar meu conhecimento para aprender-las rapidamente.

Contudo, saio engrandecido por percorrer esse caminho de descobertas. Muito conhecimento foi obtido  e desafios foram superados nesse processo. A exemplo disso, posso citar a adaptação à mudança de ORM que houve durante a execução do projeto e a alteração de tipagem em campos do banco de dados.

