const mongoose =  require("mongoose");


const userSchema = new mongoose.Schema({
      name: String,
      email: { type: String, unique: true },////unique means need something unique EMail
      password: String,

      // connecting two schemas //user to blogs
      // User ke andar blogs naam ka field hoga
      // blogs → array hai []
      // ObjectId → MongoDB ki special ID type
      // ref: "Blog" → Ye ID Blog model ko refer karti hai 
      blogs:[{
      type : mongoose.Schema.Types.ObjectId,
      ref : "Blog" 
}]

}
,{timestamps:true})

const User = mongoose.model("User",userSchema); ////User" → Collection ka naam (MongoDB me users ban jayega)

module.exports = User;