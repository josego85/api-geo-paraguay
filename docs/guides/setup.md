# Installation & Setup Guide

## Local Development

1. Clone the repository:

```bash
git clone https://github.com/josego85/api-geo-paraguay.git
cd api-geo-paraguay
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment:

```bash
cp .env.example .env
```

4. Start development server:

```bash
npm run dev
```

## Docker Development Environment

### Requirements

- Docker v27.5.1 or higher
- Docker Compose

### Start Development Environment

```bash
# Build and start containers (core services only)
docker compose up --build -d

# View logs
docker compose logs -f

# Stop environment
docker compose down
```

### Optional Development Tools (Docker Profiles)

The development environment includes optional tools that can be enabled using Docker Compose profiles:

#### Available Profiles

- **`quality`** - Code quality analysis with SonarQube
- **`monitoring`** - Docker image update monitoring with Diun
- **`tools`** - All optional tools (quality + monitoring)

#### Usage Examples

```bash
# Start with SonarQube for code quality analysis
docker compose --profile quality up -d

# Start with Diun for Docker image monitoring
docker compose --profile monitoring up -d

# Start with all optional tools
docker compose --profile tools up -d

# Combine multiple profiles
docker compose --profile quality --profile monitoring up -d
```

#### Why Use Profiles?

Optional tools like SonarQube and Diun are resource-intensive and not required for daily development:

- **Faster startup**: Core services start in seconds vs. minutes
- **Lower resource usage**: Saves ~2GB RAM when not using SonarQube
- **Better developer experience**: Start only what you need
- **Flexible workflow**: Enable tools on-demand for specific tasks

For more details on these tools:

- [SonarQube Documentation](../development/sonarqube.md)
- [Diun Documentation](../development/diun.md)

## Production Environment

### Docker Production Deployment

```bash
# Build and start production containers
docker compose -f docker-compose.yml up --build -d

# View production logs
docker compose -f docker-compose.yml logs -f

# Stop production environment
docker compose -f docker-compose.yml down
```

### Production Build

```bash
# Build for production
npm run build
```

## Environment Configuration

The `.env` file is required for both development and production:

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

### Environment-Specific Configurations

#### Development

- Local database and Redis instances
- Debug logging enabled

#### Production

- Secure database credentials
- Production NGINX settings
- Optimized caching
- Rate limiting enabled

## Database Configuration

### Development Environment

#### MySQL Setup

```bash
# Extract database dump
tar xzvf database/paraguay.tar.gz

# Import to local MySQL
mysql -u root -p paraguay < paraguay.sql

# Or using Docker
docker cp paraguay.sql database-api-geo-paraguay:/paraguay.sql
docker exec -it database-api-geo-paraguay sh -c 'mysql -u root -p paraguay < paraguay.sql'
```

#### MongoDB Development

- Uses local MongoDB instance
- Default port: 27017
- Stores logs and analytics

#### Redis Development

- Local Redis server
- Default port: 6379
- Used for caching and GeoHash lookup

### Production Environment

#### MySQL Production

- Use managed MySQL service (recommended)
- Set up replication for high availability
- Regular backups required
- Configure in `.env`:

```env
DB_HOST=your-production-host
DB_PORT=3306
DB_USER=production_user
DB_PASSWORD=secure_password
DB_NAME=paraguay
```

#### MongoDB Production

- Use MongoDB Atlas or managed solution
- Configure replica set for reliability
- Enable authentication

#### Redis Production

- Use Redis Cloud or managed service
- Enable persistence
- Configure SSL/TLS
- Set up authentication:

```env
REDIS_HOST=your-production-redis
REDIS_PORT=6379
REDIS_PASSWORD=secure_password
REDIS_SSL=true
```

### Database Maintenance

- Regular backups configured
- Automatic failover setup
- Monitoring and alerts enabled
- Performance optimization guidelines
