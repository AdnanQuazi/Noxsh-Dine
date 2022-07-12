require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const verificationSchema = new mongoose.Schema({
    emailStats :{
        email : {
            type : String
        },
        status : {
            type : Boolean
        }
    },
    phoneStats :{
        phone : {
            type : String
        },
        status : {
            type : Boolean
        }
    },
    ownerStats : {
        phone : {
            type : String
        },
        status : {
            type : Boolean
        }
    }
}, {timestamps : true});
verificationSchema.methods.generateToken = async function (){
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


const Verification = new mongoose.model("Verification",verificationSchema)

module.exports = Verification;