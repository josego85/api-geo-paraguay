const mysql = require('mysql2');
const dbConfig = require('config/db.config');

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.DB_HOST,
  port: dbConfig.DB_PORT,
  user: dbConfig.DB_USER,
  password: dbConfig.DB_PASSWORD,
  database: dbConfig.DB_NAME,
});

// Open the MySQL connection.
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  }
});

module.exports = connection;
