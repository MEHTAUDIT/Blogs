
const {getuser} = require('../service/auth');

function isAuthicated(req,res,next){

    const tocken = req.cookies?.token;

    if(!tocken){
        return res.status(401).json({message:"You are not authenticated"});
    }

    const user = getuser(tocken);

    if(!user){
        return res.status(401).json({message:"You are not authenticated"});
    }

    req.user = user;
    next();
}

module.exports = {isAuthicated};

