FROM node:20.18.0-alpine3.20

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./

RUN npm install
COPY app/ ./app/

EXPOSE 3000
CMD [ "npm", "start" ]