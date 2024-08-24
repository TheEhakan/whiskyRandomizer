
const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validinfo');
const authorization = require('../middleware/authorization');

//registering new user
router.post('/register', validInfo, async (req, res) => {
    try {
        
        // get info
        const { name, email, dob, password } = req.body;

        // check if user exists
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1;', [email]);

        if (user.rows.length) {
            return res.status(401).json('Email already registered');
        }

        //bcrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        //enter new user into database
        const newUser = await pool.query('INSERT INTO users (user_name, user_email, user_dob, user_password, user_settings) VALUES ($1, $2, $3, $4, ARRAY[false, true, false]) RETURNING *;', [name, email, dob, hashedPass]);

        //generate jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);
        return res.json({token});

    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server error,')
    };
});

//login route
router.post('/login', validInfo , async (req, res) => {
    try {

        // get info from user
        const { email, password } = req.body;

        //check if user dosent exist
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

        if (!user.rows.length) {
            return res.status(401).json('Password or Email incorrect');
        };

        //compare passwords
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if (!validPassword) {
            return res.status(401).json('Password or Email incorrect');
        };

        //give jwt token if success
        const token = jwtGenerator(user.rows[0].user_id);
        const info = [{token}, user.rows[0].user_name];
        return res.json(info);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Server Error');
    };
});

//check if jwt is valid and log user in
router.get('/is-verify', authorization, async (req, res) => {
    try {

        //get user name and id and return to client
        const user = await pool.query('SELECT user_name, user_id FROM users WHERE user_id = $1', [req.user]);

        return res.json(user.rows[0]);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Server Error');
    }
});

//check if user is logged in
router.get('/valid-token', authorization, async (req, res) => {

    try {

        //check if user is auth and return true
        return res.json(true);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Server Error');
    }
})

module.exports = router;
