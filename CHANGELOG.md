# Changelog

All significant changes to this project are documented in this file.

## [2.15.0] - 2025-04-29

### Added

- Integrated Spectral for OpenAPI/AsyncAPI linting:
  - Added `.spectral.yaml` configuration file
  - Implemented API contract validation in CI pipeline
  - Added pre-commit hook for local API spec validation
  - Added npm script `validate:api` for OpenAPI validation
- Migrated Swagger configuration to OpenAPI format:
  - Created `docs/api/openapi.yaml` specification file
  - Updated swagger configuration to use the OpenAPI specification
  - Improved API documentation structure and validation

### Refactored

- Reorganized documentation structure:
  - Moved tool-specific docs (SUPPORT.md, SPECTRAL.md, DIUN.md) to appropriate directories
  - Improved documentation organization and accessibility
  - Enhanced documentation maintainability
- Restructured README.md:
  - Simplified and organized Quick Links section
  - Improved documentation navigation
  - Separated API and development documentation into dedicated files
  - Enhanced readability and maintainability

### Security

- Hardened **Nginx** reverse-proxy configuration:
  - Added `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, and `Referrer-Policy` headers to reduce XSS, click-jacking, MIME-sniffing, and referrer-leak risks.
  - Added `Cache-Control` header with `public, max-age=2592000, immutable, stale-while-revalidate=86400` for optimal caching strategy.
  - Blocked access to hidden files (e.g., `.git`, `.env`) via a restrictive location rule.
- Updated formidable package from 2.1.0 to 3.5.2 to address security vulnerability (GHSA-75v8-2h7p-7m2m) related to filename guessing prevention.

### Documentation

- Updated README.md to include NGINX security hardening details in the Security section.
- Added `SPECTRAL.md` under `/docs` directory with comprehensive setup and usage guidelines for API linting.

## [2.14.2] - 2025-04-29

### Improved

- Ran `npm run format:check` (Prettier) to ensure code formatting compliance and maintain consistent code style across the project.
- Updated the SonarQube image in `docker-compose.dev.yml` from `sonarqube:lts-community` to `sonarqube:latest` for better compatibility and latest feature support.
- Updated the `sonar-project.properties` file to improve project analysis configuration and align with current source structure.
- Updated the `README.md`:
  - Bumped the project version number.
  - Added SonarQube section and included the current SonarQube version in the badges list.

## [2.14.1] - 2025-04-28

### Fixed

- Fixed the Dockerfile for NGINX to remove the invalid `--secure-protocol=TLSv1_2` option from the `wget` command.
- Resolved build errors related to `wget: unrecognized option: secure-protocol=TLSv1_2` during NGINX module compilation.

## [2.14.0] - 2025-04-28

### Added

- Integrated Diun service in the `docker-compose.dev.yml` for automated Docker image update monitoring.
- Added `DIUN.md` documentation under `/docs/` explaining setup and usage of Diun for image update tracking.

### Changed

- Updated Docker images to use more specific, pinned versions to ensure environment stability and reproducibility.
- Updated the `package.json` configuration to reflect the latest project dependencies and settings.

## [2.13.1] - 2025-04-28

### Fixed

- Corrected SonarQube analysis configuration to properly separate source and test files.
- Resolved scanner conflict related to duplicated indexing of test files.
- Updated `sonar-project.properties` to improve project analysis reliability and security.

### Improved

- Applied improvements based on SonarQube recommendations, including better file organization between source and test code.
- Enhanced code quality and static analysis compliance according to SonarQube's best practices.

### Added

- Integrated SonarQube as a service in the `docker-compose.dev.yml` file for local code quality analysis.
- Added SonarQube section to the `README.md` for visibility on code quality processes.
- Created a dedicated `SONARQUBE.md` document inside the `/docs/` directory for detailed SonarQube setup and usage instructions.

### Changed

- Updated `package.json` to set the application version to `2.13.1`.

## [2.13.0] - 2025-04-11

### Changed

- Updated the `package.json` configuration to reflect the latest project dependencies and settings.

### Added

- Implemented GeoHash-based caching for reverse geocoding using Redis.
- Introduced a new helper function to convert latitude and longitude into 7-character GeoHash strings.
- Added a new section in the README explaining how GeoHash caching works and its benefits.
- Created `cacheService` and `geoCacheService` to encapsulate caching logic and improve code organization.

### Improved

- Reduced reverse geocoding response times by grouping nearby coordinates into shared cache keys.
- Refactored controller logic to follow SOLID principles by moving cache logic into dedicated services.

## [2.12.0] - 2025-04-06

### Changed

- Updated the `package.json` configuration to reflect the latest project dependencies and settings.

### Added

- Added documentation for `npx npm-check-updates` command in README.md to help manage package updates.

## [2.11.0] - 2025-03-23

### Changed

- Improved the structure and clarity of the `README.md` file for better usability.
- Updated the `package.json` configuration to reflect the latest project dependencies and settings.
- Added additional badges to `README.md` for enhanced project visibility and status tracking.

### Added

- Added a `CONTRIBUTING.md` file with detailed guidelines and best practices to assist contributors.
- Included a `SUPPORT.md` file to provide troubleshooting steps and streamline issue resolution.
- Enhanced GitHub Actions workflows to improve CI/CD processes.
- Included Swagger documentation generation as part of the CI/CD pipeline.

### Refactored

- Applied Prettier formatting for consistent code style and readability.

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

### Refactored

- Improved the structure and readability of `app.js` by organizing middleware, routes, and GraphQL setup into distinct sections.
- Improved the structure and maintainability of `db.js` by optimizing connection pooling and enhancing error handling.

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
