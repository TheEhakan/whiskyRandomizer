<<<<<<< HEAD

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

const jwt = require('jsonwebtoken');


function jwtGenerator(user_id) {
    const payload = {
        user: user_id
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })
}

=======

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

const jwt = require('jsonwebtoken');


function jwtGenerator(user_id) {
    const payload = {
        user: user_id
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })
}

>>>>>>> 7eefc1e6f30814f779bacaf7c74e720c6feb78df
module.exports = jwtGenerator;