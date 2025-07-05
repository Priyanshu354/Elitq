const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @router POST /api/users/register
// @desc Register a new user
// @access Public

router.post("/register" , async(req, res) => {
    const {name, email, password} = req.body;

    //console.log(name, email, password);

    try {
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                message : "User Already Exists"
            });
        }
        
        user = new User({ name, email, password});
        await user.save();

        // Create JWT Payload
        const payload = {user : {id: user._id , role: user.role}};
        
        // sign and return the token along with user data
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "40h"}, (err, token) => {
            if(err) throw err;

            // send the user & token in response
            res.status(201).json({
                user: {
                    _id : user._id,
                    name: user.name,
                    email : user.email,
                    role: user.role,
                },
                token
            });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

// @router POST /api/users/login
// @desc Authenticate User
// @access Public

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    //console.log(email, password);
    try{
        let user = await User.findOne({email});

        if(!user) return res.status(400).json({message : "INVALID CREDENTIALS"});

        const isMatch = await user.matchPassword(password);

        if(!isMatch) return res.status(400).json({message : "INVALID CREDENTIALS"});

        // Create JWT Payload
        const payload = {user : {id: user._id , role: user.role}};
        
        // sign and return the token along with user data
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "40h"}, (err, token) => {
            if(err) throw err;

            // send the user & token in response
            res.json({
                user: {
                    _id : user._id,
                    name: user.name,
                    email : user.email,
                    role: user.role,
                },
                token
            });
        });
    }
    catch (error){
        console.error("Login Error:", error.message);
        res.status(500).send("Server Error");
    }
});



// @route GET /api/users/profile
// @desc get logged-in user's profile (Protected Route)
// @acess Private 
router.get("/profile", protect, async(req, res) =>{
    res.json(req.user);
})


module.exports = router;