
const express = require("express");
const {userCreate,login, patchUser, getAllUser, getUserID, deleteUser}= require("../controllers/userController");


const route = express.Router();

// route.post("/users",empty);
// create user and check for existing user.
route.post("/signup", userCreate);

route.post("/signin",login)

route.get("/users", getAllUser);

// search by ID
route.get("/users/:id",getUserID);

//  updating the VAlue
route.patch("/users/:id",patchUser);

route.delete("/users/:id",deleteUser);

 module.exports = route;