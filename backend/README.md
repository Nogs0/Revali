# Projeto Backend em Laravel

Este projeto é uma API backend desenvolvida utilizando o framework Laravel.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- **PHP** (>=7.3.19)
- **Composer** (gerenciador de dependências do PHP)
- **MySQL** (ou outro banco de dados relacional)
- **Git** (para clonar o repositório)

## Configuração Inicial

### 1. Clonar o Repositório

Primeiro, clone o repositório do projeto para sua máquina local:

```bash
git clone https://github.com/Nogs0/Revali.git
cd .\backend\

### 2. Instalar Dependências

Em seguida, instale todas as dependências PHP usando o Composer:

composer install

### 3. Configurar o Arquivo .env

Copie o arquivo .env.example para .env e configure as variáveis de ambiente:

cp .env.example .env

Substitua a linha 14 e 15 do .env por:
DB_DATABASE=revali_db
DB_USERNAME=root

### 4. Gerar a Chave da Aplicação

Gere a chave da aplicação usando o Artisan:

php artisan key:generate

### 5. Migrar o Banco de Dados

Execute as migrações para criar as tabelas no banco de dados:

php artisan migrate

### 6. Executar o Servidor de Desenvolvimento

Finalmente, inicie o servidor de desenvolvimento do Laravel:

php artisan serve




