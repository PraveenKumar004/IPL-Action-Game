const mongoose = require('mongoose');

const contestant = mongoose.Schema({
    mid:{
        type:String
    },
    teamName:{
        type:String
    },
    teamAbbreviation:{
        type:String
    },
    password:{
        type:String
    },
    amount:{
        type:Number
    },
    points:{
        type:Number
    }
});

module.exports = mongoose.model("contestant",contestant);