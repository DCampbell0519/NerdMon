const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

module.exports = router;


router.get('/', (req, res) => {
    res.send('Hello games index route!')
})