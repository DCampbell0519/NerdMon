const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js');



router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
});

router.post('/sign-up', async (req, res) => {
    res.send('Got your info' + req.body.username)
    const userInDatabase = await User.findOne({ username: req.body.username })

    if (userInDatabase) {
        return res.send('User already exists')
    }
})

router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in.ejs');
});



module.exports = router;