const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController.js');

module.exports = router;

/*
Action	Route	HTTP Verb
Index	‘/users/:userId/videoGames’	GET
New	‘/users/:userId/videoGames/new’	GET
Create	‘/users/:userId/videoGames’	POST
Show	‘/users/:userId/videoGames/:videoGameId’	GET
Edit	‘/users/:userId/videoGames/:videoGameId/edit’	GET
Update	‘/users/:userId/videoGames/:videoGameId’	PUT
Delete	‘/users/:userId/videoGames/:videoGameId’	DELETE
*/

router.get('/', gameController.index)
router.get('/new', gameController.new)
router.delete('/:videoGameId', gameController.delete)
router.put('/:videoGameId', gameController.update)
router.post('/', gameController.create)
router.get('/:videoGameId/edit', gameController.edit)
router.get('/:videoGameId', gameController.show)



