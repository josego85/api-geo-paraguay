# API GEO Paraguay

# Tecnologías

- NodeJS 14.17.xx
- NPM 7.20.xx
- MySQL 5.7.xx
- Redis para el cache  

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

Cambiar las varibles del .env

```
APP_PORT=3000
    
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

# Dearrollo

## Hacer correr la app

```bash
node server.js
```

## Calidad de código

### Sonarqube

- [Sitio oficial](https://www.sonarqube.org/)

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

- User: admin
- Password: admin

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
```

# Utilización del API
* http://51.15.192.116:3000/api/v1/paraguay/-59.517228974/-23.8302210107
* http://51.15.192.116:3000/api/v1/departamentos/-56.987/-25.564
* http://51.15.192.116:3000/api/v1/departamentos
* http://51.15.192.116:3000/api/v1/distritos
* http://51.15.192.116:3000/api/v1/ciudades
* http://51.15.192.116:3000/api/v1/barrios