
const {getuser} = require('../service/auth');

function isAuthicated(req,res,next){

    const tocken = req.cookies?.token;

    req.user = null;
    if(!tocken){
        // return res.status(401).json({message:"You are not authenticated"});
        return next();
    }

    const user = getuser(tocken);

    if(!user){
        // return res.status(401).json({message:"You are not authenticated"});
        return next();
    }

    req.user = user;
    next();
}

module.exports = {isAuthicated};

