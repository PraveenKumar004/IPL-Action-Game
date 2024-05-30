const mongoose = require('mongoose');

const manager = mongoose.Schema({
    mid:{
        type:String
    },
    sender:{
        type:String
    },
    message:{
        type:String
    }
});

module.exports = mongoose.model("message",manager);