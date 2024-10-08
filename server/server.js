
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

const express = require('express');
const app = express();
const cors = require('cors');


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
    console.log('Odd connection ' + req.originalUrl);
    return res.redirect('/');
});



app.listen(port, () => console.log(`listening on port ${port}`));

