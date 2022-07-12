require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minLength : 2,
        maxLength : 30
    },
    username :{
        type : String,
        lowercase : true,
        unique : true
    },
    profileImg :{
        type : String
    },
    profileColor : {
        type : String
    },  
    phone:{
        type: String,
        required: true,
        unique: true
        
    },
    password:{
        type: String,
        
        required: true
    },
    date: {
        type : String,
        default : new Date()
    },
    email:{
        type: String,
        unique: true,
        index: true,
        sparse: true
    },
    tokens:[{
        token: {
            type : String,
                   
        }
    }],
    profileImg :{
        type : String
    },
    recentlyViewed : [{
        type : String,
        
    }],
    favourites: [{
        type : String
    }],
    reviews : [{
        resid : {
            type : String
        },
        time : {
            type : String,
            default: new Date().toLocaleString()
        },
        rating : {
            type : Number
        },
        description : {
            type : String
        },
        tags :{
            type : [String]
        }
    }],
    yourBookings : [{
        type : String
    }],
    pastBookings : [{
        type : String
    }],
    takeaway :[{
        type : String
    }],
    following : [{
        type : String
    }],
    followers : [{
        type : String
    }],
    privateAccount : {
        type : Boolean
    },
    bloggerAccount : {
        type : Boolean
    },
    ownerOf : {
        type : String
    }
});

userSchema.methods.generateToken = async function (){
    try {

        
        const token = jwt.sign({_id: this._id.toString()}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token});
        await this.save();
        
        return token;
        

    } catch (error) {

       console.log(error);
        return error
    }
}


userSchema.pre("save", async function(next) {
    if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
    
    
}

    let username = this.username.split([""]);

    if(username[0] == "@"){
      
        return;
    }else{
        try {

            this.username = "@" + this.username;
            await this.save();

        } catch (error) {
            
            next();
            
        }
        

    }
    

next();
});
const UserData = new mongoose.model("UserData",userSchema)

module.exports = UserData;