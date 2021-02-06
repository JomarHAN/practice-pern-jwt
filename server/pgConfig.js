const Pool = require('pg').Pool;

const pool = new Pool({
    user: "jomarnguyen",
    password: "jomar22",
    host: "localhost",
    database: "practice",
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
})


module.exports = pool;
