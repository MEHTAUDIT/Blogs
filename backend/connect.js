const mongoose = require('mongoose');

async function connectToMongoDB(url){

    try{
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectToMongoDB;