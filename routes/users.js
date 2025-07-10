const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const profileController = require('../controllers/profileController.js');

module.exports = router;


router.get('/', userController.communityIndex);
router.get('/profile', profileController.userProfile);
router.put('/profile', profileController.updateProfile);
router.get('/profile/edit', profileController.editProfile);

router.get('/:userId', userController.communityUser);
router.get('/:userId/:videoGameId', userController.communityVault);
