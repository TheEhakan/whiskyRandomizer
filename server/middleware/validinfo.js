
module.exports = (req, res, next) => {
    const { name, email, dob, password, oldPassword, newPassword } = req.body;

    function validEmail (userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    };

    if (req.path === "/register") {

        if (![name, email, dob, password].every(Boolean)) {
            return res.status(401).json('Missing Credentials');

        } else if (!validEmail(email)) {
            return res.status(401).json('Invalid Email');
        };

    } else if (req.path === '/login') {

        if (![email, password].every(Boolean)) {
            return res.status(401).json('Missing Credentials');

        } else if (!validEmail(email)) {
            return res.status(401).json('Invalid Email');
        };

    } else if (req.path === '/') {

        if (![name, email, dob].every(Boolean)) {
            return res.status(401).json('Missing Credentials');

        } else if (!validEmail(email)) {
            return res.status(401).json('Invalid Email');
        };
        
    } else if (req.path === '/change-pass') {
        
        if (![oldPassword, newPassword].every(Boolean)) {
            return res.status(401).json('Missing Credentials');
        };
    };

    next();
};