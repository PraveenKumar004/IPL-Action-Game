const mongoose = require('mongoose');

const play = mongoose.Schema({
    mid:{
        type:String
    },
    player:{
        type:String
    },
    name:{
        type:String
    },
    category:{
        type:String
    },
    nation:{
        type:String
    },
    countryshort:{
        type:String
    },
    country:{
        type:String
    },
    points:{
        type:Number
    },
    baseprice:{
        type:Number
    },
    price:{
        type:Number
    },
    pid:{
        type:String
    },
    teamName:{
        type:String
    }
});

module.exports = mongoose.model("unsoldplayer",play);