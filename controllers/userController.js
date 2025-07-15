const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

module.exports = {
    communityIndex,
    communityUser,
    communityVault,
}

async function communityIndex (req, res) {
    const usersInDatabase = await User.find({}).sort({ username: 1 });

    res.render('users/index.ejs', {
        users: usersInDatabase,
    });
};

async function communityUser (req, res) {
    const foundUser = await User.findById(req.params.userId)

    res.render('users/show.ejs', {
        users: foundUser,
        vault: foundUser.vault,
    })
}

async function communityVault (req, res) {
    try {
        const foundUser = await User.findById(req.params.userId)
        if (!foundUser) {
            return res.status(404).send('User not found');
        }
        const isMyPage = req.session.user._id === req.params.userId;

        const vault = foundUser.vault || [];
        
        const vaultGames = vault.find(game => {
            return game._id.toString() === req.params.videoGameId
        })
        
        res.render('games/show.ejs', {
            games: vaultGames,
            isMyPage: isMyPage,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/communityPage')
    }
}