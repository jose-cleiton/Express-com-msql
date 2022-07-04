# usando uma imagem do nodejs
FROM node
# cria uma pasta onde serão armazenados os arquivos do projeto
WORKDIR /app
# copia o arquivo de configuração do projeto para a pasta do container
COPY package.json package-lock.json 
# copia o arquivo de script do projeto para a pasta do container
COPY . .
# executa o comando npm install para instalar os dependências do projeto
RUN npm ci --only=production
# permite a inserção de variaveis de ambiente
ENV \
 MSQL_HOST=localhost \
  MSQL_USER=root \
  MSQL_PORT=3306 \
  MSQL_PASSWORD=1234 \
  MSQL_DATABASE=db
# executa o comando npm start para iniciar o projeto
CMD ["npm", "start"]