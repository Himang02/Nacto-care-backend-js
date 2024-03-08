const getPatients = (req, res, pool) => {
    pool.query('SELECT * FROM patients', (err, result) => {
        if (err) {
            console.error('Error executing SQL commands', err);
        } else {
            res.json(result.rows);
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
        } else {
            res.json(result.rows);
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
        } else {
            res.json(result.rows);
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


    try {
        await pool.query(sql, (err, result) => {
            if (err) {
                console.error('Error executing SQL commands', err);
            }
        });
    } finally {
        await pool.query(`\nSELECT * FROM patients WHERE patient_id='${req.params.id}';`, (err, result) => {
            //     // console.log(2);
            if (err) {
                console.error('Error executing SQL commands', err);
            } else {
                // console.log(result);
                // console.log(result.rows);
                res.json(result.rows);
            }
        });
    }

}

module.exports = { getPatients, createPatient, deletePatient, editPatient }

/* 1. getPatients
2. createPatient, editPatient, deletePatient

*/