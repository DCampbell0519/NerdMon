require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');

const isSignedIn = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/auth/sign-in')
    }
}

const passUserToView = (req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : null;
    next();
}

const applyMiddleware = function(app) {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(methodOverride('_method'));
    app.use(morgan('dev'));
    app.use(express.static('public'));
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    }));
}

module.exports = {
    applyMiddleware,
    isSignedIn,
    passUserToView,
};