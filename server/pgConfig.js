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

// pool.on('connect', () => {
//     console.log('Connect to the Database')
// })

// pool.on('remove', () => {
//     console.log('Client Removed')
//     process.exit(0)
// })

module.exports = pool;

// require('make-runnable')