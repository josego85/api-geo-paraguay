# API GEO Paraguay

## Tecnologías

- NodeJS v16.20.2
- Express 4.18.2 para el API
- NPM 8.19.4
- MySQL 5.7.xx
- Client Redis 4.6.7
- Client Mongoose 7.4.1 (MongoDB Server 6.x)
- Swagger para la documentación
- Docker version 26.1.1
- Docker Compose version v2.27.0-desktop.2

## Base de datos MySQL

Entramos a la consola de MySQL

```bash
mysql -u root -p
```

Creamos la base de datos paraguay

```
CREATE DATABASE paraguay CHARACTER SET utf8 COLLATE utf8_general_ci;
GRANT ALL PRIVILEGES ON paraguay.* TO api_geo@'localhost' IDENTIFIED BY 'xxxxxx';
FLUSH PRIVILEGES;
exit
```

Importamos la base de datos paraguay

```bash
tar xzvf db/paraguay.sql.tar.gz
mysql -u root -p paraguay < paraguay.sql
```

## Configuración (base de datos MySQL)

```bash
cp .env.example .env
```

Cambiar las variables del .env

```
APP_PORT=3000
URL_DOMAIN="https://api-geo.proyectosbeta.net"

# DataBase MySQL.
DB_HOST="database"
DB_NAME=paraguay
DB_USER="api-geo"
DB_PASSWORD="123456"
DB_ROOT_PASSWORD="password"

# MongoDB
MONGO_URI="mongodb://mongodb:27017"

REDIS_HOST="cache"
REDIS_PORT=6379
```

## Instalación

```bash
npm install
```

# Desarrollo

## Hacer correr la app

```bash
npm start
```

## Prettier

### Prettier check

Check if the formatting matches this Prettier’s rules by using:

```bash
npm run format:check
```

### Prettier format

Force the formatting by using this command:

```bash
npm run format:write
```

## Lint

### Lint check

Lint your code with:

```bash
npm run lint:check
```

### Lint fix

Auto-fixing errors with this command:

```bash
npm run lint:fix
```

## Documentación

### Access

-   [Oficial site](https://api-geo.proyectosbeta.net/api-docs)

## Calidad de código

### Sonarqube

-   [Sitio oficial](https://www.sonarqube.org/)

#### Instalar

##### Con docker

```bash
docker pull sonarqube
docker run -d --name sonarqube -p 9000:9000 -p 9092:9092 sonarqube
```

##### Acceso web

```
http://localhost:9000
```

###### Credenciales por defecto

-   User: admin
-   Password: admin

#### Usar con docker

```bash
docker pull newtmitch/sonar-scanner

```

##### GNU-Linux/MacOS

Ejecutar

```bash
docker run -ti -v /home/proyectosbeta/repositoriosGit/api-geo-paraguay:/usr/src --link sonarqube newtmitch/sonar-scanner
```

##### Microsoft Windows

Ejecutar

```bash
docker run -ti -v C:\Users\proyectosbeta\repositoriosGit\api-paraguayos:/usr/src --link sonarqube newtmitch/sonar-scanner
```

# Producción

## Build

```bash
npm run build
```

## Hacer correr la app

Pm2 es una herramienta para ambientes de producción de aplicaciones de Node.JS, básicamente esta herramienta nos sirve para levantar nuestra aplicación como un servicio demonio en nuestro servidor.

```bash
npm install pm2 -g
```

Debemos crear un demonio con PM2 así que paramos el servidor y ejecutamos el siguiente comando:

```bash
pm2 start /home/proyectosbeta/repositoriosGit/api-geo-paraguay/dist/bundle.js --name api-geo-paraguay
```

Necesitamos configurar el script de startup del servidor.

```bash
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u proyectosbeta --hp /home/proyectosbeta
```

## Configuración Nginx

```
server {
    server_name api-geo.proyectosbeta.net www.api-geo.proyectosbeta.net;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 7d;  
        add_header Cache-Control "public, max-age=604800"; 
        access_log off;   
    }

    listen 443 ssl http2; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/api-geo.proyectosbeta.net/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/api-geo.proyectosbeta.net/privkey.pem; # managed by Certbot
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

# Utilización del API

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
