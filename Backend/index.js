const express = require('express')
const mongoose = require('mongoose')
const bcrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')


// Importing Models 
const userModel = require('./Models/userModel')
const foodModel = require("./Models/foodModel")
const trackModel = require("./Models/trackingModel")
const verifyToken = require('./verifyToken')


// To hide private Keys and urls
const dotEnv = require("dotenv");
dotEnv.config({path:"./config.env"});
const mongoUrl = process.env.mongoUrl;


// connection 
const connectToDatabase = async()=>{
    try {
        let connection = await mongoose.connect(mongoUrl);
        console.log("Successfully connected to DB");
    } catch (err) {
        console.error(err);
    }
}


connectToDatabase()

const app = express()



// Middleware
app.use(express.json())
app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



// endpoint for user registration
app.post('/register',(req,res)=>{
    let user = req.body;

    bcrpt.genSalt(10,(err,salt)=>{

        if(!err){
            bcrpt.hash(user.password,salt,async (err,hpass)=>{

                if(!err){  
                    user.password = hpass;
                    try{
                        let doc = await userModel.create(user)
                        res.status(201).send({message:"User Registered"})
                    }

                    catch(err){
                        console.log(err);
                        res.status(500).send({message:"Some Problem"})
                    }
                }
                else{
                    res.send({message:"Error while Hashing"})
                }
            })
        }
        else{
            res.send({message:"Error while generating Salt"})
        }
    })
})


// endpoint for login 
app.post('/login',async (req,res)=>{
    let userCred = req.body;

    try{
        const user = await userModel.findOne({ email: userCred.email });

        if(user!=null){
            bcrpt.compare(userCred.password,user.password, (err,success)=>{
                if(success==true){
                    
                    const secretKey = process.env.secretKey;
                    jwt.sign({email:userCred.email},secretKey,(err,token)=>{
                        
                        if(!err){
                            res.send({message:"Login Success",token:token,userid:user._id,name:user.name});

                        }
                        else{
                            res.send({message:"Invalid Token"})
                        }
                    })
                }
                else{
                    res.status(403).send({message:"Incorrect password"})
                }  
            })
        }
        else{
            res.status(404).send({message:"User not found"})
        }
    }

    
    catch(err){
        console.log(err);
        res.status(500).send({message:"Some Problem while login"})
    }
    
})



// endpoint to get all foods info
app.get("/foods",verifyToken,async (req,res)=>{
    try{
        const foods = await foodModel.find();
        res.send({message:"List of All food persent",foods});
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:"Error while fetching the foods"})
    }
});


//endpoint to fetch single food by name
app.get("/foods/:name",verifyToken,async (req,res)=>{
    const name = req.params.name;
    try{
        // $regex is used to find pattern like name = pan,
        //  it will show panner ,panner tika,etc
        // $option:'i' is for case insenstivity AnuR = anur
        const food = await foodModel.find({name:{$regex:name,$options:'i'}});
        if(food.length!==0){
            res.send(food);
        }
        else{
            res.status(404).send({message:"food item not found"})
        }
        
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:"Error while fetching Single food item"})
    }
});



// endpoint to track a food
app.post("/track",verifyToken,async (req,res)=>{
    let trackData = req.body;
    try{
        let data = await trackModel.create(trackData);
        console.log(data)
        res.status(201).send({message:"Food Added"});
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:"Error while tracking"})
    }
})


// endpoint to fetch all food eaten by a person
app.get("/track/:userId/:date",verifyToken,async (req,res)=>{
    let user = req.params.userId;
    let date = new Date(req.params.date);
    // Date Stuff was trickie for us 
    // In url for checking api Date format : MM-DD-YYYY
    // in JS date.getMonth() ->[0,11] so we have to add 1 to get correct month.
    let strDate = date.getDate() +'/'+ (date.getMonth()+1) +'/'+ date.getFullYear();
    try{
        let foods = await trackModel.find({userId:user,eatenDate:strDate})
                                    .populate('userId').populate('foodId')
        res.send(foods);
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:"Error while tracking user data"})
    }
})

app.listen(8000,()=>{
    console.log("Connection Established")
})

app.get('/',(req,res,next)=>{
    res.status(200).json({
      message:'bad request'
    })
})

module.exports = app;
