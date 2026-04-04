import React from 'react'
import { Outlet } from 'react-router-dom'

function Navbar() {
  return (
    <div className='w-full h-full bg-grey-100 flex flex-col items-center overflow-x-hidden'>
        <div className="flex-none w-full bg-white h-17.5">NAVBAR</div>
      <Outlet/>
      
    </div>
  )
}

export default Navbar

// <Outlet/> {/* ///// jab me ROute ke andar route daalu tab outlet use karna padta hai///// React, an Outlet is a component from React Router used for nested routing. */}
// <Outlet/> {/* ///// jab me ROute ke andar 2 route daalu tab  ye mera sirf navbar hi print hota hai but jab me navbar me outlet library add karu to tab navbar + route bhi print hoga (signin/signup)*/}