require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const RestOwnerSchema = new mongoose.Schema({
    restaurantId : {
        type : String
    },
    pastBookings :[{
        userId : {
            type : String
        },
        bookingDate : {
            type : String
        },
        bookingTime : {
            type : String
        },
        guestName : {
            type : String
        },
        guestCount : {
            type : Number
        },
        status : {
            type : String
        },
        orderList :[{
            foodName :{
                type : String
            },
            cost : {
                type : Number
            },
            quantity : {
                type : Number
            }


        }],
        total :[{
            subTotal : {
                type : Number
            },
            charges : {
                type : Number
            },
            grandTotal : {
                type : Number
            }
        }],
        payment : [{
            paymentMethod : {
                type : String
            },
            paymentMode : {
                type : String
            }
        }]
    }],
    upcomingBookings :[{
        userId : {
            type : String
        },
        bookingDate : {
            type : String
        },
        bookingTime : {
            type : String
        },
        guestName : {
            type : String
        },
        guestCount : {
            type : Number
        },
        status : {
            type : String
        },
        orderList :[{
            foodName :{
                type : String
            },
            cost : {
                type : Number
            },
            quantity : {
                type : Number
            }


        }],
        total :[{
            subTotal : {
                type : Number
            },
            charges : {
                type : Number
            },
            grandTotal : {
                type : Number
            }
        }],
        payment : [{
            paymentMethod : {
                type : String
            },
            paymentMode : {
                type : String
            }
        }]
    }]
    
    

});


const RestaurantOwnerData = new mongoose.model("RestaurantOwnerData",RestOwnerSchema)

module.exports = RestaurantOwnerData;