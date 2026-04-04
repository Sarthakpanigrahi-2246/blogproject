const cloudinary = require("cloudinary").v2;
const cloudinaryConfig = require("../configs/cloudinaryconfig");

async function uploadImage(imagePath) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "blog app", ////ye automatic  create a folder in cloudinary
      resource_type: "auto", ////like png,jpg but we save as AUTo
    });
      
      return {
          secure_url: result.secure_url,
          public_id: result.public_id,
};
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
  }
}

 async function deleteImageFromCloudinary(imageId){
  try {
    await cloudinary.uploader.destroy(imageId)
  } catch (error) {
    console.log("error from deleteImageFromCloudinary ::", error)
  }
 }

module.exports = {uploadImage, deleteImageFromCloudinary};
