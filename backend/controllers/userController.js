const User = require("../models/userSchema");
const Blog = require("../models/blogSchema");
const bcrypt = require("bcrypt");
const {generateJWT,verifyjwt} = require("../utils/generateToken");
////    CRETAING A USER 
async function userCreate(req, res) {
  const { name, email, password } = req.body;
  try {
    if (!name) {
      return res.status(404).json({
        success: false,
        message: "please Enter Name",
        
      });
    }
    if (!email) {
      return res.status(404).json({
        success: false,
        message: "please Enter Email",
        
      },);
 
    }
    if (!password) {
      return res.status(404).json({
        success: false,
        message: "please Enter Password",
      });
    }
 
      //// ye database me se dhekta hai agar ise email mil jata hai success: false,   message: "User Already registered"
    const checkForexistingUser = await User.findOne({ email });
    if (checkForexistingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already registered",
      });
    }
    //// ye tumhare password ko hashing kar raha hai
    //  const hashpassword = await bcrypt.hash(password,10)  //OR
    let salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(password, salt);
    ////  YAHA PE TUMHARA NEW EMAIL NAME AND PASSWORD REGISTERED HO RAHA HAI 
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashpass, ////PASSWORD ME HASSING DAALDIYA GAAYA HAI
    });

    let token = await generateJWT({
      email : newUser.email,////payload
      id : newUser._id,////payload
    });
     
    return res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      user:{
        name: newUser.name,
        email : newUser.email,
        blogs : newUser.blogs,
      },
          token
      
    });
   
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error from post USer",
    });
  }
}
//// login page for USER if already have an account
async function login(req, res) {
  try {
    const { email, password } = req.body;
      if (!email) {
        return res.status(404).json({
          success: false,
          message: "please Enter Email",
        });
      }
    if (!password) {
      return res.status(404).json({
        success: false,
        message: "please Enter Password",
      });
    }

      //// ye database me se dhekta hai agar ise email mil jata to SUCCESSFULLY LOGIN
    const checkForexistingUser =await User.findOne({ email });
    if (!checkForexistingUser) {
      return res.status(200).json({
        success: false,
        message: "User Not Found",
      });
    }

    // ye tumhara password jo tum login ke samay enter karoge usse ye existing user ke password se compare karega IF SAME SUCCESSSFUL LOGIN else INCORRRECT PASSWORD
    const checkpassword = await bcrypt.compare(
      password,
      checkForexistingUser.password)
    
    if(!checkpassword){
      return res.status(400).json({
        success:false,
        message:"incorrect Password"
      })
    }
    
    let token = await generateJWT({
      email : checkForexistingUser.email,
      id : checkForexistingUser._id
    });


    return res.status(200).json({
      success: true,
      message: "Login Successfully",
       user:checkForexistingUser,
       token
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error //from login",
    });
  }
}
 ////for ALL USER TO SHOW/DISPLAY
async function getAllUser(req, res) {
  try {
    const users = await User.find({}); //ye tumhare ALL user show karne ke kaam aaraha hai

    return res.status(200).json({
      success: true,
      message: "fetched successful from DB",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "USER NOt FOUND",
    });
  }
}
////single user ki detail nikalene ke liye
async function getUserID(req, res) {
  // const USERS = await User.findById({ _id: id })
  try {
      const id = req.params.id;////url ke value ko contain karta hai
    const USERS = await User.findById(id);
    return res.status(200).json({
      success: "true",
      message: "fetched successful from DB",
      USERS,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

async function patchUser(req, res) {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;//destructuring   const email =req.body.email ASWELLAS
  
    const updateuser = await User.findByIdAndUpdate(
      id,                         ////finding a ID for update
      { name, email, password },////updating the data
      { new: true }, ////show updated user data not old ONE
    );

    if (!updateuser) {
      return res.status(404).json({
        success: false,
        message: "User not Found",
      });
    }
    return res.status(500).json({
      success: true,
      message: "Update Successfuly",
      updateuser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: " Something Not Updated",
    });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params; //destructuring it OR const id = req.params.id
    const { name, email, password } = req.body; ////destructuring   const email =req.body.email ASWELLAS
    const deleteuser = await User.findByIdAndDelete(id);
    
    if (!deleteuser) {
      return res.status(404).json({
        success: false,
        message: "User not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Delete Successfully",
      deleteuser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: " Something Not Delete",
    });
  }
}

module.exports = {
  userCreate,
  login,
  patchUser,
  getAllUser,
  getUserID,
  deleteUser,
};




  // const user = await User.findOne("name :sarthak");
  // console.log(USERS);
  // const user = user.filter((user) => user.id === req.params.id);