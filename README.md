# API GEO Paraguay

# Tecnologías

-   NodeJS 14.20.0
-   Express 4.18.1 para el API
-   NPM 8.18.0
-   MySQL 5.7.xx
-   Client Redis 4.3.1
-   Client Mongoose 6.6.0 (MondoDB Server 6.x)
-   Swagger para la documentación

## Base de datos MySQL

Entramos a la consola de MySQL

```bash
mysql -u root -p
```

Creamos la base de datos paraguay

```
CREATE DATABASE paraguay CHARACTER SET utf8 COLLATE utf8_general_ci;
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

DB_HOST=localhost
DB_NAME=paraguay
DB_USER="api-geo"
DB_PASSWORD="123456"

REDIS_HOST='localhost'
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

## Checking code

```bash
npx prettier --write .
```

```bash
npm run format:check
```

```bash
npm run lint:check
```

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

## Configuración Apache

```
<VirtualHost *:80>
    ServerAdmin josego85@gmail.com
    ServerName api-geo.proyectosbeta.net
    ServerAlias www.api-geo.proyectosbeta.net

    ProxyRequests Off
    ProxyPreserveHost On
    ProxyVia Full
    <Proxy *>
        Require all granted
    </Proxy>

    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/

    ErrorLog "/var/log/apache2/api-geo.proyectosbeta.net.error.log"
    CustomLog "/var/log/apache2/api-geo.proyectosbeta.net.access.log" common

    RewriteEngine on
    RewriteCond %{SERVER_NAME} =api-geo.proyectosbeta.net [OR]
    RewriteCond %{SERVER_NAME} =www.api-geo.proyectosbeta.net
    RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>
```

### Módulos

```bash
sudo a2enmod proxy proxy_http
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
