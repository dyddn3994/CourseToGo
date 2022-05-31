import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip';
import SockJS from 'sockjs-client';
import StompJs from 'stompjs';

// icons
import { IoMdSettings } from 'react-icons/io';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { CgChevronLeftR, CgChevronRightR } from 'react-icons/cg';

// components
import MapContainer from './MapContainer';
import Memo from './Memo.js'
import OverlapItineraryModal from './OverlapItineraryModal';
import OverlapItineraryTooltip from './OverlapItineraryTooltip';
import ItineraryTimeTooltip from './ItineraryTimeTooltip';
import AddItineraryModal from './AddItineraryModal';
import UpdateItineraryModal from './UpdateItineraryModal';
import CourseHeader from '../../components/CourseHeader';
// 사용자별 색 인덱스에 따라 색 지정
const colorList = [
  '#aadc8e',
  '#FCCCD4',
]

const CoursePage = () => {
  // url 파라미터 
  // courseId: 코스id(1, 2, ...)
  // day: 설정 일차(1, 2, ...)
  const params = useParams();

  // useEffect
  useEffect(() => {
    // commuteStomp();
    return () => {
      // disconnectStomp();
    }
  }, []);
  useEffect(() => {
    commuteGetItineraryDate(params.courseId, params.day);
    commuteGetItineraryInfo(params.day);
  }, [params]);

  // useRef
  const mapContainerRef = useRef();

  // useState
  const [thisPageDate, setThisPageDate] = useState(''); // 현재 일정 날짜
  const [endPageDate, setEndPageDate] = useState(''); // 마지막 일정 날짜
  const [searchPlace, setSearchPlace] = useState(''); // 장소 검색어
  const [itineraryArray, setItineraryArray] = useState([
    // 등록된 일정 리스트
    {itineraryId: 1, itineraryStartTime: '2022-05-01t16:00', itineraryEndTime: '2022-05-01t17:30', itineraryColor: 1, itineraryHidden: false, touristSpot: {
      touristSpotName: "이호태우해수욕장", touristSpotAddress: "부산광역시 해운대구", touristSpotAvgCost: 0, touristSpotAvgTime: 0
    }},
    {itineraryId: 5, itineraryStartTime: '2022-05-01t16:00', itineraryEndTime: '2022-05-01t17:30', itineraryColor: 1, itineraryHidden: true, touristSpot: {
      touristSpotName: "이호태우중복", touristSpotAddress: "부산광역시 해운대구", touristSpotAvgCost: 0, touristSpotAvgTime: 0
    }},
    {itineraryId: 2, itineraryStartTime: '2022-05-01t10:00', itineraryEndTime: '2022-05-01t11:00', itineraryColor: 0, itineraryHidden: false, touristSpot: {
      touristSpotName: "애월카페", touristSpotAddress: "거제시 여러분", touristSpotAvgCost: 0, touristSpotAvgTime: 0
    }},
    {itineraryId: 3, itineraryStartTime: '2022-05-01t09:30', itineraryEndTime: '2022-05-01t10:50', itineraryColor: 0, itineraryHidden: true, touristSpot: {
      touristSpotName: "중복1", touristSpotAddress: "거제시 여러분", touristSpotAvgCost: 0, touristSpotAvgTime: 0
    }},
    {itineraryId: 4, itineraryStartTime: '2022-05-01t09:30', itineraryEndTime: '2022-05-01t10:50', itineraryColor: 0, itineraryHidden: true, touristSpot: {
      touristSpotName: "중복2", touristSpotAddress: "거제시 여러분", touristSpotAvgCost: 0, touristSpotAvgTime: 0
    }},
  ]); 
  
  const [overlapItineraryArrayState, setOverlapItineraryArrayState] = useState([]);
  const [representativeItineraryState, setRepresentativeItineraryState] = useState({});
  const [thisItineraryTime, setThisItineraryTime] = useState(''); // 마커 클릭 후 일정에 mouseover시 표현할 툴팁 내 시간
  const [isMemoOpen, setIsMemoOpen] = useState(false); // 메모 열기 임시 state

  const [isAddItineraryModal, setIsAddItineraryModal] = useState(false); // 일정 추가 모달
  const [isUpdateItineraryModal, setIsUpdateItineraryModal] = useState(false); // 일정 수정 모달
  const [isOverlapItineraryModal, setIsOverlapItineraryModal] = useState(false); // 중복일정 모달

  const [inputItinerary, setInputItinerary] = useState ({
    inputItineraryId: '',
    inputItineraryName:'',
    inputItineraryAddress:'',
    inputItineraryStartTime: '', 
    inputItineraryEndTime: '',
    inputItineraryHidden: false,
    inputItineraryDetail:'',
    inputItineraryCost:'',
    }  );
    const { inputItineraryId,inputItineraryName, inputItineraryAddress, inputItineraryStartTime,  inputItineraryEndTime,
    inputItineraryHidden, inputItineraryDetail, inputItineraryCost }= inputItinerary;
 
  const [isMarkerClicked, setIsMarkerClicked] = useState(false); // 지도의 마커가 클릭되었을 때 true
  const [markerInfo, setMarkerInfo] = useState({}); // 클릭된 마커 정보

  // const [isOverlapMouseOver, setIsOverlapMouseOver] = useState(false);

  // onChange
  let searchInputTemp = ''; // 검색 input값 임시 저장
  const onChangeSearch = e => searchInputTemp = e.target.value;
  const onChangeInputItinerary= e => {
    const { value, name } = e.target;
    setInputItinerary({
      ...inputItinerary,
      [name]: value
    });
  }
  // onClick
  const onClickSearch = () => setSearchPlace(searchInputTemp);
  const onClickItineraryAddIcon = () => setIsAddItineraryModal(true);
  const onClickAddItinerary = () => {
    const newItineraryArray = itineraryArray.concat({ 
      // itineraryName: inputItineraryName, // 여기
      // itineraryAddress: inputItineraryAddress, 
      itineraryStartTime: inputItineraryStartTime, 
      itineraryEndTime: inputItineraryEndTime, 
      // itineraryColor: userColor, 색상 설정 자동화했으니 문제없으면 제거
      itineraryDetail: inputItineraryDetail,
      itineraryCost: inputItineraryCost,
      touristSpot: {
        touristSpotName: inputItineraryName,
        touristSpotAddress: inputItineraryAddress
      }
    });
    setItineraryArray(newItineraryArray);
    
    alert('itinerary add complete');
    setIsAddItineraryModal(false);
  }
  const onClickUpdateItinerary = () => {
    // 일정 수정
    commutePutUpdateItinerary(inputItineraryId);
    commuteGetItineraryInfo(params.day);
    setIsUpdateItineraryModal(false);
  }
  const onClickDeleteItinerary = () => {
    if (window.confirm("일정을 삭제하시겠습니까?") == true) {
      commuteDeleteItinerary(inputItineraryId);
    }
  }
  const onClickItinerary = (e, isNoItinerary, startTime, endTime, representativeStartTime, representativeEndTime, thisItinerary) => {
    e.stopPropagation(); // 부모 요소 클릭 방지
    if (isNoItinerary) {
      // 일정이 없는 공간을 클릭하였을 경우 일정 등록 진행
      addItineraryByMarker(startTime, endTime, false);
    }
    else {
      if (isMarkerClicked) {
        // 마커가 클릭된 상황에서 일정이 있는 공간을 클릭할 경우 중복일정 등록 진행
        if (window.confirm("해당 시간에는 이미 일정이 등록되어있습니다. 중복 일정으로 등록하시겠습니까?") == true) {
          addItineraryByMarker(representativeStartTime, representativeEndTime, true);
        }
      }
      else {
        // 마커가 클릭되지 않은 상황에서 일정이 있는 공간을 클릭할 경우 일정 수정 진행
        updateItinerary(thisItinerary);
      }
    }
  }
  const onClickOverlap = (e) => {
    e.stopPropagation();  // 부모 요소 클릭 방지
    // e.preventDefault();  // 부모 요소 클릭 방지
    setIsOverlapItineraryModal(true);
  }
  const onClickSetRepresentative = (representativeItineraryId, overlapItineraryId) => {
    commutePutSelectOverlapItinerary(representativeItineraryId, overlapItineraryId);
  }

  const addItineraryByMarker = (startTime, endTime, isHidden) => {
    // 마커 클릭 후 일정 등록
    if (isMarkerClicked) {
      const markerPlaceName = markerInfo.place_name;
      const markerPlaceAddress = markerInfo.address_name;

      setIsMarkerClicked(false);
      mapContainerRef.current.setMarkerClose();
      alert(markerPlaceName + '일정이 ' + startTime + '부터 ' + endTime + '까지로 등록되었습니다.');

      commutePostCreateItinerary(markerPlaceName, markerPlaceAddress, startTime, endTime, isHidden);
      commuteGetItineraryInfo(params.day);
    }
  }
  const updateItinerary = (itinerary) => {
    // 일정 수정 Modal을 위한 세팅
    setInputItinerary({
      ...inputItinerary,
      inputItineraryId: itinerary.itineraryId,
      inputItineraryName:itinerary.touristSpot.touristSpotName,
      inputItineraryAddress:itinerary.touristSpot.touristSpotAddress,
      inputItineraryStartTime: itinerary.itineraryStartTime, 
      inputItineraryEndTime: itinerary.itineraryEndTime,
      inputItineraryHidden: itinerary.itineraryHidden,
      inputItineraryDetail:itinerary.itineraryDetail,
      inputItineraryCost:itinerary.itineraryCost,
    });
    setIsUpdateItineraryModal(true);
  }

  // onMouseOver
  const onMouseOverItinerary = (e, thisTimeFormat) => {
    // 마커 클릭 후 일정표에서 마우스가 올라가 있을 경우 색상 변경
    if (isMarkerClicked) {
      e.currentTarget.style.background = '#7fd1f7';
      setThisItineraryTime(thisTimeFormat);
    }
  }
  const onMouseOverOverlapItinerary = (representativeItinerary, overlapItineraryStartTime) => {
    // 중복 일정 숫자에 마우스 올리면 
    const overlapItineraryArray = itineraryArray.filter(itinerary => (((itinerary.itineraryStartTime === overlapItineraryStartTime) && (itinerary.itineraryHidden)) && itinerary))
    setOverlapItineraryArrayState(overlapItineraryArray);
    setRepresentativeItineraryState(representativeItinerary);
  }

  // onMouseOut
  const onMouseOutItinerary = (e, renderColor) => {
    // onMouseOver 이후 다시 기존 색으로 복귀
    if (isMarkerClicked) {
      e.currentTarget.style.background = renderColor;
    }
  }

  // onKeyPress
  const onKeyPressSearch = e => {
    if (e.key === 'Enter') {
      onClickSearch();
      sendStomp();
    }
  }


  // 통신
  // stomp
  let socketJs = new SockJS("/socket");
  let stompcli = StompJs.over(socketJs);
  // let stompcli = null;
  const commuteStomp = () => {
    // let socketJs = new SockJS("/socket");
    // stompcli = StompJs.over(socketJs);
    stompcli.connect({},() => {
      stompcli.subscribe('/topic/'+String(params.courseId), (data) => {// -> 받을때
        alert('data: ' + data);
      });
    });
  };
  const sendStomp = () => {
    stompcli.send('/app/message', {}, params.courseId);
  }
  const disconnectStomp = () => {
    // 연결 해제
    if (stompcli !== null) {
      stompcli.disconnect();
    }
  }
  // 일정 날짜 조회
  const commuteGetItineraryDate = (courseId, day) => {
    fetch("/course/date?courseId="+courseId+"&day="+day)
    .then(res => {
      return res.json();
    })
    .then((itineraryDateInfo) => {
      setThisPageDate(itineraryDateInfo.selectDate);
      setEndPageDate(itineraryDateInfo.endDate);
    })
  }
  // 일정 정보 조회
  const commuteGetItineraryInfo = (day) => {
    fetch("/course/itinerary?courseId="+params.courseId+"&day="+day)
    .then((res)=>{
      return res.json();
    })
    .then((itinerayData)=>{
      setItineraryArray(itinerayData);
    });
  }
  // 일정 등록
  const commutePostCreateItinerary = (markerPlaceName, markerPlaceAddress, startTime, endTime, isHidden) => {
    setInputItinerary({
      ...inputItinerary,
      inputItineraryName: markerPlaceName,
      inputItineraryAddress:markerPlaceAddress,
      inputItineraryStartTime:startTime,
      inputItineraryEndTime:endTime
    });


    fetch("/course/itinerary", {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        // 입력값 설정할것
        course: {
          courseId: params.courseId
        },
        // itineraryStartTime: inputItineraryStartTime,
        itineraryStartTime: startTime,
        // itineraryEndTime: inputItineraryEndTime,
        itineraryEndTime: endTime,
        itineraryHidden: isHidden,
        itineraryDetail: inputItineraryDetail,
        itineraryCost: inputItineraryCost,
        itineraryDay: params.day,
        // itineraryColor: userColor, 색상 설정 자동화했으니 문제없으면 제거
        touristSpot: {
          // touristSpotName: inputItineraryName,
          touristSpotName: markerPlaceName,
          // touristSpotAddress: inputItineraryAddress,
          touristSpotAddress: markerPlaceAddress,
          touristSpotAvgCost: 0,
          touristSpotAvgTime: 0
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
  const commutePutUpdateItinerary = (updateItineraryId) => {
    fetch("/course/itinerary/update", {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        // 입력값 설정할것
        itineraryId: updateItineraryId,
        course: {
          courseId: params.courseId
        },
        itineraryStartTime: inputItineraryStartTime,
        itineraryEndTime: inputItineraryEndTime,
        itineraryHidden: inputItineraryHidden,
        itineraryDetail: inputItineraryDetail,
        itineraryCost: inputItineraryCost,
        itineraryDay: 1,
        // itineraryColor: userColor, 색상 설정 자동화했으니 문제없으면 제거
        touristSpot: {
          touristSpotName: inputItineraryName,
          touristSpotAddress: inputItineraryAddress,
          touristSpotAvgCost: 0,
          touristSpotAvgTime: 0
        }
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
  const commuteDeleteItinerary = (inputItineraryId) => {
    // RequestParam 수정
    fetch("/course/itinerary/delete?itineraryId="+inputItineraryId+'&courseId='+params.courseId, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res)=>{
      return res.text();
    })
    .then((itineraryId)=>{
      console.log(itineraryId)
      if (itineraryId === -1) {
        // 삭제 실패
        alert('일정삭제에 실패하였습니다. ');
      }
      else if (itineraryId === '0') {
        // 중복 일정이 없는 일정 삭제 성공
        alert('일정이 삭제되었습니다.');
        commuteGetItineraryInfo(params.day);
        setIsUpdateItineraryModal(false);
      }
      else {
        // 중복 일정이 있는 대표 일정 삭제 성공, 대표 일정 id값 반환
        const newRepresentativeItineraryName = itineraryArray.filter(itinerary => (itinerary.itineraryId === itineraryId && itinerary.touristSpot.touristSpotName));
        alert('대표 일정이 삭제되어 중복 일정인 '+newRepresentativeItineraryName+'이 대표일정이 되었습니다.');
        commuteGetItineraryInfo(params.day);
        setIsUpdateItineraryModal(false);
      }
    });
  }
  // 중복일정 선택
  const commutePutSelectOverlapItinerary = (preId, selectedId) => {
    fetch("/course/itinerary/duplicate", {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        // 입력값 설정할것
        preId: preId,
        selectedId: selectedId
      })
    })
    .then((res)=>{
      return res.json();
    })
    .then((ack)=>{
      // 중복일정 선택 성공 시  true
      if (ack) {
        alert('대표일정이 변경되었습니다.');
        commuteGetItineraryInfo(params.day);
      }
      else {
        alert('대표일정 변경에 실패하였습니다.');
      }
    });
  }

  const linkDate = (date) => {
    // 날짜 이동. 오른쪽 화살표는 date:1, 왼쪽 화살표는 date:-1
    // if () {
    //   // 날짜 이동이 코스 일차 바깥으로 넘어가지 못하도록 제어
    // }
    // else {
      return '/course/'+params.courseId+'/'+(Number(params.day)+date)
    // }
  }

  const formatTime = (hour, minute) => {
    let hourToStr = hour.toString();
    let minuteToStr = minute.toString();

    if (minuteToStr.length === 1) {
      minuteToStr = "0" + minuteToStr;
    }
    if (hourToStr.length === 1) {
      hourToStr = "0" + hourToStr;
    }
    
    const formatTime = hourToStr + ':' + minuteToStr;

    return formatTime;
  }
  // 일정 시간표
  const renderItineraryList = () => {
    const renderResult = [];
    const HOURS = 24;

    for (let hour = 0; hour < HOURS; hour++) {
      renderResult.push(
        <div style={{display: 'flex', height: '60px'}}>
          <span style={{flexBasis: '20%', textAlign: 'right', marginRight: '5px', marginLeft: '-5px', marginTop: '-13px'}}>{hour} : 00</span>
          {/* <span style={{flexBasis: '110%' , paddingTop: (hour === 0 && '10px')}}> -- {renderItineraryMinutesList(hour)}</span> */}
          <span style={{flexBasis: '110%'}}>{renderItineraryMinutesList(hour)}</span>
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

      let thisItinerary = null; // 수정시에 자동으로 input 설정하도록 할 일정
      let isHidden = false; // 해당 시간대에 중복일정이 있을경우 true
      let overlapCnt = 1; // 중복일정 개수
      let overlapItineraryArray = []; // 중복일정 배열
      let representativeStartTimeFormat = null; // 중복 일정 등록하려고 할때 대표 일정의 시작 시간
      let representativeEndTimeFormat = null; // 중복 일정 등록하려고 할때 대표 일정의 종료 시간
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
          // itineraryHidden이 true일 경우 중복일정으로 설정
          if (itinerary.itineraryHidden) {
            isHidden = true;
            overlapCnt++;
            const newOverlapItineraryArray = overlapItineraryArray.concat(itinerary);
            overlapItineraryArray = newOverlapItineraryArray;
          }
          else {
            renderColor = colorList[itinerary.itineraryColor];
            thisItinerary = itinerary;
            representativeStartTimeFormat = formatTime(thisItinerary.itineraryStartTime.substring(11, 13), thisItinerary.itineraryStartTime.substring(14, 16));
            representativeEndTimeFormat = formatTime(thisItinerary.itineraryEndTime.substring(11, 13), thisItinerary.itineraryEndTime.substring(14, 16));
          }
        }
        // 일정 시간의 가장 상단일 경우 일정명 출력
        if (thisTime === startTime && thisItinerary !== null) {
          isTitlePosition = true;
          itineraryTitle = thisItinerary.touristSpot.touristSpotName; 

          // 중복 일정 등록 끝나고 나면 state에 값 설정
          if (overlapItineraryArray !== []) {
            // overlapItinerarySetting(overlapItineraryArray);
          }
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
        <div 
          style={{
            height: '10px',
            backgroundColor: (isRenderColor && renderColor)}} 
          onClick={(e) => onClickItinerary(
                    e,
                    (renderColor === "#FFFFFF" && '#ffffff' && 'white'), 
                    thisPageDate+"T"+thisTimeFormat, 
                    thisPageDate+"T"+thisTimeAnHourFormat,
                    thisPageDate+"T"+representativeStartTimeFormat,
                    thisPageDate+"T"+representativeEndTimeFormat,
                    thisItinerary
                  )} 
          onMouseOver={(e) => onMouseOverItinerary(e, thisTimeFormat)}
          onMouseOut={(e) => onMouseOutItinerary(e, renderColor)}
          data-tip data-for='itineraryTimeTooltip'
        >
          {isTitlePosition && itineraryTitle}
          {(isHidden && isTitlePosition) && 
          <>
            <span 
              style={{
                float: 'right',
                marginRight: '5px', 
                color:'#FF0000'
              }}
              onClick={(e) => onClickOverlap(e)} 
              onMouseOver={() => onMouseOverOverlapItinerary(thisItinerary, thisPageDate+'T'+thisTimeFormat+':00')}
              // onMouseOver={() => setIsOverlapMouseOver(true)}
              // onMouseOut={() => setIsOverlapMouseOver(false)}
              data-tip data-for='tooltip'
            >
              {overlapCnt}
            </span>
          </>
          }
        </div>
      );
    }

    return renderResult;
  }
  // render
  return (
    <MainScreenDiv>
      <CourseHeader inputCourseName={'JEJU 제주'} />
  
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
            <MapContainer searchPlace={searchPlace} setIsMarkerClicked={setIsMarkerClicked} setMarkerInfo={setMarkerInfo} ref={mapContainerRef} ></MapContainer>
          </MapDiv>
        </LeftScreenDiv>

        <div>
          <div style={{display: "flex", justifyContent: "space-evenly"}}>
            <span> 
              {
                // 1일차일 경우 일차 감소 클릭 방지
                (params.day !== '1' ? (<Link to={linkDate(-1)}> <CgChevronLeftR /> </Link>) : (<CgChevronLeftR />))
              }
            </span>
            <span>{thisPageDate} ({params.day}일차)</span>
            <span> 
              {
                // 가장 마지막 일차일 경우 일차 증가 클릭 방지
                (thisPageDate !== endPageDate ? (<Link to={linkDate(1)}> <CgChevronRightR /> </Link>) : <CgChevronRightR />)
              }
            </span>
          </div>
          <ItineraryScreenDiv style={isMarkerClicked ? {opacity: '0.5'} : {opacity: '1'}}>
            {renderItineraryList()}
          </ItineraryScreenDiv>
        </div>
 {
            isMemoOpen && (
              <Memo setIsMemoOpen={setIsMemoOpen}/>
            )
          }
        <RightScreenDiv>
         
          
            {/* <RightScreenButton>히스토리</RightScreenButton>  */}
            <ButtonDiv>
               <RightScreenButton onClick={() => setIsMemoOpen(!isMemoOpen)}>메모</RightScreenButton>
            </ButtonDiv>

            <ButtonDiv>
            <Link to={'/photoAlbum/'+String(params.courseId)+'/'+String(params.day)}>
            <RightScreenButton>사진</RightScreenButton> 
            </Link>
            </ButtonDiv>

          <BlogSharchDiv>
            <BlogTitle>관광지 검색</BlogTitle>
            {/* <RightScreenButton>SNS</RightScreenButton> */}
            <RightScreenButton onClick={() => window.open('https://search.naver.com/search.naver?where=view&sm=tab_jum&query=%EC%95%A0%EC%9B%94+%EB%A7%9B%EC%A7%91', '_blank')}>Blog</RightScreenButton>
          </BlogSharchDiv> 
        </RightScreenDiv>
      </ContentDiv>

      {/* 일정 추가 Modal */}
      <AddItineraryModal
        isAddItineraryModal={ isAddItineraryModal}
        setIsAddItineraryModal={setIsAddItineraryModal}
        inputItinerary={inputItinerary}
        onChangeInputItinerary={onChangeInputItinerary}
        onClickAddItinerary={onClickAddItinerary}
        />
      {/* 일정 수정 Modal */}
      <UpdateItineraryModal
        isUpdateItineraryModal={isUpdateItineraryModal}
        setIsUpdateItineraryModal={setIsUpdateItineraryModal}
        inputItinerary={ inputItinerary}
        onChangeInputItinerary={ onChangeInputItinerary}
        onClickUpdateItinerary={onClickUpdateItinerary}
        onClickDeleteItinerary={onClickDeleteItinerary} />
      {/* 중복 일정 툴팁, 마커 클릭 된 상태에서 띄우지 않음*/}
      {
        (!isMarkerClicked && 
          <OverlapItineraryTooltip
            overlapItineraryArray={overlapItineraryArrayState}
          />
        )
      }

      {/* 중복 일정 Modal */}
      <OverlapItineraryModal 
        isOverlapItineraryModal={isOverlapItineraryModal} 
        setIsOverlapItineraryModal={setIsOverlapItineraryModal}
        thisItinerary={representativeItineraryState}
        overlapItineraryArray={overlapItineraryArrayState}
        onClickSetRepresentative={onClickSetRepresentative}
      />

      {/* 마커 클릭 후 일정 mouseover 툴팁 */}
      {
        (isMarkerClicked &&
          <ItineraryTimeTooltip
            thisItineraryTime={thisItineraryTime}
          />
        )
      }
      

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
  padding-top:6%;
  background-color:	#F5F5F5;
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
position:fixed;
margin-left:90%;
  margin-top: 2%;
  height: 100vh;
  text-align: center;
  z-index:1;
`;
const SearchDiv = styled.div`

`;
const ButtonDiv = styled.div`
margin-top:20%;

`;
const MapDiv = styled.div`
  padding: 10px;
`;

const BlogSharchDiv = styled.div`
margin-top:20%;

`;

const BlogTitle = styled.div`
  font-size:0.8rem;
  margin-bottom:5%;
`;
// input
const SearchInput = styled.input`
border-radius: 0.30rem;
line-height: 2;
border: 1px solid lightgray;
width:40%;
box-shadow: 0px 0px 2px lightgray;
  margin-left: 2%;
  font-size: 0.9rem;
`;

// button
const SearchButton = styled.button`
  background-color:#FFFFFF;
  border-radius: 0.30rem;
  font-size: 0.8rem;
  line-height: 1.6;
  width:15%;
  height:2rem;
  color:#4D9FE3;
  display: inline-block;
  margin:1%;
  border: 1px solid  #4D9FE3;
  box-shadow: 0px 0px 2px lightgray;
  font-weight: bold;
  &:hover{  
    border: 1px solid  gray;
    box-shadow: 0 0 3px  gray;
}
`;
const RightScreenButton = styled.button`

background-color:#FFFFFF;
border-radius: 0.30rem;
font-size: 0.7rem;
line-height: 1.6;
width:80px;
height:25px;
color:#4D9FE3;
margin:1%;
border: 1px solid  #4D9FE3;
box-shadow: 0px 0px 2px lightgray;
font-weight: bold;
&:hover{  
  border: 1px solid  gray;
  box-shadow: 0 0 3px  gray;
}
`;

export default CoursePage;
