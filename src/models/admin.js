require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    uId : {
        type : String
    },
    password : {
        type : String  
    },
    verifiedList :[{
        restaurantId : {
            type : String
        }
    }],
    unverifiedList :[{
        restaurantId : {
            type : String
        }
    }]

});
adminSchema.methods.generateToken = async function (){
    try {

        
        const token = jwt.sign({_id: this._id.toString()}, process.env.SECRET_KEY_ADMIN);
        return token;
        

    } catch (error) {

       console.log(error);
        return error
    }
}

// otpSchema.pre("save", async function(next) {
//     if(this.isModified("otp")){
//     this.otp = await bcrypt.hash(this.otp, 6);
//         await this.save()
    
// }
// next()
// })

const Admin = new mongoose.model("Admin",adminSchema)

module.exports = Admin;