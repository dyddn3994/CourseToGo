import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip';

// icons
import { IoMdSettings } from 'react-icons/io';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { CgChevronLeftR, CgChevronRightR } from 'react-icons/cg';

// components
import MapContainer from './MapContainer';
import Memo from './Memo.js'
import OverlapItineraryModal from './OverlapItineraryModal';

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
    commuteGetItineraryDate(params.courseId, params.day);
    commuteGetItineraryInfo(params.day);
  }, [params]);

  // useState
  const [thisPageDate, setThisPageDate] = useState(''); // 현재 일정 날짜
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
  const [isMemoOpen, setIsMemoOpen] = useState(false); // 메모 열기 임시 state

  const [isAddItineraryModal, setIsAddItineraryModal] = useState(false); // 일정 추가 모달
  const [isUpdateItineraryModal, setIsUpdateItineraryModal] = useState(false); // 일정 수정 모달
  const [isOverlapItineraryModal, setIsOverlapItineraryModal] = useState(false); // 중복일정 모달

  const [inputItineraryId, setInputItineraryId] = useState(0); // 일정 수정용 일정 id. Modal에 파라미터로 넘겨주는 방법을 몰라서 이렇게 처리. 알게되면 수정
  const [inputItineraryName, setInputItineraryName] = useState(''); // 일정 추가 일정명 input
  const [inputItineraryAddress, setInputItineraryAddress] = useState(''); // 일정 추가 주소 input
  const [inputItineraryStartTime, setInputItineraryStartTime] = useState(''); // 일정 추가 시작시간 input
  const [inputItineraryEndTime, setInputItineraryEndTime] = useState(''); // 일정 추가 종료시간 input
  const [inputItineraryHidden, setInputItineraryHidden] = useState(false); // 일정 추가 중복 일정 숨김 input
  const [inputItineraryDetail, setInputItineraryDetail] = useState(''); // 일정 추가 일정 상세 input
  const [inputItineraryCost, setInputItineraryCost] = useState(0); // 일정 추가 일정 비용 input

  const [isMarkerClicked, setIsMarkerClicked] = useState(false); // 지도의 마커가 클릭되었을 때 true
  const [markerInfo, setMarkerInfo] = useState({}); // 클릭된 마커 정보

  const [isOverlapMouseOver, setIsOverlapMouseOver] = useState(false);

  // onChange
  let searchInputTemp = ''; // 검색 input값 임시 저장
  const onChangeSearch = e => searchInputTemp = e.target.value;
  const onChangeInputItineraryName = e => setInputItineraryName(e.target.value);
  const onChangeInputItineraryAddress = e => {setInputItineraryAddress(e.target.value); console.log(e.target.value)}
  const onChangeInputItineraryStartTime = e => setInputItineraryStartTime(e.target.value);
  const onChangeInputItineraryEndTime = e => setInputItineraryEndTime(e.target.value);
  const onChangeInputItineraryHidden = e => setInputItineraryHidden(e.target.value);
  const onChangeInputItineraryDetail = e => setInputItineraryDetail(e.target.value);
  const onChangeInputItineraryCost = e => setInputItineraryCost(e.target.value);

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
    // 중복 일정에서 대표 일정 설정
    // representativeItineraryId: 현재 설정되어 있는 대표 일정 id
    // overlapItineraryId: 대표 일정으로 바꿀 일정 id
    const newItineraryArray1 = itineraryArray.map(itinerary => (itinerary.itineraryId === representativeItineraryId ? { ...itinerary, itineraryHidden: true } : itinerary)); // 기존 대표 일정 숨김
    const newItineraryArray2 = newItineraryArray1.map(itinerary => (itinerary.itineraryId === overlapItineraryId ? { ...itinerary, itineraryHidden: false } : itinerary)); // 새로운 대표 일정 설정
    setItineraryArray(newItineraryArray2);
  }

  const addItineraryByMarker = (startTime, endTime, isHidden) => {
    // 마커 클릭 후 일정 등록
    if (isMarkerClicked) {
      const markerPlaceName = markerInfo.place_name;
      const markerPlaceAddress = markerInfo.address_name;

      setIsMarkerClicked(false);
      alert(markerPlaceName + '일정이 ' + startTime + '부터 ' + endTime + '까지로 등록되었습니다.');

      commutePostCreateItinerary(markerPlaceName, markerPlaceAddress, startTime, endTime, isHidden);
      commuteGetItineraryInfo(params.day);
    }
  }
  const updateItinerary = (itinerary) => {
    // 일정 수정
    setInputItineraryId(itinerary.itineraryId);
    setInputItineraryName(itinerary.touristSpot.touristSpotName);
    setInputItineraryAddress(itinerary.touristSpot.touristSpotAddress);
    setInputItineraryStartTime(itinerary.itineraryStartTime);
    setInputItineraryEndTime(itinerary.itineraryEndTime);
    setInputItineraryHidden(itinerary.itineraryHidden);
    setInputItineraryDetail(itinerary.itineraryDetail);
    setInputItineraryCost(itinerary.itineraryCost);

    setIsUpdateItineraryModal(true);
  }

  // onMouseOver
  const onMouseOverItinerary = (e, isHidden) => {
    // 마커 클릭 후 일정표에서 마우스가 올라가 있을 경우 색상 변경
    if (isMarkerClicked) {
      e.currentTarget.style.background = '#de3252';
    }
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
    }
  }

  // 일정 날짜 설정 -> 일정 받아오는 부분 만들어서 필요없을듯
  // const thisItineraryDate = (itinerayData) => {
  //   const dayToNumber = Number(params.day);

  //   const course = itinerayData[0].course; // 날짜 지정을 위한 코스 
  //   const courseStartYear = Number(course.courseStartDate.substring(0, 4));
  //   const courseStartMonth = Number(course.courseStartDate.substring(5, 7));
  //   const courseStartDay = Number(course.courseStartDate.substring(8, 10));

  //   let thisDate = new Date(courseStartYear, courseStartMonth-1, courseStartDay);
  //   thisDate.setDate(thisDate.getDate() + dayToNumber);
  //   setThisPageDate(thisDate.toISOString().substring(0, 10));
  // }


  // 통신
  // 일정 날짜 조회
  const commuteGetItineraryDate = (courseId, day) => {
    fetch("/course/date?courseId="+courseId+"&day="+day)
    .then(res => {
      return res.text();
    })
    .then((itineraryDate) => {
      setThisPageDate(itineraryDate);
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
    setInputItineraryName(markerPlaceName);
    setInputItineraryAddress(markerPlaceAddress);
    setInputItineraryStartTime(startTime);
    setInputItineraryEndTime(endTime);

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
    fetch("/course/itinerary/delete?itineraryId="+inputItineraryId, {
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

  const linkDate = (date) => {
    // 날짜 이동. 오른쪽 화살표는 date:1, 왼쪽 화살표는 date:-1
    return '/course/'+params.courseId+'/'+(Number(params.day)+date)
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

  const renderOverlapTooltip = (overlapItineraryArray) => {
    return (
      <ReactTooltip
      id='tooltip'
      place='right'
      effect='solid'
      type='dark'
      // getContent={dataTip => 'sss' + dataTip}
    >
      <div>동일 시간대 중복 일정</div>
      {overlapItineraryArray.map((overlapItinerary, overlapItineraryIndex) => (
        <div>{overlapItineraryIndex+1}. {overlapItinerary.touristSpot.touristSpotName}</div>
      ))}
    </ReactTooltip>
    )
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
            // console.log(overlapItineraryArray);
          }
          else {
            renderColor = colorList[itinerary.itineraryColor];
            thisItinerary = itinerary;
            representativeStartTimeFormat = formatTime(thisItinerary.itineraryStartTime.substring(11, 13), thisItinerary.itineraryStartTime.substring(14, 16));
            representativeEndTimeFormat = formatTime(thisItinerary.itineraryEndTime.substring(11, 13), thisItinerary.itineraryEndTime.substring(14, 16));
            // console.log(thisItinerary)
            // console.log('thisItinerary')
          }
        }
        // 일정 시간의 가장 상단일 경우 일정명 출력
        if (thisTime === startTime && thisItinerary !== null) {
          isTitlePosition = true;
          // itineraryTitle = itinerary.itineraryName;
          itineraryTitle = thisItinerary.touristSpot.touristSpotName; 
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
                    "2022-05-01t"+thisTimeFormat, 
                    "2022-05-01t"+thisTimeAnHourFormat,
                    "2022-05-01t"+representativeStartTimeFormat,
                    "2022-05-01t"+representativeEndTimeFormat,
                    thisItinerary
                  )} 
          onMouseOver={(e) => onMouseOverItinerary(e, isHidden)}
          onMouseOut={(e) => onMouseOutItinerary(e, renderColor)}
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
              onMouseOver={() => setIsOverlapMouseOver(true)}
              onMouseOut={() => setIsOverlapMouseOver(false)}
              data-tip data-for='tooltip'
            >
              {overlapCnt}
            </span>

            {/* 중복 일정 툴팁 */}
            {/* <ReactTooltip
              id='tooltip'
              place='right'
              effect='solid'
              type='dark'
              // getContent={dataTip => 'sss' + dataTip}
            >
              <div>동일 시간대 중복 일정</div>
              {overlapItineraryArray.map((overlapItinerary, overlapItineraryIndex) => (
                <div>{overlapItineraryIndex+1}. {overlapItinerary.touristSpot.touristSpotName}</div>
              ))}
            </ReactTooltip> */}
            {(isOverlapMouseOver && renderOverlapTooltip(overlapItineraryArray))}

            {/* 중복 일정 모달 */}
            {/* <Modal 
              isOpen={isOverlapItineraryModal} 
              onRequestClose={() => setIsOverlapItineraryModal(false)}
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
                  
                  border: '1px solid',
                }
              }}
            >
              <>
                <div>중복 일정 리스트</div>
                <div style={{display: 'flex'}}>
                  <span style={{border: '1px solid black', borderRadius:'5px', margin: '10px', padding: '5px'}}>
                    <div>&lt;대표 일정&gt;</div>
                    <div style={{textAlign: 'center', margin: '10px'}}>{thisItinerary.touristSpot.touristSpotName}</div>
                  </span>
                  <span style={{border: '1px solid black', margin: '10px', borderRadius:'5px', padding: '5px'}}>
                    <div style={{textAlign: 'center'}}>&lt;중복 일정&gt;</div>
                    <div style={{display: 'flex'}}>
                      {overlapItineraryArray.map((overlapItinerary, overlapItineraryIndex) => (
                        <span style={{margin: '10px'}}>
                          <div style={{textAlign: 'center'}}>{overlapItinerary.touristSpot.touristSpotName}</div>
                          <button onClick={() => onClickSetRepresentative(thisItinerary.itineraryId, overlapItinerary.itineraryId)}>대표 일정으로 설정</button>
                        </span>
                      ))}
                    </div>
                  </span>
                </div>
              </>
            </Modal> */}
            <OverlapItineraryModal 
              isOverlapItineraryModal={isOverlapItineraryModal} 
              setIsOverlapItineraryModal={setIsOverlapItineraryModal}
              thisItinerary={thisItinerary}
              overlapItineraryArray={overlapItineraryArray}
              onClickSetRepresentative={onClickSetRepresentative}
            />
          </>
          }
        </div>
      );
    }

    return renderResult;
  }


  // Modal
  // 일정 추가 모달
  const addItineraryModal = (
    <Modal 
      ariaHideApp={false} // allElement 경고창 제거
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
      <button onClick={onClickUpdateItinerary}>일정 수정</button>
      <button onClick={onClickDeleteItinerary}>일정 삭제</button>
      <button onClick={() => setIsUpdateItineraryModal(false)}>취소</button>
    </Modal>
  );

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
            <span> <Link to={linkDate(-1)}> <CgChevronLeftR /> </Link> </span>
            <span>{thisPageDate} ({params.day}일차)</span>
            <span> <Link to={linkDate(1)}> <CgChevronRightR /> </Link> </span>
          </div>
          <ItineraryScreenDiv style={isMarkerClicked ? {opacity: '0.5'} : {opacity: '1'}}>
            {renderItineraryList()}
          </ItineraryScreenDiv>
        </div>

        <RightScreenDiv>
          {
            isMemoOpen && (
              <Memo setIsMemoOpen={setIsMemoOpen}/>
            )
          }
          <div>
            {/* <RightScreenButton>히스토리</RightScreenButton>  */}
            <RightScreenButton onClick={() => setIsMemoOpen(!isMemoOpen)}>메모</RightScreenButton>
            <Link to='/coursePhoto'>
              <RightScreenButton>사진</RightScreenButton> 
            </Link>
          </div>
          <div>
            <div><br/>제주 관광지 검색</div>
            {/* <RightScreenButton>SNS</RightScreenButton> */}
            <RightScreenButton onClick={() => window.open('https://search.naver.com/search.naver?where=view&sm=tab_jum&query=%EC%95%A0%EC%9B%94+%EB%A7%9B%EC%A7%91', '_blank')}>Blog</RightScreenButton>
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