import { FC } from 'react';
import { BusInfomationPageProps } from '.';
import { Header } from '../../../components/kiosk/Header';
import { ComingSoonBusList } from '../../../components/kiosk/ComingSoonBusList';
import { ArrivalBusList } from '../../../components/kiosk/ArrivalBusList';
import { LivingInformationBox } from '../../../components/kiosk/LivingInfomationBox';
import { BottomButtonBox } from '../../../components/kiosk/BottomButtonBox';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useRef, useState } from 'react';

export type BusData = {
  busNo: string;
  eta: number;
  remainingStops: number; 
  routeId: string;
  routeType: string;
  vehicleNo: string;
  vehicleType: string;
  stationId: string;
  stationName: string;
  stationOrder: number;
}

type ResponseData = {
  code : string,
  data : BusData[],
  msg : string
}


export const BusInfomationPage: FC<BusInfomationPageProps> = (props) => {


	const [busDatas, setBusData] = useState<BusData[]>([]);

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

      const url = `http://127.0.0.1/api/stops/${citycode}/${busStopId}`;

      const response: object = await axios.get(url, {
        timeout: 10000,
      });
      console.log(response.data);
      setBusData(response.data.data);
    } catch (error) {
      console.error("Error fetching buslist data:", error);
    }
  };

  // function updateData() {
  //   axios(options)
  //     .then((response) => {
  //       console.log(data);
  //       setData(response.data.data);
  //     })
  //     .catch(err=>{
  //       console.log(err);
  //     })
  // }


	useInterval(updateBusData, 30000);
	// useInterval(updateData, 30000);

  return (
    <div {...props}>
      <Header />
      <ComingSoonBusList />
      <ArrivalBusList data={busDatas} />
      <LivingInformationBox />
      <BottomButtonBox />
    </div>
  );
};
