
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

module.exports = jwtGenerator;

