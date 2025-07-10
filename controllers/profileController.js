const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

module.exports = {
    userProfile,
}

async function userProfile (req, res) {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const currentGame = currentUser.vault.id(req.params.videoGameId)
        
        res.render('users/profile.ejs', {
            users: currentUser,
            games: currentGame,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

