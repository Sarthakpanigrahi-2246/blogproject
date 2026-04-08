// const { verifyJWT } = require("../utils/generateToken");

// const verifyuser = async (req, res, next) => {
//   console.log("AUTh verified User Successfully");
  
// //   next();
//  let token = req.headers.authorization.split(" ")[1];
//     if(!token){
//         return res.status(401).json({
//             success : false,
//             message : "Unauthorized"
//         });
//     }

//   try {
//     // Extract token from "Bearer token_string" format
    
//     let user = await verifyJWT(token)
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "Please SIgn in",
//       });
//     }
//     req.user = user.id
//     next()
//   } catch (error) {}
// };

// module.exports = verifyuser;

const { verifyJWT } = require("../utils/generateToken");

const verifyuser = async (req, res, next) => {
  console.log("Auth middleware called");

  try {
    const authHeader = req.headers.authorization;
    // console.log("Authorization header:", authHeader);
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
    }

    const token = authHeader.split(" ")[1];
   
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    const user = await verifyJWT(token);
    console.log("Verified user:", user);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Please Sign in",
      });
    }
    req.user = user.id;
    next();
  } catch (error) {
    console.log("Auth error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: error.message
    });
  }
};

module.exports = verifyuser;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNhcnRoYWtzcEAxMjM0IiwiaWQiOiI2OWE4N2ZkNWYxMTc0N2IwMjAwN2Q3MjkiLCJpYXQiOjE3NzI2NTA0NTN9.Y86ol3HgfprxJ4SV-wxjLturzPW6D9XIfMypCA0PUR4