const express = require("express");
// const mongoose = require("mongoose");
const dbConnect = require("./configs/dbConnect");
const blogsRoute = require("./routes/blogsRoute")
const userRoute = require("./routes/userRoute");

const app = express();
const cors = require("cors");
const cloudinaryCongig = require("./configs/cloudinaryconfig");

app.use(express.json());
app.use(cors());

app.use("/api/v1",userRoute)//version
app.use("/api/v1",blogsRoute)//version

// app.listen(3000, () => {
//   console.log("server Started");
//   dbConnect(),
//    cloudinary()
// });

async function startServer() {
  try {
    await dbConnect();
    await cloudinaryCongig();
    app.listen(3000, () => {
      console.log("Server Started on port 3000");
    });
  } catch (error) {
    console.log("Database connection failed");
  }
}

startServer();
