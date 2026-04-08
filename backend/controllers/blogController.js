const Blog = require("../models/blogSchema");
const User = require("../models/userSchema"); 
const fs = require("fs")//Because we need the User model to interact with the users collection.
const Comment = require("../models/commentSchema");
const { verifyJWT } = require("../utils/generateToken");
const uniqid= require("uniqid")////npm i uniqid
const {uploadImage, deleteImageFromCloudinary} = require("../utils/uploadimage")


async function createBlog(req, res) {
  try {
    const creator = req.user;
    // console.log("Creator ID from middleware/ Names:", creator);

    const { title, description, draft } = req.body; //// DESTRUCTURING
    const image = req.file;
    
    if (!title) {
      return res.status(400).json({ message: "Please provide title" });
    }
    if (!description) {
      return res.status(400).json({ message: "Please provide description" });
    }
    
    if (!image) {
      return res.status(400).json({ message: "Please optional provide image" }); // or handle it depending on if image is required
    }

    const findUser = await User.findById(creator); //in blogschema we used increator  creator:==type : mongoose.Schema.Types.ObjectId,
    //so creator give a ID like ("567899876544578gkuyfdcvbn")

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    //cloudinary
    const {secure_url, public_id}= await uploadImage(image.path);
    fs.unlinkSync(image.path)////jab meri file upload hojaye to automatic delete kardena server se

    ////title ko small letter me convert karke letter ke bichme "-" add karga
    //const blogId = title.toLowerCase().replace(/ +/g, '-')
    const blogId = title.toLowerCase().split(" ").join("-") + uniqid()////ye bhi same kaam karega title ke bichme "-" add karga
    console.log("Uniq id and blog ID",blogId + uniqid())
    // console.log(uniqid())

    //creating NEW BLOGS
    const creatingBlog = await Blog.create({
      title,
      description,
      draft,
      creator,
      image : secure_url ,
      imageId : public_id, // save cloudinary url string
      blogId
    });

    //push in DB
    await User.findByIdAndUpdate(creator, {
      $push: { blogs: creatingBlog._id },
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: creatingBlog,
    });

  } catch (error) {
  console.error("REAL ERROR:", error); // 👈 add this

  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
}

async function getBlogs(req, res) {
  try {
    // const blogs = await Blog.find({draft: false}).populate("creator");

    const blogs = await Blog.find({ draft: false })
      .populate({
        path: "creator",
        //  select:"-password", //ye show karega creator ke name aur email ko but password ko hide karega
        select: "name email -_id", //ye show karega creator ke name aur email ko but password ko hide karega aur _id bhi hide karega
      })
      .populate({
        path: "likes",
        select: "email name",
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
    const { blogId} = req.params;
    const blogs = await Blog.findOne({blogId}).populate({  ////why findbyid to findOne 👉 Tu "this-is-ultra-edge" bhej raha hai (slug) //👉 But backend me findById() use kar raha hai
      path: "comments",
      populate: {
        path: "creator",
        select: "name email",
      },
    })
    .populate({
      path: "creator",
      select: "name email",
    });

    if (!blogs) {
      return res.status(404).json({
        message: "ID not found ",
      });
    }
    return res.status(200).json({
      success: true,
      message: "fetched successful from DB",
      blogs,
    });
  } catch (error) {
    console.log("Error in getBlogbyID:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "NOT FOUND BLOG_ID",
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
    return res.status(200).json({
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

  // try {
  //   const blogId = req.params;
  //   const { title, description, draft } = req.body;
  //   const user = await User.findById(creator).select(-password)

  //   console.log(user);
  // } catch (error) {
  //    return res.status(400).json({
  //     success: false,
  //      message: "Blog Not Found For An Update",
  //    });
  // }
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
     
    await deleteImageFromCloudinary(deleteBlog.imageId)
    
    return res.status(200).json({
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

async function likeblog(req, res) {
  try {
    const creator = req.user;
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found for like and dislike",
      });
    }
    // console.log(blog.likes);f
    // console.log(blog.likes.includes(creator));

    if (!blog.likes.includes(creator)) {
      await Blog.findByIdAndUpdate(id, { $push: { likes: creator } });
      return res.status(200).json({
        success: true,
        message: "blogliked Successful",
      });
    } else {
      await Blog.findByIdAndUpdate(id, { $pull: { likes: creator } });
      return res.status(200).json({
        success: false,
        message: "blogunlike Successful",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  createBlog,
  getBlogs,
  getBlogbyID,
  patchBlog,
  deleteBlog,
  likeblog,
};
