<div align="center" >
  <h1>Prosel EcompJR</h1>
</div>

<div align="center">

![Most used language](https://img.shields.io/github/languages/top/jnaraujo/prosel-ecompjr?style=flat-square)
[![Website ecompjr-prosel.netlify.app](https://img.shields.io/website-up-down-green-red/https/ecompjr-prosel.netlify.app/.svg)](https://ecompjr-prosel.netlify.app/)

</div>

<p>
 O projeto foi criado como parte do processo seletivo da EcompJr, empresa júnior de computação da UEFS. O objetivo era criar um site para a empresa, junto com um formulário de contato e um sistema de login para os membros da empresa. Na dashboard, os membros podem visualizar e deletar os formulários enviados, além de ser possivel criar, atualizar e deletar membros.
</p>

## 📌 Índice

- [Tecnologias](#-tecnologias)
- [Como executar](#-como-executar)
  - [Pré-requisitos](#pré-requisitos)
  - [Backend](#backend)
  - [Frontend](#frontend)

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Pnpm](https://pnpm.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Python](https://www.python.org/)
- [Poetry](https://python-poetry.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [MySQL](https://www.mysql.com/)
- [Nginx](https://www.nginx.com/)
- [Docker](https://www.docker.com/)

## 🚀 Como executar

### Pré-requisitos

Antes de mais nada, é necessário ter as tecnologias listadas acima instaladas na sua máquina. Algumas delas serão utilizadas somente no backend, outras somente no frontend e outras em ambos. Tecnologias como Mysql e Nginx serão gerencias pelo Docker, então não é necessário instalá-las na máquina.

Vale destacar que o nginx não é necessário para o ambiente de desenvolvimento, mas é necessário para o ambiente de produção. É possível executar o projeto sem o docker, mas será necessario instalar o mysql na sua máquina. O arquivo de inicialização do banco de dados está em `/server/init.sql`.

Como passo inicial, clone o repositório:

```bash
git clone git@github.com:jnaraujo/prosel-ecompjr.git
```

Em seguida, acesse a pasta do projeto:

```bash
cd prosel-ecompjr
```

A partir de agora, os passos serão divididos em backend e frontend.

### Backend

Para executar o backend, é necessário ter o [Python](https://www.python.org/) e o [Poetry](https://python-poetry.org/) instalados na sua máquina. Além disso, é necessário ter o [Docker](https://www.docker.com/) instalado.

Primeiro, acesse a pasta do backend:

```bash
cd server
```

Em seguida, instale as dependências:

```bash
poetry install
```

Antes de executar o projeto, é necessário criar um arquivo `.env` na raiz do projeto. O arquivo `.env.example` pode ser usado como base. Um exemplo de arquivo `.env` é:

```bash
MYSQL_ROOT_PASSWORD=123456
DATABASE_URL=mysql+pymysql://root:123456@localhost:3306/ecompjr
JWT_SECRET_KEY=secret
```

Para rodar o banco de dados pelo docker, execute o seguinte comando:

```bash
docker-compose up -d db
```

Por fim, execute o projeto:

```bash
poetry run uvicorn main:app --reload --port 3000
```

### Frontend

Para executar o frontend, é necessário ter o [Node.js](https://nodejs.org/en/) instalado na sua máquina. Além disso, é necessário ter o [Pnpm](https://pnpm.io/) instalado globalmente.

Primeiro, acesse a pasta do frontend:

```bash
cd web
```

Em seguida, instale as dependências:

```bash
pnpm install
```

Antes de executar o projeto, é necessário criar um arquivo `.env` na raiz do projeto. O arquivo `.env.example` pode ser usado como base. Um exemplo de arquivo `.env` é:

```bash
VITE_API_URL=http://localhost:8000
```

Por fim, execute o projeto:

```bash
pnpm dev
```