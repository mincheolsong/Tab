import { FC, useState } from "react";
import { ArrivalBusListProps } from ".";
import { BusData } from "../../../pages/kiosk/BusInfomationPage";
import './ArrivalBusList.css'

const ArrivalBusListItem = ({item}) => {
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
          <div>{Math.round(item.arrtime / 60)} 분후 도착</div>
        </div>
        <div className="bus-routeinfo bg-white round-10">
          <div>{item.arrprevstationcnt} 정거장 남음</div>
        </div>
        <div className="tap-button bg-white round-10">
          <button>탑승</button>
        </div>
      </div>
      <div className="guide-message">
        <span>대충 이번역에 섭니다.</span>
      </div>
      <div>nodeid : {item.nodeid} </div>
      <div>nodenm : {item.nodenm}</div>
      <div>routeid : {item.routeid}</div>
      <div>routeno : {item.routeno}</div>
      <div>routetp : {item.routetp}</div>
      <div>vehicletp : {item.vehicletp}</div>
    </div>
  );
};

export const ArrivalBusList: FC<ArrivalBusListProps> = (props) => {

  return (
    <div {...props} className="bus-list-container">
      ArrivalBusList
      {props.data?.map((item: object, index: number) => {
        return (
          <ArrivalBusListItem key={index} item={item}/>
        );
      })}
    </div>
  );
};
