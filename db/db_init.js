require('dotenv').config()
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
// Create a PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.CONNECTION_ELEPHANT,
});

// Test the database connection
pool.connect((err, client, done) => {
    if (err) {
        console.error('Error connecting to the database', err);
    } else {
        console.log('Connected to the database');
    }
});

// Read the SQL file
const sqlFilePath = path.join(__dirname, 'db_init.sql');
const sql = fs.readFileSync(sqlFilePath).toString();
console.log(sql);

// Execute SQL commands
pool.query(sql, (err, result) => {
    if (err) {
        console.error('Error executing SQL commands', err);
    } else {
        console.log('Tables created successfully');
    }
});