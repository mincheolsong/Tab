import { FC } from 'react';
import { BusInfomationPageProps } from '.';
import { Header } from '../../../components/kiosk/Header';
import { ComingSoonBusList } from '../../../components/kiosk/ComingSoonBusList';
import { ArrivalBusList } from '../../../components/kiosk/ArrivalBusList';
import { LivingInformationBox } from '../../../components/kiosk/LivingInfomationBox';
import { BottomButtonBox } from '../../../components/kiosk/BottomButtonBox';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { delay } from '@reduxjs/toolkit/dist/utils';

export interface BusData {
  remainingStops: number; 
  eta: number;
  routeid: string;
  busNo: string;
  routeType: string;
  vehicleType: string;
  stationOrder: number;
  vehicleNo: string;
  stationId: string;
  stationName: string;
}

export const BusInfomationPage: FC<BusInfomationPageProps> = (props) => {
  const citycode = 37050;
  const busStopId = 'GMB383';
	const options: object = {
    url: "http://192.168.100.119/api/stops/37050/GMB383",
    // url: `http://192.168.100.119/api/stops/${citycode}/${busStopId}`,
    method: "GET",
    timeout: 10000,
    headers: {
      "Authorization": "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json", // 원하는 Content-Type을 설정할 수 있습니다.
      // 다른 헤더도 필요에 따라 추가할 수 있습니다.
    },
  };


	const [data, setData] = useState<BusData[]>([]);

  function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef<typeof callback>(callback);

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };

      if (delay !== null) {
        tick();
        const interval = setInterval(tick, delay);
        return () => clearInterval(interval);
      }
    }, [delay]);
  }

  function updateData() {
    axios(options)
      .then((response) => {
        setTimeout(5000);
        console.log(response);
        
        // setData(response);
      })
      .catch(err=>{
        console.log(err);
        
      })
  }

	useInterval(updateData, 30000)

  return (
    <div {...props}>
      <Header />
      <ComingSoonBusList/>
      <ArrivalBusList data={data} />
      <LivingInformationBox/>
      <BottomButtonBox />
    </div>
  );
};
