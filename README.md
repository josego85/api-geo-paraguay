# API GEO Paraguay

[![Version](https://img.shields.io/badge/version-2.11.0-blue.svg)](https://github.com/josego85/api-geo-paraguay)
[![License](https://img.shields.io/badge/license-GPL%20v3-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-v22.14.0-green.svg)](https://nodejs.org)
[![Express](https://img.shields.io/badge/express-v5.0.1-lightgrey.svg)](https://expressjs.com)
[![Docker](https://img.shields.io/badge/docker-v27.5.1-blue.svg)](https://www.docker.com/)
[![Redis](https://img.shields.io/badge/redis-v7.4-red.svg)](https://redis.io)
[![MySQL](https://img.shields.io/badge/mysql-v8.0-orange.svg)](https://www.mysql.com)
[![MongoDB](https://img.shields.io/badge/mongodb-v7.0-green.svg)](https://www.mongodb.com)
[![GraphQL](https://img.shields.io/badge/graphql-✓-e10098.svg)](https://graphql.org)
[![CodeQL](https://github.com/josego85/api-geo-paraguay/workflows/CodeQL/badge.svg)](https://github.com/josego85/api-geo-paraguay/actions)
[![Maintenance](https://img.shields.io/badge/maintained-yes-green.svg)](https://github.com/josego85/api-geo-paraguay/graphs/commit-activity)

API GEO Paraguay is a powerful service that provides precise geographical information for Paraguay based on given coordinates (latitude and longitude). The API supports both traditional REST endpoints and a flexible GraphQL interface, giving you multiple options for querying geographic data including details on departments, districts, cities, and neighborhoods.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Features](#features)
- [Technologies](#technologies)
- [Quick Start](#quick-start)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [API Examples](#api-examples)
- [GraphQL Support](#graphql-support)
- [API Documentation](#api-documentation)
- [Testing & Code Quality](#testing--code-quality)
- [Production Deployment](#production-deployment)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Performance Optimization](#performance-optimization)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [Support](#support)
- [License](#license)

## Prerequisites

- Node.js v22.14.0 or higher
- NPM 11.2.0 or higher
- Docker v27.5.1 or higher
- Docker Compose
- MySQL 8.0
- Redis 7.4.x
- MongoDB 7.0

## Features

- Retrieve detailed geographic data (department, district, city, neighborhood) based on coordinates
- Cache integration with Redis for rapid responses
- Secure endpoints following industry-standard practices
- Comprehensive API documentation via Swagger
- GraphQL support for flexible and efficient queries
- Production-ready NGINX integration with rate limiting and security features

## Technologies

- **NodeJS**: v22.14.0 LTS
- **NPM**: 11.2.0
- **Express**: 5.0.1
- **MySQL**: 8.0.xx
- **Redis**: 7.4.x (client: Redis 4.7.0)
- **MongoDB**: Server 7.0 (client: Mongoose 8.12.2)
- **Swagger**: For API documentation
- **GraphQL**: Flexible query language for your API
- **Docker**: Version 27.5.1
- **NGINX**: v1.27.4 with `headers-more` module

## Quick Start

### Local Development

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment:**

   ```bash
   cp .env.example .env
   ```

3. **Start the application:**
   ```bash
   npm start
   ```

### Docker Development

```bash
docker compose -f docker-compose.dev.yml up --build -d
docker compose logs -f
```

## Environment Configuration

The `.env` file is required for both development and production environments. Below is a basic example:

```env
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=paraguay
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Development Environment

- Ensure local database and Redis instances are running.

### Production Environment

- Update database and Redis credentials to match your production setup.
- Ensure sensitive information is stored securely (e.g., use a secrets manager).

## Database Setup

### MySQL Import

1. **Extract SQL dump:**

   ```bash
   tar xzvf database/paraguay.sql.tar.gz
   ```

2. **Copy to container:**

   ```bash
   docker cp paraguay.sql database-api-geo-paraguay:/paraguay.sql
   ```

3. **Import database:**
   ```bash
   docker exec -it database-api-geo-paraguay sh
   mysql -u root -p paraguay < paraguay.sql
   exit
   ```

### Database Permissions

```bash
docker cp database/init.sql database-api-geo-paraguay:/init.sql
docker exec -it database-api-geo-paraguay sh
mysql -u root -p < init.sql
exit
```

## API Examples

### REST Endpoints

```bash
# Get all departments
curl http://87.106.81.190/api/v1/departamentos

# Get department by ID
curl http://87.106.81.190/api/v1/departamentos/1
```

## GraphQL Support

GraphQL provides a flexible way to query data. Below are some examples:

### Query Examples

```graphql
# Get a single department
query {
  department(id: 1) {
    departamento_nombre
    departamento_capital
  }
}

# Get all departments and cities
query {
  departments {
    departamento_id
    departamento_nombre
  }
  cities {
    ciudad_nombre
  }
}
```

### GraphQL Playground

- Access the GraphQL Playground at `http://87.106.81.190/graphql` to test queries interactively.

## API Documentation

You can access the Swagger API documentation at the following URL:

- **Swagger Documentation**: [http://87.106.81.190/api-docs/](http://87.106.81.190/api-docs/)

## Contributing

We welcome contributions from the community! Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for detailed guidelines on how to contribute to this project.

## Changelog

For a detailed list of changes and updates, please refer to the [CHANGELOG.md](CHANGELOG.md) file.

## Support

If you encounter any issues or have feature requests, please refer to the [SUPPORT.md](SUPPORT.md) file for guidance on how to get help.

## Testing & Code Quality

### Format & Lint

```bash
# Prettier
npm run format:check
npm run format:write

# ESLint
npm run lint:check
npm run lint:fix
```

### Unit Tests

```bash
docker exec -it app-api-geo-paraguay sh
npm run test
```

## Production Deployment

### Build

```bash
npm run build
```

### Docker Production

```bash
# Start
docker compose -f docker-compose.prod.yml up --build -d

# Logs
docker compose -f docker-compose.prod.yml logs -f

# Stop
docker compose -f docker-compose.prod.yml down
```

## Security

### Implemented Measures

- Rate limiting (NGINX + Express)
- Request size restrictions (2MB max)
- CORS policy
- Helmet security headers
- SQL injection prevention
- GraphQL query depth limiting
- Redis authentication
- Environment variable protection

## Troubleshooting

### Common Issues

1. **Rate Limiting (HTTP 429)**

   - Wait for the cooling period
   - Check NGINX configuration

2. **Database Connections**

   - Verify credentials in `.env`
   - Check container status
   - Verify Redis connection

3. **Performance Issues**
   - Check Redis cache status
   - Verify connection pooling
   - Monitor NGINX logs

## Performance Optimization

- Database connection pooling
- Redis caching layer
- NGINX response caching
- GraphQL query optimization
- Request size limits

## License

GNU General Public License v3.0

## Support

Issues and feature requests: [GitHub Issues](https://github.com/josego85/api-geo-paraguay/issues)

---

© 2025 API GEO Paraguay
