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
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    videoGames: [videoGameSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;