const { verifyJWT } = require("../utils/generateToken");

const verifyuser = async (req, res, next) => {
  console.log("AUTh verified User Successfully");

//   next();
 let token = req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(401).json({
            success : false,
            message : "Unauthorized"
        });
    }

  try {
    // Extract token from "Bearer token_string" format
    
    let user = await verifyJWT(token)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Please SIgn in",
      });
    }
    req.user = user.id
    next()
  } catch (error) {}
};

module.exports = verifyuser;
