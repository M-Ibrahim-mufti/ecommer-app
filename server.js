const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const AuthenticationRoutes = require('./routes/AuthenticationRoutes')
const cookieParser = require('cookie-parser')
require('dotenv').config();
const App = express()

App.use(cookieParser())
App.use(cors({
    origin: [process.env.REACT_APP_CLIENT_URL],
    methods: ['GET','POST'],
    credentials: true
}))
App.use(express.json())
    
mongoose.connect('mongodb://localhost:27017/Ecommerce-App').then(()=>{console.log('MongoDB Connected')})
                
App.use('/', AuthenticationRoutes)
                

App.listen(5000, ()  => {
    console.log("Welcome to backend...")
})