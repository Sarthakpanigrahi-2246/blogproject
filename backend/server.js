const express = require("express");
const dbConnect = require("./configs/dbConnect");
const blogsRoute = require("./routes/blogsRoute")
const userRoute = require("./routes/userRoute");
 

const app = express();
const cors = require("cors");
const cloudinaryCongig = require("./configs/cloudinaryconfig");

const dotenv = require("dotenv");
dotenv.config()
const PORT = process.env.PORT


// console.log("PORT is the legend :", process.env)
// console.log("PORT is :", process.env.PORT) //its give 3000
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
    app.listen(PORT, () => {
      console.log("Server Started on port 3000");
    });
  } catch (error) {
    console.log("Database connection failed");
  }
}

startServer();
