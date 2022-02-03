const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'LocalHost',
    database: 'studyapp',
    password: 'ENTER-YOUR-DB-PASSWORD',
    port: 5432
});

module.exports = pool;


    