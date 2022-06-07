require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const featureSchema = new mongoose.Schema({
   
    userId : {
        type : String
    },
    msg : {
        type : String
    }
   
});


const FeatureData = new mongoose.model("FeatureData",featureSchema)

module.exports = FeatureData;