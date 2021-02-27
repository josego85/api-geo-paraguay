## Instalación
    npm install

## Base de datos MySQL
Entramos a la consola de MySQL

    mysql -u root -p

Creamos la base de datos paraguay

    CREATE DATABASE paraguay CHARACTER SET utf8 COLLATE utf8_general_ci;
    exit

Importamos la base de datos paraguay

    tar xzvf db/paraguay.sql.tar.gz
    mysql -u root -p paraguay < db/paraguay.sql

## Configuración (base de datos MySQL)
config/db.config.js
  
    DATBASE: 'paraguay',
    USERNAME: 'root',
    PASSWORD : '123456',
    HOST: 'localhost'


## Hacer correr la app (modo desarrollo)
    node server.js

## Hacer correr la app (modo producción)
Pm2 es una herramienta para ambientes de producción de aplicaciones de Node.JS, básicamente esta herramienta nos sirve para levantar nuestra aplicación como un servicio demonio en nuestro servidor.
    
    npm install pm2 -g

Debemos crear un demonio con PM2 así que paramos el servidor y ejecutamos el siguiente comando:
    
    pm2 start /home/-proyectosbeta/repositoriosGit/api-geo-paraguay/server.js --name api-geo-paraguay

Necesitamos configurar el script de startup del servidor.
    
    pm2 startup

## Utilización del API
* https://51.15.192.116:3000/api/v1/paraguay/-59.517228974/-23.8302210107
* https://51.15.192.116:3000/api/v1/departamentos/-56.987/-25.564
* https://51.15.192.116:3000/api/v1/departamentos
* https://51.15.192.116:3000/api/v1/distritos
* https://51.15.192.116:3000/api/v1/ciudades
* https://51.15.192.116:3000/api/v1/barrios
