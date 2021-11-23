FROM node:lts-alpine

WORKDIR /app/

COPY package*.json /app/

RUN npm install npm@latest -g
RUN npm install

COPY . /app/

EXPOSE 80

CMD [ "node", "index.js" ]