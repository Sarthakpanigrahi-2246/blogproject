import React from "react";
import { useEffect,useState } from "react";
function Blogs() {

  const [blogs, setblogs] = useState([]);

  async function fetchBlogs() {
    let data = await fetch("http://localhost:3000/api/v1/blogs");
    let res = await data.json();
    console.log(res);
    setblogs(res.blogs);
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          <h3>{blog.title}</h3>
          <p>{blog.description}</p>
          <small>By: {blog.creator.name}</small>
        </div>
      ))}
    </div>
  );
}

export default Blogs;

// <div>
//       {blogs.map((blogs) => {
//         <ul>
//           <li>{blogs.title}</li>
//           <li>{blogs.description}</li>
//         </ul>;
       
//       })}
//     </div>