import { FC } from 'react';
import { WeatherBoxProps } from '.';
import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { BsFillCloudLightningFill, BsFill0CircleFill } from "react-icons/bs";

import './WeatherBox.css'

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
}


export const WeatherBox: FC<WeatherBoxProps> = (props) => {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = "40da27bfa864f510e9a34a1c6a8423fb";
				const lat = 33
				const lon = -94

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        const response: AxiosResponse<WeatherData> = await axios.get(url);
        setWeatherData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    // fetchWeatherData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

	return (
    <div {...props} className="wheather-box">
      <div>
        <div>weatherData</div>
        <BsFill0CircleFill></BsFill0CircleFill>
        <BsFillCloudLightningFill size="28" />
        <h1>Weather in {weatherData.name}</h1>
        <p>Temperature: {weatherData.main.temp} °C</p>
        <p>Humidity: {weatherData.main.humidity} %</p>
      </div>
    </div>
  );
};
