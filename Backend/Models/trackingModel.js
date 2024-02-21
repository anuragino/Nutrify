const mongoose = require('mongoose')

// Schema
const trackSchema = mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        require:true
    },
    foodId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'foods',
        require:true
    },
    eatenDate:{
        type:String,
        default: new Date().toLocaleDateString()
    },
    quantity:{
        type:Number,
        min:1,
        require:true
    }
},{timestamps:true});

// Model
const trackModel  = mongoose.model('trackings',trackSchema);

module.exports = trackModel;