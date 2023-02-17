const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const cookieParser = require('cookie-parser')

router.use(cookieParser());

require('../db/conn');
const User = require('../model/userSchema');

// router.get('/',(req, res)=>{
//     res.send(`Hello world from the server from router`);
// })

// Using Promises
// router.post('/register',(req, res)=>{

//     const {name, email, phone, work, password, cpassword} = req.body

//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({ error:"Plz fill the field properly" });
//     }

//     User.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({ error:"Email already Exist" });
//         }

//         const user = new User({name, email, phone, work, password, cpassword})

//         user.save().then(()=>{
//             res.status(201).json({message:"user registered sucessfully"})
//         }).catch((err)=> res.status(500).json({error :"Failed to registered"}))
//     }).catch( err => console.log(err));

// })

// Using async-await
router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Plz fill the field properly" });
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already Exist" });
        } else if (password != cpassword) {
            return res.status(400).json({ error: "password are not matching" })
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });
            // Hashing of password
            await user.save();
            res.status(201).json({ message: "user registered sucessfully" });
        }


    }
    catch (error) {
        console.log(error);
    }

})

// Login route
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            console.log(req.body);
            return res.status(404).json({ error: "Plz fill the data" });
        }

        const userLogin = await User.findOne({ email: email });
        // console.log(userLogin);
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            const token = await userLogin.generateAuthToken();
            // console.log(token);
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });


            if (!isMatch)
                res.status(404).json({ error: "Invalid Login Credentials" })
            else
                res.json({ message: "User SignIn successfull" })

        } else {
            res.status(404).json({ error: "Invalid Login Credentials" })
        }
    } catch (error) {
        console.log(error);
    }
})

// about us page
router.get('/about', authenticate, (req, res) => {
    // console.log("testing")
    // res.send(`Hello world from the about`);
    res.send(req.rootUser);
})

// Get user data
router.get('/getdata', authenticate, (req, res) => {
    res.send(req.rootUser);
})

// Contact us page
router.post('/contact', authenticate, async (req,res) =>{
    try {
        const {name,email,phone,message} = req.body;

        if (!name || !email || !phone || !message){
            return res.status(400).json("Plzz fill the contact form");
        }

        const userContact = await User.findOne({ _id:req.userID })

        if(userContact){
            const userMessage = await userContact.addMessage(message);
            await userContact.save();
            res.status(201).json({ message: "Message saved successfully "});
        }

    } catch (error) {
        console.log(error);
    }
})


router.get('/logout', (req, res) => {
    console.log("Logout Success");
    res.clearCookie('jwtoken', { path: '/'});
    res.status(200).send('User Logout');
})

module.exports = router