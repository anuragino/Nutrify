const mongoose = require('mongoose')

// Schema
const foodSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is mandatory']
    },
    imageUrl:{
        type:String,
        required:[true,'Please show image']
    },
    calories:{
        type:Number,
        required:[true,'Show calories'],
    },
    protein:{
        type:Number,
        required:true,
    },
    carbohydrates:{
        type:Number,
        required:true,
    },
    fat:{
        type:Number,
        required:true,
    },
    fiber:{
        type:Number,
        required:true,
    }
},{timestamps:true})

// Model 
const foodModel = mongoose.model('foods',foodSchema);

// Export
module.exports = foodModel;