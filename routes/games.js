const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController.js');

module.exports = router;

router.get('/', gameController.index)
router.get('/new', gameController.new)
router.delete('/:videoGameId', gameController.delete)
router.put('/:videoGameId', gameController.update)
router.post('/', gameController.create)
router.get('/:videoGameId/edit', gameController.edit)
router.get('/:videoGameId', gameController.show)



