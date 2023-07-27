import { FC } from 'react';
import { DustBoxProps } from '.';
import './DustBox.css'

export const DustBox: FC<DustBoxProps> = (props) => {
	return <div {...props} className='dust-box'>아</div>;
};
