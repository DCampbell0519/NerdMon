/*------------------------------- Starter Code -------------------------------*/
const express = require('express');
const app = express();
const middleware = require('./middleware/mid.js');
require('dotenv').config();
require('./config/db.js');

const port = process.env.PORT ? process.env.PORT : "3000"

/*------------------------------- Middleware -------------------------------*/

middleware(app);


/*------------------------------- Routers -------------------------------*/

app.get('/', (req, res) => {
    res.render('index.ejs', {
        user: req.session.user,
    });
});




app.listen(port, () => {
    console.log('Welcome to the Thunderdome!')
})