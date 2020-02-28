FROM node:12-alpine

RUN mkdir /client
WORKDIR /client

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8089

CMD [ "npm", "run", "start" ]
