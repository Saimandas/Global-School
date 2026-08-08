import React, { useEffect, useState } from 'react'
import Login from '../Pages/Admin/Login'
import { Outlet, useLocation } from 'react-router-dom'
const AdminLayout = () => {
    const [isAdmin,setisAdmin] = useState(false)
    const location=useLocation()

    useEffect(()=>{
        const data=sessionStorage.getItem("isLoggedIn")
        console.log("use effect",isAdmin);
        
        if(data==="true"){
            setisAdmin(true)
        }
    },[location])
    console.log(isAdmin);
    
  return (
    <>
    {
        isAdmin?<Outlet/>:<Login/>
}
    </>
  )
}

export default AdminLayout