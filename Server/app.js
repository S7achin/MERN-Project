const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config({path:'./config.env'})

const PORT = process.env.PORT;
require('./db/conn');
// const User = require('./model/userSchema');
app.use(express.json());

// we link the router files to make route easy
app.use(require('./router/auth'));


// // Middleware
// const middleware = (req, res, next)=>{
//     console.log(`Hello my middleware`);
//     next();
// }


// app.get('/',(req, res)=>{
//     res.send(`Hello world from the server`)
// })
// app.get('/about',middleware,(req, res)=>{
//     res.send(`Hello world from the about`)
// })
// app.get('/contact',(req, res)=>{
//     res.cookie("test","Saaaacchu")
//     res.send(`Hello world from the contact`)
// })
// app.get('/signin',(req, res)=>{
//     res.send(`Hello world from the register`)
// })
// app.get('/signup',(req, res)=>{
//     res.send(`Hello world from the register`)
// })

app.listen(PORT, ()=>{
    console.log(`Server is running on port no. ${PORT}`)
})