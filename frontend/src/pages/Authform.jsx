import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

function Authform({ type }) {
  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function Handleauthform(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/${type}`,
        userdata,
      );
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      console.log("USER:", res.data.user);
      console.log("axios res ::", res);

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log("error from Handleauthform :: ", error);
    }
  }

  return (
    <div className="bg-gray-100 text-gray-900  w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {type === "signin" ? "Sign in" : "Create Account"}
        </h1>

        <form onSubmit={Handleauthform} className="flex flex-col gap-5">
          {type === "signup" && (
            <div>
              <label className="text-sm text-gray-600 block mb-1">Name</label>
              <input
                type="text"
                onChange={(e) =>
                  setuserdata((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                 placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
              />
            </div>
          )}

          <div>
            <label className="text-sm text-gray-600 block mb-1">Email</label>
            <input
              type="email"
              onChange={(e) =>
                setuserdata((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1">Password</label>
            <input
              type="password"
              onChange={(e) =>
                setuserdata((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
            />
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-orange-500" />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="bg-linear-to-r from-orange-500 to-pink-500 text-white py-2.5 rounded-lg font-medium shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg active:scale-95"
          >
            {type === "signin" ? "Log in" : "Register"}
          </button>

          <p className="text-sm text-center text-gray-600">
            {type === "signin" ? (
              <>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-orange-500 font-medium hover:underline"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-orange-500 font-medium hover:underline"
                >
                  Sign in
                </Link>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Authform;

// import React from "react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function Authform({ type }) {
//   const [userdata, setuserdata] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   async function Handleauthform(e) {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `http://localhost:3000/api/v1/${type}`,
//         userdata
//       );
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       localStorage.setItem("token", res.data.token);

//       console.log("USER:", res.data.user);
//       console.log("axios res :::", res);

//       toast.success(res.data.message);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//       console.log("error from Handleauthform :: ", error);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div
//         className="
//           w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg
//           transform transition-all duration-300 ease-out
//           hover:shadow-2xl hover:-translate-y-1
//         "
//       >
//         <h1 className="text-2xl font-semibold text-center mb-6">
//           {type === "signin" ? "Sign in" : "Signup"}
//         </h1>

//         <form onSubmit={Handleauthform} className="w-80 flex flex-col gap-4">
//           {type === "signup" && (
//             <div className="flex flex-col">
//               <label className="text-sm mb-1 text-gray-600">Name</label>
//               <input
//                 type="text"
//                 onChange={(e) =>
//                   setuserdata((prev) => ({
//                     ...prev,
//                     name: e.target.value,
//                   }))
//                 }
//                 placeholder="Enter your name"
//                 className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
//               />
//             </div>
//           )}
//           <div className="flex flex-col">
//             <label className="text-sm mb-1 text-gray-600">Email</label>
//             <input
//               type="email"
//               onChange={(e) =>
//                 setuserdata((prev) => ({
//                   ...prev,
//                   email: e.target.value,
//                 }))
//               }
//               placeholder="Enter your email"
//               className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="text-sm mb-1 text-gray-600">Password</label>
//             <input
//               type="password"
//               onChange={(e) =>
//                 setuserdata((prev) => ({
//                   ...prev,
//                   password: e.target.value,
//                 }))
//               }
//               placeholder="Enter your password"
//               className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
//             />
//           </div>
//           <div className="flex items-center text-sm">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" />
//               Remember me
//             </label>
//           </div>
//           <button
//             type="submit"
//             className="
//               bg-linear-to-r from-orange-500 to-pink-500
//               text-white py-2 rounded-lg
//               shadow-lg
//               transition-all duration-300
//               hover:scale-105
//             "
//           >
//             {type === "signin" ? "Log in" : "Register"}
//           </button>
//           <p className="text-sm text-center mt-2 text-gray-600">
//             {type === "signin" ? (
//               <>
//                 Don't have an account?{" "}
//                 <Link to="/signup" className="text-blue-500 font-medium">
//                   Signup
//                 </Link>
//               </>
//             ) : (
//               <>
//                 Already have an account?{" "}
//                 <Link to="/signin" className="text-blue-500 font-medium">
//                   Sign in
//                 </Link>
//               </>
//             )}
//           </p>

//         </form>
//       </div>
//     </div>
//   );
// }

// export default Authform;

// ////for fetching the data from backend
// ////but we use axios so it is replace
// // const data = await fetch(`http://localhost:3000/api/v1/${type}`,{
// //     method : "POST",
// //     body: JSON.stringify(userdata),
// //     headers:{
// //         "Content-Type" :"application/json",
// //     },
// // })
// // const res = await data.json();
