# Revali


## Pré-requisitos

Certifique-se de ter o seguinte software instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
npm install
````

## Executando o Projeto Desenvolvimento
Para rodar o projeto em um ambiente de desenvolvimento, execute:
```bash
npm run dev
```
Este comando iniciará o servidor de desenvolvimento do Vite. O projeto estará acessível em http://localhost:5173 por padrão.

## Produção
Para criar uma build otimizada para produção, execute:

```bash
npm run build
```
Este comando irá gerar os arquivos de build otimizados na pasta dist.

Para visualizar a build de produção localmente, você pode usar o comando:

```bash
npm run preview
```

Este comando irá iniciar um servidor local para pré-visualização da build de produção em http://localhost:4173.
