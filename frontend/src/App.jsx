import { useState, useEffect } from "react";
import "./App.css";
import {Route, Routes } from "react-router-dom";
import Blogs from "./components/blogs";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import CreateBlogs from "./components/createBlogs";


function App() {

  return(
    <Routes>
    <Route path="/" element={<Blogs/>}></Route>
    <Route path="/blogs" element={<Blogs/>}></Route>
    <Route path="/signup" element={<Signup/>}></Route>
    <Route path="/signin" element={<Signin/>}></Route>
    <Route path="/createBlog" element={<CreateBlogs/>}></Route>
    <Route path="*" element={<h1>Not FOund 404</h1>}></Route>
  </Routes>
  );
  
}

export default App;
