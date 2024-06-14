FROM node:16.20.2-alpine3.17

WORKDIR /app
COPY package.json /app

RUN npm install
COPY . /app
EXPOSE 3000
CMD [ "npm", "start" ]