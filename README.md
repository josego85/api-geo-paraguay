# API GEO Paraguay

[![Version](https://img.shields.io/badge/version-2.14.1-blue.svg)](https://github.com/josego85/api-geo-paraguay)
[![License](https://img.shields.io/badge/license-GPL%20v3-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-v22.15.0-green.svg)](https://nodejs.org)
[![Express](https://img.shields.io/badge/express-v5.1.0-lightgrey.svg)](https://expressjs.com)
[![Docker](https://img.shields.io/badge/docker-v27.5.1-blue.svg)](https://www.docker.com/)
[![Redis](https://img.shields.io/badge/redis-v7.4.3-red.svg)](https://redis.io)
[![MySQL](https://img.shields.io/badge/mysql-v8.0.42-orange.svg)](https://www.mysql.com)
[![MongoDB](https://img.shields.io/badge/mongodb-v7.0.19-green.svg)](https://www.mongodb.com)
[![GraphQL](https://img.shields.io/badge/graphql-✓-e10098.svg)](https://graphql.org)
[![SonarQube](https://img.shields.io/badge/code%20quality-sonarqube-4AB6E5.svg)](http://localhost:9000)
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
- [Code Quality](#code-quality)
- [Production Deployment](#production-deployment)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Performance Optimization](#performance-optimization)
- [GeoHash-Based Caching](#geohash-based-caching)
- [Automated Docker Image Monitoring (Diun)](#automated-docker-image-monitoring-diun)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [Support](#support)
- [License](#license)

## Prerequisites

- Node.js v22.15.0 or higher
- NPM 10.9.2 or higher
- Docker v27.5.1 or higher
- Docker Compose
- MySQL 8.0.42
- Redis 7.4.3
- MongoDB 7.0.19

## Features

- Retrieve detailed geographic data (department, district, city, neighborhood) based on coordinates
- Cache integration with Redis for rapid responses
- Secure endpoints following industry-standard practices
- Comprehensive API documentation via Swagger
- GraphQL support for flexible and efficient queries
- Production-ready NGINX integration with rate limiting and security features

## Technologies

- **NodeJS**: v22.15.0 LTS
- **NPM**: 10.9.2
- **Express**: 5.1.0
- **MySQL**: 8.0.42
- **Redis**: 7.4.3 (client: Redis 4.7.0)
- **MongoDB**: Server 7.0.19 (client: Mongoose 8.14.0)
- **Swagger**: For API documentation
- **GraphQL**: Flexible query language for your API
- **Docker**: Version 27.5.1
- **NGINX**: v1.28.0 with `headers-more` module

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
APP_PORT=5000
URL_DOMAIN=http://localhost:5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=paraguay

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=xxxxxxxxxxxxxxxxxxxxxxxxx
REDIS_CACHE_EXPIRATION_TIME=2592000

GEOHASH_PRECISION=7
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

## Testing & Code Quality

### Dependencies Update

```bash
# Check for package updates
npx npm-check-updates

# Update package.json with new versions
npx npm-check-updates -u
```

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

## Code Quality

This project uses **SonarQube** for continuous inspection of code quality, security vulnerabilities, and maintainability.

For setup instructions and detailed analysis configuration, please refer to the [SONARQUBE.md](docs/SONARQUBE.md) file.

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
- CORS and Helmet
- SQL injection protection
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

- Redis-based location caching
- Request limiters
- Swagger + GraphQL optimizations
- DB indexes and connection pooling

## GeoHash-Based Caching

As of version **2.13.0**, the API now supports **GeoHash-based caching** using Redis to improve performance for reverse geocoding queries.

### How It Works

- Coordinates (`longitude`, `latitude`) are converted into a **GeoHash** string using 7-character precision (~76 meters).
- The GeoHash is used as a Redis cache key (e.g., `GEO_CACHE:6gkzwgj`).
- When a query is made:
  - The system checks Redis for an existing entry using the generated GeoHash key.
  - If found, the cached data is returned.
  - If not, the system performs the lookup and stores the result in Redis for future requests.

### Benefits

- Reduces reverse geocoding processing time.
- Efficiently groups nearby coordinates into a single cache key.
- Minimizes repeated lookups for similar locations.
- Works seamlessly with the existing Redis layer.

### Example

```bash
curl http://87.106.81.190/api/v1/reverse-geocode?lat=-25.263812&lon=-57.635812
```

The response will be cached under:

```
GEO_CACHE:6gkzwgj
```

> 📌 **Note**: The GeoHash precision level is fixed to ensure consistent caching. Changing the precision will result in different keys.

## Automated Docker Image Monitoring (Diun)

As of version **2.14.0**, the project integrates **[Diun](https://crazymax.dev/diun/)** (Docker Image Update Notifier) to automatically detect and monitor updates of Docker images used in the project.

### Key Features

- Monitors running Docker containers for image updates.
- Watches specific static images like NodeJS and NGINX versions.
- Alerts (planned) can be configured via Email, Slack, Telegram, etc.

### Documentation

Detailed setup and usage instructions are available in the [DIUN.md](docs/DIUN.md) file.

## Contributing

We welcome contributions from the community! Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for detailed guidelines on how to contribute to this project.

## Changelog

For a detailed list of changes and updates, please refer to the [CHANGELOG.md](CHANGELOG.md) file.

## Support

If you encounter any issues or have feature requests, please refer to the [SUPPORT.md](docs/SUPPORT.md) file for guidance on how to get help.

## License

GNU General Public License v3.0

---

© 2025 API GEO Paraguay
