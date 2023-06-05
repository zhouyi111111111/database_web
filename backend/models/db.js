const mysql = require('mysql2/promise'); 

// 创建数据库连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'xsr170314',
  database: 'housesearch',
  charset:'utf8'
});

// 暴露数据库连接池
module.exports = pool;
