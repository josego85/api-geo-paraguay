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
  - [NGINX Configuration](#nginx-configuration)
  - [Security Features](#security-features)
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
- **Production-ready NGINX integration** with rate limiting and request size restrictions.

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
- **NGINX**: v1.27.4 with `headers-more` module for enhanced security

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
   ```

2. **View logs for all services:**

   ```bash
   docker compose -f docker-compose.prod.yml logs -f
   ```

3. **View logs for a specific service (e.g., NGINX):**

   ```bash
   docker compose -f docker-compose.prod.yml logs -f nginx
   ```

4. **Stop the production containers:**

   ```bash
   docker compose -f docker-compose.prod.yml down
   ```

### NGINX Configuration

For production, NGINX is configured to handle incoming requests efficiently and securely. Below are the key configurations:

1. **Rate Limiting**:

   - Limits the number of requests per IP to prevent abuse.
   - Configured using `limit_req_zone` and `limit_req`.

2. **Request Size Restriction**:

   - Limits the size of incoming requests to 2MB using `client_max_body_size`.

3. **Custom Server Signature**:

   - Hides the NGINX version and customizes the `Server` header using the `headers-more` module.

4. **SSL/TLS**:
   - Ensure secure communication by configuring SSL certificates with Let's Encrypt.

Example NGINX configuration:

```nginx
server {
    listen 80;
    server_name localhost;

    client_max_body_size 2m;
    server_tokens off;

    location / {
        limit_req zone=req_limit_per_ip burst=20 nodelay;
        limit_req_status 429;

        proxy_pass http://app:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        more_set_headers "Server: Custom-Server";
    }
}
```

### Security Features

The production setup includes the following security measures:

1. **Rate Limiting**:

   - Prevents abuse by limiting the number of requests per IP.

2. **Request Size Restriction**:

   - Protects the server from large payloads by limiting request sizes.

3. **Custom Server Signature**:

   - Hides the NGINX version to reduce exposure to potential vulnerabilities.

4. **Environment Variables**:

   - Sensitive data such as database credentials and API keys are managed securely using environment variables.

5. **Redis Authentication**:

   - Redis is secured with a password to prevent unauthorized access.

6. **GraphQL Query Validation**:
   - Limits query complexity and depth to prevent abuse of the GraphQL API.

### Monitoring and Maintenance

To ensure smooth operation in production, consider the following:

1. **Health Checks**:

   - Use the built-in health checks in `docker-compose.prod.yml` for MySQL, Redis, and other services to monitor their status.

2. **Monitoring Tools**:

   - Integrate tools like **Prometheus** and **Grafana** for real-time monitoring of resource usage and application performance.
   - Use **ELK Stack (Elasticsearch, Logstash, Kibana)** or **Graylog** for centralized log management.

3. **Backup Strategy**:

   - Schedule regular backups for the MySQL and MongoDB databases.
   - Use tools like `mysqldump` for MySQL and `mongodump` for MongoDB.

4. **Scaling**:

   - Use Docker Swarm or Kubernetes to scale services horizontally if traffic increases.

5. **SSL/TLS Certificates**:

   - Ensure SSL certificates are renewed automatically using tools like **Certbot**.

6. **Environment Variables**:

   - Keep sensitive data like database credentials and API keys secure by using `.env` files or Docker secrets.

7. **Error Tracking**:
   - Use tools like **Sentry** to track and debug errors in production.

## License

This project is licensed under the GNU General Public License v3.0.

## Support

For issues or feature requests, please open a new issue in the [GitHub repository](https://github.com/josego85/api-geo-paraguay/issues).

---

© 2025 API GEO Paraguay
