import React from 'react'
import NoticeBar from '../Components/Layout/NoticeBar'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Layout/Navbar'
import Footer from '../Components/Home/Footer'

const MainLayout = () => {
  return (
    <>
    <NoticeBar/>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default MainLayout