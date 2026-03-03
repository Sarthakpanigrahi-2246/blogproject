const mongoose = require("mongoose")


//SCHEMA FOR BLOGS ////WHAT BLOGS NEED 
const blogSchema = new mongoose.Schema({
    title:{
        type : String,
        trim : true, ////REMVING EXTRA SPACEC     STARTING TO END EX= "   RAHUL   " 
        required :true
    },
    description: {
        type : String,
        required: true,
    },
    draft: {
        type : Boolean,  //FOR PRIVATE OR PUBLIC
        default :false, //DEFAULT PUBLIC
    },

    //connecting two schemas //Blogs to user
    creator:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true //USER HAI TO BLOG HAI NAHI TO BLOG CREATE HI NAHI HO SAKTA
    }
},{timestamps:true})

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;