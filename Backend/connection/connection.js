const mongoose =require('mongoose')

const url = "mongodb+srv://praveenkumarv989:9363335266@iplauction.dsgqxkn.mongodb.net/?retryWrites=true&w=majority&appName=IPLAuction";

const Connection =()=>{
    mongoose.connect(url)
    .then(()=>{
        console.log("DB Connected")
    })
    .catch((err)=>{
        console.log("Connection Error",err)
    })
}

module.exports = Connection;