import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function CreateBlogs() {
  let user = null;
  try{
    user = JSON.parse(localStorage.getItem("user"));
  }catch(e) {
    user = null;
  }
  
  const [blogData, setblogData] = useState({
    title: "",
    description: "",
    draft: false,
  });

  async function handleSubmit() {
    if (!user || !user.token) {
      alert("Please login first");
      return;
    }
    
    try {
      let data = await fetch("http://localhost:3000/api/v1/blogs", {
        method: "POST",
        body: JSON.stringify(blogData),
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
         },
      });

      console.log("Response status:", data.status);
      let res = await data.json();
      console.log("Response:", res);
      
      if (data.ok) {
        alert(res.message);
        setblogData({ title: "", description: "", draft: false });
      } else {
        alert("Error: " + res.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating blog: " + error.message);
    }
  }

  if (!user) {
    return <Navigate to={"/Signup"} />;
  }
  // return <div>CreateBlog</div>
  return (
    <div>
      <h1 id="h1">CreateBlogs</h1>
      <form>
        <input
          onChange={(e) =>
            setblogData((prev) => ({ ...prev, title: e.target.value }))
          }
          type="text"
          placeholder="title"
          // autoComplete="name"
        />
        <br />
        <br />

        <input
          onChange={(e) =>
            setblogData((prev) => ({ ...prev, description: e.target.value }))
          }
          type="text"
          placeholder="description"
        />
        <br />
        <br />
      </form>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CreateBlogs;



