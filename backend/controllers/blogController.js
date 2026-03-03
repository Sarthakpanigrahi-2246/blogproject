const Blog = require("../models/blogSchema");
const User = require("../models/userSchema"); //Because we need the User model to interact with the users collection.
const { verifyJWT } = require("../utils/generateToken");

async function createBlog(req, res) {

  const creator = req.user;
  try {
    console.log("Creator ID from middleware:", creator);
    
    const { title, description, draft } = req.body; //// DESTRUCTURING
    if (!title) {
      return res.status(400).json({ message: "Please provide title" });
    }
    if (!description) {
      return res.status(400).json({ message: "Please provide description" });
    }
    
    const findUser = await User.findById(creator); //in blogschema we used increator  creator:==type : mongoose.Schema.Types.ObjectId,
    //so creator give a ID like ("567899876544578gkuyfdcvbn")

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }
    //// creating NEW BLOGS
    const creatingBlog = await Blog.create({
      title,
      description,
      draft,
      creator,
    });
    await User.findByIdAndUpdate(creator, {
      $push: { blogs: creatingBlog._id },
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: creatingBlog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while creating blog",
    });
  }
}

async function getBlogs(req, res) {
  try {
    // const blogs = await Blog.find({draft: false}).populate("creator");

    const blogs = await Blog.find({ draft: false }).populate({
      path: "creator",
      //  select:"-password", //ye show karega creator ke name aur email ko but password ko hide karega
      select: "name email -_id", //ye show karega creator ke name aur email ko but password ko hide karega aur _id bhi hide karega
    });
    return res.status(200).json({
      //   success: true,
      message: "fetched BLOGS successful from DB",
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "BLOG NOt FOUND",
    });
  }
}

async function getBlogbyID(req, res) {
  // const blogsID = req.params.blogsID;
  // const blogs = await Blog.findById(blogsID);

  try {
    const blogsID = req.params.id;
    const blogs = await Blog.findById(blogsID);
    return res.status(200).json({
      success: "true",
      message: "fetched successful from DB",
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "NOT FOUND BLOG_ID",
    });
  }
}

async function patchBlog(req, res) {
  try {
    const { id } = req.params;
    const { title, description, draft } = req.body;
    const updateBlogs = await Blog.findByIdAndUpdate(
      id,
      { title, description, draft },
      { new: true },
    );
    if (!updateBlogs) {
      return res.status(404).json({
        success: false,
        message: "Blog ID not Found for A update",
      });
    }
    return res.status(400).json({
      success: true,
      message: "Update Successfuly",
      updateBlogs,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Blog Not Found For An Update",
    });
  }
}

async function deleteBlog(req, res) {
  try {
    const { id } = req.params;
    const { title, description, draft } = req.body;
    const deleteBlog = await Blog.findByIdAndDelete(id);

    if (!deleteBlog) {
      return res.status(404).json({
        success: false,
        message: "For Deleteing Blog, ID not Found",
      });
    }
    return res.status(400).json({
      success: true,
      message: "Delete Successfuly",
      deleteBlog,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Blog Not Found For An delete",
    });
  }
}

module.exports = {
  createBlog,
  getBlogs,
  getBlogbyID,
  patchBlog,
  deleteBlog,
};



