import { FC } from 'react';
import { ComingSoonBusListProps } from '.';
import './ComingSoonBusList.css'

const ComingBusItem:FC<ComingSoonBusListProps> = (props) =>{
	return (
    <div className="comingsoon-bus-item">
      <div className="comingsoon-bus-type"></div>
      <div className="comingsoon-bus-no">101{props.busNo}</div>
      <div className="comingsoon-bus-remain">전전</div>
    </div>
  );
}


export const ComingSoonBusList: FC<ComingSoonBusListProps> = (props) => {
	return (
    <div {...props} className="comingsoon-box">
      <div className="comingsoon-text">곧 도착</div>
      <ComingBusItem/>
      <ComingBusItem/>
      <ComingBusItem/>
    </div>
  );
};
