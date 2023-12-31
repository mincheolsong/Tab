import { FC } from "react";
import { WeatherBoxProps } from ".";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./WeatherBox.css";
import { KioskState } from "@/store/slice/kiosk-slice";
import { useSelector } from "react-redux";

// 날씨 아이콘 : https://openweathermap.org/weather-conditions
// OpenWeather API
// https://openweathermap.org/current

interface WeatherData {
  name: string;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    humidity: number;
  };
}

const useTempData = false;

const tempdata: WeatherData = {
  weather: [
    {
      id: 804,
      main: "Clouds",
      description: "overcast clouds",
      icon: "04n",
    },
  ],
  main: {
    temp: 298.9,
    feels_like: 299.59,
    temp_min: 298.9,
    temp_max: 298.9,
    humidity: 79,
  },
  name: "Gumi",
};

// 일정시간 간격으로 함수 실행
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<typeof callback>(callback); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]); // callback이 바뀔 때마다 ref를 업데이트 해준다.

  useEffect(() => {
    if (delay !== null) {
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
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const data: KioskState = useSelector((state: { kiosk: KioskState }) => {
    return state.kiosk;
  });

  // toomany request 주의!
  const fetchWeatherData = async () => {
    const apiKey = "40da27bfa864f510e9a34a1c6a8423fb";
    const lat = data.stationLat;
    const lon = data.stationLon;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=kr`;

    axios
      .get(url)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  const tempFetchWeatherData = (): void => {
    setWeatherData(tempdata);
  };

  const func = useTempData ? tempFetchWeatherData : fetchWeatherData;
  useInterval(func, 600000);

  return (
    <div {...props} className="weather-box">
      <div className="info-title">오늘의 날씨</div>
      {weatherData ? (
        <div className="weather-box-detail">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png`}
            alt={`${weatherData?.weather[0].description}` + "_icon"}
            className="weather-icon"
          />
          <div className="weather-textbox">
            <div>{weatherData.weather[0].description}</div>

            <div>{(weatherData.main.temp - 273.15).toFixed(1)} °C</div>
            <div>{weatherData.main.humidity} %</div>
          </div>
        </div>
      ) : (
        <div className="weather-textbox"> 로딩 중 ...</div>
      )}
    </div>
  );
};
