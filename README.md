# API GEO Paraguay

API GEO Paraguay is a powerful service that provides precise geographical information for Paraguay based on given coordinates (latitude and longitude). The API supports both traditional REST endpoints and a flexible GraphQL interface, giving you multiple options for querying geographic data including details on departments, districts, cities, and neighborhoods.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Quick Start](#quick-start)
  - [Local Development](#local-development)
  - [Docker (Development)](#docker-development)
- [Database Setup](#database-setup)
- [Testing & Code Quality](#testing--code-quality)
- [API Documentation](#api-documentation)
- [GraphQL Support](#graphql-support)
- [Production](#production)
- [License](#license)
- [Support](#support)

## Overview

API GEO Paraguay simplifies the integration of geolocation data into your applications by offering high precision information based on coordinates. Whether you prefer to use REST endpoints or the GraphQL interface, our API delivers comprehensive geographic data—covering departments, districts, cities, and neighborhoods—ideal for applications in logistics, tourism, research, and urban planning.

## Features

- Retrieve detailed geographic data (department, district, city, neighborhood) based on coordinates.
- Cache integration with Redis for rapid responses.
- Secure endpoints following industry-standard practices.
- Comprehensive API documentation via Swagger.
- **GraphQL Support:** In addition to REST endpoints, use GraphQL for tailored and efficient queries.

## Technologies

- **NodeJS**: v22.14.0 LTS
- **NPM**: 11.2.0
- **Express**: 5.0.1
- **MySQL**: 8.0.xx
- **Redis**: 7.4.x (client: Redis 4.7.0)
- **MongoDB**: Server 7.0 (client: Mongoose 8.12.1)
- **Swagger**: For API documentation
- **GraphQL**: Flexible query language for your API
- **Docker**: Version 27.5.1

## Quick Start

### Local Development

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Copy and update environment configuration:**

   ```bash
   cp .env.example .env
   ```

3. **Run the application:**

   ```bash
   npm start
   ```

### Docker (Development)

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development environment:**

   ```bash
   docker compose -f docker-compose.dev.yml up --build -d
   docker compose logs -f
   ```

## Database Setup

### Import Database (MySQL 8.0)

1. **Extract the SQL dump:**

   ```bash
   tar xzvf database/paraguay.sql.tar.gz
   ```

2. **Copy the SQL file into the MySQL container:**

   ```bash
   docker cp paraguay.sql database-api-geo-paraguay:/paraguay.sql
   ```

3. **Import the database:**

   ```bash
   docker exec -it database-api-geo-paraguay sh
   mysql -u root -p paraguay < paraguay.sql
   exit
   ```

## Testing & Code Quality

- **Prettier**  
  Check formatting:

  ```bash
  npm run format:check
  ```

  Auto-format:

  ```bash
  npm run format:write
  ```

- **ESLint**  
  Check linting:

  ```bash
  npm run lint:check
  ```

  Auto-fix linting errors:

  ```bash
  npm run lint:fix
  ```

- **Jest**  
  Run tests:

  ```bash
  docker exec -it app-api-geo-paraguay sh
  npm run test
  ```

## API Documentation

Access the Swagger documentation at:  
[https://api-geo.proyectosbeta.net/api-docs](https://api-geo.proyectosbeta.net/api-docs)

## GraphQL Support

In addition to the REST endpoints, API GEO Paraguay now fully supports GraphQL. Use GraphQL to build custom queries for retrieving geographic data efficiently.

- **Endpoint:** [http://localhost:5000/graphql](http://localhost:5000/graphql)
- **GraphiQL Interface:** Simply visit the endpoint in your browser to access the interactive GraphiQL interface for testing queries.
- **Example Query:**

  ```graphql
  query {
    city(id: 10) {
      ciudad_id
      ciudad_nombre
    }
  }
  ```

## Production

### Build for Production

Build the production bundle:

```bash
npm run build
```

### Docker (Production)

1. **Build and start the production containers:**

   ```bash
   docker compose -f docker-compose.prod.yml up --build -d
   docker compose logs -f
   ```

2. **Nginx Configuration Sample:**

   ```nginx
   server {
       server_name api-geo.proyectosbeta.net www.api-geo.proyectosbeta.net;

       location / {
           proxy_pass http://app:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }

       listen 443 ssl http2;
       ssl_certificate /etc/letsencrypt/live/api-geo.proyectosbeta.net/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/api-geo.proyectosbeta.net/privkey.pem;
       include /etc/letsencrypt/options-ssl-nginx.conf;
       ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
   }
   server {
       if ($host = www.api-geo.proyectosbeta.net) {
           return 301 https://$host$request_uri;
       }
       if ($host = api-geo.proyectosbeta.net) {
           return 301 https://$host$request_uri;
       }
       listen 80;
       server_name api-geo.proyectosbeta.net www.api-geo.proyectosbeta.net;
       return 404;
   }
   ```

## License

This project is licensed under the GNU General Public License v3.0.

## Support

For issues or feature requests, please open a new issue in the [GitHub repository](https://github.com/josego85/api-geo-paraguay/issues).

---

© 2025 API GEO Paraguay
