//  database  connection using mongoose


const mongoose = require("mongoose");
require('dotenv').config();

 mongoose.connect(process.env.MONGO_CONNECTION).then(()=>{
    console.log("DB connected");
 }).catch((error)=>{
    console.error(error);
 });



