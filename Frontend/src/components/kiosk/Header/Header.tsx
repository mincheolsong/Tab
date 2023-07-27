import { FC } from "react";
import { HeaderProps } from ".";
import './style.css'

export const Header: FC<HeaderProps> = (props) => {

  const time = new Date();
  const hour = time.getHours();
  const min = time.getMinutes();

  const busStop = "우리집 앞"

  const logoURL = "../../src/assets/image/대구광역시_logo.png";
  return (
    <div {...props}>
      <div className="Header">
        <div className="header-top">
          <div className="logo-wrap">
            <img id="logo" src={logoURL} alt="대구광역시로고" />
          </div>
          <div className="time-box">
            <span>현재시간 </span>
            <span>
              {hour}:{min}
            </span>
          </div>
        </div>
        <div className="busstop-title">이곳은 <span className="busstop-name">{busStop}</span> 정류장 입니다</div>
      </div>
    </div>
  );
};
