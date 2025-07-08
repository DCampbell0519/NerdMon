const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.js');

module.exports = router;

router.get('/sign-up', authController.signUpForm)
router.post('/sign-up', authController.newUser)
router.get('/sign-in', authController.signInForm)
router.post('/sign-in', authController.userSignIn)
router.get('/sign-out', authController.signOut)
