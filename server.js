const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const App = express()

App.use(cors())
App.use(express.json())

mongoose.connect('mongodb://localhost:27017/my-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB initialized")
}).catch((error) =>{
    console.log(error)
})



App.listen(5000, () => {
    console.log("Welcome to backend...")
})