
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

const express = require('express');
const app = express();
const cors = require('cors');
const https = require('https');
const fs = require('fs');


const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


//ROUTES

app.use('/auth', require('./routes/jwtAuth'));

app.use('/dashboard', require('./routes/dashboard'));

app.use('/userData', require('./routes/userInfo'));

app.use(express.static('../'));
//app.use('/', require('./routes/appRoutes'));

app.use('*', (req, res) => {
    res.redirect('/');
});



// const options = {
//     key: fs.readFileSync('keys/server.key'),
//     cert: fs.readFileSync('keys/server.crt')
// }

app.listen(port, () => console.log(`listening on port ${port}`));

