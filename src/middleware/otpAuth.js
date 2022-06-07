const jwt = require('jsonwebtoken');
const Otp = require('../models/otp')


const auth = async (req,res,next) => {

    try {
        const token = req.cookies.session;
        const verifyUser = jwt.verify(token , process.env.SECRET_KEY);

        const user = await Otp.findOne({_id: verifyUser._id.valueOf()});

        req.token = token;
        req.user = user;

        
        next();

    } catch (error) {
       
        next();
        
    }

}
module.exports = auth;