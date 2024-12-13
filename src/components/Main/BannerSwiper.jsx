import React from "react";
import banner01 from "/Banner/banner1.jpg";
import banner02 from "/Banner/banner2.jpg";
import banner03 from "/Banner/banner3.jpg";
import banner04 from "/Banner/banner4.jpg";
import banner05 from "/Banner/banner5.jpg";

const BannerSwiper = () => {
  return (
    <div className="p-2">
      <img src={banner03} alt="" className="rounded-xl" />
    </div>
  );
};

export default BannerSwiper;
