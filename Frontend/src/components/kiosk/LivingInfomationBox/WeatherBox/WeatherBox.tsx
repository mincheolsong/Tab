import { FC } from "react";
import { WeatherBoxProps } from ".";
import React, { useState, useEffect, useRef } from "react";
import axios, { AxiosResponse } from "axios";
import { BsFillCloudLightningFill } from "react-icons/bs";

import "./WeatherBox.css";

// 날씨 아이콘 : https://openweathermap.org/weather-conditions
// OpenWeather API
// https://openweathermap.org/current

interface WeatherData {
  name: string;
  weather: {
    id: number,
    main: string,
    desciption: string,
    icon: number,
  },
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    humidity: number;
  };
}

// 일정시간 간격으로 함수 실행
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<typeof callback>(callback); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]); // callback이 바뀔 때마다 ref를 업데이트 해준다.

  useEffect(() => {
    
    if (delay !== null){
      const tick = () => {
        savedCallback.current();
      }; // tick이 실행되면 callback 함수를 실행시킨다.

      tick();
      const interval = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행시킨다.
      return () => clearInterval(interval); // unmount될 때 clearInterval을 해준다.
    } 
  }, [delay]); // delay가 바뀔 때마다 새로 실행된다.
}

export const WeatherBox: FC<WeatherBoxProps> = (props) => {

  const busStop = "정류장 이름";

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  // toomany request 주의!
  const fetchWeatherData = async() => {
    try {
      const apiKey = "40da27bfa864f510e9a34a1c6a8423fb";
      const lat = 33;
      const lon = -94;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      const response: AxiosResponse<WeatherData> = await axios.get(url);
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  const doSomething = () : void => {
    console.log("do something!!");
  };

  // useInterval(fetchWeatherData, 600000);
  // useInterval(doSomething, 600000);

  if (!weatherData) {
    return (
      <div {...props} className="wheather-box">
        <div>현재 {busStop} 날씨</div>
        <div>
          <img
            src={`https://openweathermap.org/img/wn/10d@2x.png`}
            alt={weatherData?.weather.desciption}
          />
          <div>
            <div>온도</div>
            <div>습도</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div {...props} className="wheather-box">
      <h2>현재 {weatherData.name} 날씨</h2>
      <div>
        <div>
          <BsFillCloudLightningFill size="100" />
        </div>
        <div>
          <div>{weatherData.weather.id} K</div>
          <img src={`https://openweathermap.org/img/wn/10d@${weatherData.weather.icon}.png`} alt="" />
          <img src={`https://openweathermap.org/img/wn/10d@10d.png`} alt="" />
          <div>{weatherData.weather.icon} K</div>
          <div>{weatherData.weather.main} K</div>
          <div>{weatherData.weather.desciption} K</div>

          <div>{weatherData.main.temp} K</div>
          <div>{weatherData.main.humidity} %</div>
        </div>
      </div>
    </div>
  );
};
