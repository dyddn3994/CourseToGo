import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

// icons
import { IoMdSettings } from 'react-icons/io';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { CgChevronLeftR, CgChevronRightR } from 'react-icons/cg';

// components
import MapContainer from '../../components/MapContainer';

const CoursePage = () => {

  // useEffect
  useEffect(() => {
    // commuteGetItineraryInfo();
  }, []);

  // useState
  const [searchPlace, setSearchPlace] = useState(''); // 장소 검색어
  const [itineraryArray, setItineraryArray] = useState([
    // 등록된 일정 리스트
    {itineraryId: 1, itineraryName: '이호태우해수욕장', itineraryStartTime: '2022-05-01t16:00', itineraryEndTime: '2022-05-01t17:30', itineraryColor: '#FCCCD4', itineraryHidden: false},
    {itineraryId: 2, itineraryName: '애월카페', itineraryStartTime: '2022-05-01t09:30', itineraryEndTime: '2022-05-01t10:50', itineraryColor: '#aadc8e', itineraryHidden: false},
  ]); 
  const [isMemoOpen, setIsMemoOpen] = useState(false); // 메모 열기 임시 state

  const [isAddItineraryModal, setIsAddItineraryModal] = useState(false); // 일정 추가 모달
  const [isUpdateItineraryModal, setIsUpdateItineraryModal] = useState(false); // 일정 수정 모달
  const [inputItineraryName, setInputItineraryName] = useState(''); // 일정 추가 일정명 input
  const [inputItineraryAddress, setInputItineraryAddress] = useState(''); // 일정 추가 주소 input
  const [inputItineraryStartTime, setInputItineraryStartTime] = useState(''); // 일정 추가 시작시간 input
  const [inputItineraryEndTime, setInputItineraryEndTime] = useState(''); // 일정 추가 종료시간 input
  const [inputItineraryHidden, setInputItineraryHidden] = useState('false'); // 일정 추가 중복 일정 숨김 input
  const [inputItineraryDetail, setInputItineraryDetail] = useState(''); // 일정 추가 일정 상세 input
  const [inputItineraryCost, setInputItineraryCost] = useState(0); // 일정 추가 일정 비용 input

  const [isMarkerClicked, setIsMarkerClicked] = useState(false); // 지도의 마커가 클릭되었을 때 true
  const [markerInfo, setMarkerInfo] = useState({}); // 클릭된 마커 정보

  const [userColor, setUserColor] = useState('#aadc8e'); // 사용자 색상. 세션으로 처리할경우 수정


  // onChange
  let searchInputTemp = ''; // 검색 input값 임시 저장
  const onChangeSearch = e => searchInputTemp = e.target.value;
  const onChangeInputItineraryName = e => setInputItineraryName(e.target.value);
  const onChangeInputItineraryAddress = e => setInputItineraryAddress(e.target.value);
  const onChangeInputItineraryStartTime = e => setInputItineraryStartTime(e.target.value);
  const onChangeInputItineraryEndTime = e => setInputItineraryEndTime(e.target.value);
  const onChangeInputItineraryHidden = e => setInputItineraryHidden(e.target.value);
  const onChangeInputItineraryDetail = e => setInputItineraryHidden(e.target.value);
  const onChangeInputItineraryCost = e => setInputItineraryCost(e.target.value);

  // onClick
  const onClickSearch = () => setSearchPlace(searchInputTemp);
  const onClickItineraryAddIcon = () => setIsAddItineraryModal(true);
  const onClickAddItinerary = () => {
    const newItineraryArray = itineraryArray.concat({ 
      itineraryName: inputItineraryName,
      itineraryAddress: inputItineraryAddress, 
      itineraryStartTime: inputItineraryStartTime, 
      itineraryEndTime: inputItineraryEndTime, 
      itineraryColor: userColor,
      itineraryDetail: inputItineraryDetail,
      itineraryCost: inputItineraryCost
    });
    setItineraryArray(newItineraryArray);
    
    alert('itinerary add complete');
    setIsAddItineraryModal(false);
  }
  const onClickUpdateItinerary = (updateItineraryId) => {
    const newItineraryArray = itineraryArray.map(itinerary => 
        (itinerary.itineraryId === updateItineraryId ? {
          ...itinerary, 
          itineraryName: inputItineraryName,
          itineraryAddress: inputItineraryAddress, 
          itineraryStartTime: inputItineraryStartTime, 
          itineraryEndTime: inputItineraryEndTime, 
          itineraryColor: userColor,
          itineraryDetail: inputItineraryDetail,
          itineraryCost: inputItineraryCost
        } : itinerary )
    );
    
    setIsUpdateItineraryModal(false);
  }
  const onClickItinerary = (isNoItinerary, startTime, endTime, thisItinerary) => {
    if (isNoItinerary) {
      // 일정이 없는 공간을 클릭하였을 경우 일정 등록 진행
      addItineraryByMarker(startTime, endTime);
    }
    else {
      if (isMarkerClicked) {
        // 마커가 클릭된 상황에서 일정이 있는 공간을 클릭할 경우 중복일정 등록 진행
        if (window.confirm("해당 시간에는 이미 일정이 등록되어있습니다. 중복 일정으로 등록하시겠습니까?") == true) {
        }
      }
      else {
        // 마커가 클릭되지 않은 상황에서 일정이 있는 공간을 클릭할 경우 일정 수정 진행
        updateItinerary(thisItinerary);
      }
    }
  }
  const addItineraryByMarker = (startTime, endTime) => {
    // 마커 클릭 후 일정 등록
    if (isMarkerClicked) {
      const markerPlaceName = markerInfo.place_name;
      const markerPlaceAddress = markerInfo.address_name;
      const newItineraryArray = itineraryArray.concat({
        itineraryName: markerPlaceName, 
        itineraryAddress: markerPlaceAddress,
        itineraryStartTime: startTime, 
        itineraryEndTime: endTime, 
        itineraryColor: userColor,
        itineraryDetail: '',
        itineraryCost: 0
      })
      setItineraryArray(newItineraryArray);
      setIsMarkerClicked(false);
      alert(markerPlaceName + '일정이 ' + startTime + '부터 ' + endTime + '까지로 등록되었습니다.');
    }
  }
  const createOverlapItinerary = () => {
    // 중복 일정 등록
  }
  const updateItinerary = (itinerary) => {
    // 일정 수정
    const itineraryId = itinerary.itineraryId;
    setInputItineraryName(itinerary.itineraryName);
    setInputItineraryAddress(itinerary.itineraryAddress);
    setInputItineraryStartTime(itinerary.itineraryStartTime);
    setInputItineraryEndTime(itinerary.itineraryEndTime);
    setInputItineraryHidden(itinerary.itineraryHidden);
    setInputItineraryDetail(itinerary.itineraryDetail);
    setInputItineraryCost(itinerary.itineraryCost);

    setIsUpdateItineraryModal(true);
  }

  // onMouseOver
  const onMouseOverAddItineraryByMarker = e => {
    // 마커 클릭 후 일정표에서 마우스가 올라가 있을 경우 색상 변경
    if (isMarkerClicked) {
      e.currentTarget.style.background = '#de3252';
    }
  }

  // onMouseOut
  const onMouseOutAddItineraryByMarker = e => {
    // onMouseOver 이후 다시 흰색으로 복귀
    if (isMarkerClicked) {
      e.currentTarget.style.background = '#ffffff';
    }
  }

  // onKeyPress
  const onKeyPressSearch = e => {
    if (e.key === 'Enter') {
      onClickSearch();
    }
  }


  // 통신
  // 일정 정보 조회
  const commuteGetItineraryInfo = (courseId, day) => {
    fetch("/course/itinerary?courseId="+String(courseId)+"&day="+String(day))
      .then((res)=>{
        return res.json();
      })
      .then((itinerayData)=>{
        setItineraryArray(itinerayData);
      });
  }
  // 일정 등록
  const commutePostCreateItinerary = () => {
    fetch("/course/itinerary", {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        // 입력값 설정할것
        course: {
          courseId: 1
        },
        itineraryStartTime: inputItineraryStartTime,
        itineraryEndTime: inputItineraryEndTime,
        itineraryHidden: inputItineraryHidden,
        itineraryDetail: inputItineraryDetail,
        itineraryCost: inputItineraryCost,
        itineraryDay: 1,
        itineraryColor: userColor,
        itinerarySpot: {
          itinerarySpotName: inputItineraryName,
          itinerarySpotAddress: inputItineraryAddress,
          itinerarySpotAvgCost: 0,
          itinerarySpotAvgTime: 0
        }
      })
    })
    .then((res)=>{
      return res.json();
    })
    .then((itineraryId)=>{
      // 등록 성공 시 일정 id값 반환, 실패시 -1
      if (itineraryId === -1) {
        alert('일정등록에 실패하였습니다. ');
      }
      else {
        alert('test : ' + itineraryId);
      }
    });
  }
  // 일정 수정
  const commutePutUpdateItinerary = () => {
    fetch("/course/itinerary/update", {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({

      })
    })
    .then((res)=>{
      return res.json();
    })
    .then((itineraryId)=>{
      // 수정 성공 시 일정 id값 반환, 실패시 -1
      if (itineraryId === -1) {
        alert('일정수정에 실패하였습니다. ');
      }
      else {
        alert('test : ' + itineraryId);
      }
    });
  }
  // 일정 삭제
  const commuteDeleteDeleteItinerary = () => {
    // RequestParam 수정
    fetch("/course/itinerary/delete?itineraryId"+'삭제할일정id', {
      method: 'delete',
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res)=>{
      return res.json();
    })
    .then((itineraryId)=>{
      // 삭제 성공실패 여부 물어보기
      if (itineraryId === -1) {
        alert('일정수정에 실패하였습니다. ');
      }
      else {
        alert('test : ' + itineraryId);
      }
    });
  }


  // Modal
  // 일정 추가 모달
  const addItineraryModal = (
    <Modal 
      isOpen={isAddItineraryModal} 
      onRequestClose={() => setIsAddItineraryModal(false)}
      style={{
        overlay: {
          position: 'fixed',
          zIndex: '2'
        },
        content: {
          top: '200px',
          left: '200px',
          right: '200px',
          bottom: '200px',

          border: '1px solid'
        }
      }}
    >
      <div>추가할 일정의 정보를 입력하세요.</div>
      <div>
        <span>일정 명 : </span>
        <input name="inputItineraryName" value={inputItineraryName} onChange={onChangeInputItineraryName} />
      </div>
      <div>
        <span>일정 주소 : </span>
        <input name="inputItineraryAddress" value={inputItineraryAddress} onChange={onChangeInputItineraryAddress} />
      </div>
      <div>
        <span>시작 시간 : </span>
        <input name="inputItineraryStartTime" value={inputItineraryStartTime} onChange={onChangeInputItineraryStartTime} />
      </div>
      <div>
        <span>종료 시간 : </span>
        <input name="inputItineraryEndTime" value={inputItineraryEndTime} onChange={onChangeInputItineraryEndTime} />
      </div>
      <div>
        <span>일정 상세 : </span>
        <input name="inputItineraryDetail" value={inputItineraryDetail} onChange={onChangeInputItineraryDetail} />
      </div>
      <div>
        <span>일정 비용 : </span>
        <input name="inputItineraryCost" value={inputItineraryCost} onChange={onChangeInputItineraryCost} />
      </div>
      <button onClick={onClickAddItinerary}>일정 생성</button>
      <button onClick={() => setIsAddItineraryModal(false)}>취소</button>
    </Modal>
  );
  // 일정 수정 모달
  const updateItineraryModal = (
    <Modal 
      isOpen={isUpdateItineraryModal} 
      onRequestClose={() => setIsUpdateItineraryModal(false)}
      style={{
        overlay: {
          position: 'fixed',
          zIndex: '2'
        },
        content: {
          top: '200px',
          left: '200px',
          right: '200px',
          bottom: '200px',

          border: '1px solid'
        }
      }}
    >
      <div>수정할 일정의 정보를 입력하세요.</div>
      <div>
        <span>일정 명 : </span>
        <input name="inputItineraryName" value={inputItineraryName} onChange={onChangeInputItineraryName} />
      </div>
      <div>
        <span>일정 주소 : </span>
        <input name="inputItineraryAddress" value={inputItineraryAddress} onChange={onChangeInputItineraryAddress} />
      </div>
      <div>
        <span>시작 시간 : </span>
        <input name="inputItineraryStartTime" value={inputItineraryStartTime} onChange={onChangeInputItineraryStartTime} />
      </div>
      <div>
        <span>종료 시간 : </span>
        <input name="inputItineraryEndTime" value={inputItineraryEndTime} onChange={onChangeInputItineraryEndTime} />
      </div>
      <div>
        <span>일정 상세 : </span>
        <input name="inputItineraryDetail" value={inputItineraryDetail} onChange={onChangeInputItineraryDetail} />
      </div>
      <div>
        <span>일정 비용 : </span>
        <input name="inputItineraryCost" value={inputItineraryCost} onChange={onChangeInputItineraryCost} />
      </div>
      <button onClick={onClickUpdateItinerary}>일정 생성</button>
      <button onClick={() => setIsUpdateItineraryModal(false)}>취소</button>
    </Modal>
  );

  // 일정 시간표
  const renderItineraryList = () => {
    const renderResult = [];
    const HOURS = 24;

    for (let hour = 0; hour < HOURS; hour++) {
      renderResult.push(
        <div style={{display: 'flex', height: '60px'}}>
          <span style={{flexBasis: '20%'}}>{hour} : 00</span>
          <span style={{flexBasis: '110%', paddingTop: (hour === 0 && '10px')}}> {renderItineraryMinutesList(hour)}</span>
        </div>
      );
    }

    return renderResult;
  }

  // 일정 분 단위로 나눔
  const renderItineraryMinutesList = hour => {
    const renderResult = [];
    const MINUTES = 60;
    let itineraryTitle = null;

    for (let minute = 0; minute < MINUTES; minute+=10) {
      let renderColor = '#FFFFFF';
      let isTitlePosition = false;

      let hourToStr = hour.toString();
      let minuteToStr = minute.toString();

      if (minuteToStr.length === 1) {
        minuteToStr = "0" + minuteToStr;
      }
      if (hourToStr.length === 1) {
        hourToStr = "0" + hourToStr;
      }
      
      const thisTimeToStr = hourToStr + minuteToStr;
      const thisTime = Number(thisTimeToStr);
      const thisTimeFormat = hourToStr + ":" + minuteToStr;
      
      // 일정 등록시 한시간 자동으로 등록되게 임시 설정
      let thisTimeAnHour, thisTimeAnHourFormat;
      if ((hour+1).toString().length === 1) {
        thisTimeAnHour = Number("0" + (hour+1).toString() + minuteToStr);
        thisTimeAnHourFormat = "0" + (hour+1).toString() + ":" + minuteToStr;
      }
      else {
        thisTimeAnHour = Number((hour+1).toString() + minuteToStr);
        thisTimeAnHourFormat = (hour+1).toString() + ":" + minuteToStr;
      }

      // 수정시에 자동으로 input 설정하도록 할 일정
      let thisItinerary;
      
      // 일정별로 확인하여 렌더링할 데어터들 설정
      itineraryArray.map((itinerary, itineraryIndex) => {
        const startHourToStr = String(itinerary.itineraryStartTime).substring(11, 13);
        const startMinuteToStr = String(itinerary.itineraryStartTime).substring(14, 16);
        const startTimeToStr = startHourToStr + startMinuteToStr;
        const startTime = Number(startTimeToStr);

        const endHourToStr = String(itinerary.itineraryEndTime).substring(11, 13);
        const endMinuteToStr = String(itinerary.itineraryEndTime).substring(14, 16);
        const endTimeToStr = endHourToStr + endMinuteToStr;
        const endTime = Number(endTimeToStr);

        // 해당하는 시간일 경우 색상설정
        if (thisTime >= startTime && thisTime < endTime) {
          renderColor = itinerary.itineraryColor;
          thisItinerary = itinerary;
        }
        // 일정 시간의 가장 상단일 경우 일정명 출력
        if (thisTime === startTime) {
          isTitlePosition = true;
          itineraryTitle = itinerary.itineraryName;
          // itineraryTitle = itinerary.touristSpot.touristSpotName;
        }
      });

      // 일정이 있는 상황인지 확인
      let isRenderColor = false;
      if (renderColor !== '#FFFFFF' && '#ffffff' && 'white'){
        if (!thisItinerary.itineraryHidden) {
          isRenderColor = true;
        }
      }

      renderResult.push(
        <ItineraryMinuteDiv 
          style={{backgroundColor: (isRenderColor && renderColor)}} 
          onClick={() => onClickItinerary(
                    (renderColor==="#FFFFFF"), 
                    "2022-05-01t"+thisTimeFormat, 
                    "2022-05-01t"+thisTimeAnHourFormat,
                    thisItinerary
                  )} 
          onMouseOver={(e) => onMouseOverAddItineraryByMarker(e)}
          onMouseOut={(e) => onMouseOutAddItineraryByMarker(e)}
        >
          {isTitlePosition && itineraryTitle}
        </ItineraryMinuteDiv>
      );
    }

    return renderResult;
  }

  // 등록하려는 일정이 기존 일정과 시간이 겹치는지 확인
  // const isAddingItineraryOverlap = (startTime, endTime) = {

  // }

  // 마커에서 일정 등록 시 종료시간 다른 일정과 겹치지 않게 설정

  // render
  return (
    <MainScreenDiv>
      <TitleDiv>
        <span style={{fontSize: '40px', fontWeight: 'bold'}}>JEJU 제주</span>
        <span style={{fontSize: '25px'}}> <IoMdSettings /> </span>
      </TitleDiv>
      
      <ContentDiv>
        <LeftScreenDiv>
          <SearchDiv>
            <SearchInput 
              type="text"
              placeholder='여행지를 입력하세요'
              onChange={onChangeSearch}
              onKeyPress={onKeyPressSearch}
            />
            <SearchButton onClick={onClickSearch}>검색</SearchButton>
            <span style={{float: 'right', paddingRight: '10px', fontSize: '25px'}}> <BsFillPlusSquareFill onClick={() => onClickItineraryAddIcon()} /> </span>
          </SearchDiv>
          <MapDiv>
            <MapContainer searchPlace={searchPlace} setIsMarkerClicked={setIsMarkerClicked} setMarkerInfo={setMarkerInfo}></MapContainer>
          </MapDiv>
        </LeftScreenDiv>

        <div>
          <div style={{display: "flex", justifyContent: "space-evenly"}}>
            <span> <CgChevronLeftR /> </span>
            <span>1일차</span>
            <span> <CgChevronRightR /> </span>
          </div>
          <ItineraryScreenDiv style={isMarkerClicked ? {opacity: '0.5'} : {opacity: '1'}}>
            {renderItineraryList()}
          </ItineraryScreenDiv>
        </div>

        <RightScreenDiv>
          {
            isMemoOpen && (
              <div style={{backgroundColor: 'skyblue', width: '50vh', height: '80vh', position: 'absolute', transition: 'visibility 0.3s, right 0.3s'}}>
                <button style={{float: 'right', marginRight: '10px', marginTop: '10px'}} onClick={() => setIsMemoOpen(!isMemoOpen)}>x</button>
              </div>
            )
          }
          <div>
            <RightScreenButton>히스토리</RightScreenButton> 
        <Link to='/coursePhoto'>
            <RightScreenButton>사진</RightScreenButton> 
            </Link>
          </div>
          <div>
            <div><br/>제주 관광지 검색</div>
            <RightScreenButton>SNS</RightScreenButton>
            <RightScreenButton onClick={() => window.open('https://search.naver.com/search.naver?where=view&sm=tab_jum&query=%EC%95%A0%EC%9B%94+%EB%A7%9B%EC%A7%91', '_blank')}>Blog</RightScreenButton>
            <RightScreenButton onClick={() => setIsMemoOpen(!isMemoOpen)}>메모</RightScreenButton>
          </div>
        </RightScreenDiv>
      </ContentDiv>

      {/* 일정 추가 Modal */}
      {addItineraryModal}

      {/* 일정 수정 Modal */}
      {updateItineraryModal}
    </MainScreenDiv>
  )
};

