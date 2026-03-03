const express = require("express");
const route = express.Router();

const { createBlog, getBlogs, getBlogbyID, patchBlog, deleteBlog }= require("../controllers/blogController");
const verifyuser = require("../middleware/auth");


route.post("/blogs",verifyuser,createBlog);

route.get("/blogs", getBlogs);

route.get("/blogs/:id",getBlogbyID);

route.patch("/blogs/:id",patchBlog);

route.delete("/blogs/:id", deleteBlog);

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