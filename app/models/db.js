'use strict';

const mysql = require('mysql2');
const dbConfig = require('config/db.config.js');

// Create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.DB_HOST,
    user: dbConfig.DB_USER,
    password: dbConfig.DB_PASSWORD,
    database: dbConfig.DB_NAME,
});

// Open the MySQL connection.
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Successful MySQL connection');
});

module.exports = connection;
