
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

const jwt = require('jsonwebtoken');


module.exports = async (req, res, next) => {

    const jwtToken = req.header('token');

    if (!jwtToken) {
        return res.status(403).json('Not Authorized, invalid token');
    };

    try {

        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

        req.user = payload.user;

        next();
        
    } catch (error) {

        console.error(error.message);
        return res.status(403).json('Not Authorized');
    };
};