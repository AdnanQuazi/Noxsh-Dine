const jwt = require('jsonwebtoken');
const Verification = require('../models/verification')


const verificationAuth = async (req,res,next) => {

    try {
        const token = req.cookies.businessVerification;
        const verifyUser = jwt.verify(token , process.env.SECRET_KEY);

        const user = await Verification.findOne({_id: verifyUser._id.valueOf()});

        req.token = token;
        req.user = user;
        

        
        next();

    } catch (error) {
       
        next();
        
    }

}
module.exports = verificationAuth;