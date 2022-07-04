const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'db',
  port: 3306,

});
module.exports = db;

// require('dotenv').config();

//   const db = mysql.createPool({
//       host: process.env.MYSQL_HOST,
//       port: Number(process.env.MYSQL_PORT),
//       user: process.env.MYSQL_USER,
//       password: process.env.MYSQL_PASSWORD,
//       database: 'db',
// });

// const db = mysql.createPool({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: '1234',
//   database: 'db',
// });
/**
 * const db = mysql.createPool({'mysql://root:1234@localhost:3306/db'});
 */