// styled components
// div
const MainScreenDiv = styled.div`
  height: 100vh;
`;
const TitleDiv = styled.div`
  margin-left: 3%;
`;
const ContentDiv = styled.div`
  display: flex;
`;
const LeftScreenDiv = styled.div`
  flex-basis: 50%;

  margin-left: 2%;
`;
const ItineraryScreenDiv = styled.div`
  flex-basis: 40%;
  width: 350px;
  overflow-y: scroll;
  
  height: 80vh;
  margin-left: 3%;
  margin-top: 3%;
`;
const RightScreenDiv = styled.div`
  flex-basis: 10%;
  
  margin-left: 1%;
  margin-top: 2%;
`;
const SearchDiv = styled.div`
`;
const MapDiv = styled.div`
  padding: 10px;
`;
const ItineraryMinuteDiv = styled.div`
  height: 10px;
  &:hover { 
    background-color: ${props => props.isMarkerClicked ? 'gray' : 'white'};
    /* color: rgb(255, 255, 255, 100); */
  }
`;

// input
const SearchInput = styled.input`
  margin-left: 2%;
`;

// button
const SearchButton = styled.button`
  margin-left: 5px;
`;
const RightScreenButton = styled.button`
  margin-left: 5px;

  padding: 3px 5px;
  border-width: 1px;

  border-style: solid;
  border-radius: 10%;
  border-color: #3498DB;
  font-size: 13px;
  background-color: gray;
  color: white;
`;

export default CoursePage;