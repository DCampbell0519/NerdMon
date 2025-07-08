const User = require('../models/user.js');
const bcrypt = require('bcrypt');

module.exports = {
    signUpForm,
    newUser,
    signInForm,
    userSignIn,
    signOut,
}


function signUpForm (req, res) {
    res.render('auth/sign-up.ejs')
};

async function newUser (req, res) {
    const userInDatabase = await User.findOne({ username: req.body.username })

    if (userInDatabase) {
        return res.send('User already exists')
    }
    
    if (req.body.password !== req.body.confirmPassword) {
        return res.send('Passwords do not match')
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    const newUser = await User.create(req.body)
    res.redirect('/')
};

function signInForm (req, res) {
    res.render('auth/sign-in.ejs');
};

async function userSignIn (req, res) {
    const userInDatabase = await User.findOne({ username: req.body.username })
    if (!userInDatabase) {
        return res.send('User does not exist')
    } 

    const validPassword = bcrypt.compareSync(
        req.body.password,
        userInDatabase.password,
    )
    if (!validPassword) {
        res.send('Login failed.  Please try again.')
    }

    req.session.user = {
        username: userInDatabase.username,
        _id: userInDatabase._id,
    }
    res.redirect('/')
};

function signOut (req, res) {
    req.session.destroy();
    res.redirect('/');
};

