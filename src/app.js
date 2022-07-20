require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
console.log("port ",port)
require("./db/conn");
const UserData = require('./models/schema');
const RestData = require('./models/restaurant')
const RestOwnerData = require('./models/restaurantOwner')
const FeatureData = require('./models/feature')
const RestaurantRequest = require('./models/restaurantRequest')

const Otp = require('./models/otp')
const Cart = require('./models/cart')

const Verification = require('./models/verification');
const Admin = require('./models/admin');


const path = require("path");
const hbs = require('hbs');
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
const avatarPath = path.join(__dirname, "../public/avatars");
const cookieParser = require('cookie-parser');
const math = require('mathjs')
const auth = require("./middleware/auth");
const otpAuth = require("./middleware/otpAuth");
const verificationAuth = require("./middleware/verificationAuth");
const adminAuth = require("./middleware/adminAuth");




const axios = require('axios');
const bcrypt = require('bcryptjs');
const multer = require('multer'); 
const { index, re, json } = require('mathjs');
const sharp = require('sharp');
const { get } = require('mongoose');
const { query } = require('express');
const server = require("http").createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
const ShortUniqueId = require('short-unique-id')
const uid = new ShortUniqueId({ 
    length: 10,
    dictionary : 'alphanum_upper'
});
const fs = require('fs');
const RestaurantData = require('./models/restaurant');


const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",  
    secure: true,
    secureConnection: false, // TLS requires secureConnection to be false
    tls: {
        ciphers:'SSLv3'
    },
    requireTLS:true,
    port: 465,
    debug: true,
    auth : {
        user : "care@noxshdine.com",
        pass : process.env.PASS
    }
})
const fsPromises = fs.promises;


const options = {
    from : "Noxsh Dine <care@noxshdine.com>",
    to : "quaziadnan12352@gmail.com",
    subject : "Verfication",
    html : `

    <div id="invoice" style="padding: 30px;">
    
       
        <div class="invoice overflow-auto" style="position: relative;background-color: #FFF;min-height: 680px;padding: 15px;">
            <div style="min-width: 600px">
               
                <main style="padding-bottom: 50px;">
                <header class="row">
    			<div class="receipt-header" style="display:flex;justify-content:space-between;" >
					<div class="col-xs-6 col-sm-6 col-md-6" style="width:100%">
						<div class="receipt-left">
							<img class="img-responsive" alt="iamgurdeeposahan" src="https://bootdey.com/img/Content/avatar/avatar6.png" style="width: 71px; border-radius: 43px;">
						</div>
					</div>
					<div class="col-xs-6 col-sm-6 col-md-6 text-right" style="min-width: max-content;">
						<div class="receipt-right">
							<h5 style="font-size: 16px;font-weight: bold;margin: 0 0 7px 0;">Company Name.</h5>
							<p style="font-size: 12px;margin: 0px;">+1 3649-6589 <i class="fa fa-phone" style="text-align: center;width: 18px;"></i></p>
							<p style="font-size: 12px;margin: 0px;">company@gmail.com <i class="fa fa-envelope-o" style="text-align: center;width: 18px;"></i></p>
							<p style="font-size: 12px;margin: 0px;">USA <i class="fa fa-location-arrow" style="text-align: center;width: 18px;"></i></p>
						</div>
					</div>
				</div>
            </header>
			
			<div class="row">
				<div class="receipt-header receipt-header-mid" style="margin: 24px 0;overflow: hidden;display:flex;">
					<div class="col-xs-8 col-sm-8 col-md-8 text-left" style="width:100%">
						<div class="receipt-right">
							<h5 style="font-size: 16px;font-weight: bold;margin: 0 0 7px 0;">Customer Name </h5>
							<p style="font-size: 12px;margin: 0px;"><b>Mobile :</b> +1 12345-4569</p>
							<p style="font-size: 12px;margin: 0px;"><b>Email :</b> customer@gmail.com</p>
							<p style="font-size: 12px;margin: 0px;"><b>Address :</b> New York, USA</p>
						</div>
					</div>
					<div class="col-xs-4 col-sm-4 col-md-4" style="width:max-content">
						<div class="receipt-left">
							<h3>INVOICE # 102</h3>
						</div>
					</div>
				</div>
            </div>

                    <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;border-collapse: collapse;border-spacing: 0;margin-bottom: 20px;">
                        <thead>
                            <tr>
                                <th style="padding: 15px;background: #eee;border-bottom: 1px solid #fff;white-space: nowrap;font-weight: 400;font-size: 16px;">#</th>
                                <th class="text-left" style="padding: 15px;background: #eee;border-bottom: 1px solid #fff;white-space: nowrap;font-weight: 400;font-size: 16px;">DESCRIPTION</th>
                                <th class="text-right" style="padding: 15px;background: #eee;border-bottom: 1px solid #fff;white-space: nowrap;font-weight: 400;font-size: 16px;">HOUR PRICE</th>
                                <th class="text-right" style="padding: 15px;background: #eee;border-bottom: 1px solid #fff;white-space: nowrap;font-weight: 400;font-size: 16px;">HOURS</th>
                                <th class="text-right" style="padding: 15px;background: #eee;border-bottom: 1px solid #fff;white-space: nowrap;font-weight: 400;font-size: 16px;">TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="no" style="padding: 15px;background: #3989c6;border-bottom: 1px solid #fff;color: #fff;font-size: 1.6em;">04</td>
                                <td class="text-left" style="padding: 15px;background: #eee;border-bottom: 1px solid #fff;"><h3 style="margin: 0;font-weight: 400;color: #3989c6;font-size: 1.2em;">
                                    <a target="_blank" href="https://www.youtube.com/channel/UC_UMEcP_kF0z4E6KbxCpV1w">
                                    Youtube channel
                                    </a>
                                    </h3>
                                   <a target="_blank" href="https://www.youtube.com/channel/UC_UMEcP_kF0z4E6KbxCpV1w">
                                       Useful videos
                                   </a> 
                                   to improve your Javascript skills. Subscribe and stay tuned :)
                                </td>
                                <td class="unit" style="padding: 15px;background: #ddd;border-bottom: 1px solid #fff;text-align: right;font-size: 1.2em;">$0.00</td>
                                <td class="qty" style="padding: 15px;background: #eee;border-bottom: 1px solid #fff;text-align: right;font-size: 1.2em;">100</td>
                                <td class="total" style="padding: 15px;background: #3989c6;border-bottom: 1px solid #fff;text-align: right;font-size: 1.2em;color: #fff;">$0.00</td>
                            </tr>
                            <tr>
                                <td class="no" style="padding: 15px;background: #3989c6;border-bottom: 1px solid #fff;color: #fff;font-size: 1.6em;">01</td>
                                <td class="text-left" style="padding: 15px;background: #eee;border-bottom: 1px solid #fff;"><h3 style="margin: 0;font-weight: 400;color: #3989c6;font-size: 1.2em;">Website Design</h3>Creating a recognizable design solution based on the company's existing visual identity</td>
                                <td class="unit" style="padding: 15px;background: #ddd;border-bottom: 1px solid #fff;text-align: right;font-size: 1.2em;">$40.00</td>
                                <td class="qty" style="padding: 15px;background: #eee;border-bottom: 1px solid #fff;text-align: right;font-size: 1.2em;">30</td>
                                <td class="total" style="padding: 15px;background: #3989c6;border-bottom: 1px solid #fff;text-align: right;font-size: 1.2em;color: #fff;">$1,200.00</td>
                            </tr>
                            <tr>
                                <td class="no" style="padding: 15px;background: #3989c6;border-bottom: 1px solid #fff;color: #fff;font-size: 1.6em;">02</td>
                                <td class="text-left" style="padding: 15px;background: #eee;border-bottom: 1px solid #fff;"><h3 style="margin: 0;font-weight: 400;color: #3989c6;font-size: 1.2em;">Website Development</h3>Developing a Content Management System-based Website</td>
                                <td class="unit" style="padding: 15px;background: #ddd;border-bottom: 1px solid #fff;text-align: right;font-size: 1.2em;">$40.00</td>
                                <td class="qty" style="padding: 15px;background: #eee;border-bottom: 1px solid #fff;text-align: right;font-size: 1.2em;">80</td>
                                <td class="total" style="padding: 15px;background: #3989c6;border-bottom: 1px solid #fff;text-align: right;font-size: 1.2em;color: #fff;">$3,200.00</td>
                            </tr>
                            <tr>
                                <td class="no" style="padding: 15px;background: #3989c6;border-bottom: 1px solid #fff;color: #fff;font-size: 1.6em;">03</td>
                                <td class="text-left" style="padding: 15px;background: #eee;border-bottom: 1px solid #fff;"><h3 style="margin: 0;font-weight: 400;color: #3989c6;font-size: 1.2em;">Search Engines Optimization</h3>Optimize the site for search engines (SEO)</td>
                                <td class="unit" style="padding: 15px;background: #ddd;border-bottom: 1px solid #fff;text-align: right;font-size: 1.2em;">$40.00</td>
                                <td class="qty" style="padding: 15px;background: #eee;border-bottom: 1px solid #fff;text-align: right;font-size: 1.2em;">20</td>
                                <td class="total" style="padding: 15px;background: #3989c6;border-bottom: 1px solid #fff;text-align: right;font-size: 1.2em;color: #fff;">$800.00</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2" style="padding: 10px 20px;background: 0 0;border-bottom: none;white-space: nowrap;text-align: right;font-size: 1.2em;border-top: 1px solid #aaa;border: none;"></td>
                                <td colspan="2" style="padding: 10px 20px;background: 0 0;border-bottom: none;white-space: nowrap;text-align: right;font-size: 1.2em;border-top: 1px solid #aaa;">SUBTOTAL</td>
                                <td style="padding: 10px 20px;background: 0 0;border-bottom: none;white-space: nowrap;text-align: right;font-size: 1.2em;border-top: 1px solid #aaa;">$5,200.00</td>
                            </tr>
                            <tr>
                                <td colspan="2" style="padding: 10px 20px;background: 0 0;border-bottom: none;white-space: nowrap;text-align: right;font-size: 1.2em;border-top: 1px solid #aaa;border: none;"></td>
                                <td colspan="2" style="padding: 10px 20px;background: 0 0;border-bottom: none;white-space: nowrap;text-align: right;font-size: 1.2em;border-top: 1px solid #aaa;">TAX 25%</td>
                                <td style="padding: 10px 20px;background: 0 0;border-bottom: none;white-space: nowrap;text-align: right;font-size: 1.2em;border-top: 1px solid #aaa;">$1,300.00</td>
                            </tr>
                            <tr>
                                <td colspan="2" style="padding: 10px 20px;background: 0 0;border-bottom: none;white-space: nowrap;text-align: right;font-size: 1.2em;border-top: 1px solid #aaa;border: none;"></td>
                                <td colspan="2" style="padding: 10px 20px;background: 0 0;border-bottom: none;white-space: nowrap;text-align: right;font-size: 1.2em;border-top: 1px solid #aaa;">GRAND TOTAL</td>
                                <td style="padding: 10px 20px;background: 0 0;border-bottom: none;white-space: nowrap;text-align: right;font-size: 1.2em;border-top: 1px solid #aaa;">$6,500.00</td>
                            </tr>
                        </tfoot>
                    </table>
                    <div class="thanks" style="margin-top: -100px;font-size: 2em;margin-bottom: 50px;">Thank you!</div>
                    
                </main>
                <footer style="width: 100%;text-align: center;color: #777;border-top: 1px solid #aaa;padding: 8px 0;">
                    Invoice was created on a computer and is valid without the signature and seal.
                </footer>
            </div>
            <!--DO NOT DELETE THIS div. IT is responsible for showing footer always at the bottom-->
            <div></div>
        </div>
    </div>
    
    `
}

// transporter.sendMail(options, (err,info)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(info.response);
// })


// app.use(cors({
//     origin: '*'
// }));
const users = {}
const res = {}







if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  };
  
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set("view engine" , "hbs");
app.set("views", templatePath);
app.use(express.static(staticPath));
app.use(cookieParser());
hbs.registerPartials(partialPath);



    

 

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }
});
  
var upload = multer({ storage: storage });


const docStorage = multer.diskStorage({
    destination: function(req,file,cb){
       

        cb(null,'./public/documents');
    },
    filename: (req, file, cb) => {
        
        cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }
});
  
var uploadDocs = multer({ storage: docStorage });
var uploadMultipleDocs = uploadDocs.fields([{name : 'restaurantImage', maxCount : 1},{name : 'panImage' , maxCount : 1 },{name : 'fssaiImage' , maxCount : 1 },{name : 'gstImage' , maxCount : 1 }])

