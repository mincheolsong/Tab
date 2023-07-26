import { FC } from 'react';
import { BusInfomationPageProps } from '.';
import { Header } from '../../../components/kiosk/Header';
import { ArrivalBusList } from '../../../components/kiosk/ArrivalBusList';
import { BottomButtonBox } from '../../../components/kiosk/BottomButtonBox';


export const BusInfomationPage: FC<BusInfomationPageProps> = (props) => {
	return <div {...props}>
		<Header/>
		<ArrivalBusList/>
		<BottomButtonBox/>
	</div>;
};
