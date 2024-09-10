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
        orderId : {
            type : String
        },
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
        orderId : {
            type : String
        },
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
            paymentId : {
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
        orderTime : {
            type : String
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
            paymentId : {
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
        orderId : {
            type : String
        },
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
            paymentId : {
                type : String
            },
            paymentMethod : {
                type : String
            },
            paymentMode : {
                type : String
            }
        }]
    }],
    pendingAmount : {
        type : Number,
        default : 0
    },
    onlinePayment : {
        type : Boolean,
        default : true
    }


});


const RestaurantOwnerData = new mongoose.model("RestaurantOwnerData",RestOwnerSchema)

module.exports = RestaurantOwnerData;