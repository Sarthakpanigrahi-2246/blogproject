const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");
const Comment = require("../models/commentSchema");

async function addcomment(req, res) {
  try {
    const creator = req.user;
    const { id } = req.params;
    const { comment } = req.body;
    const blog = await Blog.findById(id).populate({
  path: "comments",
  populate: { path: "User" }
});

    if (!blog) {
      return res.status(404).json({
        message: "blog Not Found for Comments",
      });
    }

    if (!comment) {
      return res.status(400).json({
        message: "Please provide a comment",
      });
    }

    const newComment = await Comment.create({
      comment:comment,
      blogs: id,
      User: creator,
    });
    
    await Blog.findByIdAndUpdate(id, {
      $push: { comments: newComment._id },
    });
    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function deletecomment(req, res) {
  try {
    const creator = req.user;
    const { id } = req.params;

    const comment = await Comment.findById(id);
    // console.log(comment);

    if (!comment) {
      return res.status(400).json({
        message: "comment not found for delete",
      });
    }

    // check ownership
    // if (comment.User.toString() !== creator.toString()) {
    //   return res.status(403).json({
    //     message: "You are not allowed to delete this comment"
    //   });
    // }
    if (comment.User != creator) {
      return res.status(403).json({
        message: "You are not allowed to delete this comment",
      });
    }
    await Comment.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function editcomment(req, res) {
   try {
     const userId = req.user;
    const { id }= req.params; //edit commetn id
    const {updatecomment} = req.body;

    const comment = await Comment.findByIdAndUpdate(id);
    if(!comment){
      return res.status(404).json({
        messege:"comment not found for edit"
      })
    }

    // console.log(`comment: ${comment} userId: ${userId} current USer :${comment.User == userId}`)
   
    if (comment.User != userId){
      return res.status(400).json({
        messege:"you are not Authorized to update comment"
      })
    }

    await Comment.findByIdAndUpdate(id, {
      comment:updatecomment
    });
    return res.status(200).json({
      success: true,
      message: "Comment edited successfully",
    });
    
   } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
   }
}

async function likecomment(req, res) {
  try {
    const userId = req.user;
    const { id } = req.params;
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "comments not Found",
      });
    }
    if (!comment.likes.includes(userId)) {
      await Comment.findByIdAndUpdate(id, { $push: { likes: userId } });
      return res.status(200).json({
        success: true,
        message: "commentliked Successful",
      });
    } else {
      await Comment.findByIdAndUpdate(id, { $pull: { likes: userId } });
      return res.status(200).json({
        success: false,
        message: "Comment dislike Successful",
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
  addcomment,
  deletecomment,
  editcomment,
   likecomment

}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbnRvc2hwQDEyMzQiLCJpZCI6IjY5Yjk5MzUwMWRlMDBiMTU4YjFlMGQ2OCIsImlhdCI6MTc3Mzc2OTU1Mn0.Jvej0dHzg-BpHIlOZmxEP7f9x25MFMagc-4fEX07ZjY

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbnRvc2hwcHBwcHBwcHBwcHBwcHBwcHBwQDEyMzQiLCJpZCI6IjY5YjA1ZGVhZjlhNGFhMGFlNTNiMzdmZSIsImlhdCI6MTc3MzE2NjA1OH0.SLlDcIKBsUl6hnqgAEmldvfKVJ_8JOeRUQK6A4p_jC0