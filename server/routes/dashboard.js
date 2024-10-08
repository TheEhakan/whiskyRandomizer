
const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');
const bcrypt = require('bcrypt');
const validinfo = require('../middleware/validinfo');

router.get('/', authorization, async (req, res) => {

    //check if user is auth
    if(!req.user) {
        return res.status(404).json('No user found.')
    }

    try {

        const user = await pool.query('SELECT user_name, user_email, user_DOB FROM users WHERE user_id = $1', [req.user]);

        return res.json(user.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error');
    }
});

router.put('/', validinfo, authorization, async (req, res) => {

    //get new user info
    const { name, email, dob } = req.body;

    //check if user is auth
    if(!req.user) {
        return res.status(404).json('No user found.')
    }

    try {
        
        //update user info in database and return new values
        const user = await pool.query('UPDATE users SET user_name = $1, user_email = $2, user_dob = $3 WHERE user_id = $4 RETURNING user_name, user_email, user_dob;', [name, email, dob, req.user]);

        return res.json(user.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error');
    };
});

router.put('/change-pass', validinfo, authorization, async (req, res) => {

    //get new user info
    const { oldPassword, newPassword } = req.body;

    //check if user is auth
    if(!req.user) {
        return res.status(404).json('No user found.')
    };

    try {

        //get current hashed password
        const user = await pool.query('SELECT user_password FROM users WHERE user_id = $1', [req.user]);

        //compare current passwords to validate auth
        const validPassword = await bcrypt.compare(oldPassword, user.rows[0].user_password);

        if (!validPassword) {
            return res.status(401).json('Incorrect Password.');
        };

        //bcrypt new password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(newPassword, salt);

        //inset hashed pass into database
        await pool.query('UPDATE users SET user_password = $1 WHERE user_id = $2', [hashedPass, req.user]);

        return res.json('Password Changed');
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error');
    }

})

// router.delete('/', authorization, async (req, res) => {

//     //collect the id
//     const user_id = req.user;

//     //check if user is auth
//     if(!req.user) {
//         return res.status(404).json('No user found.')
//     };

//     try {

//         //delete the user and all associated data
//         const user = await pool.query('DELETE FROM users WHERE user_id = $1', [user_id]);

//         return res.json('User Deleted')
        
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json('Server Error');
//     }
// });

module.exports = router;