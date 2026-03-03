const mongoose = require("mongoose")

async function dbConnect(){
   try {
    await mongoose.connect("mongodb://localhost:27017/BlogsDatabase");
    console.log("successfull DB connect");
  } catch(error) {
    console.log("DB dissconnect", error.code);
  }
}

module.exports = dbConnect;



   //await mongoose.connect("mongodb+srv://sarthakpanigrahi2218:sarthakpanigrahi2218@cluster0.yipjj14.mongodb.net/BlogDatabase")
    //pass-----sarthakpanigrahi2218 