import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import './styles.css';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="hero-section relative w-full h-screen overflow-hidden">
      <Swiper
        effect={'fade'}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, EffectFade, Pagination]}
        className="hero-swiper h-full w-full"
      >
        <SwiperSlide>
          <div className="slide-content relative w-full h-full">
            <img 
              src='https://images.pexels.com/photos/666839/pexels-photo-666839.jpeg'
              className="w-full h-full object-cover"
              alt="Sunny weather"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Discover Your Weather</h1>
              <p className="text-lg md:text-xl mb-8 text-center max-w-2xl">
                Get real-time weather updates and forecasts for any location worldwide
              </p>
              <Link 
                to="/weather" 
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/30"
              >
                Start Exploring
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-content relative w-full h-full">
            <img 
              src='https://images.pexels.com/photos/1410224/pexels-photo-1410224.jpeg'
              className="w-full h-full object-cover"
              alt="Rainy weather"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Stay Ahead of the Weather</h1>
              <p className="text-lg md:text-xl mb-8 text-center max-w-2xl">
                Plan your day with accurate weather forecasts and real-time updates
              </p>
              <Link 
                to="/weather" 
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/30"
              >
                Check Weather
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-content relative w-full h-full">
            <img 
              src='https://images.pexels.com/photos/1154510/pexels-photo-1154510.jpeg'
              className="w-full h-full object-cover"
              alt="Cloudy weather"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Global Weather Coverage</h1>
              <p className="text-lg md:text-xl mb-8 text-center max-w-2xl">
                Access weather information for any city around the world
              </p>
              <Link 
                to="/weather" 
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/30"
              >
                View Global Weather
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
          <defs>
            <path id="wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="wave-parallax">
            <use href="#wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
            <use href="#wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use href="#wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use href="#wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
    </div>
  );
}
