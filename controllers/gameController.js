const User = require('../models/user.js');

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

module.exports = {
    index,
    new: newGame,
    delete: deleteCar,
    update,
    create,
    edit,
    show,
}


// INDEX
async function index (req, res) {
    try {
        const currentUser = await User.findById(req.session.user._id)

        res.render('games/index.ejs', {
            games: currentUser.vault,
            user: currentUser,
        });
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
};

// NEW
function newGame (req, res) {
    res.render('games/new.ejs')
};

// DELETE
async function deleteCar (req, res) {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const currentGame = currentUser.vault.id(req.params.videoGameId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/videoGames`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
};

// UPDATE
async function update (req, res) {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const currentGame = currentUser.vault.id(req.params.videoGameId);

        currentGame.set(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/videoGames/${currentGame._id}`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
};

// CREATE
async function create (req, res) {
    console.log(req.body)

    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.vault.push(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/videoGames`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
};

// EDIT
async function edit (req, res) {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const currentGame = currentUser.vault.id(req.params.videoGameId);
        res.render('games/edit.ejs', {
            games: currentGame,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
};

// SHOW
async function show (req, res) {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const currentGame = currentUser.vault.id(req.params.videoGameId)
        res.render('games/show.ejs', {
            games: currentGame,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
};

