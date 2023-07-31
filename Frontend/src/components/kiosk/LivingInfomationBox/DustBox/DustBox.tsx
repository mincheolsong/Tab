import { FC } from "react";
import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { DustBoxProps } from ".";
import "./DustBox.css";

// 미세먼지 정보를 담을 인터페이스 (API 응답 데이터 구조에 맞게 정의)
interface DustData {
  dataTime: string;
  pm10Value: number;
  pm25Value: number;
  // 다른 필요한 미세먼지 정보도 추가할 수 있습니다.
}

export const DustBox: FC<DustBoxProps> = (props) => {
  const busStop = "정류장이름";

  const [dustInfo, setDustInfo] = useState<DustData | null>(null);

  const latitude : number = 99;
  const longitude : number = 99;

  useEffect(() => {
    // 미세먼지 API 호출 함수
    // 한국환경공단_에어코리아_대기오염정보
    // https://www.data.go.kr/data/15073861/openapi.do
    // 측정소 정보 필요
    const fetchDustInfo = async () => {
      try {
        const response: AxiosResponse<any> = await axios.get(
          "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty",
          {
            params: {
              serviceKey:
                "vg04G9ynpCLz1hobrfscOxzbc5l7eekaJGTiY6DeHxeEND3j/J+TtcVlTP1/0OPAvW/snRPZBDDLR9cXKpPzpg==",
              // 발급받은 서비스 키를 입력해야 합니다.
              numOfRows: 1,
              pageNo: 1,
              // 위도와 경도를 이용하여 가장 가까운 측정소 이름을 찾습니다.
              // 이 부분은 추가적인 로직이 필요합니다.
              // 예를 들어, 다른 API를 이용하거나 미리 측정소와 위도/경도 정보를 매핑해둔 데이터를 사용해야 합니다.
              stationName: "형곡동", // 측정소 이름 (예: 강남구)
              dataTerm: "DAILY",
              ver: "1.3",
              returnType: "json",
            },
          }
        );

        // API 응답 데이터를 추출하여 미세먼지 정보 객체로 변환
        const data: DustData = {
          dataTime: response.data.response.body.items[0].dataTime,
          pm10Value: response.data.response.body.items[0].pm10Value,
          pm25Value: response.data.response.body.items[0].pm25Value,
        };
        console.log(response.data);

        // 상태 변수 업데이트
        setDustInfo(data);
      } catch (error) {
        console.error("Error fetching dust information:", error);
      }
    };

    // 위도와 경도 정보가 있을 때만 미세먼지 정보를 가져옵니다.
    if (latitude && longitude) {
      fetchDustInfo();
      // 30분마다 미세먼지 정보를 업데이트합니다.
      const intervalId = setInterval(fetchDustInfo, 30 * 60 * 1000); // 30분마다 실행

      // 컴포넌트가 언마운트되면 인터벌을 정리합니다.
      return () => clearInterval(intervalId);
    }
  }, [latitude, longitude]);


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
      {dustInfo ? (
        <div>
          <p>측정 시간: {dustInfo.dataTime}</p>
          <p>미세먼지 농도: {dustInfo.pm10Value}</p>
          <p>초미세먼지 농도: {dustInfo.pm25Value}</p>
        </div>
      ) : (
        <p>데이터 로딩 중...</p>
      )}
    </div>
  );
};
