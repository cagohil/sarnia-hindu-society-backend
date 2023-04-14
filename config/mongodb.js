const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://chirag:ca989871@cluster0.odo08v0.mongodb.net/test";
// const mongoURI = "mongodb://localhost:27017/";

mongoose.set("strictQuery", false);

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, (err)=>{
        if (!err) {
            console.log("Connect To Mongodb Successfully");
        } else {
            console.log("Mongodb error");
        }
    })
}


module.exports = connectToMongo;