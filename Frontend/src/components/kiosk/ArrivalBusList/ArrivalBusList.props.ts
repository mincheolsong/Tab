interface BusData {
  arrprevstationcnt: number;
  arrtime: number;
  nodeid: string;
  nodenm: string;
  routeid: string;
  routeno: number;
  routetp: string;
  vehicletp: string;
}

interface BusDatas extends Array<BusData> {}

export interface ArrivalBusListProps {
  data: BusDatas;
}

