const mongoose = require('mongoose');

const manager = mongoose.Schema({
    id:{
        type:String
    },
    amount:{
        type:Number
    },
    password:{
        type:String
    }
});

module.exports = mongoose.model("manager",manager);