import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
function Home() {
  const [blogs, setblogs] = useState([]);
  async function fecthblogs() {
    let res = await axios.get("http://localhost:3000/api/v1/blogs");

    setblogs(res.data.blogs);
    console.log(res.data.blogs); //give direct all blogs
  }
  // ye tabhi call kargea jab tumare brouwser me kuch event hua ho
  useEffect(() => {
    fecthblogs();
  }, []);

  return (
    <div className="home w-[70%] m-8">
      {blogs.map((blog) => (
        <div key ={blog._id} className="home2 my-4 flex justify-between p-3">
          <div className="rightdiv w-[60%]">
            <div className="flex gap-2 mb-2 p-1">
              <img
                src="https://res.cloudinary.com/dn8pogdma/image/upload/v1774209745/blog%20app/vntktorlbl1qawzdjda4.png"
                alt=" screenshot"
                className="h-5 w-5 border-8 rounded-2xl"
              />
              <p>{blog.title}</p>
            </div>
            <h2 className="text-2xl ">
              {" "}
              <b></b>
            </h2>
            <h5 className="line-clamp-2">
              
            </h5>
            <span className=" flex gap-5">
              <p>{blog.createdAt}</p>
              <p>{blog.likes}</p>
              <p>{blog.comments}</p>
            </span>
          </div>
          <div className="leftdiv w-[30%]">
            <img
              src="https://res.cloudinary.com/dn8pogdma/image/upload/v1774209745/blog%20app/vntktorlbl1qawzdjda4.png"
              alt=""
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
