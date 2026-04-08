
// This is the Blogpage component that displays the details of a specific blog post based on the ID from the URL parameters. It fetches the blog data from the backend API and renders it on the page. If the data is still loading, it shows a loading message.
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import axios from "axios";

function Blogpage() {
  const { id } = useParams();

  const [blogdata, setblogdata] = useState(null);
  async function fetchBloByID() {
    try {
      let res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`);
      console.log("blogpage,", res);
      setblogdata(res.data.blogs);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchBloByID();
  }, []);

  //   console.log("id is :", id);
  return (
    <div>
      {" "}
      {blogdata ? (
        <div className = " flex flex-col justify-center items-center ">
          <h1 className= "h-10 w-50 backdrop-blur-2xl bg-white mt-3 flex justify-center items-center text-4xl">{blogdata.creator.name}</h1>
          <h1 className= "h-15 w-100 backdrop-blur-2xl bg-white mt-3 flex justify-center items-center">{blogdata.title}</h1>
          <h1 className= "h-15 w-100 backdrop-blur-2xl bg-white mt-3 flex justify-center items-center">{blogdata.description}</h1>
          <img className="h-[40%] w-[60%] mt-10 p-5 border-b-4 rounded shadow-amber-300" src={blogdata.image} alt="" />
          <button className = " bg-zinc-500 p-2 mt-3 border-2 shadow-2xl">EDIT</button>
        </div>
      ) : (
        <h1>Loading ....</h1>
      )}{" "}
    </div>
  );
}

export default Blogpage;
