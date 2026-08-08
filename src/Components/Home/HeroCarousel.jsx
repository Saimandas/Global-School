import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const HeroCarousel = ({slides}) => {
  return (
   <Swiper modules={[Navigation]} navigation
    modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop
      slidesPerView={1}
      c className="h-[500px] w-full overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
      {/* <SwiperSlide>
        <img
          src="https://picsum.photos/1200/800"
          className="h-[500px] w-full object-cover"
        />
      </SwiperSlide> */}
      {
        slides.map((slide) => (
          <SwiperSlide key={slide.id} className=" bg-black">
            <img src={slide.file} className=" h-[500px]  w-full object-cover"/>
          </SwiperSlide>
        ))
      }
    </Swiper>
  )
}

export default HeroCarousel