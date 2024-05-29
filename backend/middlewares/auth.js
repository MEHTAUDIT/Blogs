
const {getuser} = require('../service/auth');

function isAuthicated(req,res,next){

    // const tocken = req.cookies?.token;
    const token = req.headers['authorization']?.split(' ')[1] ;
    req.user = null;
    if(!token){
        // return res.status(401).json({message:"You are not authenticated"});
        return next();
    }

    const user = getuser(token);

    if(!user){
        // return res.status(401).json({message:"You are not authenticated"});
        return next();
    }

    req.user = user;
    next();
}

module.exports = {isAuthicated};

