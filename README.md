# API GEO Paraguay

[![Version](https://img.shields.io/badge/version-2.18.5-blue.svg)](https://github.com/josego85/api-geo-paraguay)
[![License](https://img.shields.io/badge/license-GPL%20v3-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-v22.18.0-green.svg)](https://nodejs.org)
[![Express](https://img.shields.io/badge/express-v5.1.0-lightgrey.svg)](https://expressjs.com)
[![Docker](https://img.shields.io/badge/docker-v27.5.1-blue.svg)](https://www.docker.com/)
[![Redis](https://img.shields.io/badge/redis-v8.2.1-red.svg)](https://redis.io)
[![MySQL](https://img.shields.io/badge/mysql-v8.0.43-orange.svg)](https://www.mysql.com)
[![MongoDB](https://img.shields.io/badge/mongodb-v7.0.23-green.svg)](https://www.mongodb.com)
[![GraphQL](https://img.shields.io/badge/graphql-✓-e10098.svg)](https://graphql.org)
[![NGINX](https://img.shields.io/badge/nginx-v1.29.1-brightgreen.svg)](https://nginx.org)
[![SonarQube](https://img.shields.io/badge/code%20quality-sonarqube-4AB6E5.svg)](http://localhost:9000)
[![CodeQL](https://github.com/josego85/api-geo-paraguay/workflows/CodeQL/badge.svg)](https://github.com/josego85/api-geo-paraguay/actions)
[![Maintenance](https://img.shields.io/badge/maintained-yes-green.svg)](https://github.com/josego85/api-geo-paraguay/graphs/commit-activity)

**API GEO Paraguay** delivers precise geographical information for Paraguay via **REST** & **GraphQL**.

API GEO Paraguay is a powerful service that provides precise geographical information for Paraguay based on given coordinates (latitude and longitude). The API supports both traditional REST endpoints and a flexible GraphQL interface, giving you multiple options for querying geographic data including details on departments, districts, cities, and neighborhoods.

The production setup leverages both NGINX caching and Redis caching for improved performance, scalability, and rapid API responses.

## Quick Links

- [Getting Started Guide](docs/guides/setup.md)
- [API Documentation](docs/api/README.md)
- [REST API](docs/guides/rest.md)
- [GraphQL API](docs/guides/graphql.md)
- [Security & Performance](docs/guides/security.md)
- [Development Guide](docs/development/README.md)
- [API & Security Validation](docs/development/spectral.md)
  - [API Contract Validation](docs/development/spectral.md#api-contract-validation)
  - [Security Validation](docs/development/spectral.md#security-validation-with-pre-commit)
- [Support](docs/SUPPORT.md)
- [Changelog](CHANGELOG.md)

## Core Features

- REST & GraphQL APIs for geographical data
- Redis caching with GeoHash optimization
- **NGINX caching for API responses to improve performance and reduce backend load**
- Security-first design
- Production-ready with Docker support

## Database Architecture

- **MySQL**: Primary database for geographical data (departments, districts, cities, neighborhoods)
- **MongoDB**: Logging and analytics storage
- **Redis**: High-performance caching and GeoHash lookup

## Features

- Retrieve detailed geographic data (department, district, city, neighborhood) based on coordinates
- Cache integration with Redis for rapid responses
- **NGINX caching for frequently accessed API endpoints**
- Secure endpoints following industry-standard practices
- Comprehensive API documentation via Swagger
- GraphQL support for flexible and efficient queries
- Production-ready NGINX integration with rate limiting and security features
- Flexible sorting options for all geographic endpoints ([see REST API docs](docs/guides/rest.md#sorting))

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

GNU General Public License v3.0

---

© 2025 API GEO Paraguay
