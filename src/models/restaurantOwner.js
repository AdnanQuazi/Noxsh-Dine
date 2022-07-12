require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { string } = require('mathjs');


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
    takeaway :[{
        userId : {
            type : String
        },
        orderDate : {
            type : String,
            default : new Date()
        },
        orderTime : {
            type : String
        },
        status : {
            type  : String
        },
        orderList : [{
            foodId : {
                type : String
            },
            foodName : {
                type : String
            },
            cartQuantity : {
                type : Number
            },
            foodQuantity : {
                type : String
            },
            price : {
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
            paymentMode : {
                type : String
            },
            paymentStatus : {
                type : Boolean
            }
        }]

    }],
    dineIn :[{
        tableNo : {
            type :String
        },
        orderId : {
            type : String
        },
        orderDate : {
            type : String,
            default : new Date()
        },
        orderList : [{
            foodId : {
                type : String
            },
            foodName : {
                type : String
            },
            cartQuantity : {
                type : Number
            },
            foodQuantity : {
                type : String
            },
            price : {
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
            },
            paymentStatus : {
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