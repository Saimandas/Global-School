import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroCarousel = ({ slides = [] }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation={true}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      loop={slides.length > 1}
      slidesPerView={1}
      spaceBetween={0}
      className="h-[500px] w-full overflow-hidden rounded-3xl border border-border bg-card shadow-lg"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id} className="bg-black">
          <img
            src={slide.file}
            alt={slide.title || "School gallery"}
            className="h-[500px] w-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousel;