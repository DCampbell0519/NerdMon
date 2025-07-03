/*------------------------------- Starter Code -------------------------------*/
const express = require('express');
const app = express();
const middleware = require('./middleware/mid.js');
require('dotenv').config();
require('./config/db.js');
const { applyMiddleware, isSignedIn, passUserToView } = require('./middleware/mid.js');

const authController = require('./controllers/auth.js');
const gameController = require('./controllers/games.js');


const port = process.env.PORT ? process.env.PORT : "3000"

/*------------------------------- Middleware -------------------------------*/

applyMiddleware(app);


/*------------------------------- Routers -------------------------------*/

app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect(`/users/${req.session.user._id}/videoGames`)
    } else {
        res.render('index.ejs', {
            user: req.session.user,
        });
    }
});

app.use(passUserToView);
app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/videoGames', gameController);


app.listen(port, () => {
    console.log('Welcome to the Thunderdome!')
})