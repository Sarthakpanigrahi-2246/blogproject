const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
  try {
    // //console.log("DBurl is :",process.env.DB_URL)
    await mongoose.connect(process.env.DB_URL); ////mongodb://localhost:27017/BlogsDatabase
    console.log("successfull DB connect");
  } catch (error) {
    console.log("DB dissconnect :", error.message);
  }
}

module.exports = dbConnect;

//await mongoose.connect("mongodb+srv://sarthakpanigrahi2218:sarthakpanigrahi2218@cluster0.yipjj14.mongodb.net/BlogDatabase")
//pass-----sarthakpanigrahi2218
