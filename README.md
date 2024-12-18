# API GEO Paraguay

## Technologies

-   NodeJS v20.18.1 LTS
-   Express 4.21.2 for the API
-   NPM 10.8.2
-   MySQL 8.0.xx
-   Client Redis 4.7.0 (Redis 7.4.x)
-   Client Mongoose 8.9.1 (MongoDB Server 7.0)
-   Swagger for documentation
-   Docker version 27.4.0

## Docker dev

```bash
docker compose -f docker-compose.dev.yml up --build -d
docker compose logs -f
```

## Database in MySQL 8.0

### Import Database in docker container

```bash
tar xzvf database/paraguay.sql.tar.gz
docker cp paraguay.sql database-api-geo-paraguay:/paraguay.sql
docker exec -it database-api-geo-paraguay sh
mysql -u root -p paraguay < paraguay.sql
exit
```

### Config

```bash
cp .env.example .env
```

Change variables in .env

```
APP_PORT=5000
URL_DOMAIN="https://api-geo.proyectosbeta.net"

# DataBase MySQL
DB_HOST=database
DB_NAME=paraguay
DB_USER="api-geo"
DB_PASSWORD="123456"
DB_ROOT_PASSWORD="password"
SRID=4326
SRID_TRANSFORM=3857

# MongoDB
MONGO_URI=mongodb://mongodb:27017

REDIS_HOST="cache"
REDIS_PORT=6379
```

### Install

```bash
npm install
```

### Run app

```bash
npm start
```

## Tools dev

### Prettier

#### Prettier check

Check if the formatting matches this Prettier’s rules by using:

```bash
npm run format:check
```

#### Prettier format

Force the formatting by using this command:

```bash
npm run format:write
```

### Lint

#### Lint check

Lint your code with:

```bash
npm run lint:check
```

#### Lint fix

Auto-fixing errors with this command:

```bash
npm run lint:fix
```

## Docs

### Access

-   [Oficial site](https://api-geo.proyectosbeta.net/api-docs)

## QA

### Sonarqube

-   [Sitio oficial](https://www.sonarqube.org/)

#### Install

##### With docker

```bash
docker pull sonarqube
docker run -d --name sonarqube -p 9000:9000 -p 9092:9092 sonarqube
```

##### Web access

```
http://localhost:9000
```

###### Credencials

-   User: admin
-   Password: admin

#### Use

```bash
docker pull newtmitch/sonar-scanner

```

##### GNU-Linux/MacOS

Execute

```bash
docker run -ti -v /home/proyectosbeta/repositoriosGit/api-geo-paraguay:/usr/src --link sonarqube newtmitch/sonar-scanner
```

##### Microsoft Windows

Execute

```bash
docker run -ti -v C:\Users\proyectosbeta\repositoriosGit\api-paraguayos:/usr/src --link sonarqube newtmitch/sonar-scanner
```

## Production

### Docker prod

```bash
docker compose -f docker-compose.prod.yml up --build -d
docker compose logs -f
```

#### Build

```bash
npm run build
```

#### Config Nginx

```
server {
    server_name api-geo.proyectosbeta.net www.api-geo.proyectosbeta.net;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl http2; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/api-geo.proyectosbeta.net/fullchain.pem; # >
    ssl_certificate_key /etc/letsencrypt/live/api-geo.proyectosbeta.net/privkey.pem; >
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
server {
    if ($host = www.api-geo.proyectosbeta.net) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = api-geo.proyectosbeta.net) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name api-geo.proyectosbeta.net www.api-geo.proyectosbeta.net;
    return 404; # managed by Certbot
}
```

## Use API

-   https://api-geo.proyectosbeta.net/api/v1/paraguay/-59.517228974/-23.8302210107
-   https://api-geo.proyectosbeta.net/api/v1/departamentos/-56.987/-25.564
-   https://api-geo.proyectosbeta.net/api/v1/departamentos
-   https://api-geo.proyectosbeta.net/api/v1/departamentos/14
-   https://api-geo.proyectosbeta.net/api/v1/distritos
-   https://api-geo.proyectosbeta.net/api/v1/distritos/Luque
-   https://api-geo.proyectosbeta.net/api/v1/ciudades
-   https://api-geo.proyectosbeta.net/api/v1/ciudades/Aregua
-   https://api-geo.proyectosbeta.net/api/v1/barrios
-   https://api-geo.proyectosbeta.net/api/v1/barrios/Jara
