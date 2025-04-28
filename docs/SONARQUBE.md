# Code Quality and SonarQube Integration

Starting from **version 2.13.1**, the API GEO Paraguay project officially integrates **SonarQube** analysis to ensure high code quality, maintainability, and security.

## SonarQube Overview

**SonarQube** is a popular tool for continuous inspection of code quality. It automatically analyzes code to detect bugs, code smells, security vulnerabilities, and adherence to best practices.

## Setup Instructions

SonarQube is now included as a service in the project's `docker-compose.dev.yml` file for streamlined local development and code quality analysis.

### 1. Install SonarQube via Docker Compose

Make sure Docker and Docker Compose are installed on your machine.

Start all services including SonarQube:

```bash
docker compose -f docker-compose.dev.yml up --build -d
```

SonarQube will be available at:
- [http://localhost:9000](http://localhost:9000)

### 2. Default Credentials

- **Username:** `admin`
- **Password:** `admin`

_You will be prompted to change the default password upon first login._

### 3. Create a SonarQube Project and Token

- Log in to SonarQube.
- Create a new project manually.
- Generate an authentication **token** for scanner usage.

**Important:** Never hardcode tokens inside project files.

### 4. Configure Project for SonarQube

The project contains a `sonar-project.properties` file with the basic configuration.

If you prefer to run SonarScanner manually, you can export your token and run the scanner:

```bash
export SONAR_TOKEN=your_generated_token
sonar-scanner
```

Alternatively, use the `scan.sh` script provided.

### 5. Using scan.sh for Automated Scanning

A `scan.sh` script is available to automate the process of running SonarQube scans.  
It automatically loads environment variables from the `.env` file and runs the scanner securely.

#### Requirements:

- Create a `.env` file in the project root containing:

```env
SONAR_TOKEN=your_generated_token
```

- Ensure `.env` is listed in `.gitignore` to avoid exposing secrets.

#### Run the scanner with:

```bash
bash scan.sh
```

### 6. Project Improvements Based on SonarQube Recommendations

As of **version 2.14.1**, the following improvements were applied:

- **Separation of Source and Test Files:**
  - `sonar.sources=.` 
  - `sonar.tests=tests`
  - `sonar.exclusions=**/node_modules/**,**/dist/**,**/tests/**`
  - `sonar.test.inclusions=tests/**/*.js`
- **Token Management Best Practices:**
  - Authentication tokens must never be committed to the source code.
- **General Code Quality Improvements:**
  - Refactored code to eliminate minor code smells and improve maintainability.

## Useful Links

- [SonarQube Official Site](https://www.sonarsource.com/products/sonarqube/)
- [SonarScanner CLI Documentation](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/)
- [SonarQube on Docker Hub](https://hub.docker.com/_/sonarqube)

> 📅 **Last Updated:** 2025-04-28

---