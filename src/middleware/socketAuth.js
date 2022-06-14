const jwt = require('jsonwebtoken');
const UserData = require('../models/schema');


const socketAuth = async (token) => {

    try {


        const verifyUser = jwt.verify(token , process.env.SECRET_KEY);
        const user = await UserData.findOne({_id: verifyUser._id.valueOf()});


        return (req,res,next) =>{

    
            
            req.token = token;
            req.user = user;
            
            next();

        }
       

    } catch (error) {
        next();

        
        
    }

}
module.exports = socketAuth;