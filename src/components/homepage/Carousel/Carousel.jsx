import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import slides from '../../../assets/carouselSlides.json';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import './Carousel.css';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

const SwiperSlider = () => {

  return (
    <div className="swiper-container  two py-2 flex justify-center items-center">
<Swiper
  modules={[EffectCoverflow, Autoplay]}
  effect="coverflow"
  loop={true}
  centeredSlides={true}
  slidesPerView={2}
  spaceBetween={15}
  breakpoints={{
    640: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  }}
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
  }}
  coverflowEffect={{
    rotate: 0,
    stretch: 0,       // ⬅ IMPORTANT: must be 0
    depth: 180,
    modifier: 1.3,
    slideShadows: false,
  }}
  className="mySwiper w-full lg:ml-[10px]"
>

        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="slider-image">
              <img
                className="w-full h-full border-2 border-white rounded-2xl object-contain"
                style={{ boxShadow: '3px 3px 40px 0px #203B2C66' }}
                src={slide.src}
                alt={slide.alt}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className="swiper-pagination"></div> */}
    </div>
  );
};

export default SwiperSlider;