const express=require('express');
const router = express.Router();

const User = require('../model/auth');
const {generateToken} = require('../service/auth');

router.post("/register",async(req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    if(!username || !email || !password || !role){
        return res.status(400).json({message:"Please provide all the fields"});
    }

    let check = await User.findOne({email});

    if(check){
        return res.status(400).json({message:"email already exists",
    
        isEmailExists:true
    });
    }

    check = await User.findOne({username});

    if(check){
        return res.status(400).json({message:"Username already exists",

        isUsernameExists:true
    
    });
    }

    const user = await User.create({
        username:username,
        email:email,
        password:password,
        role:role
    });

    // console.log(user);

    return res.status(201).json({user});
});

router.post("/login",async(req,res)=>{
    
    const email = req.body.email;
    const password = req.body.password;
    
    if(!email || !password){
        return res.status(400).json({message:"Please provide email and password"});
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return res.status(404).json({message:"Invalid credentials"});
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(404).json({message:"Invalid credentials"});
    }

    const token = generateToken(user);

    res.cookie("token",token);
    console.log(email);
    return res.status(200).json({message:"Logged in successfully",token:token,email:email});
});

router.post("/logout",(req,res)=>{
    res.clearCookie("token", { path: '/' });
    return res.status(200).json({isLoggedIn:false});
});

router.get("/check-session",async(req,res)=>{
    
    if (req.user === null) {
        return res.status(401).json({ isLoggedIn: false });
    }

    return res.status(200).json({ isLoggedIn: true });
    
    // if(req.user===null){
    //     return res.status(401).json({isLoggedIn:false});
    // }
    
    // if(req.cookies?.token){
    //     return res.status(200).json({isLoggedIn:true});
    // }
    // return res.status(401).json({isLoggedIn:false});

});

module.exports = router;
