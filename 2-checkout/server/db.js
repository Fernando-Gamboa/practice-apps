const mysql = require("mysql2");
const Promise = require("bluebird");

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

// if .connectASYNC theres no need for schema.sql file ---
// to add more tables add another .then() with db.queryAsync
db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() =>
    // Expand this table definition as needed:
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS responses (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, user VARCHAR(255) NOT NULL DEFAULT 'NULL', password VARCHAR(255) NOT NULL DEFAULT 'NULL', address VARCHAR(255) NOT NULL DEFAULT 'NULL', state VARCHAR(255) NOT NULL DEFAULT 'NULL', zip INTEGER NOT NULL, card VARCHAR(255) NOT NULL DEFAULT 'NULL', security INTEGER NOT NULL, cookie VARCHAR(255) NOT NULL DEFAULT 'NULL', UNIQUE (cookie))"
    )
  )
  .catch((err) => console.log(err));

module.exports = db;