io.on("connection", (socket)=>{
   
    

    socket.on('rest-connect', id =>{
        res[socket.id] = id
    })
    
    socket.on('cancel-booking' , async(room,cb)=>{
       
        socket.to(room).emit('cancel-booking', socket.id , async(res)=>{
            
        })
    })
    socket.on('booking-details',async (msg,room) => { 

        try {
            const token = socket.handshake.headers.cookie.replaceAll("jwt=", '$').replaceAll(';','$').split('$')[1];
            const verifyUser = jwt.verify(token , process.env.SECRET_KEY);
            
            if(verifyUser){
                let orderId = uid()
                const user = await UserData.findById({_id : verifyUser._id.valueOf()});
                msg.name = user.name;
                msg.userName = user.username
                msg.profileImg = user.profileImg
                msg.socketId = socket.id  
                msg.orderId = orderId
              socket.to(room).emit("recieve-details", msg);
            }
           
        } catch (error) {
            console.log(error);
        }

          
     });1

    socket.on('join-room',room =>{

        socket.join(room)
    })

    socket.on('booking-response', (msg,socketId)=>{

        socket.broadcast.to(socketId).emit("recieved-details", msg)
    } )

    //Takeaway

    socket.on('takeaway-details', async(msg,room,cb)=>{

        try {

           const token = socket.handshake.headers.cookie.replaceAll("jwt=", '$').replaceAll(';','$').split('$')[1]
            const verifyUser = jwt.verify(token , process.env.SECRET_KEY);
            if(verifyUser){
                const user = await UserData.findById({_id : verifyUser._id.valueOf()}).select({name : 1,username : 1,profileImg : 1,phone : 1}).lean();
                
                // const doSomethingAsync = async item => {
                //     return await RestData.findOne({menu : {$elemMatch : {_id : item.foodId}}}).select({menu : 1})
                    
                //   }
                  
                //   const getData = async () => {
                //     return Promise.all(msg.map(item => doSomethingAsync(item)))
                //   }
                    console.log(msg)
                  const data = await RestData.findOne({menu : {$elemMatch : {_id : msg[0].foodId}}}).select({menu : 1})
                  let finalMenu = []
                  let orderId = uid()
                  let currObj;
                //   data.forEach(menu =>{
                    data.menu.forEach(elem =>{
                        msg.forEach(element =>{
                            if(elem._id.valueOf() == element.foodId){
                                let price;
                                elem.quantityDetails.forEach(currElem =>{
                                    let fVal =  `${currElem.quantity} ${currElem.quantityUnit}`
                                    if(fVal == element.foodQuantity){
                                        price = currElem.price
                                    }
                                })
                                currObj = {
                                    foodName : elem.cuisinename,
                                    foodId : element.foodId,
                                    foodQuantity : element.foodQuantity,
                                    cartQuantity : element.cartQuantity,
                                    price : price,
                                    restaurantId : room
    
                                    
                                }
                                finalMenu.push(currObj)
                            }
                        })
    
                      })
                  //})
                 
                  console.log(finalMenu);
                  user.socketId = socket.id
                  var roster = io.sockets.adapter.rooms.get(room)
                  if(roster != undefined){
                    socket.to(room).emit("recieve-takeaway-details", finalMenu,user,orderId);
                    cb('Recieved')
                  }else{
                    cb('Failed')
                  }
                
              
            }

        } catch (error) {
                console.log(error);
        }   
        
    })
    socket.on('dine-details', async(msg,room,tableNo,cb)=>{
        
        try {


            const token = socket.handshake.headers.cookie.replaceAll("jwt=", '$').replaceAll(';','$').split('$')[1]
            const verifyUser = jwt.verify(token , process.env.SECRET_KEY);
            if(verifyUser){
                const user = await UserData.findById({_id : verifyUser._id.valueOf()}).select({name : 1,username : 1,profileImg : 1,phone : 1}).lean();
                
                // const doSomethingAsync = async item => {
                //     return await RestData.findOne({menu : {$elemMatch : {_id : item.foodId}}}).select({menu : 1})
                    
                //   }
                  
                //   const getData = async () => {
                //     return Promise.all(msg.map(item => doSomethingAsync(item)))
                //   }
                
               
                  const data = await RestData.findOne({menu : {$elemMatch : {_id : msg[0].foodId}}}).select({menu : 1})
                  let finalMenu = []
                let orderId = uid()
                
                  let currObj;
                //   data.forEach(menu =>{
                    data.menu.forEach(elem =>{
                        msg.forEach(element =>{
                            if(elem._id.valueOf() == element.foodId){
                                let price;
                                elem.quantityDetails.forEach(currElem =>{
                                    let fVal =  `${currElem.quantity} ${currElem.quantityUnit}`
                                    if(fVal == element.foodQuantity){
                                        price = currElem.price
                                    }
                                })
                                currObj = {
                                    foodName : elem.cuisinename,
                                    foodId : element.foodId,
                                    foodQuantity : element.foodQuantity,
                                    cartQuantity : element.cartQuantity,
                                    price : price,
                                    
                                    restaurantId : room
    
                                    
                                }
                                finalMenu.push(currObj)
                            }
                        })
    
                      })
                  //})
                 
                  
                  user.socketId = socket.id
                 
                  var roster = io.sockets.adapter.rooms.get(room)
                  if(roster != undefined){
                    socket.to(room).emit("recieve-dine-details", finalMenu,user,orderId,tableNo);
                    cb('Recieved')
                  }else{
                    cb('Failed')
                  }
                
               
            }

        } catch (error) {
                console.log(error);
        }   
        
    })
    socket.on('takeaway-response', (msg,socketId)=>{

            socket.broadcast.to(socketId).emit('takeaway-details',msg)

    })
    socket.on('dine-response', (msg,socketId)=>{

        socket.broadcast.to(socketId).emit('dine-details',msg)

})
    socket.on('status-check',(room,cb)=>{
        var roster = io.sockets.adapter.rooms.get(room)
        if(roster != undefined){
          
          cb('ACTIVE')
        }else{
          cb('OFFLINE')
        }
    })
})






app.get('/forgot-password', async(req,res)=>{
    try {
        res.render('forgotPassword')
    } catch (error) {
        
    }
})

app.post('/forgot-password',async(req,res)=>{

    try {   
        
        const username = req.body.username;
       
        const OTP = otpGenerator.generate(6 ,{
            digits : true, lowerCaseAlphabets : false, upperCaseAlphabets : false, specialChars : false
        })
        const findDB = await UserData.find({username});
        
        if(findDB.length < 1){
            res.send(false)
        }else{
            const options = {
                from : "Noxsh Dine <care@noxshdine.com>",
                to : findDB[0].email,
                subject : "Verfication",
                text : `Your OTP is ${OTP}`
            }
            
            transporter.sendMail(options, (err,info)=>{
                if(err){
                    console.log(err);
                    return;
                }
                console.log(info.response);
            })


            const saveOTP = await new Otp({
                    username : username,
                    otp : OTP,
                  
            })


            const token  = await saveOTP.generateToken();

            res.cookie("session", token, {
                expires: new Date(Date.now() + 300000),
                httpOnly: true
            });

            await saveOTP.save()
            
            res.send(true)
        }
        
    } catch (error) {
        console.log(error);
            res.send(error)
    }   
})

app.post('/verify-otp',otpAuth,async(req,res)=>{

    try {

       const otp = req.body.otp;
        const findDB = await Otp.findById({_id : req.user._id});
        // const verifyOTP = await bcrypt.compare(otp,findDB[0].otp);
            const verifyOTP = otp == findDB.otp
        if(verifyOTP){
            res.send(true)
        }else{
            res.send(false)
        }




    } catch (error) {
       
            res.send(false)
    }   
})

app.post('/reset-password', otpAuth,async(req,res)=>{
    try {
        const pass = req.body.password
        console.log(pass , req.user.username);
        const hashedPassword = await bcrypt.hash(pass, 10);
        const finduser = await UserData.findOneAndUpdate({username : req.user.username},{
            password : hashedPassword
        })

        await finduser.save();
        res.send(true)
    } catch (error) {
        res.send(false)
    }
})


app.get("/", auth , async (req,res)=>{

        try {
          
            
            const averageRating = async ()=>{
                // const db = await RestData.findById({_id : "61d2b658ce09365e691b75b0"});

                //   const finalRating = math.round((db.rating.star1 * 1 + db.rating.star2 * 2 + db.rating.star3 * 3 + db.rating.star4 * 4 + db.rating.star5 * 5) / (db.rating.star1 + db.rating.star2 + db.rating.star3 + db.rating.star4 + db.rating.star5),1);

                    
                    //   const result = db.rating
                    //   const resultArr = [result.star1,result.star2,result.star3,result.star4,result.star5]
                    //   let exp1 = 0;
                    //   let exp2 = 0;
                      
                    //  resultArr.forEach((item,index) => {
                         
                                
                    //             exp1 = exp1 + (item * (index + 1));
                               
                    //             exp2 = exp2 + item;
                        
                    //  })
                    
                    //  let finalSum = math.round((exp1) / (exp2), 1) ;
                    //  console.log(finalSum);
                     
                  
            //    const db2 = await RestData.updateOne({_id :"61d2b658ce09365e691b75b0"}, {
                   
            //             $set : {
                            
            //                 averageRating : math.round(finalRating,1)
                            
            //             }
                   
            //    });
            //     console.log(db2);
            }   

            
            // const newUser = new RestOwnerData({
            //     rrestaurantId : "619ccebc133b95ae0d7db23c",
    
            //     pastBookings :[{
            //         userId : "61f8065d227341134f09333f",
            //         bookingDate : "28/2/2022",
            //         bookingTime : "9:00 PM",
            //         guestName : "Awsaf",
            //         guestCount : "2",
            //         status : "Successfull",
            //         orderList :[{
            //             foodName : "Biryani",
            //             cost : 260,
            //             quantity : 1
            
            
            //         }],
            //         total :[{
            //             subTotal : 260,
            //             charges : 20,
            //             grandTotal : 280
            //         }],
            //         payment : [{
            //             paymentMethod : "PayTm",
            //             paymentMode : "PrePaid"
            //         }]
            //     }],
                

               



            // })   
           
            // await newUser.save();
            


           
                
                  

                    
                    
                    
                
             
            // const createOrder = async()=>{
            //     const order = await fetch('https://sandbox.cashfree.com/pg/order',{
            //         method : 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //             "x-api-version": "2022-01-01",
            //             "Accept": "application/json",
            //             "x-client-id": "177288cf66b69314bdb8a5cd24882771",
            //             "x-client-secret": "a081ce60a1a29662e7feae17d854abda56fcb52d"
            //         },
            //         body : {
            //             "customer_details": {
            //                 "customer_id": "adnan123",
            //                 "customer_phone": "8788967972"
            //             },
            //             "order_amount": 89,
            //             "order_currency": "INR"
            //         }
            
            //     })
            
            //     console.log(await order.json())
            // }
            
            // createOrder()
            
            
                
              
                 
              let name = req.user.name.split([" "]);
                

              res.render("index",{
              token : true,
              name : name[0],
              userId : req.user._id,
              profileImg : req.user.profileImg,
              profileColor : req.user.profileColor
             
              
          });

           
        } catch (error) {

        //    const  searchToken = await axios.post('https://outpost.mapmyindia.com/api/security/oauth/token?grant_type=client_credentials&client_id=33OkryzDZsIXVzuUQVOb9BG1i9USkApHaZJnEOk8y715O2aBzZw3vOpbNmPIu2APzCLixguqOUy9BlRlRK1qiw==&client_secret=lrFxI-iSEg93KeRGEI7TpqilgCcJ5hyCdpEAfqt5_QeXOAh0xRh3SBB684Irewr4aAP5kwpGyK1r1x7So6n1sEMACHaYsjGZ')


            
            

                res.render("index");
               
            
        }
    

    
    
})
app.get("/login", async (req,res)=>{

   
    res.render("login");

})

app.post("/login", async (req,res)=>{

    try {
        let username = req.body.username.split([''])[0] != '@' ? '@' + req.body.username : req.body.username
        
        console.log(username)

        const pass = req.body.password
      
        const user = await UserData.findOne({username});
        
        if(user){
            
            const passMatch = await bcrypt.compare(pass, user.password);

            if(passMatch){
                
                const token  = await user.generateToken();
                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 30*24*60*60*1000),
                    httpOnly: true
                });
               
                
                res.send(true)
    
            }else{
    
               res.send(false)
    
            };
            
            
            
        }else{
           
            res.send(false)
            
        }

        
        } catch (error) {
            
            res.status(401).send(error);

        }
    


})

