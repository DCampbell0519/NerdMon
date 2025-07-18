const mongoose = require('mongoose');

const videoGameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    gamingSystem: {
        type: String, 
        required: true,
    },
    releaseDate: {
        type: Number,
        required: true,
    },
    companyLink: String,
    gameImage: String, 
    notes: String, 
    status: {
        type: String, 
        enum: ['lovedIt', 'hatedIt', 'neutral', 'haveYetToTry'],
    },
    rating: Number,
    owner: String,
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String, 
        default: null,
    },  
    age: Number,
    favoriteQuote: String,
    bio: String,
    vault: [videoGameSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;