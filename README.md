# API GEO Paraguay

[![Version](https://img.shields.io/badge/version-2.17.2-blue.svg)](https://github.com/josego85/api-geo-paraguay)
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

**API GEO Paraguay** delivers precise geographical information for Paraguay via **REST** & **GraphQL**.

API GEO Paraguay is a powerful service that provides precise geographical information for Paraguay based on given coordinates (latitude and longitude). The API supports both traditional REST endpoints and a flexible GraphQL interface, giving you multiple options for querying geographic data including details on departments, districts, cities, and neighborhoods.

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
- Security-first design
- Production-ready with Docker support

## Security Considerations

### HTTPS and Strict-Transport-Security (HSTS)

For any production deployment, it is **critically important** to configure your application to be served over **HTTPS (SSL/TLS)**. HTTPS encrypts data in transit, protecting it from eavesdropping and tampering.

Many web security features, including **HTTP Strict Transport Security (HSTS)**, rely on HTTPS. HSTS is a security policy mechanism that helps to protect websites against protocol downgrade attacks and cookie hijacking. It allows web servers to declare that web browsers (or other complying user agents) should only interact with it using secure HTTPS connections, and never via the insecure HTTP protocol.

**Recommendation:**

1.  **Enable HTTPS**: Configure your environment (e.g., via a reverse proxy like Nginx or directly in Node.js if applicable) to use SSL/TLS certificates and serve all traffic over HTTPS.
    *   **Note on SSL Certificates**: Using direct IP addresses (without a DNS hostname) makes obtaining and using standard SSL certificates challenging. It is highly recommended to use a registered DNS name for your service to properly secure it with HTTPS.
2.  **Implement HSTS**: Once HTTPS is correctly set up and all traffic is being served exclusively over HTTPS, enable the `Strict-Transport-Security` header. In this application's `app/middleware/security.middleware.js`, this can be achieved by adding or uncommenting a line similar to `app.use(helmet.hsts({ maxAge: 15552000, includeSubDomains: true, preload: true }));` (15552000 seconds is equivalent to 6 months). Ensure this is only done after HTTPS is fully functional.

Using HTTP without encryption should be strictly limited to local development environments.

## Database Architecture

- **MySQL**: Primary database for geographical data (departments, districts, cities, neighborhoods)
- **MongoDB**: Logging and analytics storage
- **Redis**: High-performance caching and GeoHash lookup

## Features

- Retrieve detailed geographic data (department, district, city, neighborhood) based on coordinates
- Cache integration with Redis for rapid responses
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
