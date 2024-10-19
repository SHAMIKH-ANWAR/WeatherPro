import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function App() {
  return (
    <>
    <div className="swiper-container">
    <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative w-full h-full">
          <img src='https://images.pexels.com/photos/666839/pexels-photo-666839.jpeg'/>
          <span className='custom absolute w-80 h-10 rounded-lg  z-10 bottom-0 left-0 mb-6 ml-7 flex items-center justify-center'>
            <h1>Search for cities with Sunny Weather</h1>
          </span>
          </div>
         </SwiperSlide>
        <SwiperSlide>
        <div className="relative w-full h-full">
          <img src='https://images.pexels.com/photos/1410224/pexels-photo-1410224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
          <span className='custom absolute w-80 h-10 rounded-lg  z-10 bottom-0 left-0 mb-6 ml-7 flex items-center justify-center'>
            <h1>Search for cities with Rainy Weather</h1>
          </span>
          </div>
          </SwiperSlide>
        <SwiperSlide>
        <div className="relative w-full h-full">
          <img src='https://images.pexels.com/photos/1154510/pexels-photo-1154510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
          <span className='custom absolute w-80 h-10 rounded-lg  z-10 bottom-0 left-0 mb-6 ml-7 flex items-center justify-center'>
            <h1>Search for cities with Cloudy Weather</h1>
          </span>
          </div>
          </SwiperSlide>
        <SwiperSlide>
        <div className="relative w-full h-full">
          <img src='https://images.pexels.com/photos/1004665/pexels-photo-1004665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
          <span className='custom absolute w-80 h-10 rounded-lg  z-10 bottom-0 left-0 mb-6 ml-7 flex items-center justify-center'>
            <h1>Search for cities with Snowfalls</h1>
          </span>
          </div>
          </SwiperSlide>
      </Swiper>
    </div>
    </>
  );
}
