import { FC } from 'react';
import { WeatherBoxProps } from '.';

export const WeatherBox: FC<WeatherBoxProps> = (props) => {
	return <div {...props}></div>;
};
