const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
//establish connection
const mogo_url="mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(()=>{
        
console.log("connect to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(mogo_url);
} 
const initDB = async() =>{
   await Listing.deleteMany({});
   initdata.data=  initdata.data.map((obj)=>({...obj,owner:"685bd44a5de5de6463d38fe5"}));
   //import from data.js for object
    await Listing.insertMany(initdata.data);
    console.log("data was initlise");
};

initDB();