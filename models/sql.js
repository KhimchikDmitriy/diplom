import mysql from "mysql";
import "dotenv/config.js";
import logger from "../logger/index.js";

const connection = mysql.createConnection({
  host: "sql11.freemysqlhosting.net",
  port: "3306",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("...");
  console.log("соединение установлено");
  console.log("...");
  logger.info("произведено соеденение с базой данных");

  let sql =
    "CREATE TABLE IF NOT EXISTS posts ( id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(255) NOT NULL, body TEXT,author VARCHAR(255) DEFAULT 'user', media TEXT, whom  VARCHAR(255))";
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  sql =
    "CREATE TABLE IF NOT EXISTS user (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(50), age INT NOT NULL, role VARCHAR(50) DEFAULT 'user')";
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  sql =
    "CREATE TABLE IF NOT EXISTS chat (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL)";
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });
});

export default connection;
