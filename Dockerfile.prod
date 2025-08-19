FROM node:22.18.0-alpine3.22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22.18.0-alpine3.22 AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
RUN npm install --omit=dev
EXPOSE 5000
CMD ["node", "dist/bundle.js"]

