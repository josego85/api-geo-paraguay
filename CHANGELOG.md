# Changelog

All notable changes to this project will be documented in this file.  
This project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html) and adheres to the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) guidelines.

---

## [2.20.2] - 2025-11-13

### Security

- **Docker Image Pinning**: Added SHA256 digest hashes to all Docker base images to prevent supply chain attacks and ensure immutable builds.
  - Pinned `node:22.21.1` to SHA256 `dcf061...32e2a5` in development Dockerfile.
  - Pinned `node:22.21.1-alpine` to SHA256 `b23584...f026c5` in development Dockerfile.
  - Pinned `node:22.21.1-alpine3.21` to SHA256 `af8023...f01f8885` in production Dockerfile (builder and production stages).
  - Pinned `alpine:3.22` to SHA256 `4b7ce0...8dd412` in Nginx production Dockerfile.

### CI/CD

- Updated `actions/checkout` to commit hash `71cf2267` (v5.0.0) across all GitHub Actions workflows to incorporate latest security patches and improvements.
- Updated `actions/dependency-review-action` from v4.5.1 (invalid) to v4.8.2 (commit hash `3c4e3dcb`) to fix workflow errors and incorporate latest security features.
- Updated `github/codeql-action` from v4.31.0 to v4.31.2 to enhance code scanning capabilities and security analysis ([#89](https://github.com/josego85/api-geo-paraguay/pull/89)).
- Updated `actions/upload-artifact` from v4 to v5 to improve artifact upload performance and reliability ([#90](https://github.com/josego85/api-geo-paraguay/pull/90)).

### Dependencies

- Upgraded Node.js Docker image from 22.18.0-alpine3.22 to 22.21.1-alpine3.21.
- Updated Nginx Docker image from 1.29.1 to 1.29.3.
- Updated MongoDB Docker Compose image from 7.0.23 to 7.0.25.
- Updated MySQL Docker Compose image from 8.0.43 to 8.0.44.
- Updated Redis Docker Compose image from 8.2.1 to 8.2.3.

---

## [2.20.1] - 2025-10-30

### Overview

This is a maintenance release focused on security hardening, CI/CD pipeline improvements, and enhanced developer experience through automated dependency updates and Docker optimization. Multiple GitHub Actions have been updated to their latest versions to incorporate performance improvements and security patches. No breaking changes were introduced.

### Security

- **validator**: Updated from `13.15.15` to `13.15.20` (dev dependency) in the npm_and_yarn group to address security vulnerabilities and improve validation features ([#87](https://github.com/josego85/api-geo-paraguay/pull/87))

### CI/CD

- Updated `github/codeql-action` from `4.30.8` to `4.31.0` to enhance code scanning capabilities and improve security analysis ([#86](https://github.com/josego85/api-geo-paraguay/pull/86))
- Updated `actions/checkout` from `4` to `5` to leverage improved repository checkout performance and new features ([#83](https://github.com/josego85/api-geo-paraguay/pull/83))
- Updated `actions/cache` from `4.2.0` to `4.3.0` to improve caching mechanisms and reduce workflow execution times ([#82](https://github.com/josego85/api-geo-paraguay/pull/82))

### Improved

- **Docker Compose Profiles**: Implemented profile-based architecture for optional development tools in `docker-compose.override.yml`
  - Added `quality` profile for SonarQube (code quality analysis)
  - Added `monitoring` profile for Diun (Docker image update monitoring)
  - Added `tools` profile for enabling all optional tools at once
  - Optimized default development startup by making resource-intensive tools opt-in
  - Reduced memory footprint by ~2GB when optional tools are not needed
  - Enhanced developer experience with faster startup times for daily development
  - Documented profile usage in [setup.md](docs/guides/setup.md) with practical examples

### Documentation

- Enhanced [setup.md](docs/guides/setup.md) with comprehensive Docker Compose profiles documentation
- Added practical usage examples for different development scenarios
- Included benefits and rationale for profile-based architecture
- Added links to tool-specific documentation (SonarQube, Diun)

### Notes

- All dependency updates are backward-compatible and maintain existing CI/CD functionality
- Docker profiles are opt-in; default behavior starts core services only
- Recommended upgrade to benefit from security patches, performance improvements, and optimized development workflow

---

## [2.20.0] - 2025-10-13

### CI/CD

#### Added

- New `ci.yml` workflow with modular orchestrator pattern
- Reusable workflows for separation of concerns:
  - `security-audit.yml` - npm audit security checks
  - `code-quality.yml` - prettier format + eslint validation
  - `build.yml` - production build verification with artifacts
- Composite action `setup-node-deps` for Node.js + dependencies setup
- Build artifact uploads (7-day retention)
- ESLint result caching
- Parallel job execution for faster CI feedback

---

## [2.19.1] - 2025-10-11

### Overview

This is a maintenance release focused on security hardening, dependency updates, and CI/CD pipeline improvements. Multiple security vulnerabilities have been addressed across production and development dependencies. No breaking changes were introduced.

### Security

- **tar-fs**: Updated from `2.1.3` to `2.1.4` to address security vulnerabilities ([#65](https://github.com/josego85/api-geo-paraguay/pull/65))
- **webpack**: Updated from `5.99.9` to `5.102.1` (dev dependency) to patch security issues ([#74](https://github.com/josego85/api-geo-paraguay/pull/74))
- **express-rate-limit**: Updated from `8.0.1` to `8.1.0` to incorporate security enhancements and bug fixes ([#62](https://github.com/josego85/api-geo-paraguay/pull/62))
- **joi**: Updated from `17.13.3` to `18.0.1` to address security vulnerabilities and improve validation features ([#61](https://github.com/josego85/api-geo-paraguay/pull/61))
- **mongoose**: Updated from `8.15.1` to `8.19.1` to patch security issues and improve MongoDB driver compatibility ([#73](https://github.com/josego85/api-geo-paraguay/pull/73))

### Dependency Updates

- Updated `dotenv-webpack` from `8.1.0` to `8.1.1` for improved environment variable handling
- Updated `typeorm` from `0.3.26` to `0.3.27` to incorporate bug fixes and performance improvements
- Updated `mysql2` from `3.14.3` to `3.14.5` for enhanced database connection stability
- Updated `dotenv` from `16.5.0` to `16.6.1` to improve environment configuration management

### CI/CD

- Updated `ossf/scorecard-action` from `2.4.2` to `2.4.3` to enhance security posture analysis ([#71](https://github.com/josego85/api-geo-paraguay/pull/71))
- Updated `github/codeql-action` from `3.30.3` to `3.30.6` to improve code scanning capabilities ([#72](https://github.com/josego85/api-geo-paraguay/pull/72))

### Notes

- All dependency updates are backward-compatible and maintain existing API functionality
- Thoroughly tested to ensure no regression issues
- Recommended upgrade for all production environments to benefit from security patches

---

## [2.19.0] - 2025-09-18

### Documentation

- **Complete `README.md` Overhaul**: The main `README.md` has been significantly refactored for clarity, conciseness, and professionalism.
  - Introduced a prominent hero image to visually represent the API's capabilities.
  - Implemented a collapsible gallery for supplementary images to save space while maintaining visual appeal.
  - Reorganized the entire layout for a more logical and readable flow, grouping descriptive text and visual elements separately.
  - Rewrote and reviewed all user-facing text to ensure high-quality, idiomatic English.
- **Improved Documentation Architecture**:
  - Added a dedicated `docs/assets` directory for all documentation images, moving them from the project root.
  - Renamed image files to be descriptive of their content (e.g., `rest-get-cities-filtered-sorted.png`).
  - Created a new `docs/development/architecture.md` file to house the database architecture details, previously in the `README.md`.
  - Refactored `docs/guides/features.md` and `docs/guides/rest.md` to remove duplicated content, following the DRY (Don't Repeat Yourself) principle. `rest.md` is now the single source of truth for REST API details.
- **Enhanced Navigation**:
  - Renamed the "Quick Links" section to "Documentation" for better accuracy.
  - Added a link to the `features.md` guide, which was previously unlinked, ensuring all documentation is discoverable.

---

## [2.18.10] - 2025-09-14

### Overview

This is a patch release that includes minor dependency updates, a critical security fix for `axios`, code formatting improvements, and updates to GitHub Actions configurations to enhance CI/CD processes. No breaking changes were introduced.

### Dependency Updates

- Updated `ioredis` from `5.6.1` to `5.7.0` to incorporate performance optimizations and bug fixes. ([Release Notes](https://github.com/redis/ioredis/releases/tag/v5.7.0))
- Updated `github/codeql-action` from `3.30.1` to `3.30.3` to enhance code scanning capabilities and address minor issues. ([Release Notes](https://github.com/github/codeql-action/releases))
- Updated `@babel/core` from `7.27.4` to `7.28.4` to leverage new features, performance improvements, and compatibility enhancements. ([Release Notes](https://babeljs.io/releases))
- Updated `@babel/eslint-parser` from `7.27.5` to `7.28.4` to align with `@babel/core` updates and improve JavaScript linting support. ([Release Notes](https://babeljs.io/releases))
- Updated `eslint-plugin-import` from `2.31.0` to `2.32.0` to enhance import/export linting rules and resolve minor bugs. ([Release Notes](https://github.com/import-js/eslint-plugin-import/releases/tag/v2.32.0))
- Updated `axios` from `1.11.0` to `1.12.1` to address a high-severity Denial of Service (DoS) vulnerability caused by insufficient data size checks ([Issue #60](https://github.com/axios/axios/issues/60); CVSS v3: High, Attack Vector: Network, Attack Complexity: Low, Privileges Required: None, User Interaction: None, Scope: Unchanged, Confidentiality: None, Integrity: None, Availability: High). This update also includes performance improvements and new features. ([Release Notes](https://github.com/axios/axios/releases/tag/v1.12.1))

### Improved

- Executed `npm run format:check` using Prettier to enforce consistent code formatting across all JavaScript and TypeScript files in the project. This ensures adherence to the defined coding style and improves readability for contributors.

### CI/CD Configuration Updates

- Added `docs` to the `paths-ignore` list in `.github/codeql-config.yml` to exclude documentation files from CodeQL analysis, reducing noise in scan results.
- Added `.github/dependabot.yml` to enable automated dependency updates via Dependabot, improving dependency management and security.
- Changed the `runs-on` configuration in `.github/workflows/codeql-analysis.yml` from `self-hosted` to `ubuntu-latest` to leverage GitHub-hosted runners for improved reliability and performance in CodeQL analysis.
- Changed the `runs-on` configuration in `.github/workflows/scorecard-analysis.yml` from `self-hosted` to `ubuntu-latest` to align with standard GitHub-hosted runners for OpenSSF Scorecard analysis.

### Notes

- All dependency updates are minor version bumps, ensuring compatibility with existing functionality and improving overall stability.
- No breaking changes were introduced in this release.

---

## [2.18.9] - 2025-09-10

### Fixed

- Fixed npm malware vulnerabilities by upgrading or replacing affected dependencies.

### Improved

- Ran `npm run format:check` (Prettier) to ensure code formatting compliance and maintain consistent code style across the project.

---

## [2.18.8] - 2025-09-08

### Added

- Add `codeql-analysis.yml` GitHub Actions workflow to enable CodeQL security analysis.
- Add `codeql-config.yml` configuration file for the CodeQL GitHub Actions workflow.
- Add `scorecard-analysis.yml` GitHub Actions workflow to enable OpenSSF Scorecard security checks.
- Add `actions-runner` to `.gitignore` to exclude GitHub Actions runner-related files from version control.
- Add `actions-runner` to `.dockerignore` to exclude GitHub Actions runner-related files from Docker image builds.

### Changed

- Renamed `codeql.yml` to `codeql-analysis.yml` for clarity and consistency in GitHub Actions workflows.

### Removed

- Remove `nodejs-ci.yml` GitHub Actions workflow.

---

## [2.18.7] - 2025-09-01

### Improved

- Ran `npm run format:check` (Prettier) to ensure code formatting compliance and maintain consistent code style across the project.

---

## [2.18.6] - 2025-09-01

### Changed

- Overhauled the Diun (Docker Image Update Notifier) configuration for clarity, robustness, and maintainability.
- Centralized all image monitoring into a single `watched.yml` file, making it the single source of truth.
- Disabled ambiguous monitoring settings like `watchByDefault` to ensure the watch list is explicit.
- Upgraded Diun Docker Compose image from 4.29.0 to 4.30.0.

### Added

- Added all Docker images used across `docker-compose` and `Dockerfile` files to the Diun watch list for comprehensive monitoring.
- Implemented a script-based notifier in Diun to log detailed image update information directly to the container's output.
- Configured a persistent database for Diun to store image state, preventing duplicate notifications on restart.

### Fixed

- Corrected multiple Diun configuration errors that prevented the service from starting.
- Resolved YAML syntax errors in `diun.yml` to ensure successful parsing.

---

## [2.18.5] - 2025-08-23

### Added

- Reorganized project layout by moving the main application folder (app/) and the top-level server.js into src/ to centralize source code.
- Added `.dockerignore` file to optimize Docker build context.

### Changed

- Updated internal imports and module paths to reference files under src/.
- Updated package.json scripts (start, dev) to point to src/server.js.
- Adjusted Dockerfile.dev and docker-compose.dev to use the project root as build context and ensure package.json is available inside the container; added temporary shim during migration where needed.
- Updated ESLint configuration paths to align with the new `src/` directory structure.
- Minor documentation updates to reflect the new source layout.
- Updated the src alias in webpack.config.js to reflect the new directory structure.
- Refactored and improved the development Dockerfile image for the `app` service.
- Adapted tests to align with the new `src/` folder structure.
- Reorganized Docker setup:
  - The former `deploy/` folder (containing production `nginx` and `diun` configs) was renamed to `docker/`.
  - Inside `docker/`, two subfolders were created: `dev/` and `prod/`.
  - Dockerfiles were moved from the project root (`Dockerfile.dev`, `Dockerfile.prod`) into their respective folders.
  - Both are now simply named `Dockerfile` within `docker/dev/` and `docker/prod/` for a cleaner structure.
- Renamed and reorganized Compose files:
  - `docker-compose.dev.yml` → `docker-compose.override.yml`.
  - `docker-compose.prod.yml` → `docker-compose.yml`.
- Updated documentation to reflect the new Compose file naming (`docker-compose.yml` and `docker-compose.override.yml`).
- Optimized the production Dockerfile for the `app` service to improve build performance and image size.

### Improved

- Documentation: The features.md and rest.md documentation files were improved, with a specific focus on the GET request section.

---

## [2.18.4] - 2025-08-23

### Improved

- Ran `npm run format:check` (Prettier) to ensure code formatting compliance and maintain consistent code style across the project.

### Fixed

- Resolved **critical security vulnerability** reported by `npm audit`:
  - **sha.js (<=2.4.11)**: Missing type checks leading to potential hash rewind and crafted data issues
    - Advisory: [GHSA-95m3-7q98-8xr5](https://github.com/advisories/GHSA-95m3-7q98-8xr5)
    - Fixed by applying `npm audit fix`
    - Updated to secure version via dependency resolution

### Security

- Ensured all dependencies are patched against known vulnerabilities
- Verified `sha.js` update to mitigate critical severity issue
- Confirmed no remaining unresolved security warnings in `npm audit`

---

## [2.18.3] - 2025-08-19

### Added

- New response utilities:
  - `PaginationResponse` class for standardized pagination handling
  - `ServiceResponse` class for consistent service responses
- Added .prettierignore file to exclude dist, coverage and other build artifacts from formatting
- validateId middleware endpoints to prevent invalid ID queries
- Enhanced Redis cache implementation across all geographic endpoints:
  - Improved Redis cache key generation for all listing endpoints
  - Added unified cache prefixes for single item queries (departments, districts, cities, neighborhoods)
  - Added filter-aware Redis caching for all search operations
  - Extended Redis cache TTL to 24 hours for all single item queries
  - Implemented in departments, districts, cities, and neighborhoods endpoints
- Created utils/cache.js to centralize Redis cache configuration:
  - Added createList for all listing endpoints
  - Added createSingle for all individual record endpoints
  - Standardized cache key generation across all geographic routes
  - Unified TTL configuration (1 hour for lists, 24 hours for single items)
  - Applied consistent caching strategy across all API endpoints

### Changed

- Improved response structure with standardized metadata
- Reorganized pagination parameters (page, limit) into metadata object
- Enhanced data structure consistency across REST and GraphQL endpoints
- Fixed queryParser to keep filters grouped under 'filters' property instead of spreading them
- Migrated to ESLint 9.x using new flat config format
- Switched from custom ESLint rules to standard defaults for better maintainability
- Removed deprecated ESLint plugins and configurations
- Integrated ESLint with modern module resolution
- Updated dependencies:
  - express-rate-limit from 7.5.0 to 8.0.1
  - graphql-yoga to 5.13.5
  - mongoose to 8.15.1
  - mysql2 to 3.14.3
  - typeorm to 0.3.26
- Updated development dependencies:
  - @babel/eslint-parser to 7.17.5
  - copy-webpack-plugin to 13.0.1
  - ESLint from 8.x to 9.28.0
  - eslint-config-prettier to 10.1.8
  - eslint-plugin-prettier to 5.4.1
  - eslint-plugin-import to 2.31.0
  - glob to 11.0.3
  - globby to 14.1.0
  - rimraf to 6.0.1
  - webpack to 5.99.9
  - webpack-cli to 6.0.1
  - supertest to 7.1.4
- Updated Babel configuration:
  - Changed plugin name from @babel/plugin-transform-class-properties to @babel/plugin-proposal-class-properties
- Enhanced Prettier configuration:
  - Updated trailingComma to "all" for cleaner diffs when adding new items to arrays/objects
- Updated MySQL Docker Compose image from 8.0.42 to 8.0.43.
- Upgraded Node.js Docker image from 22.15.0 to 22.18.0.
- Updated MongoDB Docker Compose image from 7.0.19 to 7.0.23.
- Upgraded Redis Docker Compose image from 7.4.3 to 8.2.1.
- Upgraded Nginx Docker Compose image from 1.28.0 to 1.29.1.

### Improved

- Enhanced production logging:
  - Added source maps to webpack build
  - Improved code readability in production logs
  - Added deterministic chunk and module IDs
- Enhanced build configuration:
  - Added source maps support for better debugging
  - Improved code minification and compression settings
  - Added deterministic module and chunk IDs for better caching

### Technical Improvements

- Moved response handling to utils/responses/
- Added data validation for response classes
- Standardized pagination metadata format
- Improved error handling in responses
- Enhanced ESLint and Prettier integration
- Simplified module alias resolution in ESLint config
- Applied consistent code formatting across the project

### Internal

- Refactored the base service to utilize the new standardized response classes for improved consistency.
- Updated the base repository to adopt the new pagination metadata format.
- Implemented strict type validation for all service responses.
- Improved documentation for response formats

### Removed

- Legacy .eslintignore file in favor of native ESLint 9.x ignore patterns
- Deprecated ESLint plugins and unused configurations
- Redundant ESLint rules and overrides

### Fixed

- Replaced deprecated inflight package with lru-cache to resolve memory leak warning
- Replaced deprecated sourcemap-codec with @jridgewell/sourcemap-codec
- Updated rimraf dependency to version 5.0.5 to resolve deprecation warning
- Enhanced BaseRepository filter handling:
  - Added case-insensitive search using LOWER() for string filters
  - Improved filter validation against column metadata
  - Added string value trimming to prevent whitespace issues
  - Added logging for ignored invalid column filters
- Fixed GraphQL endpoints data fetching:
  - Corrected data resolution for departments, districts, cities and neighborhoods
  - Added proper error handling for all GraphQL queries
  - Fixed pagination arguments in queries
  - Improved response structure for better data access

### Refactored

- Improved GraphQL architecture:
  - Centralized schema definitions
  - Added consistent error handling
  - Improved query resolvers structure

---

## [2.18.2] - 2025-07-22

### Security

- Updated vulnerable dependencies:
  - **form-data**: Fixed critical vulnerability due to use of unsafe random function for boundary selection ([GHSA-fjxv-7rqg-78g4](https://github.com/advisories/GHSA-fjxv-7rqg-78g4)) via `npm audit fix`.

---

## [2.18.1] - 2025-07-15

### Security

- Updated vulnerable dependencies:
  - **brace-expansion**: Fixed Regular Expression Denial of Service vulnerability ([GHSA-v6h2-p8h4-qcjw](https://github.com/advisories/GHSA-v6h2-p8h4-qcjw)) via `npm audit fix`.
  - **tar-fs**: Fixed directory traversal vulnerability ([GHSA-8cj5-5rvv-wf4v](https://github.com/advisories/GHSA-8cj5-5rvv-wf4v)) via `npm audit fix`.

---

## [2.18.0] - 2025-05-31

### Improved

- Refined `nginx.conf` to:
  - Added and tuned caching in NGINX for improved performance, reduced backend load, and faster response times for frequently accessed resources.
  - Enhanced cache invalidation and revalidation strategies to ensure data freshness while maximizing cache hit ratio.

---

## [2.17.2] - 2025-05-25

### Fixed

- Persist Nginx logs inside the container by configuring a named volume with `nocopy` and restoring symbolic links from `/var/log/nginx/*.log` to Docker’s stdout/stderr.

### Improved

- Refined `nginx.conf` to:
  - Duplicate access and error logs to both `/var/log/nginx/*.log` and `/dev/stdout`/`/dev/stderr`.
  - Define a `log_format main` for structured logging.
  - Use `listen 80 default_server` to eliminate server name conflicts.
  - Load the `headers_more` dynamic module via `load_module` directive.

---

## [2.17.1] - 2025-05-09

### Fixed

- Resolved production entity metadata loading issue by explicitly importing all EntitySchemas in the DataSource configuration.

### Refactored

- Improved `BaseRepository` implementation: replaced `for…of` loops with `Object.entries().filter().map()` and `Object.fromEntries()` to comply with lint rule `no-restricted-syntax`.

---

## [2.17.0] - 2025-05-09

### Added

- Introduced ORM: **TypeORM** for database abstraction and security against SQL injection.
- Added **Joi** for comprehensive environment variable validation.

### Refactored

- Migrated from raw models to **repositories** with **entities**.
- Centralized all environment variables into `config/index.js` and validated them with Joi.
- Refactored DataSource initialization; now located in `database/data-source.js`.
- Updated service layer to call repository → entity instead of direct database queries.
- Switched from direct service-to-DB access to service → repository → entity flow.
- Refactored **entities** to remove duplication, centralize common columns (via `BaseColumns.js`) and DRY up schema definitions.

### Removed

- Deleted legacy models for **Department**, **District**, **Neighborhood**, and **City**.

### Updated

- Adapted GraphQL resolvers to use service layer instead of direct model access.

---

## [2.16.1] - 2025-05-07

### Refactored

- Refactored and enhanced services for cities, departments, districts, and neighborhoods.
- Refactored and enhanced controllers for cities, departments, districts, and neighborhoods.
- Applied linting and implemented recommended changes.

### Documentation

- Updated `setup.md` to correct the database `.tar.gz` filename.

---

## [2.16.0] - 2025-05-06

### Added

- Implemented sorting functionality for key endpoints:
  - Departments endpoint now supports sorting
  - Districts endpoint now supports sorting
  - Cities endpoint now supports sorting
  - Neighborhoods endpoint now supports sorting
- Added validation middleware for sort parameters:
  - Whitelist of allowed sort fields per resource
  - Validation of sort directions (ASC/DESC)
  - Validation of query parameters (`page`, `limit`, `sortField`, `sortOrder`) to ensure they are valid and sanitized
- Enhanced security measures:
  - Input validation for sort parameters
  - Field name whitelisting
- Updated OpenAPI specification to document sorting functionality:
  - Added sort parameter documentation for all endpoints
  - Documented ASC/DESC sort directions
- Added pagination support to the `getCities` method in the City controller
- Added pagination support to the `findAll` method in the City model to handle `page` and `limit` parameters
- Added pagination support to the endpoints for departments, neighborhoods, and districts
- Created `cityService` to encapsulate business logic for cities and improve separation of concerns
- Created `departmentService`, `districtService`, and `neighborhoodService` to encapsulate business logic for departments, districts, and neighborhoods, respectively, and improve separation of concerns
- Added pagination support and updated sorting usage in all `GET` endpoints in the OpenAPI specification
- Added filter support to all `GET` endpoints in the OpenAPI specification:
  - Filter departments by name
  - Filter districts by name
  - Filter cities by name
  - Filter neighborhoods by name
- Implemented filter functionality for the following endpoints:
  - `GET /api/v1/departments`: Filter by `name`
  - `GET /api/v1/districts`: Filter by `name`
  - `GET /api/v1/cities`: Filter by `name`
  - `GET /api/v1/neighborhoods`: Filter by `name`

### Changed

- Updated dependency versions in `package.json`:
  - Mongoose from 8.14.0 to 8.14.1
  - Updated several development dependencies to their latest versions
- Replaced `redis` package with `ioredis` for `redisClient` to improve connection handling and support advanced Redis features
- Improved caching implementation:
  - Moved caching logic from individual controllers to a reusable middleware (`cacheMiddleware`)
  - Simplified caching by intercepting `res.json` to handle cache storage automatically
  - Removed the need for `cacheKeyService` and `cacheService`
- Renamed database column names from Spanish to English (e.g. `departamento` → `department`), updated request/response field names to English, and adjusted endpoint routes accordingly (e.g. `/api/v1/districts` → `/api/v1/districts`)

### Removed

- Deleted `cacheKeyService` and `cacheService` as they are no longer needed with the new caching middleware

### Fixed

- Added missing `capital_name` field in Department schema
- Updated OpenAPI schema to include the missing field

### Refactored

- Improved validation architecture:
  - Created centralized validation service
  - Added type-safe field validation
  - Enhanced error handling and messages
- Renamed `findAll` to `getCities` and `findById` to `getCityById` in the City controller to align with RESTful API conventions
- Renamed `getAll` to `findAll` in the City model for consistency with ORM conventions
- Refactored `queryParser` middleware by extracting validation logic into `QueryValidationService` and separating pagination and filter handling into `processPagination` and `processFilters`

### Improved

- Better error handling for invalid sort fields
- Enhanced response times through optimized caching

### Documentation

- Updated `redis.md` to include new configuration details and usage examples

---

## [2.15.1] - 2025-04-29

### Fixed

- Removed duplicate information from README.md:
  - Consolidated Quick Start and Installation sections
  - Eliminated redundant setup guide references
  - Improved documentation flow and readability
- Updated OpenAPI specification version from 3.0.3 to 3.1.0 for better compatibility and features
- Fixed critical path resolution bug in production Docker environment:
  - Resolved issue with OpenAPI specification file not being found
  - Updated webpack configuration to properly copy docs directory
  - Fixed paths in swagger configuration for production environment

### Improved

- Applied Prettier formatting across all project files for consistent code style

---

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

---

## [2.14.2] - 2025-04-29

### Improved

- Ran `npm run format:check` (Prettier) to ensure code formatting compliance and maintain consistent code style across the project.
- Updated the SonarQube image in `docker-compose.dev.yml` from `sonarqube:lts-community` to `sonarqube:latest` for better compatibility and latest feature support.
- Updated the `sonar-project.properties` file to improve project analysis configuration and align with current source structure.
- Updated the `README.md`:
  - Bumped the project version number.
  - Added SonarQube section and included the current SonarQube version in the badges list.

---

## [2.14.1] - 2025-04-28

### Fixed

- Fixed the Dockerfile for NGINX to remove the invalid `--secure-protocol=TLSv1_2` option from the `wget` command.
- Resolved build errors related to `wget: unrecognized option: secure-protocol=TLSv1_2` during NGINX module compilation.

---

## [2.14.0] - 2025-04-28

### Added

- Integrated Diun service in the `docker-compose.dev.yml` for automated Docker image update monitoring.
- Added `DIUN.md` documentation under `/docs/` explaining setup and usage of Diun for image update tracking.

### Changed

- Updated Docker images to use more specific, pinned versions to ensure environment stability and reproducibility.
- Updated the `package.json` configuration to reflect the latest project dependencies and settings.

---

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

---

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

---

## [2.12.0] - 2025-04-06

### Changed

- Updated the `package.json` configuration to reflect the latest project dependencies and settings.

### Added

- Added documentation for `npx npm-check-updates` command in README.md to help manage package updates.

---

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

---

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

---

## [2.9.0] - 2025-03-17

### Fixed

- ESLint configuration.
- Jest testing configuration.
- API endpoint: `/api/v1/departments/1`.

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

---

## [2.8.0]

### Changed

- Upgraded Node.js to v20.18.3.
- Revised package.json configuration.

---

## [2.7.0]

### Changed

- Upgraded Node.js to v20.18.2.

---

## [2.6.0]

### Fixed

- Resolved Redis authentication issues.

### Added

- Upgraded Express to version 5.

---

## [2.5.0]

### Changed

- Updated package.json to address a critical security vulnerability in Mongoose.

---

## [2.4.0]

### Changed

- Revised package.json.
- Updated Dockerfiles and project configurations.
- Modified ESLint and Prettier settings.
- Refactored server.js.
- Fixed issues in application controllers.
- Optimized webpack configuration.

---

## [2.3.0]

### Changed

- Updated package.json.
- Refined Dockerfile for development.
- Revised README documentation.

---

## [2.2.0]

### Changed

- Updated package.json.
- Fixed server description in Swagger.
- Integrated ESLint and Prettier.
- Corrected version information in Swagger.
- Revised README documentation.
- Updated production Dockerfile.

---

## [2.1.1]

### Fixed

- Corrected API documentation endpoint.
- Adjusted nodemon configuration in Docker development.

### Refactored

- Applied Prettier formatting.
- Improved ESLint configurations.

---

## [2.1.0]

### Added

- Modified Docker Compose to change application and service ports.
- Introduced production Dockerfile and corresponding Docker Compose configuration.

---

## [2.0.0]

### Added

- Implemented MySQL healthcheck in Docker Compose.
- Updated package.json and version dependencies (Redis, MongoDB, Node.js).
- Upgraded MySQL to version 8.0.

### Fixed

- Resolved district data issues in MySQL 8.0.
- Corrected city and neighborhood data for MySQL 8.0.
- Fixed database import issues for MySQL 8.0.

---

## [1.20.0]

### Added

- Integrated Docker support.

### Changed

- Updated package.json configuration.

---

## [1.19.0]

### Changed

- Updated package.json configuration.

---

## [1.18.0]

### Changed

- Updated package.json.

### Added

- Integrated New Relic monitoring.

### Documentation

- Revised README documentation.

---

## [1.17.0]

### Added

- Implemented Continuous Integration (CI).
- Enhanced environment variable management.

---

## [1.16.0]

### Documentation

- Revised README documentation.

### Changed

- Updated package.json.

---

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

---

## [1.14.1]

### Fixed

- Resolved MongoDB warning issues.

### Refactored

- Added constant for MongoDB configuration in the .env file.

---

## [1.14.0]

### Changed

- Updated package.json configuration.

---

## [1.13.1]

### Fixed

- Corrected IP logging issues.

### Refactored

- General code refactoring for stability.

---

## [1.13.0]

### Added

- Introduced log storage functionality.

---

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

---

## [1.12.1]

### Changed

- Updated package.json.

---

## [1.12.0]

### Added

- Integrated ESLint and Prettier for development.

---

## [1.11.0]

### Changed

- Updated dependency versions in package.json.

---

## [1.10.0]

### Changed

- Updated dependency versions in package.json.

---

## [1.9.1]

### Fixed

- Corrected the API documentation URL.

---

## [1.9.0]

### Added

- Provided an endpoint to retrieve all cities for a specific department.

### Changed

- Updated package.json.

---

## [1.8.0]

### Changed

- Updated package.json.

---

## [1.7.0]

### Added

- Introduced an endpoint to retrieve longitude and latitude for districts, cities, and neighborhoods.

### Refactored

- General code refactoring.
- Improved CORS security configuration.

---

## [1.6.3]

### Fixed

- Resolved aliasing issues.

---

## [1.6.2]

### Fixed

- Various bug fixes.

---

## [1.6.1]

### Added

- Specified Node.js engine requirement in package.json.

---

## [1.6.0]

### Refactored

- Modularized code and general project refactoring.

### Added

- Integrated Redis caching for departments, cities, districts, and neighborhoods.
- Added API documentation.
- Added documentation for sorting functionality:
  - Sort parameters usage for departments, districts, cities and neighborhoods
  - Examples of ascending and descending sort operations
  - Valid sort field documentation for each endpoint

---

## [1.5.0]

### Added

- Introduced Babel and Webpack for modern JavaScript support.

---

## [1.4.0]

### Documentation

- Added API documentation.

---

## [1.3.0]

### Changed

- Prepared package.json for production deployment.

---

## [1.2.0]

### Added

- Enhanced security using CORS and Helmet.

---

## [1.1.0]

### Added

- Introduced environment variable support.

---

## [1.0.0]

### Added

- Initial implementation of API endpoints for departments, neighborhoods, and cities.