app.get("/logout" , auth , async (req,res)=>{
    try {

        req.user.tokens = req.user.tokens.filter((currenttoken) =>{
            return currenttoken.token != req.token
        })
        res.clearCookie("jwt");
        
        await req.user.save();
        res.redirect("/login");
    } catch (error) {
        res.status(401).send(error)
    }
 })


app.get("/signup", async (req,res)=>{

    res.render("signup")
})
app.post("/check-username",async(req,res)=>{
    try {
            const findUsername = await UserData.find({ username: { $exists: true, $eq : req.body.payload } })
        
            if(findUsername.length >= 1){
                res.send(true)
            }else{
                res.send(false)
            }
    } catch (error) {
        res.send(error)
    }
})
app.post("/signup", async (req,res)=>{

    try {
        console.log(req.body)
        
        const newUser = new UserData({
            name : req.body.name,
            username : req.body.username,
            phone : req.body.phone,
            password : req.body.password,
            yourBookings : [],
            pastBookings : []

        })

        const phoneSearch = await UserData.findOne({phone : req.body.phone})
           
                
             if(phoneSearch){
                
                res.status(400).send({msg : "Phone number exists"})
                
            }else{
                const token  = await newUser.generateToken();
            
            
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 30*24*60*60*1000),
                httpOnly: true
            });
            
            
            await newUser.save();
            res.send(true)
           
        }
        
    } catch (error) {
        console.log(error)
        res.send(error);
    }
})

app.post("*/getRestaurants", async (req,res)=>{

    try {
        
            let payload = req.body.payload.trim();
            // let search = await RestData.find({restaurantname: {$regex:  new RegExp('^'+payload+'.*','i')}});
    let search = await RestData.find({restaurantname: {$regex:  new RegExp(payload+'.*','i')}});
    let searchFood = await RestData.find({menu : {$elemMatch : {cuisinename : {$regex:  new RegExp(payload+'.*','i')}}}},{menu : 1});
    
        console.log(1,searchFood);
        
    res.send({payload: search, searchFood})

    } catch (error) {
        
    }

    


})

app.post("/nearbyRestaurants", async (req,res)=>{

   
 try {
     
    let payload = req.body.payload;

    const result = await RestData.find({location: {$near: {$maxDistance: 10000, $geometry: {type : "Point", coordinates: [payload[0].lat,payload[0].long]}}}}); 
    
    res.send({nearbyrestaurants : result});
    
    

 } catch (error) {
     
    res.send(error);
 }
   

})

app.post("/defaultRestaurants", async (req,res)=>{

    try {
        
        let payload = req.body.payload.city;
        const result = await RestData.find({address : {$regex:  new RegExp('^'+payload+'.*','i')}}).limit(6);
        
        res.send({restaurants : result});

    } catch (error) {
        
    }
})

app.get("/restaurants/:id", auth , async (req,res)=>{


    try {   

        
        const restData = await RestData.find({_id: req.params.id});
       
        
        let name = req.user.name.split([" "]);
        try {
            if(req.token){

                const userDB = await UserData.find({$and : [{_id : req.user._id},{recentlyViewed : {$exists: true, $in :[req.params.id]}}]});
               
                if(userDB.length == 0){
                    
                    const user = await UserData.findByIdAndUpdate({_id : req.user._id},{
                        $push :{
                            recentlyViewed :[
                                req.params.id
                            ]
                        }
                    })
    
                    await user.save()
                }

                
            }
            
        } catch (error) {
            
        }
       
        
        res.render("restaurant", {
        id : req.params.id,
        token : req.token,
        name : name[0],
        resId : req.params.id,
        profileImg : req.user.profileImg,
        profileColor : req.user.profileColor
    });
        
    } catch (error) {
       
        // const restData = await RestData.find({_id: req.params.id});
        // console.log(restData[0].category);
        // res.render("restaurant",{
        //     restaurantname : restData[0].restaurantname,
        // cuisines: restData[0].cuisine,
        // address: restData[0].address,
        // resId : req.params.id
        // })
        res.render("restaurant", {
            id : req.params.id,
            token : req.token,
            resId : req.params.id
        });
    }    

    

})

app.post("/getLocation", async (req,res)=>{

    try {

        const data = await req.body.coords;
        
        

        
        const location = await axios.get(`https://apis.mapmyindia.com/advancedmaps/v1/4801e64328830376bc6c4f7f009eca46/rev_geocode?lat=${data[0].lat}&lng=${data[0].long}`);  

        console.log(location);
        
        res.send(location);


    } catch (error) {

        res.send(error);
        
    }
    

    
})

app.post("/rating", async (req,res)=>{

    const db = await RestData.find({averageRating : {$gte:4}});
    res.send({restaurants : db});
})

app.post("/ovrall", async (req,res)=>{

    try {
        
        let {lat , long}= req.query;
        let rating = req.query.rating;
        let openStatus = req.query.open_now;


        
        

                
        let filtrParm;
      


        if(lat && long && rating){
            
            filtrParm = {$and : [{location: {$near: {$maxDistance: 50000, $geometry: {type : "Point", coordinates: [lat,long]}}}},{averageRating : {$gte : 3}}]}
        }else if(lat && long && !rating){
           
            filtrParm = {location: {$near: {$maxDistance: 50000, $geometry: {type : "Point", coordinates: [lat,long]}}}}
        }else if(!lat && !long && rating){
            
            filtrParm = {averageRating : {$gte : 3}};
        }else if(!lat && !long && !rating){
            
            filtrParm = {};
        }

        
        const result = await RestData.find(filtrParm); 
       
        res.send({restaurants : result});
        
        
    
     } catch (error) {
         
        res.send(error);
     }
       

})



app.post('/test', uploadMultipleDocs, async (req,res)=>{
    try {


        
        
      
        // let fileArr = [];
        //  cuisines.forEach(elem =>{
            
        //     fileArr.push(elem.filename)

             
        //  })

       


    //     const user = await RestData.findByIdAndUpdate({_id: "619ccebc133b95ae0d7db23c"},{
    //         $push : {
    //             reviews :[{
    //                 username : "Adnan Quazi",
    //                 userimg : "file-1643560536753.jpg",
    //                 userid : "61f8065d227341134f09333f",
    //                 rating : "5",
    //                 description : "Definitely recommended. If you are group of 4 people or more this place would be amazing. For drinks I'd recommend LIT - long iced tea which includes tequila, vodka and other drinks too. ",
    //                 tags :[
    //                     "Hygenic",
    //                     "Quick Dine",
    //                     "Perfect Tatse"
    //                 ]
    //             }]
    
    //         }
    //     }
    // )
    //     await user.save();

        
    //     const user2 = await RestData.findByIdAndUpdate({_id: "619ccebc133b95ae0d7db23c"},{
    //         $inc : {
    //            "rating.star5" : 10
               
    
    //         }
    //     }
    // )   
    //     await user2.save();

    //     let db = await RestData.findById({_id : "619ccebc133b95ae0d7db23c"});

    //     const finalRating = math.round((db.rating.star1 * 1 + db.rating.star2 * 2 + db.rating.star3 * 3 + db.rating.star4 * 4 + db.rating.star5 * 5) / (db.rating.star1 + db.rating.star2 + db.rating.star3 + db.rating.star4 + db.rating.star5),1);

    // const cuisines = req.file.filename;
    //     const fileP = path.join(__dirname, '../', 'public', 'compressed', req.file.fieldname + '-' + Date.now()+path.extname(req.file.originalname));
        
    // const shP =  sharp(req.file.path).resize(480,320).jpeg({
    //         quality: 80,
    //         chromaSubsampling : '4:4:4'
    //     }).toFile(fileP,(err,info)=>{
    //         if(err){
    //             console.log(err);
    //         }else{
    //             console.log(info);
    //         }
    //     });

    //    const finalFile = shP.options.fileOut.split("\\");
       

        
      


    //     const user3 = await RestData.findByIdAndUpdate({_id: "619ccebc133b95ae0d7db23c"},{
    //         $push :{

    //             menuimgs :[{
    //                 img : finalFile,
    //                 imgContent : "Food",

    //             }]
    //         }
    //     }
    // )   
    //     await user3.save();

        // for await (const element of fileArr){

           
            

        
      
        // }
      
      
            
      

       
       
        res.end();

    } catch (error) {
        res.send(error);
    }
    
   
})
app.get("/restaurants/:id/takeaway",auth,async(req,res)=>{
    try {
        res.render('takeaway')
    } catch (error) {
        
    }
})
app.post("/restaurants/:id/renderRestaurants",auth, async (req,res)=>{

    try {
        
        const _id = req.params.id;
        let userDB
        const db = await RestData.find({_id})
        console.log(db);
        try {
            userDB = await UserData.find({$and : [{_id : req.user._id},{favourites : {$exists: true, $in :[req.params.id]}}]});
        } catch (error) {
            
        }
        
         
        res.send({restaurant : db,userDB});
       

    } catch (error) {

        res.send(error)
    }   
        
})

app.post("/restaurants/:id",auth, async (req,res)=>{
    if(req.token){
        const des = req.body.revData;
        const star = req.body.revRating;
        if(req.params.id != "defaultRestaurants"){
            if(des){
                let restdb = await RestData.findByIdAndUpdate({_id : req.params.id},{
                    $push : {
                        reviews :[{
                            username : req.user.name,
                            userimg : "file-1643560536753.jpg",
                            userid : req.user._id,
                            rating : star,
                            description : des,
                            tags :[
                                "Hygenic",
                                "Quick Dine",
                                "Perfect Tatse"
                            ]
                        }]
            
                    }
                })
                await restdb.save();
                
                let userdb = await UserData.findByIdAndUpdate({_id : req.user._id},{
                    $push : {
                        reviews :[{
                            
                            resid : req.params.id,
                            rating : star,
                            description : des,
                            tags :[
                                "Hygenic",
                                "Quick Dine",
                                "Perfect Tatse"
                            ]
                        }]
            
                    }
                })
                await userdb.save();
    
    
                
                
            }else{
    
                
                let userdb = await UserData.findByIdAndUpdate({_id : req.user._id},{
                    $push : {
                        reviews :[{
                            
                            resid : req.params.id,
                            rating : star
                           
                        }]
            
                    }
                })
                await userdb.save();
    
            }
    
            
        
    
                if(star == 1){
    
                   let restdb = await RestData.findByIdAndUpdate({_id : req.params.id},{
                        $inc : {
    
                            "rating.star1" : 1
                                       
                          }
                    })
                    await restdb.save();
    
                }else if(star == 2){
    
                    let restdb = await RestData.findByIdAndUpdate({_id : req.params.id},{
                        $inc : {
    
                            "rating.star2" : 1
                                       
                          }
                    })
                    await restdb.save();
    
                }else if(star == 3){
    
    
                    let restdb = await RestData.findByIdAndUpdate({_id : req.params.id},{
                        $inc : {
    
                            "rating.star3" : 1
                                       
                          }
                    })
                    await restdb.save();
    
                }else if(star == 4){
    
    
                    let restdb = await RestData.findByIdAndUpdate({_id : req.params.id},{
                        $inc : {
    
                            "rating.star4" : 1
                                       
                          }
                    })
                    await restdb.save();
    
                }else{
    
    
                    let restdb = await RestData.findByIdAndUpdate({_id : req.params.id},{
                        $inc : {
    
                            "rating.star5" : 1
                                       
                          }
                    })
                    await restdb.save();
    
                }
    
              
            
           res.send(true);
        }
        
        
    }else{
        res.redirect('/login');
    
    }

    

})

