require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const otpSchema = new mongoose.Schema({
    createdAt : {
        type : Date,
        default : Date.now
    },
    username : {
        type : String
    },

    otp : {
        type : Number
    }
}, {timestamps : true});
otpSchema.methods.generateToken = async function (){
    try {

        
        const token = jwt.sign({_id: this._id.toString()}, process.env.SECRET_KEY);
      
       
        
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

otpSchema.index({createdAt: 1},{expireAfterSeconds: 60});
const Otp = new mongoose.model("Otp",otpSchema)

module.exports = Otp;