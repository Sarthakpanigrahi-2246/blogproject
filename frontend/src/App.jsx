import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Authform from "./pages/Authform";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Addblog from "./pages/Addblog";
import Blogpage from "./pages/Blogpage";
// import.meta.env

function App() {
  const [count, setCount] = useState(0);

  ////use vite if we not use vite it give undefined
  // console.log(import.meta.env.VITE_BACKEND_URL)
  return (
    <div className="bg-gray-100 text-gray-900  w-screen h-screen flex justify-center items-center">
      <Routes>
        <Route path="/" element={<Navbar/>}>
          <Route path="/" element={<Home />} />
          <Route path="/addblog" element={<Addblog />} />
          <Route path="/blogpage/:id" element={<Blogpage />} />
        </Route>
        <Route path="/signup" element={<Authform type={"signup"} />}>
          {" "}
        </Route>
        <Route path="/signin" element={<Authform type={"signin"} />}>
          {" "}
        </Route>
      </Routes>
    </div>
  );
}

export default App;

//  <Route path="/" element ={<Navbar/>}>{/* ///// jab me ROute ke andar 2 route daalu tab  ye mera sirf navbar hi print hota hai but jab me navbar me outlet library add karu to tab navbar + route bhi print hoga (signin/signup)*/}
