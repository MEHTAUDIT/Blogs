const jwt = require('jsonwebtoken');
const srcret = "Udit@123$%&*456";

function generateToken(user) {
    
    const token = jwt.sign({ id: user._id,email:user.email,role: user.role }, srcret, {
        expiresIn: "30d"
    });

    return token;
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