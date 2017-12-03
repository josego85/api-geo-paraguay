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

## Configuracion (base de datos MySQL)
server.js

        host: 'localhost',
        user: 'root',
        password : '123456',
        port : 3306,        // Puerto mysql
        database: 'paraguay'


## Hacer correr la app
node server.js

## Abrir navegador web
* http://localhost:3000/api/v1/departamentos
* http://localhost:3000/api/v1/departamentos/-56.987/-25.564


## Utilizacion de la api
* http://51.15.192.116:3000/api/v1/departamentos
* http://51.15.192.116:3000/api/v1/departamentos/-56.987/-25.564
