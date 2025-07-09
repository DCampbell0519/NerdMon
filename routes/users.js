const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

module.exports = router;


router.get('/', userController.communityIndex);
router.get('/:userId', userController.communityUser);
router.get('/:userId/:videoGameId', userController.communityVault);

