# Usa a imagem Node 18
FROM node:18

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia o código da aplicação
COPY . .

# Instala as dependências
RUN npm install

# Compila a aplicação
RUN npm run build

# Expõe a porta 4000 (ou qualquer que seja a porta utilizada)
EXPOSE 4173

# Define o comando para iniciar a aplicação
ENTRYPOINT ["npm", "run", "preview"]