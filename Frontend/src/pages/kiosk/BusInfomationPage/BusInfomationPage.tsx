import { FC } from "react";
import { BusInfomationPageProps } from ".";
import { Header } from "../../../components/kiosk/Header";
import { ComingSoonBusList } from "../../../components/kiosk/ComingSoonBusList";
import { ArrivalBusList } from "../../../components/kiosk/ArrivalBusList";
import { LivingInformationBox } from "../../../components/kiosk/LivingInfomationBox";
import { BottomButtonBox } from "../../../components/kiosk/BottomButtonBox";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { changehome } from "../../../store/Store";

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
};

type ResponseData = {
  data: {
    code: string;
    data: BusData[];
    msg: string;
  };
};

export const BusInfomationPage: FC<BusInfomationPageProps> = (props) => {
  const [busDatas, setBusData] = useState<BusData[]>([]);
  const [comingSoonBusList, setComingSoonBusList] = useState<BusData[]>([]);

  let busstop = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    // 12분 이내 도착 예정인 버스 리스트
    setComingSoonBusList(
      busDatas.filter((el: BusData) => {
        // 임시로 120분
        return el.eta <= 7200;
      })
    );
  }, [busDatas]);

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

      const response: ResponseData = await axios.get(url, {
        timeout: 10000,
      });
      console.log(response.data);
      if (response.data.code == "500") {
        console.log("500 Error: " + response.data.msg);
      } else if (response.data.code == "200") {
        // 도착예정시간 순으로 정렬해서 저장
        setBusData(
          response.data.data.sort((a: BusData, b: BusData) => {
            return a.eta - b.eta;
          })
        );
      }
    } catch (error) {
      console.error("Error fetching buslist data:", error);
    }
  };
  // 30초마다
  useInterval(updateBusData, 30000);

  return (
    <div {...props}>
      <Header />
      <button
        onClick={() => {
          dispatch(changehome());
          console.log(busstop);
        }}
      ></button>
      <ComingSoonBusList data={comingSoonBusList ? comingSoonBusList : []} />
      <ArrivalBusList data={busDatas ? busDatas : []} />
      <LivingInformationBox />
      <BottomButtonBox />
    </div>
  );
};
