const jwt = require('jsonwebtoken');
const AdminData = require('../models/admin');


const auth = async (req,res,next) => {

    try {
        const token = req.cookies.admin;

        const verifyUser = jwt.verify(token , process.env.SECRET_KEY_ADMIN);

        const user = await AdminData.findOne({_id: verifyUser._id.valueOf()});

        req.token = token;
        req.user = user;
        
        next();

    } catch (error) {
      next();
        
        
    }

}
module.exports = auth;