const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'pgadmin',
    host: 'localhost',
    port: 5432,
    database: 'ejsblog'
});

if (pool) {
    console.log('Database connected');
} else {
    console.log('Database connection failed');
}

module.exports = pool;