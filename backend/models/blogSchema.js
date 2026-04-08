const mongoose = require("mongoose");

//SCHEMA FOR BLOGS ////WHAT BLOGS NEED
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true, ////REMVING EXTRA SPACEC     STARTING TO END EX= "   RAHUL   "
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    draft: {
      type: Boolean, //FOR PRIVATE OR PUBLIC
      default: false, //DEFAULT PUBLIC
    },
    //connecting two schemas //Blogs to user
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, //USER HAI TO BLOG HAI NAHI TO BLOG CREATE HI NAHI HO SAKTA
    },
      image: {
      type: String,
      required: true,
    },
    imageId: {
      type: String,
      required: true,
      
    },

    // ye unique dene ke liye use kigaya hai jese {69d00630af1222cfdb368e15:: ye-hai-mera-blog}   :http://localhost:5173/blogpage/69d00630af1222cfdb368e15
    blogId:{
      type: String,
      required: true,
      unique:true
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
      },
    ],
  },
 
  { timestamps: true },

);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
