const cloudinary = require("cloudinary").v2;

async function cloudinaryCongig() {
  try {
        await  cloudinary.config({
            cloud_name: "dn8pogdma",
            api_key: "935521833584247",
             api_secret: "9cEapTeX5ALSGbCBnbycBY8aFx8",
    });
    console.log("cloudinary configured successfully")
   
  } catch (error) {
    console.log("error occured from clodinary") 
  }
}
module.exports = cloudinaryCongig;