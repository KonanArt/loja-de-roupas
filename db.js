const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',      // Seu usuário do MySQL, mude se nescessário
    password: '',      // Sua senha do MySQL
    database: 'loja_roupas',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();