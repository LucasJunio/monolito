FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY . /app/

RUN npm install

EXPOSE 3000


CMD [ "node", "index.js" ]