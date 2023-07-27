import { FC } from 'react';
import { QRcodeBoxProps } from ".";
import './QRcodeBox.css'

export const QRcodeBox: FC<QRcodeBoxProps> = (props) => {
  return <div {...props} className='qrcode-box'>아</div>;
};
