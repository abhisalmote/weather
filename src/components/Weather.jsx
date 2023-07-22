import React, { useEffect } from "react";
import { useState, useRef } from "react";
import clear from "../components/clear.png";
import clouds from "../components/clouds.png";
import drizzle from "../components/drizzle.png";
import mist from "../components/mist.png";
import rain from "../components/rain.png";
import snow from "../components/snow.png";
import humidity from "../components/humidity.png";
import wind from "../components/wind.png";
import weather_app from "../components/weather-app.png";

function getWeatherIconSrc(weatherMain) {
  switch (weatherMain) {
    case "Clouds":
      return clouds;
    case "Clear":
      return clear;
    case "Rain":
      return rain;
    case "Drizzle":
      return drizzle;
    case "Mist":
      return mist;
    case "Snow":
      return snow;
    default:
      return mist;
  }
}

function Weather() {
  const apiKey = "&appid=df0cf4cf6e65b1cecfb4eb1f9db5747e";
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const searchBoxRef = useRef(null);

  useEffect(() => {
    if (city) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${apiUrl}${city}${apiKey}`);
          const data = await response.json();
          if (response.ok) {
            setWeatherData(data);
          }
          console.log(weatherData);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };
      fetchData();
    }
  }, [city]);

  const handleSearch = () => {
    setCity(searchBoxRef.current.value);
  };

  return (
    <div>
      <div className="main-container">
        <div className="search">
          <input type="text" placeholder="Enter city" ref={searchBoxRef} />
          <button onClick={handleSearch}>Search</button>
        </div>
        {weatherData ? (
          <div className="container">
            <div className="desc-Container">
              <h1>{Math.round(weatherData.main.temp)}°C</h1>
              <h4>{weatherData.name}</h4>
              <div className="humidity">
                <img src={humidity} alt="" />
                <p>{weatherData.main.humidity}%</p>
              </div>
              <div className="wind">
                <img src={wind} alt="" />
                <p>{weatherData.wind.speed * 3.6} km/h</p>
              </div>
            </div>
            <div className="weather-icon">
              <img
                src={getWeatherIconSrc(weatherData.weather[0].main)}
                alt="Weather Icon"
              />
            </div>
          </div>
        ) : (
          <div className="weather_app">
            <img src={weather_app} alt="" />
            <h2>Weather App</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
