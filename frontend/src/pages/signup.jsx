import React from 'react'
import { useState } from 'react';
function Signup() {
const [userData, setuserData] = useState({
    name: "",
    email: "",
    password: "",
  });


  async function handleSubmit() {
    let data = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    let res = await data.json();

    if(res.success==true)
     {
       //localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("user", JSON.stringify({...res.user, token: res.token}));
    }
    
    alert(res.message)
    
  }

  return (
    <>
      <div>
        <h1 id="h1">Sign In</h1>
        <form >
          <input
            type="text"
            placeholder="name"
            autoComplete="name"
            onChange={(e) =>
              setuserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <br />
          <br />

          <input
            type="email"
            placeholder="email"
            autoComplete="email"
            onChange={(e) =>
              setuserData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <br />
          <br />

          <input
            type="password"
            placeholder="password"
            autoComplete="current-password"
            onChange={(e) =>
              setuserData((prev) => ({ ...prev, password: e.target.value }))
            }
          /> 
       </form>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
}

export default Signup



// <input
//           onChange={(e) =>
//             setuserData((prev) => ({ ...prev, name: e.target.value }))
//           }
//           type="text"
//           placeholder="name"
//         ></input>
//         <br />
//         <br />
//         <input
//           onChange={(e) =>
//             setuserData((prev) => ({ ...prev, email: e.target.value }))
//           }
//           type="email"
//           placeholder="email"
//         ></input>
//         <br />
//         <br />
//         <input
//           onChange={(e) =>
//             setuserData((prev) => ({ ...prev, password: e.target.value }))
//           }
//           type="password"
//           placeholder="password"

//         ></input>