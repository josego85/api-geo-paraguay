FROM node:22.18.0-alpine3.22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ------------------------------------------
FROM node:22.18.0-alpine3.22 AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist

EXPOSE 5000

CMD ["node", "dist/bundle.js"]
