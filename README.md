# API GEO Paraguay

[![Version](https://img.shields.io/badge/version-2.20.3-blue.svg)](https://github.com/josego85/api-geo-paraguay)
[![License](https://img.shields.io/badge/license-GPL%20v3-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-v22.21.1-green.svg)](https://nodejs.org)
[![Express](https://img.shields.io/badge/express-v5.1.0-lightgrey.svg)](https://expressjs.com)
[![Docker](https://img.shields.io/badge/docker-v27.5.1-blue.svg)](https://www.docker.com/)
[![Redis](https://img.shields.io/badge/redis-v8.2.3-red.svg)](https://redis.io)
[![MySQL](https://img.shields.io/badge/mysql-v8.0.44-orange.svg)](https://www.mysql.com)
[![MongoDB](https://img.shields.io/badge/mongodb-v7.0.25-green.svg)](https://www.mongodb.com)
[![GraphQL](https://img.shields.io/badge/graphql-✓-e10098.svg)](https://graphql.org)
[![NGINX](https://img.shields.io/badge/nginx-v1.29.3-brightgreen.svg)](https://nginx.org)
[![SonarQube](https://img.shields.io/badge/code%20quality-sonarqube-4AB6E5.svg)](http://localhost:9000)
[![CodeQL](https://github.com/josego85/api-geo-paraguay/workflows/CodeQL/badge.svg)](https://github.com/josego85/api-geo-paraguay/actions)
[![Maintenance](https://img.shields.io/badge/maintained-yes-green.svg)](https://github.com/josego85/api-geo-paraguay/graphs/commit-activity)

**API GEO Paraguay** delivers precise geographical information for Paraguay via **REST** & **GraphQL**.

API GEO Paraguay is a powerful service that provides precise geographical information for Paraguay based on given coordinates (latitude and longitude). The API supports both traditional REST endpoints and a flexible GraphQL interface, giving you multiple options for querying geographic data including details on departments, districts, cities, and neighborhoods.

The production setup leverages both NGINX caching and Redis caching for improved performance, scalability, and rapid API responses.

<p align="center">
  <img src="docs/assets/rest-get-cities-filtered-sorted.png" alt="Example of a REST API query with filtering and sorting" width="90%">
  <br>
  <em>A REST API query showing filtering by name and sorting results in descending order.</em>
</p>

<details>
<summary>Click to see more examples from the gallery</summary>

### Basic REST Query: All Departments

_A REST API call that returns all departments in Paraguay._

<p align="center">
  <img src="docs/assets/rest-get-all-departments.png" alt="Example of a GET request for all departments" width="90%">
</p>

### REST Query: Paginated Districts

_A REST API call that returns all districts, using page=1 and limit=3 for pagination._

<p align="center">
  <img src="docs/assets/rest-get-districts-paginated.png" alt="Example of pagination in the REST API" width="90%">
</p>

### GraphQL Query

_An example of a GraphQL query._

<p align="center">
  <img src="docs/assets/graphql-query-example.png" alt="Example of a GraphQL query" width="90%">
</p>

### Interactive Documentation with Swagger

_Shows the Swagger UI developers use to explore the API._

<p align="center">
  <img src="docs/assets/api-swagger-documentation.png" alt="API documentation with Swagger UI" width="90%">
</p>

</details>

## Quick Links

- [Getting Started Guide](docs/guides/setup.md)
- [API Documentation](docs/api/README.md)
- [REST API](docs/guides/rest.md)
- [GraphQL API](docs/guides/graphql.md)
- [Features](docs/guides/features.md)
- [Database Architecture](docs/development/architecture.md)
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

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

GNU General Public License v3.0

---

© 2025 API GEO Paraguay
