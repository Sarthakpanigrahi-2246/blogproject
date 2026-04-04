import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Addblog() {
  const [blogdata, setblogdata] = useState({
    title: "",
    description: "",
    image: null,
  });
  // const token = JSON.parse(localStorage.getItem("token"))////error ::::ncaught SyntaxError: Unexpected token 'e', "eyJhbGciOi"... is not valid JSON  at JSON.parse (<anonymous>)
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  //   useEffect(()=>{
  //        if(!token){
  //         return navigate("/signin")
  //        }
  //   },[])
  //   return (
  //     <div> add Blogs</div>
  //   )

  async function handlePostBlog(e) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/blogs/",
        blogdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      //console.log(URL.createObjectURL(blogdata.image))
      //URL.createObjectURL(blogdata.image) ////create a url of blog image 
      // console.log("responce is :",response)
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || error.message || "Request failed";

        toast.error(message);
      } else {
        toast.error("Unexpected error occurred");
      }
    }
  }
//w-[500px] =w-125
  //allways use () for readability terneri operator
  return token == null ? (
    <Navigate to={"/signin"} />
  ) : (
    <div className="w-125">
      <label htmlFor="">Title</label>
      <input
        type="text"
        placeholder="title"
        onChange={(e) =>
          setblogdata((blogdata) => ({
            ...blogdata,
            title: e.target.value,
          }))
        }
      />
      <br />
      <label htmlFor="">Description</label>
      <input
        type="text"
        placeholder="description"
        onChange={(e) =>
          setblogdata((blogdata) => ({
            ...blogdata,
            description: e.target.value,
          }))
        }
      />
      <br />

      <div className="">
        <label htmlFor="image" className="justify-center items-center flex cursor-pointer">
            {
              blogdata.image? (<img src={URL.createObjectURL(blogdata.image)}  className="aspect-video object-cover" alt="" />) :( <div className="aspect-video bg-blue-900"></div> )
            }
         
        </label>
        <input
        id="image"
        className="hidden"
          type="file"
          placeholder="image"
          accept=".png , .jpeg , .jpg"
          onChange={(e) =>
            setblogdata((blogdata) => ({
              ...blogdata,
              image: e.target.files[0],
            }))
          }
        />
        <br />
        <button onClick={handlePostBlog}>Submit</button>
      </div>
    </div>
  );
}

export default Addblog;
