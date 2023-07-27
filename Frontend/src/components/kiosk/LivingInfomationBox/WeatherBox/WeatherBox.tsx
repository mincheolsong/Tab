import { FC } from 'react';
import { WeatherBoxProps } from '.';
import './WeatherBox.css'

export const WeatherBox: FC<WeatherBoxProps> = (props) => {
	return <div {...props} className="wheather-box">아</div>;
};
