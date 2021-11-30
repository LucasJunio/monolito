FROM node:14.17.3-alpine

WORKDIR /app/

COPY package*.json /app/

RUN npm install npm@latest -g
RUN npm install

COPY . /app/

EXPOSE 80

CMD [ "node", "index.js" ]