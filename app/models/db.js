'use strict';

const mysql = require('mysql');
const dbConfig = require('config/db.config.js');

// Create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.DB_HOST,
    user: dbConfig.DB_USER,
    password: dbConfig.DB_PASSWORD,
    database: dbConfig.DB_NAME,
});

// Open the MySQL connection.
connection.connect((error) => {
    if (error) {
        throw error;
    }
    // console.log('Successfully connected to the database.');
});

module.exports = connection;
