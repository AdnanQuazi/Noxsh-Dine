require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const RestSchema = new mongoose.Schema({
    restaurantname:{
        type: String,
        required: true,
        trim: true,
        minLength : 2,
        maxLength : 30
    },
    restaurantimg:{
                data: Buffer,
                contentType: String
    },
    restaurantaveragepricing:{
        type : Number
    },
    address :{
        type : String,
        lowercase : true,
        
    },
    locality :{
        type : String,
       
        
    },
    phone:{
        type: String,
        required: true,
        unique: true    
        
    },
    date: {
        type : String,
        default : new Date().toLocaleString()
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
    menu:[{
        
        cuisinename : {
            type : String
        },
        cuisineImg : {
           
                type : String
            
        },

        quantityDetails :[{
            price : {
                type : Number
            },
            quantity:{
                type : String
            },
            quantityUnit : {
                type : String
            },
        }],
            
            category : {
                type : String
            },
            cuisinevotes : {
                type : Number
            },
            cusisinedescription : {
                type : String
            },
            type : {
                type : String
            }
        

    }],
    location : {

            type : {
                type : String,
                enum : ['Point']
            },
            coordinates: {
                type : [Number],
                index : '2dsphere'
            },
            createdAt: {
                type : String,
                default: new Date().toLocaleString()
            }
    },
    workingHours : {

        
        weeks : {
            type : [String]


        },
        hours : {
            type : [Number]
        }
    },
    rating : {

        star1 : {
            type : Number,
            default : 0
        },
        star2 : {
            type : Number,
            default : 0
        },
        star3 : {
            type : Number,
            default : 0
        },
        star4 : {
            type : Number,
            default : 0
        },
        star5 : {
            type : Number,
            default : 0
        }
        
    },
    averageRating : {
        type : Number,
        default : 0
    },
    reviews : [{
        username : {
            type : String
        },
        userimg :{
            type : String
        },
        userid : {
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
    category :{
        type: String
    },
    seating :{
        type : String
    },
    gallery :[{
             type : String
    }]
    ,
    menuimgs :[{
                img : {
                    type : String
                },
                imgContent : {
                    type : String
                }
    }],
    facilities : [{
        type : String

    }],
    parking : {
        twoWheeler : {
            type : Boolean
        },
        fourWheeler : {
            type : Boolean
        }
    },
    cuisines:[{
        type : String
            
    }],
    popularfor :[{
     
        dishes :[{
            type : String
        }],
        services :[{
            type : String
        }]
            
        
    }],
    owner : {
        type : String
    },
    type : {
        type : String
    },
    activeOffers:[{
        foodId : {
            type : String
        },
        offerPrice : {
            type : Number
        }
    }],
    currentStatus:{
        status :{
            type : String
        },
        opensOn : {
            type : String
        }
    }

});






const RestaurantData = new mongoose.model("RestaurantData",RestSchema)

module.exports = RestaurantData;