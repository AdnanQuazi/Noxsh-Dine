require('dotenv').config();
const mongoose = require('mongoose');
 mongoose.connect(process.env.DB,{
    
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then( ()=>{
    console.log("connection established");
}).catch((e)=>{
    console.log(`ERROR: ${e}`)
});