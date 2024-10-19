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
    <div className="cardss w-full h-screen bg-slate-800 text-black flex items-center justify-center relative">
      <div
        className={`weather w-5/6 h-5/6 grid-rows-2 grid-cols-2 z-10 ${
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

        <div className="part1 flex items-center mt-20 flex-col justify-center gap-1 z-20
        ">
          <h1 className="xl:text-4xl lg:text-xl md:text-sm sm:text-xl mobile-size text-wrap pl-4 absolute top-0 left-0">
            {weatherData.location?.name} | {weatherData.location?.country}{" "}
            {weatherData.location?.name === weatherData.location?.region
              ? ""
              : "|  " + weatherData.location?.region}
          </h1>

          <h1 className="xl:text-9xl relative  lg:text-7xl md:text-5xl sm:text-2xl mobile-temp">
            {weatherData.current?.temp_c}{" "}
            <sup className="align-super text-4xl
            xl:text-2xl lg:text-xl md:text-sm sm:text-xs mob-sup">o</sup>C
          </h1>
          <h2 className="text-xl mt-4 relative
          xl:text-2xl lg:text-xl md:text-sm sm:text-xs">
            Feels Like {weatherData.current?.feelslike_c}
            <sup>o</sup>C
          </h2>
          <h3 className="text-xl text-gray-200 relative xl:text-2xl lg:text-xl md:text-sm sm:text-xs">
            Pressure: {weatherData.current?.pressure_in}
          </h3>
          <h2 className="text-2xl text-white relative xl:text-2xl lg:text-xl md:text-sm sm:text-xs ml-4 wind">
            Wind Speed in kph: {weatherData.current?.wind_kph}  mph:{""}
            {weatherData.current?.wind_mph}
          </h2>
          <h1 className="text-2xl xl:text-2xl lg:text-xl md:text-sm sm:text-xs cond mb-4">
            Condition: {weatherData?.current?.condition?.text}
          </h1>
        </div>

        <div className="part2 flex items-center justify-center flex-col gap-7 relative z-20 text-black">
          <h1 className="absolute top-0 right-0 mr-5 text-xl mt-2 xl:text-2xl lg:text-xl md:text-sm sm:text-xs mobile-up">
            Last Updated - {weatherData?.current?.last_updated}
          </h1>
          <h1 className="text-4xl xl:text-2xl lg:text-xl md:text-2xl sm:text-xs mobile-humid">
            Humidity: {weatherData?.current?.humidity}%
          </h1>
          {/* <h1 className="text-2xl xl:text-2xl lg:text-xl md:text-xl sm:text-xs">
            Wind Speed: {weatherData?.current?.wind_kph} km/h
          </h1> */}
          <h2 className="2xl xl:text-2xl lg:text-2xl md:text-xl sm:text-xs no">
            Rain ammount: {weatherData?.current?.precip_mm} mm
          </h2>
        </div>
        <div className="part3 text-4xl z-20 w-full box-border col-span-2  text-opacity-100 text-white">
          <Swiper
            modules={[Pagination]}
            slidesPerView={5}
            spaceBetween={1}
            grabCursor={true}
            className="mySwiper z-50"
          >
            {forecastData?.list?.slice(0, 8).map((item, index) => {
            const iconCode = item.weather[0].icon;
            return (
              <SwiperSlide key={index}>
                <div className="parts">
                  <div className="xl:h-24 xl:w-24 flex justify-center items-center lg:h-20 w-20 md:h-14 md:w-14 sm:h-10 sm:w-10 mm">
                    <img
                      className="w-full h-full"
                      src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`}
                      alt="weather icon"
                    />
                  </div>
                  <h1 className="xl:text-4xl lg:text-2xl md:text-xl sm:text-md">{new Date(item.dt * 1000).toLocaleTimeString()}</h1>
                  <p className="xl:text-4xl lg:text-sm md:text-sm sm:text-sm">{item.main.temp}°C</p>
                  <h1 className=" xl:2xl lg:xl md:text-xl sm:text-md nomobile">
                    Will Feel like:{item.main.feels_like}°C
                  </h1>
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
