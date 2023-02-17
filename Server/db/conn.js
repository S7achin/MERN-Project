const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.set("strictQuery", false);
mongoose.connect(DB,{useNewUrlParser: true}).then(()=>{
    console.log(`Connection Successfull`)
}).catch((err)=> console.log(`No connection`,err));

