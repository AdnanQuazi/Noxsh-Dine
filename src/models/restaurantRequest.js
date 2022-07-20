require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { boolean } = require('mathjs');

const RestRequestSchema = new mongoose.Schema({
    restaurantname:{
        type: String,
        required: true,
        trim: true,
        minLength : 2,
        maxLength : 30
    },
    restaurantimg:{
            type : String
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
      
        
    },
    date: {
        type : String,
        default : new Date().toLocaleString()
    },
    email:{
        type: String,
      
        index: true,
        sparse: true
    },
    ownerName : {
        type : String
    },
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
    
    category :{
        type: String
    },
    seating :{
        type : String
    },
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
    outletType:[{
        type : String
            
    }],
    requestFrom : {
        type : String
    },
    type : {
        type : String
    },
    approved : {
        type : boolean,
        default : false
    },
    panDetails : {
        panNumber : {
            type : String
        },
        legalEntityName : {
            type : String
        },
        panImage : {
            type : String
        },
        legalEntityAddress : {
            type : String
        }
    },
    gstDetails : {
        gstRegistered : {
            type : Boolean
        },
        gstinNumber : {
            type : String
        },
        gstImage : {
            type : String
        },
        chargeOnMenu : {
            type : Boolean
        },
        tandc : {
            type : Boolean
        }
    },
    fssaiDetails : {
        fssaiNumber : {
            type : String
        },
        fssaiExpiry : {
            type : String
        },
        fssaiImage : {
            type : String
        }
    },
    bankDetails : {
        bankNumber : {
            type : String
        },
        accountType : {
            type : String
        },
        ifscCode : {
            type : String
        }
    }

});






const RestaurantRequestData = new mongoose.model("RestaurantRequestData",RestRequestSchema)

module.exports = RestaurantRequestData;