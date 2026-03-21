const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    comments : {
        type: String,
        require:true
    },
    blogs:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"blogs"
    },
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
       likes: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
});

const Comment = mongoose.model("comments", commentSchema);

module.exports = Comment;