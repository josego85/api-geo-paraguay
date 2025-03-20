# Changelog

All significant changes to this project are documented in this file.

## [2.10.0] - 2025-03-20

### Fixed

- Resolved issues in the `findByLngLat` model and controller to ensure accurate geolocation queries and improved reliability.

### Changed

- Updated the `package.json` configuration.
- Upgraded Nginx configuration to enforce rate limiting using the "Many Requests" strategy.

### Added

- Integrated a production-ready NGINX service in the Docker Compose configuration.
- Implemented connection pooling for Department and District models to improve database performance.
- Implemented connection pooling for City and Neighborhood models to enhance scalability.
- Enabled IP-based rate limiting in NGINX to prevent abuse and ensure fair usage.
- Configured `client_max_body_size` in NGINX to restrict the size of incoming requests to a maximum of 2MB.
- Added `more_set_headers` configuration in NGINX to customize or hide the server signature.

## [2.9.0] - 2025-03-17

### Fixed

- ESLint configuration.
- Jest testing configuration.
- API endpoint: `/api/v1/departamentos/1`.

### Changed

- Upgraded Node.js to v22.14.0.
- Revised package.json configuration.
- Optimized webpack configuration.

### Added

- New endpoints added to Swagger.
- Endpoint to retrieve a department by ID.
- Endpoint to retrieve a district by ID.
- Endpoint to retrieve a city by ID.
- Endpoint to retrieve a neighborhood by ID.
- GraphQL query for department.
- GraphQL query for district.
- GraphQL query for city.
- GraphQL query for neighborhoods.

### Refactored

- Improved README documentation for clarity and consistency.
- Revised changelog for better readability.
- Enhanced RedisClient implementation using URL.
- Updated Docker Compose configurations for both production and development.
- Optimized tests (api.main.test.js and api.v1.cities.test).
- Corrected district naming.
- Refactored Neighborhood and City controllers for improved performance and maintainability.
- Refactored Department and District controllers for improved performance and maintainability.

## [2.8.0]

### Changed

- Upgraded Node.js to v20.18.3.
- Revised package.json configuration.

## [2.7.0]

### Changed

- Upgraded Node.js to v20.18.2.

## [2.6.0]

### Fixed

- Resolved Redis authentication issues.

### Added

- Upgraded Express to version 5.

## [2.5.0]

### Changed

- Updated package.json to address a critical security vulnerability in Mongoose.

## [2.4.0]

### Changed

- Revised package.json.
- Updated Dockerfiles and project configurations.
- Modified ESLint and Prettier settings.
- Refactored server.js.
- Fixed issues in application controllers.
- Optimized webpack configuration.

## [2.3.0]

### Changed

- Updated package.json.
- Refined Dockerfile for development.
- Revised README documentation.

## [2.2.0]

### Changed

- Updated package.json.
- Fixed server description in Swagger.
- Integrated ESLint and Prettier.
- Corrected version information in Swagger.
- Revised README documentation.
- Updated production Dockerfile.

## [2.1.1]

### Fixed

- Corrected API documentation endpoint.
- Adjusted nodemon configuration in Docker development.

### Refactored

- Applied Prettier formatting.
- Improved ESLint configurations.

## [2.1.0]

### Added

- Modified Docker Compose to change application and service ports.
- Introduced production Dockerfile and corresponding Docker Compose configuration.

## [2.0.0]

### Added

- Implemented MySQL healthcheck in Docker Compose.
- Updated package.json and version dependencies (Redis, MongoDB, Node.js).
- Upgraded MySQL to version 8.0.

### Fixed

- Resolved district data issues in MySQL 8.0.
- Corrected city and neighborhood data for MySQL 8.0.
- Fixed database import issues for MySQL 8.0.

## [1.20.0]

### Added

- Integrated Docker support.

### Changed

- Updated package.json configuration.

## [1.19.0]

### Changed

- Updated package.json configuration.

## [1.18.0]

### Changed

- Updated package.json.

### Added

- Integrated New Relic monitoring.

### Documentation

- Revised README documentation.

## [1.17.0]

### Added

- Implemented Continuous Integration (CI).
- Enhanced environment variable management.

## [1.16.0]

### Documentation

- Revised README documentation.

### Changed

- Updated package.json.

## [1.15.0]

### Refactored

- Adopted the new Prettier configuration.

### Changed

- Updated package.json.

### Documentation

- Revised README documentation.

### Added

- Enhanced security with improved Helmet configuration.
- Implemented rate limiting.
- Added Feature-Policy header.

## [1.14.1]

### Fixed

- Resolved MongoDB warning issues.

### Refactored

- Added constant for MongoDB configuration in the .env file.

## [1.14.0]

### Changed

- Updated package.json configuration.

## [1.13.1]

### Fixed

- Corrected IP logging issues.

### Refactored

- General code refactoring for stability.

## [1.13.0]

### Added

- Introduced log storage functionality.

## [1.12.2]

### Changed

- Updated package.json.

### Documentation

- Revised README documentation.

### Fixed

- Updated Redis client.

### Added

- Introduced unit tests.

### Refactored

- Enhanced code for the cities endpoint.
- Refactored app.js.

## [1.12.1]

### Changed

- Updated package.json.

## [1.12.0]

### Added

- Integrated ESLint and Prettier for development.

## [1.11.0]

### Changed

- Updated dependency versions in package.json.

## [1.10.0]

### Changed

- Updated dependency versions in package.json.

## [1.9.1]

### Fixed

- Corrected the API documentation URL.

## [1.9.0]

### Added

- Provided an endpoint to retrieve all cities for a specific department.

### Changed

- Updated package.json.

## [1.8.0]

### Changed

- Updated package.json.

## [1.7.0]

### Added

- Introduced an endpoint to retrieve longitude and latitude for districts, cities, and neighborhoods.

### Refactored

- General code refactoring.
- Improved CORS security configuration.

## [1.6.3]

### Fixed

- Resolved aliasing issues.

## [1.6.2]

### Fixed

- Various bug fixes.

## [1.6.1]

### Added

- Specified Node.js engine requirement in package.json.

## [1.6.0]

### Refactored

- Modularized code and general project refactoring.

### Added

- Integrated Redis caching for departments, cities, districts, and neighborhoods.
- Added API documentation.

## [1.5.0]

### Added

- Introduced Babel and Webpack for modern JavaScript support.

## [1.4.0]

### Documentation

- Added API documentation.

## [1.3.0]

### Changed

- Prepared package.json for production deployment.

## [1.2.0]

### Added

- Enhanced security using CORS and Helmet.

## [1.1.0]

### Added

- Introduced environment variable support.

## [1.0.0]

### Added

- Initial implementation of API endpoints for departments, neighborhoods, and cities.
