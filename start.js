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

app.get('/getNurses', (req, res) => {
    routesNurse.getNurses(req, res, pool);
})
app.post('/createNurse', (req, res) => {
    routesNurse.createNurse(req, res, pool);
})
app.delete('/deleteNurse/:id', (req, res) => {
    routesNurse.deleteNurse(req, res, pool);
    // console.log(req.params);
})
app.put('/editNurse/:id', (req, res) => {
    routesNurse.editNurse(req, res, pool);

})


app.get('/getPatients', (req, res) => {
    routesPatient.getPatients(req, res, pool);
})
app.post('/createPatient', (req, res) => {
    routesPatient.createPatient(req, res, pool);
})
app.delete('/deletePatient/:id', (req, res) => {
    routesPatient.deletePatient(req, res, pool);
    // console.log(req.params);
})
app.put('/editPatient/:id', (req, res) => {
    routesPatient.editPatient(req, res, pool);

})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
