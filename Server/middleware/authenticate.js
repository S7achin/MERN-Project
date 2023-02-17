const jwt = require("jsonwebtoken")
const User = require('../model/userSchema');
const cookieParser = require('cookie-parser');

const authenticate = async (req, res, next) => {
    // console.log(req.cookies.jwtoken); 
    try {
        let token = req.cookies.jwtoken;
        // console.log(token);
        let verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verifyToken);

        const rootUser = await User.findOne({ _id:verifyToken._id, "tokens.token": token});
        // console.log(rootUser);

        if(!rootUser){throw new Error("User Not Found")}

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        // console.log("Authentication Successfull");
        next(); 

    } catch (error) {
        res.status(401).send("Unauthorized:No token provided");
        console.log(error);
    }

}

module.exports = authenticate