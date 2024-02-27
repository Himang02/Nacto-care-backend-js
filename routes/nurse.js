const getNurses = (req,res,pool) => {
    pool.query('SELECT * FROM nurse', (err, result) => {
        if (err) {
            console.error('Error executing SQL commands', err);
        } else {
            res.json(result.rows);
        }
    });
}

module.exports = { getNurses }