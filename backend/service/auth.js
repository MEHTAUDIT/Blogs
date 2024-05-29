const jwt = require('jsonwebtoken');
const srcret = "Udit@123$%&*456";

function generateToken(user) {
    
    console.log(user);
    return jwt.sign({ id: user._id,email:user.email,role: user.role }, srcret, {
        expiresIn: "30d"
    });
}

function getuser(tocken) {
    
    if(!tocken){
        return null;
    }

    try {
        const user = jwt.verify(tocken, srcret);
        return user;
    }
    catch (error) {
        return null;
    }

}

module.exports = { generateToken, getuser };