import React, { useState, useEffect, useRef } from "react";
import { BiErrorCircle } from "react-icons/bi";
import "./styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const Weather = ({ searchQuery, setloading }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add local loading state
  const cloudRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true); // Update local loading state
      setError(null);
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=8ef65b50f3e74def85f154851241709&q=${searchQuery}`
        );

        if (!response.ok) {
          throw new Error("Location not found");
        }

        const data = await response.json();
        setWeatherData(data);
        const { lat, lon } = data.location;

        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=80a9f06dbc662e51e488d551f2183fbb&units=metric`
        );

        if (!forecastResponse.ok) {
          throw new Error("Error fetching forecast data");
        }

        const forecastData = await forecastResponse.json();
        setForecastData(forecastData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Update local loading state
        setloading(false); // Also update parent loading state
      }
    };

    if (searchQuery) {
      fetchWeatherData();
    }
  }, [searchQuery, setloading]);

  const createRaindrop = (cloud) => {
    const drop = document.createElement("div");
    drop.classList.add("rain");

    drop.style.left = Math.random() * 100 + "%";
    cloud.appendChild(drop);

    setTimeout(() => {
      if (cloud.contains(drop)) {
        cloud.removeChild(drop);
      }
    }, 2000);
  };

  useEffect(() => {
    if (
      [
        "light shower",
        "patchy rain",
        "light drizzle",
        "light rain",
        "patchy rain nearby",
        "moderate or heavy rain with thunder",
      ].includes(weatherData?.current?.condition?.text?.toLowerCase())
    ) {
      const interval = setInterval(() => {
        cloudRefs.forEach((ref) => {
          if (ref.current) {
            for (let i = 0; i < 5; i++) {
              createRaindrop(ref.current);
            }
          }
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [weatherData]);

  if (loading) {
    return (
      <div className="loading w-full h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message w-full h-screen flex items-center justify-center xl:text-4xl lg:3xl md:2xl sm:2xl">
         {error}
      </div>
    );
  }

  if (!weatherData || !forecastData) {
    return null; 
  }

  return (
    <div className="cardss w-full min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 text-black flex items-center justify-center relative overflow-x-hidden py-8">
      <div
        className={`weather w-11/12 md:w-5/6 h-auto md:h-5/6 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl backdrop-blur-md bg-white/10 p-6 z-10 ${
          weatherData?.current?.is_day === 1 ? "no-rain" : "active-night"
        } ${
          weatherData?.current?.condition?.text?.toLowerCase() ===
          "partly cloudy"
            ? "partly-cloudy"
            : ""
        }`}
      >
        <div className="cloud z-10 absolute" ref={cloudRefs[0]}>
          {[
            "light shower",
            "patchy rain",
            "light drizzle",
            "light rain",
          ].includes(weatherData?.current?.condition?.text?.toLowerCase()) ? (
            <div className="rain"></div>
          ) : (
            ""
          )}
          
        </div>
        <div className="cloud z-10 absolute" ref={cloudRefs[1]}>
          {[
            "light shower",
            "patchy rain",
            "light drizzle",
            "light rain",
            "moderate or heavy rain with thunder"
          ].includes(weatherData?.current?.condition?.text?.toLowerCase()) ? (
            <div className="rain"></div>
          ) : (
            ""
          )}
        </div>
        <div className="cloud z-10 absolute cloud-1" ref={cloudRefs[2]}>
          {[
            "light shower",
            "patchy rain",
            "light drizzle",
            "light rain",
            "moderate or heavy rain with thunder"
          ].includes(weatherData?.current?.condition?.text?.toLowerCase()) ? (
            <div className="rain"></div>
          ) : (
            ""
          )}
          {["sunny", "mist"].includes(
            weatherData?.current?.condition?.text?.toLowerCase()
          ) && weatherData?.current?.is_day === 1 ? (
            <div className="sun"></div>
          ) : (
            ""
          )}
        </div>
        <div className="cloud z-10 absolute cloud-0" ref={cloudRefs[3]}>
          {[
            "light shower",
            "patchy rain",
            "light drizzle",
            "light rain",
            "moderate or heavy rain with thunder"
          ].includes(weatherData?.current?.condition?.text?.toLowerCase()) ? (
            <div className="rain"></div>
          ) : (
            ""
          )}
          
        </div>

        <div className="part1 flex items-center mt-4 md:mt-20 flex-col justify-center gap-3 z-20">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white text-center px-4 w-full">
            {weatherData.location?.name} | {weatherData.location?.country}
          </h1>

          <h1 className="text-6xl md:text-7xl lg:text-9xl font-bold text-white mt-4">
            {weatherData.current?.temp_c}
            <sup className="text-xl md:text-2xl lg:text-4xl">°C</sup>
          </h1>
          
          <div className="flex flex-col items-center gap-2 text-white/90">
            <h2 className="text-lg md:text-xl lg:text-2xl">
              Feels Like {weatherData.current?.feelslike_c}°C
            </h2>
            <h3 className="text-base md:text-lg lg:text-xl">
              Pressure: {weatherData.current?.pressure_in} inHg
            </h3>
            <h2 className="text-base md:text-lg lg:text-xl text-center">
              Wind Speed: {weatherData.current?.wind_kph} kph | {weatherData.current?.wind_mph} mph
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <img 
                src={weatherData?.current?.condition?.icon}
                alt={weatherData?.current?.condition?.text}
                className="w-10 h-10"
              />
              <h1 className="text-lg md:text-xl">
                {weatherData?.current?.condition?.text}
              </h1>
            </div>
          </div>
        </div>

        <div className="part2 flex items-center justify-center flex-col gap-4 relative z-20 text-white">
          <h1 className="text-sm md:text-base lg:text-lg text-white/80 text-center px-4">
            Last Updated - {weatherData?.current?.last_updated}
          </h1>
          
          <div className="grid grid-cols-2 gap-6 mt-4">
            <div className="stat-card bg-white/20 p-4 rounded-lg backdrop-blur-sm">
              <h1 className="text-lg md:text-xl lg:text-2xl font-medium">
                Humidity
              </h1>
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">
                {weatherData?.current?.humidity}%
              </p>
            </div>
            
            <div className="stat-card bg-white/20 p-4 rounded-lg backdrop-blur-sm">
              <h1 className="text-lg md:text-xl lg:text-2xl font-medium">
                Precipitation
              </h1>
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">
                {weatherData?.current?.precip_mm} mm
              </p>
            </div>
          </div>
        </div>

        <div className="part3 col-span-1 md:col-span-2 z-20 w-full text-white mt-6">
          <Swiper
            modules={[Pagination]}
            slidesPerView={2}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
            spaceBetween={16}
            grabCursor={true}
            pagination={{ clickable: true }}
            className="mySwiper z-50"
          >
            {forecastData?.list?.slice(0, 8).map((item, index) => {
              const iconCode = item.weather[0].icon;
              const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              return (
                <SwiperSlide key={index}>
                  <div className="forecast-card bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <p className="text-sm mb-2">{time}</p>
                    <div className="flex justify-center">
                      <img
                        className="w-16 h-16"
                        src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`}
                        alt="weather icon"
                      />
                    </div>
                    <p className="text-lg font-bold mt-2">{Math.round(item.main.temp)}°C</p>
                    <p className="text-sm">{item.weather[0].description}</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Weather;
