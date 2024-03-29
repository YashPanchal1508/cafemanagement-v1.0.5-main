const { Pool } = require('pg');

const pool = new Pool({
    // connectionString: process.env.POSTGRES_URL,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  })

pool.connect((err) => {
    if (err) {
        
        throw new Error(`Failed to connect to PostgreSQL : ${process.env.POSTGRES_DB}` + err.message);
    } else {
        console.log(`Connected to PostgreSQL ${process.env.POSTGRES_DATABASE} `);
    }
});

module.exports = pool;