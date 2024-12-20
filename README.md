
# Teste Irroba - Back-End

Este é um projeto back-end desenvolvido para gerenciar um sistema de campeonatos. Ele utiliza **Node.js**, **Express**, **Sequelize**, e **Jest** para testes.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) - versão 16.x ou superior.
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) para gerenciamento de pacotes.
- [Docker](https://www.docker.com/) (opcional, caso prefira usar um banco de dados containerizado).
- Um banco de dados PostgreSQL.
- Python (v3.8 ou superior)

---

## 🚀 Como executar o projeto

### 1. Configuração do ambiente
1. Renomeie o arquivo `.env.example` para `.env` no diretório raiz do projeto.
2. Configure as variáveis de ambiente no `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_NAME=nome_do_banco
   DB_DIALECT=mysql
   ```

### 2. Instale as dependências
Execute o comando abaixo na raiz do projeto para instalar as dependências:

```bash
npm install
```

### 3. Configure o banco de dados
Crie o banco de dados definido na variável `DB_NAME` manualmente ou com um cliente de banco de dados.

Depois, execute as migrações e seeders para criar e popular as tabelas:

```bash
npx sequelize db:migrate
npx sequelize db:seed:all
```
### 4. Configuração do Python

#### Instalando dependências do Python

O projeto também inclui scripts Python para tarefas adicionais. Certifique-se de instalar as dependências executando:

```bash
pip install -r requirements.txt
```

#### Configurando as variáveis de ambiente do Python

Certifique-se de configurar as variáveis de ambiente adequadas no arquivo `.env` ou diretamente no sistema, caso necessário para os scripts Python.


### 5. Inicie o servidor
Para iniciar o servidor, use o comando:

```bash
npm start
```

O servidor estará rodando em [http://localhost:3000](http://localhost:3000).

---

## 🧪 Como executar os testes

Para rodar os testes, execute:

```bash
npm test
```

Isso executará os testes unitários e gerará relatórios de cobertura no diretório `coverage/`.

---

Testando a API
Collection do Postman
Utilize a Collection do Postman para testar os endpoints da API. Você pode importar a collection usando o link abaixo:

Collection do Postman - Teste Irroba
https://zucgg-collection.postman.co/workspace/teste-irroba-carlos~b5b909ed-f5ab-49cf-ba96-c44664bc52a5/collection/16164207-0f960d16-a019-4701-b649-127533619aef?action=share&creator=16164207

## 📂 Estrutura do projeto

- **config/**: Configurações do banco de dados.
- **model/**: Configurações do Sequelize.
- **migrations/**: Arquivos de migração para criar ou alterar tabelas.
- **seeders/**: Scripts para popular tabelas com dados iniciais.
- **src/**:
  - **services/**: Regras de negócio e operações com dados.
  - **routes/**: Rotas da API.
  - **controllers/**: Lógica das requisições.
  - **models/**: Definições das tabelas e relacionamentos do Sequelize.
- **test/**: Testes unitários e de integração.

---

## 🛠 Tecnologias utilizadas

- **Node.js**
- **Python**
- **Express**
- **Sequelize**
- **PostgreSQL**
- **Jest**

---

## 📝 Notas

1. Caso utilize **Docker**, configure o container com a imagem do MySQL:
   ```bash
   docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=sua_senha -e MYSQL_DATABASE=nome_do_banco -p 3306:3306 -d mysql:latest
   ```

2. Para alterar as configurações de porta e ambiente, edite as variáveis no `.env`.

---

## 🤝 Contribuição

Sinta-se à vontade para abrir **issues** ou enviar **pull requests**. 

---

## 🧑‍💻 Autor

**Carlos Eduardo Silva de Oliveira**
