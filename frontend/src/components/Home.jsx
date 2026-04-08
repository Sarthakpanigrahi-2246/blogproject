// This is the Home component that fetches and displays a list of blog posts from the backend API. It uses the useState hook to manage the state of the blogs and the useEffect hook to fetch the data when the component mounts.
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [blogs, setblogs] = useState([]);
  async function fecthblogs() {
       //  let res = await axios.get("http://localhost:3000/api/v1/blogs");
      let res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blogs`);
        // console.log("this is Home.jsx",import.meta.env)
        // console.log(import.meta.env.VITE_BACKEND_URL)
    setblogs(res.data.blogs);
    // console.log(res.data.blogs); //give direct all blogs
  }
  // ye tabhi call kargea jab tumare brouwser me kuch event hua ho
  useEffect(() => {
    fecthblogs();
  }, []);

  return (
    <div className="home w-[70%] m-8">
      {blogs.map((blog) => (
        <Link to={"blogpage/" + blog.blogId}>
          <div 
           key={blog._id} 
           className="home2 my-4 flex justify-between p-3">
            <div className="rightdiv w-[60%]">
              <div className="flex gap-2 mb-2 p-1">
                <img
                  src={blog.image}
                  alt=" screenshot"
                  className="h-5 w-5 border-8 rounded-2xl"
                />
                {/* {console.log(blog.image)} */}
                <p className= " text-2xl font-bold">{blog.title}</p>
              </div>
              <h2 className="text-2xl ">
                {" "}
                <b></b>
              </h2>
              <h5 className="line-clamp-2"></h5>
              <div className=" flex gap-5">
                
                <p>{blog.likes}</p>
                <p>{blog.description}</p>
                 <p>{blog.comments}</p>
                 <p>{blog.createdAt}</p>
                
              </div>
            </div>


            <div className="leftdiv w-[30%]">
              <img src={blog.image} alt="" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Home;
