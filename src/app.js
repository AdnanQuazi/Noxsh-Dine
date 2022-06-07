require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require("./db/conn");
const UserData = require('./models/schema');
const RestData = require('./models/restaurant')
const RestOwnerData = require('./models/restaurantOwner')
const FeatureData = require('./models/feature')
const Otp = require('./models/otp')


const path = require("path");
const hbs = require('hbs');
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
const cookieParser = require('cookie-parser');
const math = require('mathjs')
const auth = require("./middleware/auth");
const otpAuth = require("./middleware/otpAuth");

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

const transporter = nodemailer.createTransport({
    service : "hotmail",
    auth : {
        user : "noxshdine@outlook.com",
        pass : process.env.PASS
    }
})


app.use(cors({
    origin: '*'
}));
const users = {}
const res = {}

io.on("connection", (socket)=>{
 
    socket.on('rest-connect', id =>{
        res[socket.id] = id
       console.log(socket.id);
    })
  

    socket.on('booking-details', auth,async (msg,room) => { 

        try {
            if(req.token){
                const user = await UserData.findById({_id : msg.userId});
                msg.name = user.name;
                msg.userName = user.username
                msg.profilepic = "file-1643559975111.jpg"
                msg.socketId = socket.id  
              socket.to(room).emit("recieve-details", msg);
            }
           
        } catch (error) {
            
        }

          
     });

    socket.on('join-room',room =>{
        socket.join(room)
    })

    socket.on('booking-response', (msg,socketId)=>{

        socket.broadcast.to(socketId).emit("recieved-details", msg)
    } )
})








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
                from : "noxshdine@outlook.com",
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
                    otp : OTP
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
            


           
                
                  

                    
                    
                    
                
                
               let name = req.user.name.split([" "]);
                

                res.render("index",{
                token : req.token,
                name : name[0],
                userId : req.user._id,
               
                
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
        const phone = req.body.phone
        const pass = req.body.password
        
        const user = await UserData.findOne({phone});
        
        if(user){
            
            const passMatch = await bcrypt.compare(pass, user.password);

            if(passMatch){
                
                const token  = await user.generateToken();
                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 30*24*60*60*1000),
                    httpOnly: true
                });
               
                
                res.redirect("/");
    
            }else{
    
                res.render("login", {
                    error : "Invalid login details"
                })
    
            };
            
            
            
        }else{
            
            res.render("login",{
                error : "invalid login deatils"
            })
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

app.post("/signup", async (req,res)=>{

    try {
        
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
                
                res.send("phone number exist");
                
            }else{
                const token  = await newUser.generateToken();
            
            
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 30*24*60*60*1000),
                httpOnly: true
            });
            
            
            await newUser.save();
            res.redirect("/")
        }
        
    } catch (error) {
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
                console.log(userDB);
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
        resId : req.params.id
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



app.post('/test', upload.single('file'), async (req,res)=>{
    try {


        // const cuisines = req.file.filename;
        // console.log(cuisines);
      
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
    ;
   
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
            token : req.token,
            name : name[0],
            username : req.user.username,
            profName : req.user.name
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

            let todayDay = `${week[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`
            let dateArr = []
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
              
          })
      }else {
      res.redirect('/signup');

      }
  } catch (error) {

    res.send(error)
  }
})
app.post("/business/register", auth , async(req,res)=>{
    try {
        if(req.token){
            console.log(req.body);
           res.end()
        }
    } catch (error) {
        
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
            console.log(req.file.filename);
            const findId = await RestOwnerData.findById({_id : req.user.ownerOf});
                console.log(findId );
           const rest = await RestData.findByIdAndUpdate({_id : findId.restaurantId},{
               $push :{
                   menu :[{
                       cuisinename : req.body.foodName,
                       cuisineImg : req.file.filename,
                       price : req.body.foodPrice1,
                       quantity : req.body.foodQuantity1,
                       quantityUnit : req.body.foodUnit1,
                       price1 : req.body.foodPrice2,
                       quantity1 : req.body.foodQuantity2,
                       quantityUnit1 : req.body.foodUnit2

                   }]
               }
           })

           await rest.save();
        }

        res.redirect('/business/profile')
    } catch (error) {
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
        if(req.token){

               

                res.render('suggestFeature')

        }else{
            res.redirect('/login')
        }
    } catch (error) {

        res.send(error)
        
    }
})
app.post("/suggest-a-feature",auth,async(req,res)=>{
    try {
        if(req.token){

           


                const options = {
                    from : "noxshdine@outlook.com",
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


app.post("/complaints",auth,async(req,res)=>{
    try {
        if(req.token){

           


                const options = {
                    from : "noxshdine@outlook.com",
                    to : "noxshcomplaints@gmail.com",
                    subject : "Complain!",
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
                    from : "noxshdine@outlook.com",
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




app.get("/how-it-works",async(req,res)=>{
    try {
        res.render('howItWorks');
    } catch (error) {
        
    }

})
server.listen(port, ()=>{
    console.log("Conection is established at " + port);
})