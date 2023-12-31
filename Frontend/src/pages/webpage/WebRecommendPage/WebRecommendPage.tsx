import { FC, useEffect, useState } from "react";
import { WebRecommendPageProps } from ".";
import axios from "axios";
import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  CardOverflow,
  CircularProgress,
  Container,
  Divider,
  Option,
  Select,
  Stack,
  Typography,
  colors,
} from "@mui/joy";
import { busAPI, webAPI } from "@/store/api/api";
import "./WebRecommendPage.css";
import MapIcon from "@mui/icons-material/Map";
import Carousel from "react-material-ui-carousel";
import {
  Route,
  RouteTripPlace,
  SelectInfo,
  TripPlace,
  TripType,
  WebState,
  saveRecommendInfo,
  saveTripData,
} from "@/store/slice/web-slice";
import { useDispatch, useSelector } from "react-redux";

export const WebRecommendPage: FC<WebRecommendPageProps> = (props) => {
  // citycode 리스트
  // https://apis.data.go.kr/1613000/BusRouteInfoInqireService/getCtyCodeList?serviceKey=5ts%2Baf9Tv7mT28mcFD0Y8pzBg7sy1TYdLve4W7vJd5pt44kEEAkpi8AbNEVKnb%2Fk2z79M9WDxTozeVzNWlPkdA%3D%3D&_type=xml

  // 노선 리스트
  //  https://apis.data.go.kr/1613000/BusRouteInfoInqireService/getRouteNoList?serviceKey=5ts%2Baf9Tv7mT28mcFD0Y8pzBg7sy1TYdLve4W7vJd5pt44kEEAkpi8AbNEVKnb%2Fk2z79M9WDxTozeVzNWlPkdA%3D%3D&pageNo=1&numOfRows=100&_type=xml&cityCode=37050
  const data: WebState = useSelector((state: { web: WebState }) => {
    return state.web;
  });

  const citis = [
    { cityname: "가평군", citycode: "31370" },
    // { cityname: "강릉시", citycode: "32030" },
    // { cityname: "강진군", citycode: "36390" },
    { cityname: "거제시", citycode: "38090" },
    { cityname: "거창군", citycode: "38390" },
    { cityname: "경산시", citycode: "37100" },
    { cityname: "경주시", citycode: "37020" },
    { cityname: "계룡시", citycode: "34070" },
    { cityname: "고령군", citycode: "37370" },
    { cityname: "고성군", citycode: "38340" },
    { cityname: "고양시", citycode: "31100" },
    { cityname: "고창군", citycode: "35370" },
    { cityname: "고흥군", citycode: "36350" },
    { cityname: "공주시", citycode: "34020" },
    { cityname: "과천시", citycode: "31110" },
    { cityname: "광명시", citycode: "31060" },
    { cityname: "광양시", citycode: "36060" },
    { cityname: "광주광역시", citycode: "24" },
    { cityname: "광주시", citycode: "31250" },
    { cityname: "괴산군", citycode: "33360" },
    { cityname: "구례군", citycode: "36330" },
    { cityname: "구리시", citycode: "31120" },
    { cityname: "구미시", citycode: "37050" },
    { cityname: "군산시", citycode: "35020" },
    { cityname: "군위군", citycode: "37310" },
    { cityname: "군포시", citycode: "31160" },
    { cityname: "금산군", citycode: "34310" },
    { cityname: "김제시", citycode: "35060" },
    { cityname: "김천시", citycode: "37030" },
    { cityname: "김포시", citycode: "31230" },
    { cityname: "김해시", citycode: "38070" },
    { cityname: "나주시", citycode: "36040" },
    { cityname: "남양주시", citycode: "31130" },
    { cityname: "남원시", citycode: "35050" },
    { cityname: "남해군", citycode: "38350" },
    { cityname: "논산시", citycode: "34060" },
    { cityname: "단양군", citycode: "33380" },
    { cityname: "담양군", citycode: "36310" },
    { cityname: "당진시", citycode: "34390" },
    { cityname: "대구광역시", citycode: "22" },
    { cityname: "대전광역시", citycode: "25" },
    { cityname: "동두천시", citycode: "31080" },
    { cityname: "동해시", citycode: "32040" },
    { cityname: "목포시", citycode: "36010" },
    { cityname: "무안군", citycode: "36420" },
    { cityname: "무주군", citycode: "35330" },
    { cityname: "문경시", citycode: "37090" },
    { cityname: "밀양시", citycode: "38080" },
    { cityname: "보령시", citycode: "34030" },
    { cityname: "보은군", citycode: "33320" },
    { cityname: "봉화군", citycode: "37410" },
    { cityname: "부산광역시", citycode: "21" },
    { cityname: "부안군", citycode: "35380" },
    { cityname: "부여군", citycode: "34330" },
    { cityname: "부천시", citycode: "31050" },
    { cityname: "사천시", citycode: "38060" },
    { cityname: "산청군", citycode: "38370" },
    { cityname: "삼척시", citycode: "32070" },
    { cityname: "상주시", citycode: "37080" },
    { cityname: "서산시", citycode: "34050" },
    { cityname: "서울특별시", citycode: "11" },
    { cityname: "서천군", citycode: "34340" },
    { cityname: "성남시", citycode: "31020" },
    { cityname: "성주군", citycode: "37380" },
    { cityname: "세종특별시", citycode: "12" },
    { cityname: "속초시", citycode: "32060" },
    { cityname: "수원시", citycode: "31010" },
    { cityname: "순창군", citycode: "35360" },
    { cityname: "순천시", citycode: "36030" },
    { cityname: "시흥시", citycode: "31150" },
    { cityname: "신안군", citycode: "36480" },
    { cityname: "아산시", citycode: "34040" },
    { cityname: "안동시", citycode: "37040" },
    { cityname: "안산시", citycode: "31090" },
    { cityname: "안성시", citycode: "31220" },
    { cityname: "안양시", citycode: "31040" },
    { cityname: "양구군", citycode: "32380" },
    { cityname: "양산시", citycode: "38100" },
    { cityname: "양양군", citycode: "32410" },
    { cityname: "양주시", citycode: "31260" },
    { cityname: "양평군", citycode: "31380" },
    { cityname: "여수시", citycode: "36020" },
    { cityname: "여주시", citycode: "31320" },
    { cityname: "연천군", citycode: "31350" },
    { cityname: "영광군", citycode: "36440" },
    { cityname: "영덕군", citycode: "37350" },
    { cityname: "영동군", citycode: "33340" },
    { cityname: "영암군", citycode: "36410" },
    { cityname: "영양군", citycode: "37340" },
    { cityname: "영월군", citycode: "32330" },
    { cityname: "영주시", citycode: "37060" },
    { cityname: "영천시", citycode: "37070" },
    { cityname: "예산군", citycode: "34370" },
    { cityname: "예천군", citycode: "37400" },
    { cityname: "오산시", citycode: "31140" },
    { cityname: "옥천군", citycode: "33330" },
    { cityname: "완도군", citycode: "36460" },
    { cityname: "완주군", citycode: "35310" },
    { cityname: "용인시", citycode: "31190" },
    { cityname: "울릉군", citycode: "37430" },
    { cityname: "울산광역시", citycode: "26" },
    { cityname: "울진군", citycode: "37420" },
    { cityname: "원주시", citycode: "32020" },
    { cityname: "음성군", citycode: "33370" },
    { cityname: "의령군", citycode: "38310" },
    { cityname: "의성군", citycode: "37320" },
    { cityname: "의왕시", citycode: "31170" },
    { cityname: "의정부시", citycode: "31030" },
    { cityname: "이천시", citycode: "31210" },
    { cityname: "익산시", citycode: "35030" },
    { cityname: "인제군", citycode: "32390" },
    { cityname: "인천광역시", citycode: "23" },
    { cityname: "임실군", citycode: "35350" },
    { cityname: "장성군", citycode: "36450" },
    { cityname: "장수군", citycode: "35340" },
    { cityname: "전주시", citycode: "35010" },
    { cityname: "정선군", citycode: "32350" },
    { cityname: "정읍시", citycode: "35040" },
    { cityname: "제주도", citycode: "39" },
    { cityname: "제천시", citycode: "33030" },
    { cityname: "증평군", citycode: "33390" },
    { cityname: "진도군", citycode: "36470" },
    { cityname: "진안군", citycode: "35320" },
    { cityname: "진주시", citycode: "38030" },
    { cityname: "진천군", citycode: "33350" },
    { cityname: "창녕군", citycode: "38330" },
    { cityname: "창원시", citycode: "38010" },
    { cityname: "천안시", citycode: "34010" },
    { cityname: "철원군", citycode: "32360" },
    { cityname: "청도군", citycode: "37360" },
    { cityname: "청송군", citycode: "37330" },
    { cityname: "청양군", citycode: "34350" },
    { cityname: "청주시", citycode: "33010" },
    { cityname: "춘천시", citycode: "32010" },
    { cityname: "충주시", citycode: "33020" },
    { cityname: "칠곡군", citycode: "37390" },
    { cityname: "태백시", citycode: "32050" },
    { cityname: "통영시", citycode: "38050" },
    { cityname: "파주시", citycode: "31200" },
    { cityname: "평창군", citycode: "32340" },
    { cityname: "평택시", citycode: "31070" },
    { cityname: "포천시", citycode: "31270" },
    { cityname: "포항시", citycode: "37010" },
    { cityname: "하남시", citycode: "31180" },
    { cityname: "하동군", citycode: "38360" },
    { cityname: "함안군", citycode: "38320" },
    { cityname: "함양군", citycode: "38380" },
    { cityname: "함평군", citycode: "36430" },
    { cityname: "합천군", citycode: "38400" },
    { cityname: "해남군", citycode: "36400" },
    { cityname: "홍성군", citycode: "34360" },
    { cityname: "홍천군", citycode: "32310" },
    { cityname: "화성시", citycode: "31240" },
    { cityname: "횡성군", citycode: "32320" },
  ];
  // 12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점
  const tripTypes = [
    {
      code: 12,
      text: "관광지",
    },
    {
      code: 14,
      text: "문화시설",
    },
    {
      code: 15,
      text: "축제공연행사",
    },
    {
      code: 25,
      text: "여행코스",
    },
    {
      code: 28,
      text: "레포츠",
    },
    {
      code: 32,
      text: "숙박",
    },
    {
      code: 38,
      text: "쇼핑",
    },
    {
      code: 39,
      text: "음식점",
    },
  ];

  const TripImgs = [
    { src: "/Trip_강원_속초아이_1920x1080.png?url", name: "강원 속초아이" },
    {
      src: "/Trip_경기_포천_허브아일랜드_1920x1080.png?url",
      name: "포천 허브아일랜드",
    },
    { src: "/Trip_경남_거제_외도_1920x1080.png?url", name: "경남_거제_외도" },
    {
      src: "/Trip_경남_남해_상상양떼목장편백숲_1920x1080.png?url",
      name: "남해 상상양떼목장편백숲",
    },
    {
      src: "/Trip_경북_포항_이가리닻전망대_1920x1080.png?url",
      name: "포항 이가리닻전망대",
    },
    {
      src: "/Trip_대구_군위_화본역_1920x1080.png?url",
      name: "대구 군위 화본역",
    },
    {
      src: "/Trip_대구_달서구_이월드_1920x1080.png?url",
      name: "대구 달서구 이월드",
    },
    { src: "/Trip_대구_이월드_1920x1080.png?url", name: "대구 이월드" },
    { src: "/Trip_부산_감지해변_1920x1080.png?url", name: "부산 감지해변" },
    { src: "/Trip_부산_미포철길_1920x1080.png?url", name: "부산 미포철길" },
    {
      src: "/Trip_부산_송도해상케이블카_1920x1080.png?url",
      name: "부산 송도해상케이블카",
    },
    {
      src: "/Trip_인천_송도_센트럴파크_1920x1080.png?url",
      name: "인천 송도 센트럴파크",
    },
    {
      src: "/Trip_인천_트리플스트리트_1920x1080.png?url",
      name: "인천 트리플스트리트",
    },
    { src: "/Trip_전남_여수_백도_1920x1080.png?url", name: "전남 여수 백도" },
    {
      src: "/Trip_전북_고창_고창갯벌_1920x1080.png?url",
      name: "전북 고창 고창갯벌",
    },
    { src: "/Trip_제주_비양도_1920x1080.png?url", name: "제주 비양도" },
    { src: "/Trip_제주_수월봉_1920x1080.png?url", name: "제주 수월봉" },
    {
      src: "/Trip_제주_신창풍차해안도로_1920x1080.png?url",
      name: "제주 신창풍차해안도로",
    },
  ];

  const dispatch = useDispatch();
  const [routes, setRoutes] = useState([]);

  const [tripData, setTripData] = useState<RouteTripPlace>(data.tripData);

  const [isexistResult, setIsexistResult] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedTripType, setSelectedTripType] = useState<TripType>();

  const [selectedCity, setSelectedCity] = useState({
    citycode: null,
    cityname: null,
  });
  const [isSelectCity, setIsSelectCity] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route>();

  const [selectInfo, setSelectInfo] = useState<SelectInfo>(null);

  useEffect(() => {
    console.log(data.tripData);
    setTripData(data.tripData);
  }, [data.tripData]);
  useEffect(() => {
    console.log(data.selectedRecommendInfo);
    setSelectInfo(data.selectedRecommendInfo);
  }, [data.selectedRecommendInfo]);

  useEffect(() => {
    if (routes.length) setIsSelectCity(true);
    else setIsSelectCity(false);
  }, [routes]);

  const getRoute = ({ cityname, citycode }) => {
    if (citis.length > 0) {
      axios
        .get(
          `https://apis.data.go.kr/1613000/BusRouteInfoInqireService/getRouteNoList?serviceKey=5ts%2Baf9Tv7mT28mcFD0Y8pzBg7sy1TYdLve4W7vJd5pt44kEEAkpi8AbNEVKnb%2Fk2z79M9WDxTozeVzNWlPkdA%3D%3D&pageNo=1&numOfRows=1000&_type=json&cityCode=${citycode}`
        )
        .then((response) => {
          console.log(response.data);
          setRoutes(response.data.response.body.items.item);
        });
    }
  };

  useEffect(() => {
    if (!tripData) {
      setIsexistResult(false);
      return;
    }
    if (Object?.keys(tripData)?.length === 0) {
      setIsexistResult(false);
    } else {
      setIsexistResult(true);
    }
  }, [tripData]);

  const getRecommend = () => {
    if (!selectedCity) {
      alert("도시를 선택해주세요");
      return;
    }
    if (!selectedRoute) {
      alert("노선을 선택해주세요");
      return;
    }
    if (!selectedTripType) {
      alert("관광지을 선택해주세요");
      return;
    }
    setIsLoading(true);
    busAPI
      .get(
        `/trip/${selectedCity?.citycode}/${selectedRoute?.routeid}/${selectedTripType?.code}`,
        { timeout: 20000 }
      )
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        if (response.data.code == "500") {
          alert("다시시도해주세요");
          return;
        }
        dispatch(saveTripData(response.data.data));
        setIsLoading(false);
      });
  };

  const handleCityChange = (value) => {
    console.log(value);
    setSelectedCity(value);
    getRoute(value);
  };
  const handleRouteChange = (value) => {
    console.log(value);
    setSelectedRoute(value);
  };
  const handleTripTypeChange = (value) => {
    console.log(value);
    setSelectedTripType(value);
  };

  const RouteTripList = ({ title, value, key }) => {
    const [maxIndex, setMaxIndex] = useState<number>(4);
    return (
      <Container sx={{ marginTop: 10 }} key={key}>
        <Container sx={{ fontSize: 30, marginY: 2 }}>
          <div className="underline-title fromLeft">{title}에서 내리면</div>
        </Container>
        <Container
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "left",
          }}
        >
          {value?.slice(0, maxIndex).map((el: TripPlace, idx) => {
            return (
              <Card variant="outlined" sx={{ width: "45%" }} key={idx}>
                <CardOverflow>
                  <AspectRatio ratio="2">
                    <img
                      src={
                        el.firstimage
                          ? `${el.firstimage}`
                          : `/place_basic.jpg?url`
                      }
                      srcSet={`${el.firstimage}`}
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                </CardOverflow>
                <CardContent>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <div>
                      <Stack direction={"row"}>
                        <Typography level="title-md">
                          <div
                            style={{ color: "blue" }}
                            onClick={() => {
                              window.open(
                                `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${el.title}`
                              );
                            }}
                          >
                            {el.title}
                          </div>
                        </Typography>
                        {el?.tel ? (
                          <Typography level="body-sm" marginLeft={2}>
                            {el.tel}
                          </Typography>
                        ) : (
                          ""
                        )}
                      </Stack>
                      <Typography level="body-sm">{el.addr1}</Typography>
                    </div>
                    <Button
                      style={{ flexShrink: 1 }}
                      disabled={el.mapx ? false : true}
                      onClick={() => {
                        window.open(
                          `https://map.naver.com/v5/search/${el.title}`
                        );
                        // window.open(
                        //   `http://maps.naver.com/?menu=location&mapMode=0&lat=${el.mapy}&lng=${el.mapx}&dlevel=12&enc=b64mapMode`
                        // );
                      }}
                    >
                      <MapIcon />
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
          <Container sx={{ display: "flex", justifyContent: "right" }}>
            {value.length > 4 ? (
              <Button
                onClick={() => {
                  if (maxIndex == 4) {
                    setMaxIndex(100);
                  } else {
                    setMaxIndex(4);
                  }
                }}
              >
                {maxIndex == 4 ? "더보기" : "접어두기"}
              </Button>
            ) : (
              ""
            )}
          </Container>
        </Container>
      </Container>
    );
  };

  return (
    <div {...props}>
      <Carousel
        duration={500}
        cycleNavigation={true}
        swipe={true}
        animation="fade"
        height={600}
        interval={10000}
        stopAutoPlayOnHover={true}
        navButtonsAlwaysVisible={false}
        sx={{ marginTop: -3.5 }}
        navButtonsProps={{
          style: {
            backgroundColor: "#8f34eb",
            opacity: 0,
          },
        }}
        IndicatorIcon={false}
      >
        {TripImgs.map((img, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h1
                style={{
                  textAlign: "center",
                  // fontWeight: "normal",
                  color: "black",
                  fontFamily: "Noto Sans KR, sans-serif",
                  marginBottom: "20px",
                  marginTop: "60px",
                  fontWeight: "bold",
                }}
              >
                TAB 플레이스
              </h1>

              <p style={{ fontFamily: "Noto Sans KR, sans-serif" }}>
                대한민국 버스가 다니는 구석구석
                <br />
                정류장별 핫플레이스와 맛집 정보를 확인해 보세요
              </p>
              <hr style={{ width: "500px", marginBottom: "40px" }} />
              <div
                style={{
                  marginTop: "5px",
                  backgroundImage: `url(${img.src})`,
                  width: "80%",
                  height: "400px",
                  backgroundSize: "cover",
                  filter: "brightness(60%)",
                }}
                key={index}
              ></div>
              <div
                style={{
                  color: "white",
                  fontSize: "11px",
                  position: "relative",
                  fontFamily: "fantasy",
                  top: -60,
                  left: 20,
                }}
              >
                {img.name} @대한민국 구석구석
              </div>
            </div>
          );
        })}
      </Carousel>
      <div
        style={{
          marginBottom: "30px",
          position: "relative",
          top: -550,
          zIndex: 2,
          userSelect: "none",
        }}
      >
        <div
          style={{
            // backgroundColor: "rgba(0,0,0,0.3) ",
            width: 400,
            padding: 1,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: -200,
          }}
        ></div>
        <div
          style={{
            textAlign: "center",
            fontWeight: "normal",
            position: "relative",
            top: 400,
            fontSize: 25,
            color: "white",
            opacity: 1,
          }}
        >
          {/* <span>요즘 인기 있는 곳는 다 모였네!</span> */}
          <br />

          <br />
        </div>
      </div>

      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Select size="lg" placeholder="시/군 선택" className="select-city">
          {citis.map((op, index) => {
            return (
              <Option
                key={index}
                value={op.cityname}
                onClick={() => {
                  handleCityChange(op);
                }}
                className="options-city"
              >
                {op.cityname}
              </Option>
            );
          })}
        </Select>
        <Select
          size="lg"
          placeholder="버스 노선 선택"
          className="select-bus-route"
          disabled={!isSelectCity}
        >
          {routes?.map((op, index) => {
            return (
              <Option
                key={index}
                value={op}
                onClick={() => handleRouteChange(op)}
                className="options-city"
              >
                {op.routeno}
              </Option>
            );
          })}
        </Select>
        <Select
          size="lg"
          placeholder="카테고리"
          className="select-bus-route"
          disabled={!isSelectCity}
        >
          {tripTypes?.map((op, index) => {
            return (
              <Option
                key={index}
                value={op.text}
                onClick={() => handleTripTypeChange(op)}
                className="options-city"
              >
                {op.text}
              </Option>
            );
          })}
        </Select>
        <Button
          onClick={() => {
            getRecommend();
            dispatch(
              saveRecommendInfo({
                selectedCity,
                selectedRoute,
                selectedTripType,
              })
            );
          }}
          color="primary"
          variant="soft"
          size="lg"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          TAB 해서 추천받기
        </Button>
      </Container>
      {selectInfo ? (
        <Stack  direction={"row"} gap={2} sx={{ display: "flex", marginTop: 5, marginLeft: 20, fontSize: 40 }}>
          <span>{selectInfo.selectedCity.cityname}</span> {">"}
          <span>{selectInfo.selectedRoute.routeno}</span> {">"}
          <span>{selectInfo.selectedTripType.text}</span> {""}
          {"추천 정보"}
        </Stack>
      ) : (
        ""
      )}
      <div>
        {isLoading ? (
          <Container
            sx={{ display: "flex", justifyContent: "center", marginY: 5 }}
          >
            <CircularProgress color="primary" variant="plain" />
          </Container>
        ) : isexistResult ? (
          Object.entries(tripData).map(([key, value], index) => {
            return <RouteTripList title={key} value={value} key={index} />;
          })
        ) : (
          <Container sx={{ marginTop: 10, textAlign: "center" }}>
            추천받은 데이터가 없습니다
          </Container>
        )}
      </div>
    </div>
  );
};
