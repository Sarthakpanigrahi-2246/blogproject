const jwt = require("jsonwebtoken");

const dotenv = require("dotenv").config();
// console.log(process.env.JWT_SECRET)
async function generateJWT(payload) {
  const token = await jwt.sign(payload, process.env.JWT_SECRET);
  return token;
}

function verifyJWT(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.log("JWT verification error:", error.message);
    return false;
  }
}

async function decodedJWT(token) {
  let decoded = await jwt.decode(token);
  return decoded;
}

module.exports = { generateJWT, verifyJWT, decodedJWT };

// const jwt = require("jsonwebtoken");

// function generateJWT(payload) {
//   const token = jwt.sign(payload,"jwtjwtjwtjwtjwtjwjtjwtjwjtjwjtjwtjwtjwtjwtjwtjwtjwtjwt");
//   console.log("Generated token:", token);
//   return token;
// }

// function verifyJWT(token) {
//   try {
//     console.log("Verifying token:", token);
//     const decoded = jwt.verify(
//       token,
//       "jwtjwtjwtjwtjwtjwjtjwtjwjtjwjtjwtjwtjwtjwtjwtjwtjwtjwt",
//     );
//     console.log("Token valid, decoded:", decoded);
//     return true;
//   }
//    catch (error) {
//     console.log("Token invalid:", error.message);
//     return false;
//    }
// }

// module.exports = { generateJWT, verifyJWT };
