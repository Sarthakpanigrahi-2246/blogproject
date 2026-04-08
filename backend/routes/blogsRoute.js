const express = require("express");
const route = express.Router();
const multer = require("multer")

const {
  createBlog,
  getBlogs,
  getBlogbyID,
  patchBlog,
  deleteBlog,
  likeblog,
} = require("../controllers/blogController");

const verifyuser = require("../middleware/auth");

const {
  addcomment,
  deletecomment,
  editcomment,
  likecomment,
} = require("../controllers/commentController");

const upload = require("../utils/multer");

route.post("/blogs", verifyuser, upload.single("image"), createBlog); // upload.single("image")=> this is a middleware ////Ye request me aayi file ko handle karta hai

route.get("/blogs", getBlogs);

route.get("/blogs/:blogId", getBlogbyID);

route.patch("/blogs/:id", verifyuser, upload.single("image"), patchBlog);

route.delete("/blogs/:id", verifyuser, deleteBlog);

route.post("/blogs/like/:id", verifyuser, likeblog);

route.post("/blogs/comment/:id", verifyuser, addcomment);
route.delete("/blogs/comment/:id", verifyuser, deletecomment);
route.patch("/blogs/editcomment/:id", verifyuser, editcomment);
route.patch("/blogs/likecomment/:id", verifyuser, likecomment);

module.exports = route;

// const blogs = [];
// route.get("/blogs", (req, res) => {
//   //   let publicBlogs = blogs.filter((blog) => blog.draft === false);
//   let publicBlogs = blogs.filter((blog) => !blog.draft);
//   return res.json({ publicBlogs });
//   // return res.status(200 ).json({messege:"GET started"})
// });
// route.get("/blogs/:id", (req, res) => {
//   const { id } = req.params; // URL se id nikaali
//   //   const id = req.params.id;
//   let searchblogs = blogs.filter((blog) => blog.id == id);
//   return res.json({ searchblogs });
// });
// route.patch("/blogs/:id", (req, res) => {
//   const { id } = req.params;
//   let index = blogs.findIndex((blog) => blog.id == id);
//   blogs[index] = { ...blogs[index], ...req.body };
//   return res.status(200).json({ messege: "update successfully" });
// });
// route.delete("/blogs/:id", (req, res) => {
//   const { id } = req.params;
//   let spliceindex = blogs.splice((blog) => blog.id == id);
//   return res.send(spliceindex);
// });
