import banner01 from "/Banner/banner1.jpg";
import banner02 from "/Banner/banner2.jpg";
import banner03 from "/Banner/banner3.jpg";
import banner04 from "/Banner/banner4.jpg";
import banner05 from "/Banner/banner5.jpg";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay, Scrollbar, A11y } from "swiper/modules";

const BannerSwiper = () => {
  return (
    <div className="mx-auto p-2">
      <Swiper
        modules={[Autoplay, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false
        }}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide>
          <img src={banner01} alt="Banner 01" className="h-[260px] w-[350px] rounded-xl object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner02} alt="Banner 02" className="h-[260px] w-[350px] rounded-xl object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner05} alt="Banner 04" className="h-[260px] w-[350px] rounded-xl object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner03} alt="Banner 03" className="h-[260px] w-[350px] rounded-xl object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner04} alt="Banner 04" className="h-[260px] w-[350px] rounded-xl object-cover" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerSwiper;
