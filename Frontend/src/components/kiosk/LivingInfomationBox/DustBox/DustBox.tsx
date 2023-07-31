import { FC } from "react";
import { DustBoxProps } from ".";
import "./DustBox.css";

export const DustBox: FC<DustBoxProps> = (props) => {
  const busStop = "정류장이름";
  return (
    <div {...props} className="dust-box">
      <div>
        <div>초미세먼지</div>
        <div>
          <div>아이콘</div>
          <div>좋음</div>
          <div>34 ㎍/㎥</div>
        </div>
      </div>
      <div>
        <div>미세먼지</div>
        <div>
          <div>아이콘</div>
          <div>좋음</div>
          <div>34 ㎍/㎥</div>
        </div>
      </div>
    </div>
  );
};
