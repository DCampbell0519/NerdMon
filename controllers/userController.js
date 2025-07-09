const express = require('express');
const router = express.Router();
const User = require('../models/user.js');


module.exports = {
    communityIndex,
    communityUser,
    communityVault,
}

async function communityIndex (req, res) {
    const usersInDatabase = await User.find({}).sort({ username: 1 })
    console.log(usersInDatabase)

    res.render('users/index.ejs', {
        users: usersInDatabase,
    });
};

async function communityUser (req, res) {
    const foundUser = await User.findById(req.params.userId)
    console.log('foundUser:', foundUser)

    res.render('users/show.ejs', {
        users: foundUser,
        vault: foundUser.vault,
    })
}

async function communityVault (req, res) {
    const foundUser = await User.findById(req.params.userId)
    const index = foundUser.vault.filter(game => {
        console.log({game: game._id.toString()})
        return game._id.toString() === req.params.videoGameId
    })

    console.log({index, params: req.params})
    res.send('Here should be the Communal Vault')
}