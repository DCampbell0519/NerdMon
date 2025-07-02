/*------------------------------- Starter Code -------------------------------*/
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const middleware = require('./middleware/mid.js');

const port = process.env.PORT ? process.env.PORT : "3000"

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})


/*------------------------------- Middleware -------------------------------*/

middleware(app);


/*------------------------------- Routers -------------------------------*/

app.get('/', (req, res) => {
    res.send('I be video Gamin!')
})




app.listen(port, () => {
    console.log('Welcome to the Thunderdome!')
})