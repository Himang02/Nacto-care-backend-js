
const routesNurse = require('./nurse');
const routesPatient = require('./patient');

const router = (app, pool) => {
    app.get('/getNurses', (req, res) => {
        routesNurse.getNurses(req, res, pool);
    })
    app.post('/createNurse', (req, res) => {
        routesNurse.createNurse(req, res, pool);
    })
    app.delete('/deleteNurse/:id', (req, res) => {
        routesNurse.deleteNurse(req, res, pool);
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
    })
    app.put('/editPatient/:id', (req, res) => {
        routesPatient.editPatient(req, res, pool);
    
    })
}

module.exports = router;