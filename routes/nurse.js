const getNurses = (req, res, pool) => {
    pool.query('SELECT * FROM nurse', (err, result) => {
        if (err) {
            console.error('Error executing SQL commands', err);
        } else {
            res.json(result.rows);
        }
    });
}


//name, email, nurse_location, dob, phone_number
//INSERT INTO nurse (name, email, nurse_location, dob, phone_number) VALUES 
//-- ('Alice Smith', 'alice@example.com', POINT(40.7128, -74.0060), '1990-05-15', '1234567890'),
const createNurse = (req, res, pool) => {
    console.log(req.body['name']);
    let dateString = req.body['dob'];
    const [year, month, day] = dateString.split("-");
    const sqlDate = new Date(year, month - 1, day);
    // console.log(sqlDate);
    const formattedSqlDate = sqlDate.toISOString().split('T')[0];
    // console.log(formattedSqlDate);
    pool.query(`
    INSERT INTO nurse (name, email, nurse_location, dob, phone_number) VALUES 
    (
        '${req.body['name']}',
        '${req.body['email']}',
        '${req.body['nurse_location']}',
        '${formattedSqlDate}',
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


// DELETE FROM nurse
// WHERE id = 'your_nurse_id_here';
const deleteNurse = (req, res, pool) => {
    // console.log(req.body['id']);
    pool.query(`DELETE FROM nurse
        WHERE id = '${req.params['id']}'`, (err, result) => {
        if (err) {
            console.error('Error executing SQL commands', err);
        } else {
            res.json(result.rows);
        }
    });

}

// UPDATE nurse
// SET
//     name = 'new_name',
//     email = 'new_email',
//     nurse_location = 'new_location', -- assuming nurse_location is of type POINT
//     dob = 'new_dob',                 -- assuming dob is of type DATE
//     phone_number = 'new_phone_number'
// WHERE id = 'your_nurse_id_here';

const editNurse = async (req, res, pool) => {
    let editKeys = Object.keys(req.body);
    let editKeysSize = editKeys.length;
    sql = `UPDATE nurse SET `;
    let i = 0;
    editKeys.forEach(key => {
        sql += ` ${key}='${req.body[key]}'`
        i++;
        if (i != editKeysSize) {
            sql += ', ';
        }
        sql += '\n';

    });
    sql += `WHERE id = '${req.params.id}'`;

    console.log(sql);
    // await pool.query(sql, (err, result) => {
    //     if (err) {
    //         console.error('Error executing SQL commands', err);
    //     } else {
    //         console.log(result);
    //         console.log(result.rows);
    //         res.json(result.rows);
    //     }
    //     // console.log(1);
    // });
    // await pool.query(`\nSELECT * FROM nurse WHERE id='${req.params.id}';`, (err, result) => {
    //     // console.log(2);
    //     if (err) {
    //         console.error('Error executing SQL commands', err);
    //     } else {
    //         // console.log(result);
    //         // console.log(result.rows);
    //         res.json(result.rows);
    //     }
    // });

    try {
        await pool.query(sql, (err, result) => {
            if (err) {
                console.error('Error executing SQL commands', err);
            }
        });
    } finally {
        await pool.query(`\nSELECT * FROM nurse WHERE id='${req.params.id}';`, (err, result) => {
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

module.exports = { getNurses, createNurse, deleteNurse, editNurse }

/* 1. getNurses
2. createNurse, editNurse, deleteNurse

*/