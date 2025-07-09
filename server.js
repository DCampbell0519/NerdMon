/*------------------------------- Starter Code -------------------------------*/
const express = require('express');
const app = express();
require('dotenv').config();
require('./config/db.js');
const middleware = require('./middleware/mid.js');
const { applyMiddleware, isSignedIn, passUserToView } = require('./middleware/mid.js');

const authRouter = require('./routes/auth.js');
const gameRouter = require('./routes/games.js');
const userRouter = require('./routes/users.js');


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
app.use('/auth', authRouter);
app.use(isSignedIn);
app.use('/users/:userId/videoGames', gameRouter);
app.use('/communityPage', userRouter);


app.listen(port, () => {
    console.log('Welcome to the Thunderdome!')
})