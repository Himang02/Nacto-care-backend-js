require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.CONNECTION_ELEPHANT,
});
const routesNurse = require('./routes/nurse');
const routesPatient = require('./routes/patient');
const router = require('./routes/router');

pool.connect((err, client, done) => {
    if (err) {
        console.error('Error connecting to the database', err);
    } else {
        console.log('Connected to the database');
    }
});
// Configure morgan to log requests
app.use(morgan('dev'));

// Parse JSON request bodies
app.use(bodyParser.json());

router(app, pool);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
