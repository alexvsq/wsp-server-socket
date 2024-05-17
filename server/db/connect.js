const { createPool } = require('mysql2/promise');

const pool = createPool({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '12345678',
    database: 'wsp'
});

module.exports = pool;