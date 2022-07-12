require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cartSchema = new mongoose.Schema({
   cart :[{
    foodId : {
        type : String
    },
    foodQuantity : {
        type : String
    },
    cartQuantity : {
        type : Number
    }
   }],
   order_id : {
    type : String
   },
   order_token : {
    type : String   
   },
   order_status : {
    type : String
   }
}, );
cartSchema.methods.generateToken = async function (){
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


const Cart = new mongoose.model("Cart",cartSchema)

module.exports = Cart;