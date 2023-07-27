import { FC } from 'react';
import { ComingSoonBusListProps } from '.';
import './ComingSoonBusList.css'

export const ComingSoonBusList: FC<ComingSoonBusListProps> = (props) => {
	return <div {...props} className='comingsoon-box'>
		<div>
			곧 도착 |
		</div>
		<div>101</div>
		<div>102</div>
	</div>;
};
