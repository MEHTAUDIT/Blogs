const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
},{timestamps:true});

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;
