## Instalacion
    npm install

## Base de datos MySQL
Entramos a la consola de MySQL

    mysql -u root -p

Creamos la base de datos paraguay

    CREATE DATABASE paraguay CHARACTER SET utf8 COLLATE utf8_general_ci;
    exit

Importamos la base de datos paraguay

    mysql -u root -p paraguay < db/paraguay.sql
    mysql -u root -p paraguay < db/distritos.sql
    mysql -u root -p paraguay < db/ciudades.sql

## Configuracion (base de datos MySQL)
server.js

        host: 'localhost',
        user: 'root',
        password : '123456',
        port : 3306,        // Puerto mysql
        database: 'paraguay'



## Hacer correr la app (modo desarrollo)
    node server.js

## Hacer correr la app (modo producción)
Pm2 es una herramienta para ambientes de producción de aplicaciones de Node.Js, básicamente esta herramienta nos sirve para levantar nuestra aplicación como un servicio demonio en nuestro servidor.
    
    npm install pm2 -g

Debemos crear un demonio con PM2 así que paramos el servidor y ejecutamos el siguiente comando:
    
    pm2 start /home/-proyectosbeta/repositoriosGit/api-geo-paraguay/server.js --name api-geo-paraguay

Necesitamos configurar el script de startup del servidor.
    
    pm2 startup

## Abrir navegador web
* http://localhost:3000/api/v1/departamentos
* http://localhost:3000/api/v1/departamentos/-56.987/-25.564
* http://localhost:3000/api/v1/departamentos/-59.517228974/-23.8302210107

## Utilizacion de la api
* http://51.15.192.116:3000/api/v1/departamentos
* http://51.15.192.116:3000/api/v1/departamentos/-56.987/-25.564
* http://51.15.192.116:3000/api/v1/departamentos/-59.517228974/-23.8302210107
