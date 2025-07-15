const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

module.exports = {
    userProfile,
    editProfile,
    updateProfile,
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

async function editProfile (req, res) {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const currentGame = currentUser.vault.id(req.params.videoGameId)
        res.render('users/edit.ejs', {
            users: currentUser,
            games: currentGame,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

async function updateProfile (req, res) {
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.set(req.body)
        await currentUser.save()
        res.redirect('/communityPage/profile')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}