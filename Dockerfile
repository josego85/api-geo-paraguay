FROM node:20.18.0-alpine3.20

WORKDIR /app
COPY package.json /app

RUN npm install
COPY . /app
EXPOSE 3000
CMD [ "npm", "start" ]