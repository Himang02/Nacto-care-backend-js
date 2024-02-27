require('dotenv').config()

const express = require('express');
const app = express();
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Configure morgan to log requests
app.use(morgan('dev'));

// Parse JSON request bodies
app.use(bodyParser.json());

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});