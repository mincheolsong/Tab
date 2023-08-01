import { FC } from "react";
import { BusData } from "../../../pages/kiosk/BusInfomationPage";
import './ArrivalBusList.css'

interface ArrivalBusListProps {
  data: BusData[];
}

interface ArrivalBusListItemProps {
  item: BusData;
}

const ArrivalBusListItem: FC<ArrivalBusListItemProps> = ({item}) => {
  return (
    <div className="bus-item-container">
      <div className="bus-item-top">
        <div className="bus-detail bg-white round-10">
          <div>대충 아이콘</div>
          <div>무슨버스</div>
          <div>버스번호</div>
          <div>저상버스여부</div>
        </div>
        <div className="bus-eta bg-white round-10">
          <div>도착예정시간</div>
          <div>{Math.round(item?.eta / 60)} 분후 도착</div>
        </div>
        <div className="bus-routeinfo bg-white round-10">
          <div>{item?.remainingStops} 정거장 남음</div>
        </div>
        <div className="tap-button bg-white round-10">
          <button>탑승</button>
        </div>
      </div>
      <div className="guide-message">
        <span>대충 이번역에 섭니다.</span>
      </div>
      <div>busNo : {item.busNo} </div>
      <div>routeId : {item.routeId}</div>
      <div>routeType : {item.routeType}</div>
      <div>vehicleType : {item.vehicleType}</div>
      <div>vehicleNo : {item.vehicleNo}</div>
      <div>stationOrder : {item.stationOrder}</div>
      <div>stationName : {item.stationName}</div>
      <div>stationId : {item.stationId}</div>
    </div>
  );
};

export const ArrivalBusList: FC<ArrivalBusListProps> = (props) => {
  console.log(props);
  
  return (
    <div className="bus-list-container">
      ArrivalBusList
      {props.data.map((item: BusData, index : number) => {
        return <ArrivalBusListItem item={item} key={index}/>;
      })}
    </div>
  );
};
