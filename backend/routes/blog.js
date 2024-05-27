const express=require('express');
const router = express.Router();

const User = require('../model/auth');
const Blog = require('../model/blog');

const {isAuthicated} = require('../middlewares/auth');

router.post("/create",isAuthicated,async(req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const userId = req.user._id;

    const blog = await Blog.create({
        title:title,
        description:description,
        userId:userId
    });

    res.status(201).json({blog});
});

router.get("/entry/:id",async (req,res)=>{

    const id = req.params.id;

    const blog = await Blog.findById(id);

    if(!blog){
        return res.status(404).json({message:"Blog not found"});
    }

    res.status(200).json({blog});
});

router.get("/:username",async (req,res)=>{
    
    const username = req.params.username;

    try{
        const user = await User.findOne({username});
        console.log(user);
        const blogs = await Blog.find({userId:user._id});
        
        console.log(blogs);
        
        if(blogs.length === 0){
            return res.status(404).json({message:"No blogs found"});
        }

        return res.status(200).json({blogs});
    }
    catch(err){
        return res.status(404).json({message:"No user found"});
    }
    
});

module.exports = router;