app.post('/restaurants/:id/addToFavourites', auth , async (req,res)=>{
    try {
        const id = req.params.id
        
        try {
            if(req.token){

                const userDB = await UserData.find({$and : [{_id : req.user._id},{favourites : {$exists: true, $in :[id]}}]});
                console.log(userDB);
                if(userDB.length == 0){
                    console.log("here");
                    const user = await UserData.findByIdAndUpdate({_id : req.user._id},{
                        $push :{
                            favourites :[
                                id
                            ]
                        }
                    })
    
                    await user.save()
                }

                
            }
            res.send(true); 
        } catch (error) {
            res.send(error)
        }

    } catch (error) {
        res.send(error)
    }
})
app.post('/restaurants/:id/removeFromFavourites', auth , async (req,res)=>{
    try {
        const id = req.params.id
        
        try {
            if(req.token){

                const userDB = await UserData.find({$and : [{_id : req.user._id},{favourites : {$exists: true, $in :[req.params.id]}}]});
                console.log(userDB , userDB.length);
                if(userDB.length == 1){
                    
                    const user = await UserData.findByIdAndUpdate({_id : req.user._id},{
                        $pull :{
                            favourites :{
                                $in :[
                                    id
                                ]
                            }
                                
                        }
                    })
    
                    await user.save()
                }

                
            }
            res.send(true);  
            console.log(true);
            
        } catch (error) {
            res.send(error)
        }

    } catch (error) {
        res.send(error)
    }
})
app.get('/myprofile', auth ,(req,res)=>{

    try {
        let name = req.user.name.split([" "]);
        res.render("profile",{
            token : true,
            name : name[0],
            username : req.user.username,
            profName : req.user.name,
            profileImg : req.user.profileImg,
            profileColor : req.user.profileColor
        });
    } catch (error) {
        console.log(error);
        res.redirect('/login')
    }
    
})


app.post("/myprofile", auth , async(req,res)=>{
        try {

            const id = req.user._id.valueOf() || req.body.payload;
            
            const user = await UserData.find({_id : id});
         

            const confirmBookings = async(elem)=> {

                
                const rdb = await RestOwnerData.find({"upcomingBookings._id" : {$nin : [elem]} }, {"upcomingBookings._id" : elem});
                
                
                if(rdb.length > 0){

                    const db = await UserData.findOneAndUpdate({yourBookings : {$in : [elem]}},{
                        $push : {
                            pastBookings : elem
                        },
                        $pull : {
                             yourBookings : {$in :[elem]}
                        }
    
                    })
                    
                    await db.save()
                }
                
                
              }
              
              const getConBookings = async () => {
                return Promise.all(user[0].yourBookings.map(item => confirmBookings(item)))
              }



                getConBookings()




            
            const rcntVList = user[0].recentlyViewed;
            
            const doSomethingAsync = async item => {
                return await RestData.find({_id :item})
                
              }
              
              const getData = async () => {
                return Promise.all(rcntVList.map(item => doSomethingAsync(item)))
              }

              const data = await getData()


              const favList = user[0].favourites

              const fetchFav = async item => {
                return await RestData.find({_id :item})
                
              }
              
              const getFav = async () => {
               
                return Promise.all(favList.map(item => fetchFav(item)))
              }

              const favData = await getFav()

              
              let revList = [];
              for(var i = 0; i < user[0].reviews.length; i++){ 
                 
                  revList.push(user[0].reviews[i].resid);
              }
              
             console.log(revList);
              const fetchRev = async item => {
                console.log(item);

               
                return await RestData.find({_id :item},{ restaurantname: 1, restaurantimg: 1 })
                
              }
              
              const getRev = async () => {
                return Promise.all(revList.map(item => fetchRev(item)))
              }

              const revData = await getRev()
             
              let finalRevData=[];

              for(var i = 0;i < user[0].reviews.length; i++){
               
                finalRevData.push({
                    restaurantname : revData[i][0].restaurantname,
                    restaurantimg : revData[i][0].restaurantimg,
                    time : user[0].reviews[i].time.split(',')[0],
                    rating : user[0].reviews[i].rating,
                    description : user[0].reviews[i].description ? user[0].reviews[i].description : false
                })
              }
            
              const fetchBookings = async item => {
              
                const dataHere = await RestOwnerData.find({'upcomingBookings._id' : item})
               
                const resData = await RestData.find({_id : dataHere[0].restaurantId}).select({ "restaurantname": 1, "restaurantimg": 1, "_id" : 1})
                
                for(var i = 0; i < dataHere[0].upcomingBookings.length; i++){
                    if(dataHere[0].upcomingBookings[i]._id == item){
                        
                        
                        
                        
                        return [dataHere[0].upcomingBookings[i] , resData[0]]
                        break
                    }
                }
                
              }
              
              const getBookings = async () => {
                return Promise.all(user[0].yourBookings.map(item => fetchBookings(item)))
              }

              const bookingsData = await getBookings()


              const fetchFollowers = async (item)=>{
                return await UserData.find({_id : item}).select({name : 1 , username : 1});
              }
              const getFollowers = async () =>{
                  return Promise.all(user[0].followers.map(item => fetchFollowers(item)))
              }
            
              const followersData = await getFollowers();

              const fetchFollowing = async (item)=>{
                return await UserData.find({_id : item}).select({name : 1 , username : 1});
              }
              const getFollowing = async () =>{
                  return Promise.all(user[0].following.map(item => fetchFollowing(item)))
              }
            
              const followingData = await getFollowing();

            res.send({data,favData,finalRevData,bookingsData,followersData,followingData});

        } catch (error) {
            console.log(error);
            res.send(error)
        }
})

