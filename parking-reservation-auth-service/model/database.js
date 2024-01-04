const mysql = require('mysql2');

// Database configuration
const connection = mysql.createConnection({
  host: "mysql-auth-service-db",
  user: "root",
  password: "password",
  database: "parkingauthserviceDB",
});

// connection.connect((err) => {
//   if (err) throw err;
//   connection.query(`DROP TABLE User`, (err, result, fields) => {
//     if (err) throw err;
//   });
// });

// Create the User table
connection.connect((err) => {
  if (err) throw err;
  connection.query(`
  CREATE TABLE IF NOT EXISTS User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_email VARCHAR(255) NOT NULL,
    user_hash VARCHAR(255) NOT NULL,
    user_salt VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_first_name VARCHAR(255) NOT NULL,
    user_last_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`, (err, result, fields) => {
    if (err) throw err;
  });
});

module.exports = {
  connection
};
