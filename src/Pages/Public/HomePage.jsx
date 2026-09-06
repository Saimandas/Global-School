
import Hero from '../../Components/Home/Hero'
import Academic from '../../Components/Home/Academic'
import WhyChooseUs from '../../Components/Home/WhyChooseUs'

import LatestUpdates from '../../Components/Home/LatestUpdates'
import Gallery from '../../Components/Home/Gallary'
import Achievements from '../../Components/Home/Achievements'
import Testimonials from '../../Components/Home/Testimonials'

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