app.get("/business", auth , async(req,res)=>{
    let name = req.user.name.split([" "]);
    res.render('business',{
        token : true,
        name : name[0]
    });
})
app.get("/business/profile", auth , async(req,res)=>{
    try {
        if(req.token){
            let pastBookingsid = [];
            let name = req.user.name.split([" "]);
            const db = await UserData.findById({_id : req.user._id});
            const restDb = await RestOwnerData.findById({_id : db.ownerOf});
           const bookingData = restDb.upcomingBookings

           const date = new Date();
           const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
            const week = {
                0: "Sun",
                1 : "Mon",
                2 : "Tue",
                3 : "Wed",
                4 : "Thu",
                5 : "Fri",
                6 : "Sat",
                
            }
            let timeCount = 24;
            let yesterday = new Date(date.getTime('en-US',{
            }) - timeCount * 60 * 60 * 1000);
            let yesterdayDay = `${week[yesterday.getDay()]}, ${yesterday.getDate()} ${months[yesterday.getMonth()]}`
            let todayDay = `${week[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`
            let dateArr = []
            dateArr.push(yesterdayDay)
            dateArr.push(todayDay)
            
            

            for(var i = 2; i <=7; i++){
                const tom = new Date(date.getTime('en-US',{
                        }) + timeCount * 60 * 60 * 1000);
                    
                        
                        
                        const finalDate = `${week[tom.getDay()]}, ${tom.getDate()} ${months[tom.getMonth()]}`;
                       dateArr.push(finalDate)

                        
                        timeCount += 24;
           }
           

          bookingData.forEach((elem , index)=>{
              
              for(var l = 0; l < dateArr.length; l++){

                if(elem.bookingDate == dateArr[l]){
                    break;
                }
                if(elem.bookingDate != dateArr[l] && l == dateArr.length - 1){
                    pastBookingsid.push(elem);
                    
                }

              }
          })
           

            
           
            const doSomethingAsync = async (item , index)=> {

                const db = await RestOwnerData.findOneAndUpdate({"upcomingBookings._id" : item._id},{
                    $push : {
                        pastBookings : [item]
                    },
                    $pull : {
                         upcomingBookings : {_id : item._id.valueOf()}
                    }

                })

                await db.save()
                
                
                
                
                

            }

            const getData2 = async () => {
                return Promise.all(pastBookingsid.map((item , index) => doSomethingAsync(item , index)))
              }

            getData2()
           

            res.render('businessRestaurantProfile',{
                token :  true,
                name : name[0]
            });
        }else{
            res.redirect('/login')
        }
    } catch (error) {
        res.send(error)
    }
   
})
app.get("/business/register", auth , async(req,res)=>{
  try {
      if(req.token){
        // const  searchToken = await axios.post('https://outpost.mapmyindia.com/api/security/oauth/token?grant_type=client_credentials&client_id=33OkryzDZsIXVzuUQVOb9BG1i9USkApHaZJnEOk8y715O2aBzZw3vOpbNmPIu2APzCLixguqOUy9BlRlRK1qiw==&client_secret=lrFxI-iSEg93KeRGEI7TpqilgCcJ5hyCdpEAfqt5_QeXOAh0xRh3SBB684Irewr4aAP5kwpGyK1r1x7So6n1sEMACHaYsjGZ')
      
        let name = req.user.name.split([" "]);
          res.render('businessRegistration',{
              name : name[0],
              token : true,
              profileImg : req.user.profileImg,
              profileColor : req.user.profileColor
              
          })
      }else {
      res.redirect('/login');

      }
  } catch (error) {

    res.send(error)
  }
})
app.post("/business/register", auth , uploadMultipleDocs, async(req,res)=>{
    try {
        if(req.token){
                let weeks = req.body.weekDays.split([","]);
                let cuisineType = req.body.cuisineType.split([","]);
                let outletType = req.body.outletType.split([","]);
                
                const newRestaurant = new RestaurantRequest({
                    restaurantname : req.body.restaurantName,
                    restaurantimg : req.files.restaurantImage[0].filename,
                    address : req.body.restaurantAddress,
                    locality : req.body.locality ? req.body.locality : req.body.restaurantAddress,
                    phone : req.body.phone,
                    email : req.body.ownerEmail,
                    ownerName : req.body.ownerName,
                    location : {
                        type : "Point",
                        coordinates :[
                            req.body.latitude,
                            req.body.longitude
                        ]
                    },
                    workingHours : {
                        weeks : weeks,
                        
                        hours : [
                            req.body.openHour,
                            req.body.openMin,
                            req.body.closeHour,
                            req.body.closeMin
                        ]
                    },
                    category :  req.body.category,
                    seating : req.body.seating,
                    requestFrom : req.user._id,
                    cuisines : cuisineType,
                    outletType : outletType,
                    panDetails : {
                        panNumber : req.body.panNumber,
                        legalEntityName : req.body.legalEntity,
                        legalEntityAddress : req.body.legalEntityAddress,
                        panImage : req.files.panImage[0].filename

                    },
                    gstDetails : {
                        gstRegistered : req.body.gstRegistered,
                        gstNumber : req.body.gstRegistered == 'true' ? req.body.gstNumber : '',
                        gstImage : req.body.gstRegistered == 'true' ?  req.files.gstImage[0].filename : '',
                        chargeOnMenu : req.body.gstMenuCharge

                    },
                    fssaiDetails : {
                        fssaiNumber : req.body.fssaiNumber,
                        fssaiExpiry : req.body.fssaiExpiry,
                        fssaiImage : req.files.fssaiImage[0].filename
                    },
                    bankDetails : {
                        bankNumber : req.body.bankNumber,
                        accountType : req.body.accountType,
                        ifscCode : req.body.ifscCode
                    },


                })
                let db = await newRestaurant.save();
                if(db){
                    res.clearCookie("businessVerification")
                }
                res.send({db})
        }   
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

app.post('/moreInfo',auth,async(req,res)=>{
    try {
        console.log(req.body);  
        const findRes = await RestOwnerData.findById({_id : req.user.ownerOf})
        if(req.body.payload == 'dine'){
            let data = [];
            for(let i = 0;i < findRes.dineIn.length;i++){
                if(findRes.dineIn[i]._id.valueOf() == req.body.id){
                        let currObj = {
                            orderId : findRes.dineIn[i].orderId,
                            orderDate : findRes.dineIn[i].orderDate,
                            
                        }
                        data.push([
                            findRes.dineIn[i].orderList,
                            findRes.dineIn[i].total,
                            findRes.dineIn[i].payment,
                            currObj  
                        ])
                }
            }
             res.send({data})
        }else if(req.body.payload == 'upcomingBookings'){

            let data = [];
            for(let i = 0;i < findRes.upcomingBookings.length;i++){
                if(findRes.upcomingBookings[i]._id.valueOf() == req.body.id){
                        let currObj = {
                            orderId : findRes.upcomingBookings[i].oderId ? findRes.upcomingBookings[i].oderId : 'Asd65654',
                            orderDate : findRes.upcomingBookings[i].bookingDate,
                            
                        }
                        data.push([

                            findRes.upcomingBookings[i].orderList,
                            findRes.upcomingBookings[i].total,
                            findRes.upcomingBookings[i].payment,
                            currObj  
                        ])
                }
            }
            console.log(data)
             res.send({data})
            

        }else if(req.body.payload == 'takeaway'){

            let data = [];
            

            for(let i = 0;i < findRes.takeaway.length;i++){
                if(findRes.takeaway[i]._id.valueOf() == req.body.id){
                        let currObj = {
                            orderId : findRes.takeaway[i].oderId ? findRes.takeaway[i].oderId : 'Asd65654',
                            orderDate : findRes.takeaway[i].orderDate,
                               
                        }
                        data.push([

                            findRes.takeaway[i].orderList,
                            findRes.takeaway[i].total,
                            findRes.takeaway[i].payment,
                            currObj  
                        ])
                }
            }
            
             res.send({data})
        }
        
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})
app.post("/dineinDetails",auth,async(req,res)=>{
    try {
        if(req.token){
            const getData = await RestOwnerData.findById({_id : req.user.ownerOf})
            const date = new Date();
            const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
             const week = {
                 0: "Sun",
                 1 : "Mon",
                 2 : "Tue",
                 3 : "Wed",
                 4 : "Thu",
                 5 : "Fri",
                 6 : "Sat",
                 
             }
             let timeCount = 24;
 
             let todayDay = `${week[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`
             let dateArr = []
             dateArr.push(todayDay)
            
 
             for(var i = 2; i <=2; i++){
                 const tom = new Date(date.getTime('en-US',{
                         }) - timeCount * 60 * 60 * 1000);
                     
                         
                         
                         const finalDate = `${week[tom.getDay()]}, ${tom.getDate()} ${months[tom.getMonth()]}`;
                        dateArr.push(finalDate)
 
                         
                         timeCount += 24;
            }
            let dineInData = [];
            getData.dineIn.forEach(elem =>{
                dateArr.forEach(element =>{
                let orderDate = `${elem.orderDate.split([' '])[0]}, ${elem.orderDate.split([' '])[2]} ${elem.orderDate.split([' '])[1]}`
            
                    if(orderDate == element){
                        
                        dineInData.push(elem)
                    }
                })
            })
            let upcomingBookingsData = [];
            getData.upcomingBookings.forEach(elem =>{
                console.log(elem)
                dateArr.forEach(element =>{
                    
                    
                    if(elem.bookingDate == element){
                        upcomingBookingsData.push(elem)
                    }
                })
            })
            console.log(dineInData,upcomingBookingsData)
            // const doSomethingAsync = async item => {

            //     return await UserData.findById({_id : item.userId})

            // }
            // const getData2 = async () => {
            //     return Promise.all(getData.dineIn.map(item => doSomethingAsync(item)))
            //   }

            //   const userData = await getData2()

              const tb = async item => {
                return await UserData.findById({_id : item.userId})

            }
            const getDat = async () => {
                return Promise.all(getData.upcomingBookings.map(item => tb(item)))
              }

              const tbData = await getDat()

                res.send([{payload : dineInData},{tb : upcomingBookingsData},{tbData}]) 
        }
    } catch (error) {
        console.log(error)
        res.send({error})
    }
})
app.post("/saveDineinDetails",auth,async(req,res)=>{
    try {
        if(req.token){
            console.log("here",req.body.payload)
            const owner = await RestData.findById({_id : req.body.payload[0][0].restaurantId})
            let orderList = [];
            let grandTotal = 0;
            let subTotal = 0;
            let charges = 0;
            console.log("here", req.body.payload)
            req.body.payload[0].forEach(elem =>{
                let currObj = {
                    foodId : elem.foodId,
                    foodName : elem.foodName,
                    cartQuantity : elem.cartQuantity,
                    foodQuantity : elem.foodQuantity,
                    price : elem.price   
                }
                subTotal += elem.price * elem.cartQuantity
                charges = ((subTotal / 100) * 18).toFixed(2)
                grandTotal = subTotal + parseFloat(charges)
                orderList.push(currObj)
            })
            const ownerAc = await RestOwnerData.findByIdAndUpdate({_id : owner.owner},{
                $push :{
                    dineIn :[{
                    userId : req.body.payload[1]._id,
                    orderId : req.body.payload[2] ? req.body.payload[2] : "A45678978",
                    orderList : orderList,
                    tableNo : req.body.payload[3],
                    total :[{
                        subTotal,
                        charges,
                        grandTotal
                    }],
                    payment : [{
                        paymentMode : 'Cash',
                        paymentStatus : false
                    }]
            
                }]
                }
            },{
                useFindAndModify : false
            })

           
            await ownerAc.save();
            res.send(true)
        }
    } catch (error) {
        console.log(error)

    }
})

app.post("/takeawayDetails", auth ,async(req,res)=>{
    try {
        if(req.token){
            const getData = await RestOwnerData.findById({_id : req.user.ownerOf})
           
            const doSomethingAsync = async item => {

                return await UserData.findById({_id : item.userId})

            }
            const getData2 = async () => {
                return Promise.all(getData.takeaway.map(item => doSomethingAsync(item)))
              }

              const userData = await getData2()
            res.send([{payload : getData.takeaway},{userData}])   
        }
    } catch (error) {
        
    }
})
app.post("/saveTakeawayDetails", auth , async(req,res)=>{
    try {
        if(req.token){
           

            const owner = await RestData.findById({_id : req.body.payload[0][0].restaurantId})
            let orderList = [];
            let grandTotal = 0;
            let subTotal = 0;
            let charges = 0;
            console.log("here", req.body.payload)
            req.body.payload[0].forEach(elem =>{
                let currObj = {
                    foodId : elem.foodId,
                    foodName : elem.foodName,
                    cartQuantity : elem.cartQuantity,
                    foodQuantity : elem.foodQuantity,
                    price : elem.price   
                }
                subTotal += elem.price * elem.cartQuantity
                charges = ((subTotal / 100) * 18).toFixed(2)
                grandTotal = subTotal + charges
                orderList.push(currObj)
            })
            const ownerAc = await RestOwnerData.findByIdAndUpdate({_id : owner.owner},{
                $push :{
                    takeaway :[{
                    userId : req.body.payload[1]._id,
                    orderTime : req.body.payload[1].time,
                    orderId : req.body.payload[2],
                    status : "pending",
                    orderList : orderList,
                    total :[{
                        subTotal,
                        charges,
                        grandTotal
                    }],
                    payment : [{
                        paymentMode : 'Cash',
                        paymentStatus : false
                    }]
            
                }]
                }
            },{
                useFindAndModify : false
            })

           
            await ownerAc.save();
            res.send(true)
        }
    } catch (error) {
        res.send(error)
    }
})
app.post("/saveUpcomingBookings", auth , async(req,res)=>{
   try {
    // {
    //     date: 'Sat, 5 Mar',
    //     time: '10:30 PM',
    //     guestName: 'adsd',
    //     guestCount: '1',
    //     userId: '6222381fc5334a41e9c63a5d',
    //     name: 'Quazi',
    //     userName: '@quazi',
    //     profilepic: 'file-1643559975111.jpg',
    //     socketId: '2bUSPjwQsvnzcWkzAAAD'
    //   }
       if(req.token){
            const owner = await RestData.findById({_id : req.body.payload.restaurantId})
            const ownerAc = await RestOwnerData.findByIdAndUpdate({_id : owner.owner},{
                $push :{
                    upcomingBookings :[{
                    userId : req.body.payload.userId,
                    bookingDate : req.body.payload.date,
                    bookingTime : req.body.payload.time,
                    guestName : req.body.payload.guestName,
                    guestCount : req.body.payload.guestCount,
                    orderId : req.body.payload.orderId
            
                }]
                }
            },{
                useFindAndModify : false
            })

           
            await ownerAc.save();
            
            const searchD = await RestOwnerData.find({
               $and : [{_id : owner.owner},{userId : req.body.payload.userId}]
            });
            
            const finalD = searchD[0].upcomingBookings
            const doSomethingAsync = async item => {
                
                
               const d = await UserData.find({yourBookings : {$exists: true, $in :[item._id.valueOf()]}});
               console.log(d.length);
               if(d.length == 0){
                const userD = await UserData.findByIdAndUpdate({_id : req.body.payload.userId},{
                    $push :{
                        yourBookings :[item._id.valueOf()]
                    }
                })
                await userD.save()
               }
               
              }
              
              const getData = async () => {
                return Promise.all(finalD.map(item => doSomethingAsync(item)))
              }

             getData()

           
          
            res.send(true)
            
       }
   } catch (error) {
       res.send(error)
   }
})


app.post("/upcomingBookings", auth , async(req,res)=>{
    try {
        if(req.token){
            const getData = await RestOwnerData.findById({_id : req.user.ownerOf})
           
            const doSomethingAsync = async item => {

                return await UserData.findById({_id : item.userId})

            }
            const getData2 = async () => {
                return Promise.all(getData.upcomingBookings.map(item => doSomethingAsync(item)))
              }

              const userData = await getData2()
            res.send([{payload : getData.upcomingBookings},{userData}])
        }
            
    } catch (error) {
        res.send(error)
    }
})
app.post("/bookingDetails", auth , async(req,res)=>{
    try {
        console.log(req.body.payload);
        const finData = await RestOwnerData.find({'upcomingBookings._id ': req.body.payload})
        
        res.send({bookingsData : finData[0].upcomingBookings});
    } catch (error) {
        res.send(error)
    }
})

app.post("/saveUserBookingDetails", auth , async(req,res)=>{
    try {
        

    } catch (error) {
        res.send(error)
    }
})
// app.listen(port, ()=>{
//     console.log(`connection is established at ${port}`);
// });

app.get("/restaurants/:id/pre-cook-meal/:orderId", auth , async(req,res)=>{
    try {
        if(req.token){
            let name = req.user.name.split([" "])
         await RestOwnerData.find({"upcomingBookings._id": req.params.orderId});
        
        res.render("restaurantMeal",{
            id : req.params.id,
            token : req.token,
            name : name[0],
            resId : req.params.id,

        })
    }
    } catch (error) {
            res.send(error)
    }
})
app.post("/add-to-cart/:id", auth , async(req,res)=>{

    try {

        let elemIndex;
        const cart = req.body.payload
        let foodArr = [];
        let resData = await RestData.find({"menu._id" : cart[0]}).lean();
        let resBookingData = await RestOwnerData.find({"upcomingBookings._id" : req.params.id})

        console.log(resBookingData);
      

            cart.forEach(elem => {
            for(var i = 0; i < resData[0].menu.length; i ++){
                
                
                
                
                if(elem ==  resData[0].menu[i]._id.valueOf()){
                   
                    
                    if(foodArr.includes(resData[0].menu[i])){
                      elemIndex = foodArr.indexOf(resData[0].menu[i])
                       console.log(elemIndex);
                       foodArr[elemIndex]["quantityuser"] += 1;
                    }else{
                       
                        foodArr.push(resData[0].menu[i]);
                        elemIndex = foodArr.indexOf(resData[0].menu[i])
                        foodArr[elemIndex]["quantityuser"] = 1;
                         break;
                    }
                   
                }
            }


        });
        
        // const updateData = await RestOwnerData.aggregate([{

        //     $project : {
        //         index : { $indexOfArray : ["$upcomingBookings" ,  req.params.id]}
        //     }
        // }])
        // console.log(req.params.id);
        // console.log(updateData);
        const removeData =  await RestOwnerData.findOneAndUpdate({'upcomingBookings._id' : req.params.id},{
            $set : {
                "upcomingBookings.$.orderList" : []
            }
})
 await removeData.save();
     

        const doSomethingAsync = async item => {

            const updateData = await RestOwnerData.findOneAndUpdate({'upcomingBookings._id' : req.params.id},{
                $push : {
                    "upcomingBookings.$.orderList" : [
                        {
                            foodName : item.cuisinename,
                            cost : item.price,
                            quantity : item.quantityuser,
                        }
                    ]
                }
                
})
                await updateData.save()
        }
        const getData2 = async () => {
            return Promise.all(foodArr.map(item => doSomethingAsync(item)))
          }

          const finalData = await getData2()

        
        console.log(foodArr);
        res.send({foodArr})
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.post("/follow/:userId", auth , async(req,res)=>{
    try {
        if(req.token){
            console.log(req.params.userId);
            const findUser = await UserData.find({$and : [{_id : req.params.userId}, {"followers" : {$elemMatch : {$eq : req.user._id}} }]}).select({name : 1});
          
            if(findUser.length < 1){



                const follow = await UserData.findOneAndUpdate({_id : req.user._id},{
                    $push : {
                        following : req.params.userId
                    }
                })
                await follow.save();

                const following = await UserData.findOneAndUpdate({_id : req.params.userId},{
                    $push : {
                        followers : req.user._id
                    }
                })
               
              await following.save();
              res.send(true);
            }else{
                res.send(false);
            }

           
        }
        
    } catch (error) {
        console.log(error)
        res.send(error);
    }
})
app.post("/unfollow/:userId", auth , async(req,res)=>{
    try {
        if(req.token){
            const findUser = await UserData.find({$and : [{_id : req.params.userId}, {"followers" : {$elemMatch : {$eq : req.user._id}} }]}).select({name : 1});
            console.log(findUser);
            if(findUser.length > 0){
                const follow = await UserData.findOneAndUpdate({_id : req.user._id},{
                    $pull : {
                        following : req.params.userId
                    }
                })
                 await follow.save();
                const following = await UserData.findOneAndUpdate({_id : req.params.userId},{
                    $pull : {
                        followers : req.user._id
                    }
                })
                await following.save();
                res.send(true);
            }else{
          
            res.send(false);
            }
        }
    } catch (error) {
        res.send(error)
    }
})
app.get("/search-user" , auth , async(req,res)=>{
    try {
        res.render('userSearch');
    } catch (error) {
        
    }
})
app.post("/search-user" , auth , async(req,res)=>{
    try {
        if(req.token){

            const findUser = await UserData.find({username : {$regex:  new RegExp(req.body.payload+'.*','i')}}).select({name : 1 , username : 1});
        const fetchData = async(item)=>{
            if(req.user.following.includes(item._id)){
                item.following = "true"
                return item
            }else{
                return item
            }
        }
        const getData = async()=>{
            return Promise.all(findUser.map(item => fetchData(item)))
        }
        const finalData = await getData()
        console.log(finalData);
        res.send({finalData})

        }else{
            const findUser = await UserData.find({username : {$regex:  new RegExp(req.body.payload+'.*','i')}}).select({name : 1 , username : 1});
        res.send(findUser);

        }
        
    } catch (error) {
        res.send(error)
    }
})
app.get("/nfc/:id/:tableNo" , auth , async(req,res)=>{
    try {
        res.render("qrRestaurant");
    } catch (error) {
        
    }
})
app.get("/followers", auth , async(req,res)=>{
    try {
        if(req.token){
            const findUser = await UserData.find({_id : req.user._id});
                
            const doSomethingAsync = async(item)=>{
                return await UserData.find({_id : item}).select({name : 1 , username : 1});
                
            }
            const getData2 = async () => {
                return Promise.all(findUser[0].followers.map(item => doSomethingAsync(item)))
              }
    
              const finalData = await getData2()
              
              res.send({followers})
        }
    } catch (error) {
        res.send(error)
    }
})
app.get("/:city/restaurants/", auth , async(req,res)=>{
    try {
        
        if(req.token){
            let name = req.user.name.split([" "])

            res.render('viewAllRestaurants',{
                token : true,
                name : name[0]
            })

        }else{
            res.render('viewAllRestaurants')
        }
               
           
    } catch (error) {
        console.log(error);
    }
})

app.post("/:city/restaurants/", auth , async(req,res)=>{
    try {
        
            let query;
                
            if(req.query.cuisine && req.query.type && !req.query.popularity){
                query = {
                    $and : [
                        {
                            cuisines : {$eq :  req.query.cuisine}
                        },
                        {
                            type : {$eq : req.query.type}
                        }
                    ]
                }
            }else if(req.query.cuisine && !req.query.type && !req.query.popularity){
                

                query = {cuisines : req.query.cuisine};
            }else if(req.query.type && !req.query.cuisine && !req.query.popularity){
                query = {type : req.query.type}
            }else if(req.query.popularity && !req.query.cuisine && !req.query.type){
                query = {averageRating : {$gte : 3}}
            }else if(req.query.cuisine && req.query.type && req.query.popularity){
                query = {$and : [{cuisines : req.query.cuisine},{type : req.query.type},{averageRating : {$gte : 3}}]}
            }else if(!req.query.cuisine && req.query.type && req.query.popularity){
                query = {$and :[{type : req.query.type},{averageRating : {$gte : 3}}]}
            }else{
                query = {city : req.params.city}
            }
            console.log(req.query.type);
            let findRes
            if(req.body.payload){
                console.log(req.body.payload);
                findRes = await RestData.find(query).limit(6).skip(req.body.payload);
            }else{
                findRes = await RestData.find(query).limit(6);   
            }
                console.log(findRes);
            // console.log(testData);
            res.send({findRes});
        
    } catch (error) {
        res.send(error)
    }
})

app.get("/user/:username", auth , async(req,res)=>{
    try {
        const user = await UserData.find({username : req.params.username});
        
        res.render('userProfile',{
            profName : user[0].name,
            username : user[0].username
        });
    } catch (error) {
        
    }
})
app.post("/user/:username", auth , async(req,res)=>{
    try {
        const user = await UserData.find({username : req.params.username});

        const favList = user[0].favourites

              const fetchFav = async item => {
             
                return await RestData.find({_id :item})
                
              }
              
              const getFav = async () => {
               
                return Promise.all(favList.map(item => fetchFav(item)))
              }

              const favData = await getFav()

              
              let revList = [];
              for(var i = 0; i < user[0].reviews.length; i++){ 
                 
                  revList.push(user[0].reviews[i].resid);
              }
              
             
              const fetchRev = async item => {
               
                return await RestData.find({_id :item},{ restaurantname: 1, restaurantimg: 1 })
                
              }
              
              const getRev = async () => {
                return Promise.all(revList.map(item => fetchRev(item)))
              }

              const revData = await getRev()
             
              let finalRevData=[];

              for(var i = 0;i < user[0].reviews.length; i++){
               
                finalRevData.push({
                    restaurantname : revData[i][0].restaurantname,
                    restaurantimg : revData[i][0].restaurantimg,
                    time : user[0].reviews[i].time.split(',')[0],
                    rating : user[0].reviews[i].rating,
                    description : user[0].reviews[i].description ? user[0].reviews[i].description : false
                })
              }
              const fetchFollowers = async (item)=>{
                return await UserData.find({_id : item}).select({name : 1 , username : 1});
              }
              const getFollowers = async () =>{
                  return Promise.all(user[0].followers.map(item => fetchFollowers(item)))
              }
            
              const followersData = await getFollowers();

              const fetchFollowing = async (item)=>{
                return await UserData.find({_id : item}).select({name : 1 , username : 1});
              }
              const getFollowing = async () =>{
                  return Promise.all(user[0].following.map(item => fetchFollowing(item)))
              }
            
              const followingData = await getFollowing();
              res.send({favData,finalRevData,followersData,followingData});
    } catch (error) {
        res.send(error)   
    }
})
app.post("/business/add-offer/:offerID", auth ,async(req,res)=>{
    try {
        if(req.token){
            const findOwner = await RestOwnerData.findById({_id : req.user.ownerOf});

            const findRes = await RestData.findByIdAndUpdate({_id : findOwner.restaurantId},{
                $push :{
                    activeOffers : [{
                        foodId : req.params.offerID,
                        offerPrice : 25

                    }]
                }
            });
            res.send(true);
        }
    } catch (error) {
        
    }
})

app.post("/business/remove-offer/:offerID", auth ,async(req,res)=>{
    try {
        if(req.token){
            const findRes = await RestData.findByIdAndUpdate({_id : req.user.restaurantId},{
                $pull :{
                    offers : {_id : req.params.offerID}
                }
            });
            res.send(true);
        }
    } catch (error) {
        
    }
})
app.post("/add-food-items", auth , upload.single('file') , async(req,res)=>{
    try {0
        if(req.token){  
            console.log(req.body);
            console.log(req.file)
            const findId = await RestOwnerData.findById({_id : req.user.ownerOf});
            if(req.body.quantityOption){

                const rest = await RestData.findByIdAndUpdate({_id : findId.restaurantId},{
                    $push :{
                        menu :[{
                            cuisinename : req.body.foodName,
                            cuisineImg : req.file.filename,
                            quantityDetails : [{
                             price : req.body.foodPrice1,
                             quantity : req.body.foodQuantity1,
                             quantityUnit : req.body.foodUnit1
                            },{
                             price : req.body.foodPrice2,
                             quantity : req.body.foodQuantity2,
                             quantityUnit : req.body.foodUnit2
                            }],
                            type : req.body.category,
                            category : req.body.cuisineType[0] != '' ? req.body.cuisineType[0] : req.body.cuisineType[1],  
                            packaging : req.body.packaging,
     
     
                        }]
                    }
                })
     
                await rest.save();


            }else{

                const rest = await RestData.findByIdAndUpdate({_id : findId.restaurantId},{
                    $push :{
                        menu :[{
                            cuisinename : req.body.foodName,
                            cuisineImg : req.file.filename,
                            quantityDetails : [{
                             price : req.body.foodPrice1,
                             quantity : req.body.foodQuantity1,
                             quantityUnit : req.body.foodUnit1
                            }],
                            type : req.body.category,
                            category : req.body.cuisineType[0] != '' ? req.body.cuisineType[0] : req.body.cuisineType[1],  
                            packaging : req.body.packaging,
     
     
                        }]
                    }
                })
     
                await rest.save();
            }
          
                
           
        }

        res.redirect('/business/profile')
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})
app.post("/edit-food-data", auth , async(req,res)=>{
    try {
        if(req.token){
            
            const findData = await RestData.find({"menu._id": req.body.payload})
            console.log(findData);
            let finalData;
            findData[0].menu.forEach(elem =>{
                if(elem._id == req.body.payload){
                    finalData = elem;
                    
                }
            })

            res.send({finalData})
        }
    } catch (error) {
        res.send(error);
        
    }
})

app.post("/edit-food-items", auth, upload.single('file') , async(req,res)=>{
    try {
        if(req.token){
            console.log(req.body)
            const findId = await RestOwnerData.findById({_id : req.user.ownerOf});
            if(req.body.quantityOption){

                const rest = await RestData.findByIdAndUpdate({
                    _id : findId.restaurantId
                },{
                    

                        "menu.$[e2]" : {
                            cuisinename : req.body.foodName,
                            cuisineImg : req.file == undefined ? req.body.originalFileName : req.file.filename,
                            quantityDetails : [{
                             price : req.body.foodPrice1,
                             quantity : req.body.foodQuantity1,
                             quantityUnit : req.body.foodUnit1
                            },{
                                price : req.body.foodPrice2,
                                quantity : req.body.foodQuantity2,
                                quantityUnit : req.body.foodUnit2
                               }],
                            type : req.body.category,
                            category : req.body.cuisineType[0] != '' ? req.body.cuisineType[0] : req.body.cuisineType[1],  
                            packaging : req.body.packaging,
                        }
                    
                },{
                    arrayFilters : [
                        {"e2._id" : req.body.foodId}
                    ]
                })
     
                await rest.save();


            }else{

                const rest = await RestData.findByIdAndUpdate({
                    _id : findId.restaurantId
                },{
                    

                        "menu.$[e2]" : {
                            cuisinename : req.body.foodName,
                            cuisineImg : req.file == undefined ? req.body.originalFileName : req.file.filename,
                            quantityDetails : [{
                             price : req.body.foodPrice1,
                             quantity : req.body.foodQuantity1,
                             quantityUnit : req.body.foodUnit1
                            }],
                            type : req.body.category,
                            category : req.body.cuisineType[0] != '' ? req.body.cuisineType[0] : req.body.cuisineType[1],  
                            packaging : req.body.packaging,
                        }
                    
                },{
                    arrayFilters : [
                        {"e2._id" : req.body.foodId}
                    ]
                })
     
                await rest.save();
            }
            

            res.redirect("/business/profile")
        }
    } catch (error) {
        
        res.send(error);

        
    }
})
app.post("/business/send-data", auth , async(req,res)=>{
    try {
        if(req.token){
            const findOwner = await RestOwnerData.findById({_id : req.user.ownerOf});
            const findData = await RestData.findById({_id : findOwner.restaurantId});
            let currentData = [];

            if(findData.activeOffers.length >= 1){
                findData.activeOffers.forEach(elem =>{
                    findData.menu.forEach(element =>{
                        if(elem.foodId == element._id){
                           const currentObj = {
                               offerId : elem._id,
                               cuisinename : element.cuisinename,
                               price : element.price,
                               cuisineImg : element.cuisineImg,
                               offerPrice : elem.offerPrice
                           }
                           currentData.push(currentObj)
                        }
                    })
                })
                console.log(currentData);
            }
            res.send({activeOffers : currentData, foodItems : findData.menu, menu : findData.menuimgs, gallery : findData.gallery});

        }
    } catch (error) {
        console.log(error);
    }
})

app.get("/menuData/:id",async(req,res)=>{

    try {

       
            const findData = await RestData.findById({_id : req.params.id}).select({menu : 1});
            res.send({menuData : findData});
            console.log(findData);
        
        
    } catch (error) {

        res.send(error)
            console.log(error);
    }
})

app.get("/suggest-a-feature",auth,async(req,res)=>{
    try {
        

               

                res.render('suggestFeature')

        
    } catch (error) {

        res.send(error)
        
    }
})
app.post("/suggest-a-feature",auth,async(req,res)=>{
    try {
        if(req.token){

           


                const options = {
                    from : "Noxsh Dine <care@noxshdine.com>",
                    to : "noxshsuggestions@gmail.com",
                    subject : "A New Feature!",
                    text : req.body.msg
                }
                
                transporter.sendMail(options, (err,info)=>{
                    if(err){
                        res.send(false)
                    }else{
                        res.send(true)   
                    }

                })
    
                



        }else{
            res.redirect('/login')
        }
    } catch (error) {

        res.send(error)
        
    }
})

app.get("/complaints",auth,async(req,res)=>{
    try {
       

           
                res.render('complaint')





    } catch (error) {

        res.send(error)
        
    }
})


app.post("/complaints",auth,async(req,res)=>{
    try {
        if(req.token){

           


                const options = {
                    from : "Noxsh Dine <care@noxshdine.com>",
                    to : "noxshcomplaints@gmail.com",
                    subject : "Complaint!",
                    text : req.body.msg
                }
                
                transporter.sendMail(options, (err,info)=>{
                    if(err){
                        res.send(false)
                    }else{
                        res.send(true)   
                    }

                })
    
                



        }else{
            res.redirect('/login')
        }
    } catch (error) {

        res.send(error)
        
    }
})


app.post("/contact-us",auth,async(req,res)=>{
    try {
        if(req.token){

           


                const options = {
                    from : "Noxsh Dine <care@noxshdine.com>",
                    to : "noxshcontacts@gmail.com",
                    subject : "There's a Query",
                    text : req.body.msg
                }
                
                transporter.sendMail(options, (err,info)=>{
                    if(err){
                        res.send(false)
                    }else{
                        res.send(true)   
                    }

                })
    
                



        }else{
            res.redirect('/login')
        }
    } catch (error) {

        res.send(error)
        
    }
})


app.get('/contact-us',async(req,res)=>{
    try {
        res.render('contactUs')
    } catch (error) {
        res.send(error)
    }
})

// app.get("/how-it-works",async(req,res)=>{
//     try {
//         res.render('howItWorks');
//     } catch (error) {
        
//     }

// })   

app.get('/privacy-policy', async(req,res)=>{
    try {
        res.render('privacyPolicy')
    } catch (error) {
        res.send(error)
    }
})
app.get('/t&c', async(req,res)=>{
    try {
        res.render('termsAndConditions')
    } catch (error) {
        res.send(error)
    }
})
app.get("/edit-profile",auth,async(req,res)=>{
    try {
        if(req.token){
            let name = req.user.name.split([" "]);

            res.render('editprofile', {
                token : true,
                name : name
            });
        }
       
    } catch (error) {
        
    }

})
app.post('/send-prof-det' , auth,async(req,res)=>{

    try {
        if(req.token){
            res.send(req.user)
        }
    } catch (error) {
        
    }
})
app.post('/edit-profile',auth,async(req,res)=>{
    try {
        if(req.token){
            console.log(req.body.payload);
            const updateUser = await UserData.findByIdAndUpdate({_id : req.user._id},{
                name : req.body.payload.name,
                username : req.body.payload.username,
                email : req.body.payload.email
            },{new : true})
            let updatedUser = await updateUser.save()
            console.log(updatedUser);
            res.send(true);
        }
    } catch (error) {
        res.send(Object.keys(error.keyValue))
    }

})
app.post('/edit-profile-img',auth,async(req,res)=>{
    try {
        if(req.token){
            console.log(req.body)
            const updateUser = await UserData.findByIdAndUpdate({_id :req.user._id},{
                profileImg : req.body.profileImg,
                profileColor : req.body.profileColor  
            },{new : true})
            let updatedUser = await updateUser.save()
            res.send(true);
        }
    } catch (error) {
        res.send(Object.keys(error.keyValue))   
    }
})
app.post('/private-account',auth,async(req,res)=>{

    try {
        if(req.token){
            
                const updatedUser = await UserData.findByIdAndUpdate({_id : req.user._id},{
                    privateAccount : req.body.payload
                })
                await updatedUser.save()
                res.send(true)
        }
    } catch (error) {
            res.send(false)
    }
})
app.post('/blogger-account',auth,async(req,res)=>{

    try {
        if(req.token){
            
                const updatedUser = await UserData.findByIdAndUpdate({_id : req.user._id},{
                    bloggerAccount : req.body.payload
                })
                await updatedUser.save()
                res.send(true)
        }
    } catch (error) {
            res.send(false)
    }
})

app.post('/inventory',auth,async(req,res)=>{
    try {
        if(req.token){
            const findOwner = await RestOwnerData.findById({_id : req.user.ownerOf})
            let findRes;
            let resultArr = [];
            if(req.body.payload){
                let payload = req.body.payload.trim()
            findRes = await RestData.find({$and : [{_id : findOwner.restaurantId},{menu : {$elemMatch : {cuisinename : {$regex:  new RegExp(payload+'.*','i')}}}}]},{menu : 1});
            // findRes = await RestData.find({menu : {$elemMatch : {cuisinename : {$regex:  new RegExp(payload+'.*','i')}}}})    
            findRes[0].menu.forEach(elem =>{
                if(elem.packaging == 'packed'){
                    resultArr.push(elem)
                }
            })
            
            }else{

            findRes = await RestData.find({$and :[{_id : findOwner.restaurantId},{menu : {$elemMatch : {packaging : "packed"}}}]}).select({menu : 1});
            findRes[0].menu.forEach(elem =>{
                if(elem.packaging == 'packed'){
                    resultArr.push(elem)
                }
            })
            }
            res.send(resultArr)

        }
    } catch (error) {
        res.send(error);
    }   
})
app.post('/update-stock',auth,async(req,res)=>{
    try {
        if(req.token){
            const ownerData = await RestOwnerData.findById({_id : req.user.ownerOf})
            

            
            const tb = async item => {
                
                
                let data =  await RestData.findOneAndUpdate({
                    _id : ownerData.restaurantId
                },{
                    $set : {

                        "menu.$[].quantityDetails.$[e2].stock" :  item.stock  
                    }
                },{
                    arrayFilters : [
                        {"e2._id" : item.qId}
                    ]
                });
                await data.save()
                return data
            }
            const getDat = async () => {
                return Promise.all(req.body.payload.map(item => tb(item)))
              }

              const tbData = await getDat()
            
             
              if(tbData.length >= 1){
                res.send(true)
              }else{
                res.send(false)
              }

        }
    } catch (error) {
        console.log(error)
        res.send(error);
    }   
})
app.get('/privacy-policy',async(req,res)=>{
    try {
        res.render('privacyPolicy')
    } catch (error) {
        res.send(error)
    }
})
app.get('/terms-&-conditions',async(req,res)=>{
    try {
        res.render('termsAndConditions')
    } catch (error) {
        res.send(error)
    }
})

app.post('/verify-payment', auth , async(req,res)=>{
    try {
        
          
            const options = {
                method: 'GET',
                url: `https://api.cashfree.com/pg/orders/${req.body.order_id}`,
                headers: {
                  Accept: 'application/json',
                  'x-client-id': process.env.CFAPPID,
                  'x-client-secret': process.env.CFSECRETID,
                  'x-api-version': '2022-01-01'
                }
              };
              
              axios.request(options).then(function (response) {
                if(response.data.order_status == 'PAID'){
                    
                    res.status(200).send(response.data)
                }else{
                    res.status(401).send(response.data.order_status)
                }
              }).catch(function (error) {
                console.error(error);
              });
            

        
    } catch (error) {
        res.send(500).send(error)
    }
})

app.post('/checkout',auth,async(req,res)=>{

    try {
        if(req.token){
            
            const findVender = await RestOwnerData.find({_id : req.body.id});
            
            const checkout = ()=>{
                const options = {
                    method: 'POST',
                    url: 'https://api.cashfree.com/pg/orders',
                    headers: {
                      Accept: 'application/json',
                      'x-client-id': process.env.CFAPPID,
                      'x-client-secret': process.env.CFSECRETID,
                      'x-api-version': '2022-01-01',
                      'Content-Type': 'application/json'
                    },
                    data: {
                        
                      customer_details: {customer_phone: req.user.phone, customer_id : req.user._id},
                      order_meta: {return_url: req.body.returnUrl },
                      order_amount: req.body.amount,    
                      order_currency: 'INR',
                    //   order_splits: [{vendor_id: findVender._id, percentage: 99}]
                    },
                    
                  };
                  
                  axios.request(options).then(function (response) {
                    console.log(response)
                    res.status(200).send({data : response.data})
                  }).catch(function (error) {
                    console.log(error)
                    res.status(500).send(error)
                  });
            }
           checkout()
        }
    } catch (error) {
        console.log(error)
            res.send(error)   
    }
})
app.post("/verify-step1",verificationAuth,async(req,res)=>{
    try {
        if(req.token){
            
            console.log(req.body);
            let phoneStatus;
            
           

                if(req.body.payload.phone == req.user.phoneStats.phone){
                    if(req.user.phoneStats.status){
                        phoneStatus = true;
                        

                    }else{
                        res.status(401).send({msg :"Please Verify Phone Number",position : "Restaurant Number"})
                        phoneStatus = false;
                      
                    }
                }else{
                        res.status(401).send({msg :"Please Verify Phone Number",position : "Restaurant Number"})
                        phoneStatus = false;
                      
                }


                  
            

            if(req.body.payload.email == req.user.emailStats.email && phoneStatus){
                if(req.user.emailStats.status){
                        res.status(200).send({msg :"Verified",position : "Body"})
                }else{
                    res.status(401).send({msg :"Please Verify Email",position : "Owner Email"})
                    
                }
            }else if(req.body.payload.email != req.user.emailStats.email && phoneStatus){
            
                    res.status(401).send({msg :"Please Verify Email",position : "Owner Email"})
                    
                
                
            }


           
        }else{
            let recievedBody = req.body.payload;
            console.log(recievedBody);
            res.status(401).send({msg : 'Please Verify Details',position : 'Body'})
        }
    } catch (error) {
        console.log(error);
    }
})
app.post('/verify-email',verificationAuth,async(req,res)=>{
    try {
        if(req.token){
           

            const OTP = otpGenerator.generate(6 ,{
                digits : true, lowerCaseAlphabets : false, upperCaseAlphabets : false, specialChars : false
            })
            console.log(req.user);
            if(req.user.length < 1){
                res.send(false)
            }else{
                const options = {
                    from : "Noxsh Dine <care@noxshdine.com>",
                    to : req.body.payload,
                    subject : "Verfication",
                    text : `Your OTP is ${OTP}`
                }
                
                transporter.sendMail(options, (err,info)=>{
                    if(err){
                        console.log(err);
                        return;
                    }
                    console.log(info.response);
                })
    
    
                const saveOTP = await new Otp({
                        username : req.body.payload,
                        otp : OTP,
                      
                })
                
                
                const saveEmail = await Verification.findOneAndUpdate({_id : req.user._id},{
                    $set : {
                        emailStats : {
                            email : req.body.payload,
                            status : false
                        }   
                    }
                })

                const token  = await saveOTP.generateToken();
    
                res.cookie("session", token, {
                    expires: new Date(Date.now() + 300000),
                    httpOnly: true
                });

              
    
                await saveOTP.save()
                await saveEmail.save()
                res.send(true)
            
        }
    }else{
        
        const OTP = otpGenerator.generate(6 ,{
            digits : true, lowerCaseAlphabets : false, upperCaseAlphabets : false, specialChars : false
        })
        
        
            const options = {
                from : "Noxsh Dine <care@noxshdine.com>",
                to : req.body.payload,
                subject : "Verfication",
                text : `Your OTP is ${OTP}`
            }
            
            transporter.sendMail(options, (err,info)=>{
                if(err){
                    console.log(err);
                    return;
                }
                console.log(info.response);
            })


            const saveOTP = await new Otp({
                    username : req.body.payload,
                    otp : OTP,
                  
            })
            
            
            
            const saveEmail = new Verification({
                emailStats : {
                    email : req.body.payload,
                    status : false
                }   
            })

            const token  = await saveOTP.generateToken();

            res.cookie("session", token, {
                expires: new Date(Date.now() + 300000),
                httpOnly: true
            });

            const emailToken  = await saveEmail.generateToken();

            res.cookie("businessVerification", emailToken, {
                expires: new Date(Date.now() + 300000 * 60),
                httpOnly: true
            });

          

            await saveOTP.save()
            await saveEmail.save()
            res.status(200).send(true)
        
    }

    
    } catch (error) {
            res.status(500).send(error)
    }
})
app.post('/verify-email-otp',otpAuth,async(req,res)=>{
    try {
        if(req.token){
            const otp = req.body.payload
            if(otp == req.user.otp){
                const token = req.cookies.businessVerification;
                const verifyUser = jwt.verify(token , process.env.SECRET_KEY);
        
                const user = await Verification.findOneAndUpdate({_id: verifyUser._id.valueOf()},{
                    $set : {
                        "emailStats.status":  true   
                        
                    }
                });

                await user.save()
                res.send({msg : "Email Verified"})
            }else{
                res.send({msg : "Invalid OTP"})
            }
            
        }else{
            res.send('');
        }
    } catch (error) {
            res.send(error)
    }
})

app.post('/verify-phone',verificationAuth,async(req,res)=>{
    try {
       
        if(req.token){
           
            
            const OTP = otpGenerator.generate(6 ,{
                digits : true, lowerCaseAlphabets : false, upperCaseAlphabets : false, specialChars : false
            })
            console.log(req.user);
            if(req.user.length < 1){
                res.send(false)
            }else{
                
            const options = {
                method: 'POST',
                url: 'https://www.fast2sms.com/dev/bulkV2',
                headers: {

                    "authorization":"UJSgyQ5CrupNLnMwIEdmi2aOk4e8P19fGjWtl7zZVsb3vX0BYxzkGL0IumgNrHvEUPTf7RYcWs51d8Ah",
                    "Content-Type":"application/json"
                    },
                data : {
                    "route" : "dlt",
                        "sender_id" : "NXHGRP",
                        "message" : "139047",
                        "variables_values" : `${req.body.payload}|${OTP}|`,
                        "flash" : 0,
                        "numbers" : req.body.payload,
                }
                
              };
              
              axios.request(options).then(function (response) {
                console.log(response.data);
                
              }).catch(function (error) {
                console.error(error);
              });
    
                const saveOTP = await new Otp({
                        username : req.body.payload,
                        otp : OTP,
                      
                })
                
                
                const savePhone = await Verification.findOneAndUpdate({_id : req.user._id},{
                    $set : {
                        phoneStats : {
                            phone : req.body.payload,
                            status : false
                        }   
                    }
                })

                const token  = await saveOTP.generateToken();
    
                res.cookie("session", token, {
                    expires: new Date(Date.now() + 300000),
                    httpOnly: true
                });

              
    
                await saveOTP.save()
                await savePhone.save()
                res.send(true)
            
        }
    }else{
        
        const OTP = otpGenerator.generate(6 ,{
            digits : true, lowerCaseAlphabets : false, upperCaseAlphabets : false, specialChars : false
        })
        
        
        const options = {
            method: 'POST',
            url: 'https://www.fast2sms.com/dev/bulkV2',
            headers: {

                "authorization":"UJSgyQ5CrupNLnMwIEdmi2aOk4e8P19fGjWtl7zZVsb3vX0BYxzkGL0IumgNrHvEUPTf7RYcWs51d8Ah",
                "Content-Type":"application/json"
                },
            data : {
                

                    "route" : "dlt",
                    "sender_id" : "NXHGRP",
                    "message" : "139047",
                    "variables_values" : `${req.body.payload}|${OTP}`,
                    "flash" : 0,
                    "numbers" : req.body.payload,
                    
            }
            
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
            
          }).catch(function (error) {
            console.error(error);
          });


            const saveOTP = await new Otp({
                    username : req.body.payload,
                    otp : OTP,
                  
            })
            
            
            
            const savePhone = new Verification({
                phoneStats : {
                    phone : req.body.payload,
                    status : false
                }   
            })

            const token  = await saveOTP.generateToken();

            res.cookie("session", token, {
                expires: new Date(Date.now() + 300000),
                httpOnly: true
            });

            const phoneToken  = await savePhone.generateToken();

            res.cookie("businessVerification", phoneToken, {
                expires: new Date(Date.now() + 300000 * 60),
                httpOnly: true
            });

          

            await saveOTP.save()
            await savePhone.save()
            res.send(true)
        
    }

    
    } catch (error) {
            res.send(error)
    }
})

app.post('/verify-phone-otp',otpAuth,async(req,res)=>{
    try {
        if(req.token){
            const otp = req.body.payload
            if(otp == req.user.otp){
                const token = req.cookies.businessVerification;
                const verifyUser = jwt.verify(token , process.env.SECRET_KEY);
        
                const user = await Verification.findOneAndUpdate({_id: verifyUser._id.valueOf()},{
                    $set : {
                        "phoneStats.status":  true   
                        
                    }
                });

                await user.save()
                res.send({msg : "Phone Number Verified"})

        }else{
            res.send({msg : "Invalid OTP"})
        }
        
    }else{
        res.send('');
    }
    } catch (error) {
        
    }
})
app.get('/admin',adminAuth,async(req,res)=>{

    try {
        if(req.token){
            res.render('admin')

        }else{
            res.redirect('/admin/login')
        }
    } catch (error) {
        
    }

})
app.post('/admin',adminAuth,async(req,res)=>{

    try {
        if(req.token){
            const getRes = await RestaurantRequest.find({approved : false});
            res.send({getRes});

        }else{
            res.redirect('/admin/login')
        }
    } catch (error) {
        res.send(error)
    }

})
app.get('/admin/login',async(req,res)=>{
    try {
        res.render('adminLogin')
    } catch (error) {
        res.send(error)
    }
})
app.post('/admin/login',async(req,res)=>{
    try {

        
        const uId = req.body.uId
        const pass = req.body.password
      
        const user = await Admin.findOne({uId});
            console.log(req.body);
        if(user){   
            
            const passMatch = await bcrypt.compare(pass, user.password);

            if(passMatch){
                
                const token  = await user.generateToken();
                res.cookie("admin", token, {
                    expires: new Date(Date.now() + 30*24*60*60*1000),
                    httpOnly: true
                });
               
                
                res.redirect('/admin')
    
            }else{
                console.log(false);
               res.send(false)
    
            };
            
            
            
        }else{
           
            res.send(false)
            
        }


    } catch (error) {
        
    }
})
app.post('/approve-restaurant',adminAuth,async(req,res)=>{
    try {
        console.log(req.body.id)
        const findData = await RestaurantRequest.findById({_id : req.body.id})
       
        const pushRes = new RestData({
            restaurantname : findData.restaurantname,
            restaurantimg : findData.restaurantimg,
            address : findData.address,
            locality : findData.locality,
            phone : findData.phone,
            email : findData.email,
            location : findData.location,
            workingHours : {
                weeks : findData.workingHours.weeks,
                hours : findData.workingHours.hours
            },
            category : findData.category ? findData.category : '',
            seating : findData.seating ? findData.seating : '',
            facilities : findData.facilities ? findData.facilities : [],
            cuisines : findData.cuisines

        })
        const pushedRes = await pushRes.save()
        
        const ownerRes = await new RestOwnerData({
            restaurantId : pushRes._id.valueOf(),
            pastBookings : [],
            upcomingBookings : [],
            takeaway : [],
            dineIn : []
        })
        const ownerPushedRes = await ownerRes.save()

        const user = await UserData.findByIdAndUpdate({_id : findData.requestFrom},{
            $set : {
                ownerOf : ownerPushedRes._id.valueOf()
            }
        })
        await user.save()

        const res = await RestData.findByIdAndUpdate({_id : pushedRes._id.valueOf()},{
            $set : {
                owner : ownerPushedRes._id.valueOf()
            }
        })
        await res.save()

        await RestaurantRequest.findByIdAndDelete({_id : pushedRes._id.valueOf()})
        const createVendor = ()=>{
            const options = {
                method: 'POST',
                url: 'https://sandbox.cashfree.com/api/v2/easy-split/vendors',
                headers: {
                  Accept: 'application/json',
                  'x-client-id': '183683fd4c3be6a671a35e371a386381',
                  'x-client-secret': '0178ca783fbe700bd9c954d5b8641176c8307660',
                  'x-api-version': '2022-01-01',
                  'Content-Type': 'application/json'
                },
                data: {
                    
                    email : findData.email,
                    status : "ACTIVE",
                    bank : {
                        accountNumber : findData.bankDetails.bankNumber,
                        accountHolder : findData.bankDetails.accountHolder,
                        ifsc : findData.bankDetails.ifscCode
                    },
                    phone : findData.phone ,
                    name : findData.ownerName,
                    id : ownerPushedRes._id.valueOf(),
                    settlementCycleId : 1
                },
                
              };
              
              axios.request(options).then(function (response) {
                res.status(200).send(ok)
              }).catch(function (error) {
                    res.status(500).send(error)
              });
        }

        createVendor()
        
    } catch (error) {
        console.log(error)
    }
})
app.post('/avatars', auth, async(req,res)=>{
    try {
        if(req.token){
            let avatarsTitle = []
            let avatars = []
            let arr = []
            let a;
            let i = 0;
            let currentPath;


    
    fs.readdir(avatarPath, function (err, files) {
        files.forEach(function (file) {

            avatarsTitle.push(file)
            currentPath = path.join(avatarPath, file)
            
        

        });

       
      
                   
        
            avatarsTitle.forEach((elem)=>{
                
                currentPath = path.join(avatarPath , elem);
                fs.readdir(currentPath, function (err, files) {
                    files.push(elem)   
                   avatars.push(files)

                    if(i == avatarsTitle.length - 1){
                        res.send({avatarsTitle,avatars})
                    }
                    i = i + 1;

                })

            })      

    })  
       


        }
    } catch (error) {

        console.log(error)
        res.send(error)
    }
})
app.get('/about-us',async(req,res)=>{
    try {
        res.render('aboutUs')
    } catch (error) {
        res.send(error)
    }
})
app.get('/refund-&-cancellation-policy',async(req,res)=>{
    try {
        res.render('rfc')
    } catch (error) {
        res.send(error)
    }
})

app.post('/delete-food-item',auth,async(req,res)=>{
    try {
        if(req.token){
            console.log(req.body.payload)
            const findRes = await RestOwnerData.findById({_id : req.user.ownerOf})
           
            const deleteData = await RestData.findOneAndUpdate({_id : findRes.restaurantId},{
                $pull : {
                    menu : {_id : req.body.payload}
                }
            })

            await deleteData.save((err)=>{
                err ? res.status(500).send({message : "Failed"}) : res.status(200).send({message : "Success"})
            })
        }else{
            res.status(401).send({message : "Authentication Failed"})
        }
    } catch (error) {
        res.send(error)
    }
})
app.post('/get-past-bookings',auth,async(req,res)=>{
    try {
        if(req.token){
        const findData = await RestOwnerData.find({
            $or : [{
                "pastBookings.$._id" : req.body.payload
            },{
                "takeaway.$._id" : req.body.payload
            },{
                "dineIn.$._id" : req.body.payload
            }]
        })
       
        let bookingFound;
        let whereFound;
        loop1:for(let i = 0;i <= findData.length; i++){
            findData[0].upcomingBookings.forEach(upcomingBookings =>{
                if(upcomingBookings.orderId == req.body.payload){
                    bookingFound = upcomingBookings
                    whereFound = 'Table Booking'
                }

        
            })
            if(bookingFound != null){
                break loop1
            }else{
                findData[0].takeaway.forEach(takeaway =>{
                    if(takeaway.orderId == req.body.payload){
                        bookingFound = takeaway
                        whereFound = 'Takeaway'
                    }
                })
            }

            if(bookingFound != null){
                break loop1
            }else{
                findData[0].dineIn.forEach(dineIn =>{
                    if(dineIn.orderId == req.body.payload){
                        bookingFound = dineIn
                        whereFound = 'Dine In'
                    }
                })
            }

           
        }
        let findUser
        if(whereFound != 'Dine In'){
            findUser = await UserData.find({_id : bookingFound.userId}).select({name : 1,profileImg : 1,username : 1});

        }
        
        
        res.send({bookingFound,whereFound,userData : findUser ? findUser[0] : ''})
    }else{
        res.status(401).send({message : "Authentication Failed"})
    }
    } catch (error) {
        
        res.send(error)
    }
})

server.listen(port, ()=>{
    console.log("Conection is established at " + port);
})