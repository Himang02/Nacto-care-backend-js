const getNurses = (req, res, pool) => {
    pool.query('SELECT * FROM nurse', (err, result) => {
        if (err) {
            console.error('Error executing SQL commands', err);
            res.status(500).json({ error: 'Your request broke our servers :( Working to quickly bring them back to life.' });
        } else {
            res.status(200).json(result.rows);
        }
    });
}


/* name, email, nurse_location, dob, phone_number
SQL Query:

INSERT INTO nurse (name, email, nurse_location, dob, phone_number) VALUES 
-- ('Alice Smith', 'alice@example.com', POINT(40.7128, -74.0060), '1990-05-15', '1234567890'),

*/
const createNurse = (req, res, pool) => {
    console.log(req.body['name']);
    let dateString = req.body['dob'];
    const [year, month, day] = dateString.split("-");
    const sqlDate = new Date(year, month - 1, day);
    const formattedSqlDate = sqlDate.toISOString().split('T')[0];
    pool.query(`
        INSERT INTO nurse (name, email, nurse_location, dob, phone_number) VALUES 
        (
            '${req.body['name']}',
            '${req.body['email']}',
            '${req.body['nurse_location']}',
            '${formattedSqlDate}',
            '${req.body['phone_number']}'
        );`, (err, result) => {
        if (err) {
            console.error('Error executing SQL commands', err);
            res.status(500).json({ error: 'Your request broke our servers :( Working to quickly bring them back to life.' });
        } else {
            res.status(201).json(result.rows);
        }
    });

}


/* id
SQL Query:
DELETE FROM nurse WHERE id = 'your_nurse_id_here';
*/
const deleteNurse = (req, res, pool) => {
    // console.log(req.body['id']);
    pool.query(`DELETE FROM nurse
        WHERE id = '${req.params['id']}'`, (err, result) => {
        if (err) {
            console.error('Error executing SQL commands', err);
            res.status(500).json({ error: 'Your request broke our servers :( Working to quickly bring them back to life.' });
        } else {
            res.status(200).json(result.rows);
        }
    });

}

/* name, email, nurse_location, dob, phone_number

SQL Query:

UPDATE nurse 
SET
    name = 'new_name',
    email = 'new_email',
    nurse_location = POINT(new_latitude, new_longitude),
    dob = 'new_dob',
    phone_number = 'new_phone_number'
WHERE id = 'your_nurse_id_here';
*/
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
    await pool.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing SQL commands', err);
            res.status(500).json({ error: 'Your request broke our servers :( Working to quickly bring them back to life.' });
        } else {
            console.log('Nurse updated');
        }
    });
    await pool.query(`\nSELECT * FROM nurse WHERE id='${req.params.id}';`, (err, result) => {
        if (err) {
            console.error('Error executing SQL commands', err);
            res.status(500).json({ error: 'Your request broke our servers :( Working to quickly bring them back to life.' });
        } else {
            console.log(result.rows);
            const nurseObject = result.rows[0];
            const newNurseObject = Object.assign({}, nurseObject, req.body);
            res.status(200).json(newNurseObject);
        }
    });
}

module.exports = { getNurses, createNurse, deleteNurse, editNurse }
