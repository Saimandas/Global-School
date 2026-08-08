import React from 'react'
import Container from '../../Components/ui/Container'
import Hero from '../../Components/Home/Hero'
import Academic from '../../Components/Home/Academic'
import WhyChooseUs from '../../Components/Home/WhyChooseUs'
import Facilities from '../../Components/Home/Facilities'
import LatestUpdates from '../../Components/Home/LatestUpdates'
import Gallery from '../../Components/Home/Gallary'
import Achievements from '../../Components/Home/Achievements'
import Testimonials from '../../Components/Home/Testimonials'
import Footer from '../../Components/Home/Footer'
const HomePage = () => {
  return (
    <>
    <Hero/>
    <Academic/>
    <WhyChooseUs/>
    {/* <Facilities/> */}
    <LatestUpdates/>
    <Gallery/>
    <Achievements/>
    <Testimonials/>
    </>
  )
}

export default HomePage