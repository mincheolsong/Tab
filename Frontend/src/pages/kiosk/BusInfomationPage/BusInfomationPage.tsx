import { FC } from 'react';
import { BusInfomationPageProps } from '.';
import { Header } from '../../../components/kiosk/Header';
import { ComingSoonBusList } from '../../../components/kiosk/ComingSoonBusList';
import { ArrivalBusList } from '../../../components/kiosk/ArrivalBusList';
import { LivingInformationBox } from '../../../components/kiosk/LivingInfomationBox';
import { BottomButtonBox } from '../../../components/kiosk/BottomButtonBox';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useRef, useState } from 'react';

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


	const [busData, setBusData] = useState<BusData[]>([]);

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

  const updateBusData = async () => {

    try {
      const citycode: number = 37050;
      const busStopId: string = "GMB383";

      const url = `http://192.168.100.119/api/stops/${citycode}/${busStopId}`;

      const response: AxiosResponse<BusData[]> = await axios.get(url);
      setBusData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching buslist data:", error);
    }
  };

	useInterval(updateBusData, 30000);

  return (
    <div {...props}>
      <Header />
      <ComingSoonBusList />
      <ArrivalBusList data={busData} />
      <LivingInformationBox />
      <BottomButtonBox />
    </div>
  );
};
