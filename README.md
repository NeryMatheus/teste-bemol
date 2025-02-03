# Teste Bemol - Desenvolvedor

## Guia de Configuração e Execução do Projeto

## Passo a Passo

### 1. Clonar o Projeto

```sh
git clone <URL_DO_REPOSITORIO>
```

### 2. Entrar na Pasta do Projeto e Instalar as Dependências

```sh
cd <NOME_DO_PROJETO>
yarn
```

### 3. Configurar as Variáveis de Ambiente

Copie o arquivo `.env.example` e renomeie para `.env`. Em seguida, configure as variáveis conforme sua necessidade.

### 4. Subir o Ambiente com Docker

Execute o seguinte comando para iniciar os serviços:

```sh
docker-compose up -d
```

Isso inicializará os seguintes componentes:

- **PostgreSQL**
- **RabbitMQ** (acessível em: [http://localhost:15672](http://localhost:15672))

> O contêiner do Docker será criado com o nome da pasta onde o projeto foi clonado.

### 5. Conectar ao Banco de Dados

Utilize um SGBD de sua preferência e conecte-se ao **PostgreSQL** utilizando as credenciais configuradas no arquivo `.env`.

### 6. Criar as Filas no RabbitMQ

```sh
npx ts-node src/common/rabbitmq/createQueue.ts
```

### 7. Executar a Aplicação

Após conectar ao banco de dados, execute o projeto:

```sh
yarn dev
```

Ao iniciar a aplicação:

- Serão executadas migrações para criação das tabelas no banco de dados.
- Será rodado um seed para inserir dados fictícios nas tabelas.

### 8. Acessar a Documentação da API

A documentação, criada com **Swagger**, está disponível em, ou conforme rota configurada no .env:

```
/api-docs
```

### 9. Autenticação

Você pode autenticar-se através dos dados abaixo:

```
email: admin@example.com
senha: admin
```

## Tecnologias Utilizadas

### ✅ Criar um serviço para processar pedidos usando Azure Functions

- Foi utilizado **Node.js/Express** junto com **TypeORM** para o mapeamento objeto-relacional.

### ✅ Utilizar Azure Service Bus para mensageria assíncrona

- Alternativamente, foi utilizado **RabbitMQ** para mensageria assíncrona.

### ✅ Armazenar dados no Azure PostgreSQL Serverless

- Os dados são armazenados no **PostgreSQL** via **Docker**.

### 🚧 Implementar monitoramento com Azure Monitor

- Implementação pendente.

### ✅ Configurar autenticação e autorização via Azure AD

- Foi utilizado **JWT** para autenticação. Todas as rotas exigem um token, exceto a rota de login.

### ✅ Automatizar a infraestrutura com Bicep ou Terraform

- Toda a infraestrutura foi automatizada utilizando **Docker**.

## Entrega Esperada

### ✅ Código-fonte e scripts de automação (em repositório Git)

### ✅ Diagrama da arquitetura.

- A arquitetura pode ser vista a partir de um jpg com o nome de `arquitetura` na raiz do projeto

### ✅ Arquivo README explicando a implementação

### ✅ Scripts SQL para criação das tabelas

- As tabelas foram criadas a partir de migração através do ORM `TypeORM`
