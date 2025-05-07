# Tripleten web_project_api_full

Web Project API Full - Projeto 18

Este repositório contém a versão final do projeto full-stack desenvolvido ao longo do curso, integrando front-end (React) e back-end (Node.js + Express + MongoDB). O objetivo principal é consolidar conhecimentos sobre autenticação, autorização, validação de dados, tratamento de erros, deployment e conexão entre cliente e servidor.

---- Funcionalidades da Aplicação ----

Registro e login de usuários com autenticação JWT
Armazenamento de senhas criptografadas (bcrypt)
Validação de dados com Celebrate e Joi
Edição de perfil do usuário
Adição, exclusão e like de cartões
Proteção de rotas com middleware de autorização
Middleware centralizado de tratamento de erros
Registro de logs de requisições e erros (request.log e error.log)
Deploy completo com domínio.

---- Autenticação & Autorização ----

Autenticação baseada em tokens JWT
Dados armazenados de forma segura com bcrypt
Senhas não retornadas em nenhuma resposta da API
Usuários autenticados somente podem modificar seus próprios dados
Rota protegida: /users/me retorna dados do usuário logado

---- Tecnologias Utilizadas ----

Back-end:

Node.js
Express.js
MongoDB (Mongoose)
Celebrate + Joi + Validator
JSON Web Token (JWT)
Winston + express-winston (logs)
CORS

Front-end:

React
React Router
Context API
LocalStorage (para persistência do token)
Fetch API com envio de token nos headers

---- Instalação Local ----

Pré-requisitos:
Node.js
MongoDB
npm ou yarn
