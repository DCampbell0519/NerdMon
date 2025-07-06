const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js');



router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
});

router.post('/sign-up', async (req, res) => {
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
})

router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in.ejs');
});

router.post('/sign-in', async (req, res) => {
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
})

router.get('/sign-out', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;