const getPatients = (req, res, pool) => {
    pool.query('SELECT * FROM patients', (err, result) => {
        if (err) {
            console.error('Error executing SQL commands', err);
            res.status(500).json({ error: 'Your request broke our servers :( Working to quickly bring them back to life.' });
        } else {
            res.status(200).json(result.rows);
        }
    });
}


//name, email, phone_number
//INSERT INTO Patient (name, email, phone_number) VALUES 
//-- ('Alice Smith', 'alice@example.com', '1234567890'),
const createPatient = (req, res, pool) => {
    pool.query(`
    INSERT INTO patients (name, email, phone_number) VALUES 
    (
        '${req.body['name']}',
        '${req.body['email']}',
        '${req.body['phone_number']}'
    );
`, (err, result) => {
        if (err) {
            console.error('Error executing SQL commands', err);
            res.status(500).json({ error: 'Your request broke our servers :( Working to quickly bring them back to life.' });
        } else {
            res.status(201).json(result.rows);   
        }
    });

}


// DELETE FROM patient
// WHERE id = 'your_patient_id_here';
const deletePatient = (req, res, pool) => {
    // console.log(req.body['id']);
    pool.query(`DELETE FROM patients
        WHERE patient_id = '${req.params['id']}'`, (err, result) => {
        if (err) {
            console.error('Error executing SQL commands', err);
            res.status(500).json({ error: 'Your request broke our servers :( Working to quickly bring them back to life.' });
        } else {
            res.status(200).json(result.rows);
        }
    });

}

// UPDATE Patient
// SET
//     name = 'new_name',
//     email = 'new_email',
//     Patient_location = 'new_location', -- assuming Patient_location is of type POINT
//     dob = 'new_dob',                 -- assuming dob is of type DATE
//     phone_number = 'new_phone_number'
// WHERE id = 'your_Patient_id_here';

const editPatient = async (req, res, pool) => {
    let editKeys = Object.keys(req.body);
    let editKeysSize = editKeys.length;
    sql = `UPDATE patients SET `;
    let i = 0;
    editKeys.forEach(key => {
        sql += ` ${key}='${req.body[key]}'`
        i++;
        if (i != editKeysSize) {
            sql += ', ';
        }
        sql += '\n';

    });
    sql += `WHERE patient_id = '${req.params.id}'`;

    console.log(sql);
    await pool.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing SQL commands', err);
            res.status(500).json({ error: 'Your request broke our servers :( Working to quickly bring them back to life.' });
        } else {
            console.log('Patient updated');
        }
    });
    await pool.query(`\nSELECT * FROM patients WHERE id='${req.params.id}';`, (err, result) => {
        if (err) {
            console.error('Error executing SQL commands', err);
            res.status(500).json({ error: 'Your request broke our servers :( Working to quickly bring them back to life.' });
        } else {
            console.log(result.rows);
            const patientObject = result.rows[0];
            const newPatientObject = Object.assign({}, patientObject, req.body);
            res.status(200).json(newPaitentObject);
        }
    });

}

module.exports = { getPatients, createPatient, deletePatient, editPatient }

/* 1. getPatients
2. createPatient, editPatient, deletePatient

*/