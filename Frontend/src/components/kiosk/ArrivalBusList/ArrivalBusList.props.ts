import { BusData } from "../../../pages/kiosk/BusInfomationPage";

interface BusDatas extends Array<BusData> {}

export interface ArrivalBusListProps {
  data: BusDatas;
}

