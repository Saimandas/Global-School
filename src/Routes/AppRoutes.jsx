import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../Pages/Public/HomePage'
import MainLayout from '../Layout/MainLayout'
import Courses from '../Pages/Public/Courses'
import CourseDetails from '../Pages/Public/CourseDetail'
import Admission from '../Pages/Public/Admission'
import AdminLayout from '../Layout/AdminLayout'
import Dashboard from '../Pages/Admin/Dashboard'
import Login from '../Pages/Admin/Login'
import ManageImpDocs from '../Pages/Admin/ManageImpDocs'
import Gallery from '../Pages/Public/Gallary'
import About from '../Pages/Public/About'
import Contact from '../Pages/Public/Contact'
import Announcements from '../Pages/Public/Announcements'
import ManageEvents from '../Pages/Admin/ManageEvents'
import ManageGallery from '../Pages/Admin/ManageGallary'
import ManageCategories from '../Pages/Admin/ManageCategories'
import ManageSubjects from '../Pages/Admin/ManageSubjects'
import ManageTeachers from '../Pages/Admin/ManageTeacher'
import Teachers from '../Pages/Public/Teachers'
import PrincipalDesk from '../Pages/Public/PrincipalDesk'
const AppRoutes = () => {
  return (
    <Routes>
        <Route element={<MainLayout />}>
            <Route index element={<HomePage/>} />
            <Route path='courses' element={<Courses/>}/>
            <Route path='principal' element={<PrincipalDesk/>}/>
            <Route path='courses/:slug' element={<CourseDetails/>}/>
            <Route path='admission' element={<Admission/>}/>
            <Route path='gallery' element={<Gallery/>}/>
            <Route path='about' element={<About/>}/>
            <Route path='announcements' element={<Announcements/>}/>
            <Route path='contact' element={<Contact/>}/>
            <Route path='teachers' element={<Teachers/>}/>
        </Route>
        <Route path="/admin" element={<AdminLayout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='impDocs' element={<ManageImpDocs/>}/>
            <Route path='manage-event' element={<ManageEvents/>}/>
            <Route path='manage-gallery' element={<ManageGallery/>}/>
            <Route path='categories' element={<ManageCategories/>}/>
            <Route path='subjects' element={<ManageSubjects/>}/>
            <Route path='teachers' element={<ManageTeachers/>}/>
        </Route>
    </Routes>
  )
}

export default AppRoutes