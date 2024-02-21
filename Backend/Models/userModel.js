const mongoose = require('mongoose')

// Schema
const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:[true,'name is required']
    },
    email:{
        type:String,
        require:[true,'email is Mandatory'],
    },
    password:{
        type:String,
        require:[true,'Password is Mandatory']
    },
    age:{
        type:Number,
        require:[true,'age is required'],
        min:[15,'Age must be greater than 15']
    }
},{timestamps:true})

// Model 
const userModel = mongoose.model('users',userSchema);

// Export
module.exports = userModel;