import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip';
import SockJS from 'sockjs-client';
import StompJs from 'stompjs';
import { Ring } from '@uiball/loaders'

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

// 사용자별 색 인덱스에 따라 색 지정
const colorList = [
  '#aadc8e',
  '#FCCCD4',
]
const HOURS = Array(24).fill().map((v, i)=>i);
const MINUTES = Array(6).fill().map((v, i)=>i*10);

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
  const [thisPageDate, setThisPageDate] = useState('2021-09-12'); // 현재 일정 날짜
  const [endPageDate, setEndPageDate] = useState(''); // 마지막 일정 날짜
  const [searchPlace, setSearchPlace] = useState(''); // 장소 검색어
  const [itineraryArray, setItineraryArray] = useState([
    // 등록된 일정 리스트
    {itineraryId: 1, itineraryStartTime: '2022-05-01T16:00', itineraryEndTime: '2022-05-01T17:30', itineraryColor: 1, itineraryHidden: false, touristSpot: {
      touristSpotName: "이호태우해수욕장", touristSpotAddress: "부산광역시 해운대구", touristSpotAvgCost: 0, touristSpotAvgTime: 0
    }},
    {itineraryId: 5, itineraryStartTime: '2022-05-01t16:00', itineraryEndTime: '2022-05-01t17:30', itineraryColor: 1, itineraryHidden: true, touristSpot: {
      touristSpotName: "이호태우중복", touristSpotAddress: "부산광역시 해운대구", touristSpotAvgCost: 0, touristSpotAvgTime: 0
    }},
    {itineraryId: 2, itineraryStartTime: '2022-05-01t10:00', itineraryEndTime: '2022-05-01t11:00', itineraryColor: 0, itineraryHidden: false, touristSpot: {
      touristSpotName: "애월카페", touristSpotAddress: "거제시 여러분", touristSpotAvgCost: 0, touristSpotAvgTime: 0
    }},
    {itineraryId: 3, itineraryStartTime: '2022-05-01t09:30', itineraryEndTime: '2022-05-01t10:50', itineraryColor: 0, itineraryHidden: true, touristSpot: {
      touristSpotName: "애월중복1", touristSpotAddress: "거제시 여러분", touristSpotAvgCost: 0, touristSpotAvgTime: 0
    }},
    {itineraryId: 4, itineraryStartTime: '2022-05-01t09:30', itineraryEndTime: '2022-05-01t10:50', itineraryColor: 0, itineraryHidden: true, touristSpot: {
      touristSpotName: "애월중복2", touristSpotAddress: "거제시 여러분", touristSpotAvgCost: 0, touristSpotAvgTime: 0
    }},
  ]); 
  const [overlapItineraryArrayState, setOverlapItineraryArrayState] = useState([]);
  const [representativeItineraryState, setRepresentativeItineraryState] = useState({});
  const [thisItineraryTime, setThisItineraryTime] = useState(''); // 마커 클릭 후 일정에 mouseover시 표현할 툴팁 내 시간
  const [isMemoOpen, setIsMemoOpen] = useState(false); // 메모 열기 임시 state

  const [isAddItineraryModal, setIsAddItineraryModal] = useState(false); // 일정 추가 모달
  const [isUpdateItineraryModal, setIsUpdateItineraryModal] = useState(false); // 일정 수정 모달
  const [isOverlapItineraryModal, setIsOverlapItineraryModal] = useState(false); // 중복일정 모달

  const [inputItineraryId, setInputItineraryId] = useState(0); // 일정 수정용 일정 id. Modal에 파라미터로 넘겨주는 방법을 몰라서 이렇게 처리. 알게되면 수정
  const [inputItineraryName, setInputItineraryName] = useState(''); // 일정 추가 일정명 input
  const [inputItineraryAddress, setInputItineraryAddress] = useState(''); // 일정 추가 주소 input
  const [inputItineraryStartTime, setInputItineraryStartTime] = useState(''); // 일정 추가 시작시간 input
  const [inputItineraryEndTime, setInputItineraryEndTime] = useState(''); // 일정 추가 종료시간 input
  const [inputItineraryStartTimeHour, setInputItineraryStartTimeHour] = useState(0); // 일정 시작 시간 input
  const [inputItineraryStartTimeMinute, setInputItineraryStartTimeMinute] = useState(0); // 일정 시작 분 input
  const [inputItineraryEndTimeHour, setInputItineraryEndTimeHour] = useState(0); // 일정 종료 시간 input
  const [inputItineraryEndTimeMinute, setInputItineraryEndTimeMinute] = useState(0); // 일정 종료 분 input
  const [inputItineraryHidden, setInputItineraryHidden] = useState(false); // 일정 추가 중복 일정 숨김 input
  const [inputItineraryDetail, setInputItineraryDetail] = useState(''); // 일정 추가 일정 상세 input
  const [inputItineraryCost, setInputItineraryCost] = useState(0); // 일정 추가 일정 비용 input

  const [isMarkerClicked, setIsMarkerClicked] = useState(false); // 지도의 마커가 클릭되었을 때 true
  const [markerInfo, setMarkerInfo] = useState({}); // 클릭된 마커 정보

  const [loading, setLoading] = useState(true); // 화면 로딩. true일때 로딩 애니메이션 render

  // const [isOverlapMouseOver, setIsOverlapMouseOver] = useState(false);

  // onChange
  let searchInputTemp = ''; // 검색 input값 임시 저장
  const onChangeSearch = e => searchInputTemp = e.target.value;
  const onChangeInputItineraryName = e => setInputItineraryName(e.target.value);
  const onChangeInputItineraryAddress = e => setInputItineraryAddress(e.target.value);
  const onChangeInputItineraryStartTime = e => setInputItineraryStartTime(e.target.value);
  const onChangeInputItineraryEndTime = e => setInputItineraryEndTime(e.target.value);
  const onChangeInputItineraryStartTimeHour = e => setInputItineraryStartTimeHour(e.target.value);
  const onChangeInputItineraryStartTimeMinute = e => setInputItineraryStartTimeMinute(e.target.value);
  const onChangeInputItineraryEndTimeHour = e => setInputItineraryEndTimeHour(e.target.value);
  const onChangeInputItineraryEndTimeMinute = e => setInputItineraryEndTimeMinute(e.target.value);
  // const onChangeInputItineraryStartTimeHour = e => {
  //   const startTime = thisPageDate + 'T' + e.target.value + ':' + inputItineraryStartTimeMinute + ':00';
  //   setInputItineraryStartTime(startTime);
  //   setInputItineraryStartTimeHour(e.target.value);
  // };
  // const onChangeInputItineraryStartTimeMinute = e => {
  //   setInputItineraryStartTimeMinute(e.target.value)
  // };
  // const onChangeInputItineraryEndTimeHour = e => {
  //   const endTime = thisPageDate + 'T' + inputItineraryEndTimeHour + ':' + inputItineraryEndTimeMinute + ':00';
  //   setInputItineraryEndTime(endTime);
  //   setInputItineraryEndTimeHour(e.target.value)
  // };
  // const onChangeInputItineraryEndTimeMinute = e => {
  //   setInputItineraryEndTimeMinute(e.target.value)
  // };
  const onChangeInputItineraryHidden = e => setInputItineraryHidden(e.target.value);
  const onChangeInputItineraryDetail = e => setInputItineraryDetail(e.target.value);
  const onChangeInputItineraryCost = e => setInputItineraryCost(e.target.value);

  // onClick
  const onClickSearch = () => setSearchPlace(searchInputTemp);
  const onClickItineraryAddIcon = () => {
    setInputItineraryName('');
    setInputItineraryAddress('');
    setInputItineraryStartTimeHour('');
    setInputItineraryStartTimeMinute('');
    setInputItineraryEndTimeHour('');
    setInputItineraryEndTimeMinute('');
    setInputItineraryDetail('');
    setInputItineraryCost('');
    setIsAddItineraryModal(true);
  }
  const onClickAddItinerary = () => {
    // 일정 추가 버튼 onClick
    // 시간 수정은 select 리스트로 하기 때문에 setter 호출
    let startTimeHour = String(inputItineraryStartTimeHour);
    let startTimeMinute = String(inputItineraryStartTimeMinute);
    let endTimeHour = String(inputItineraryEndTimeHour);
    let endTimeMinute = String(inputItineraryEndTimeMinute);
    if (startTimeHour.length === 1) {
      startTimeHour = '0' + startTimeHour
    }
    if (startTimeMinute.length === 1) {
      startTimeMinute = '0' + startTimeMinute
    }
    if (endTimeHour.length === 1) {
      endTimeHour = '0' + endTimeHour
    }
    if (endTimeMinute.length === 1) {
      endTimeMinute = '0' + endTimeMinute
    }
    const startTime = thisPageDate + 'T' + startTimeHour + ':' + startTimeMinute + ':00';
    const endTime = thisPageDate + 'T' + endTimeHour + ':' + endTimeMinute + ':00';
    setInputItineraryStartTime(startTime);
    setInputItineraryEndTime(endTime);

    if (inputItineraryName === '') {
      alert('일정명을 입력해주세요');
    }
    else if (inputItineraryAddress === '') {
      alert('일정 주소를 입력해주세요');
    }
    else if (isTimeUnbalance(startTime, endTime)) {
      alert('종료 시간은 시작 시간 이후여야 합니다.');
    }
    else if (isItineraryConflict(0, startTime, endTime)) {
      alert('다른 일정과 시간이 겹치지 않도록 선택해주세요.');
    }
    else {
      commutePostCreateItinerary(inputItineraryName, inputItineraryAddress, startTime, endTime, false);
      setIsAddItineraryModal(false);
    }
    // const newItineraryArray = itineraryArray.concat({ 
    //   itineraryStartTime: inputItineraryStartTime, 
    //   itineraryEndTime: inputItineraryEndTime, 
    //   itineraryDetail: inputItineraryDetail,
    //   itineraryCost: inputItineraryCost,
    //   touristSpot: {
    //     touristSpotName: inputItineraryName,
    //     touristSpotAddress: inputItineraryAddress
    //   }
    // });
    // setItineraryArray(newItineraryArray);
    
    // alert('itinerary add complete');
  }
  const onClickUpdateItinerary = () => {
    // 일정 수정
    // 시간 수정은 select 리스트로 하기 때문에 setter 호출
    let startTimeHour = String(inputItineraryStartTimeHour);
    let startTimeMinute = String(inputItineraryStartTimeMinute);
    let endTimeHour = String(inputItineraryEndTimeHour);
    let endTimeMinute = String(inputItineraryEndTimeMinute);
    if (startTimeHour.length === 1) {
      startTimeHour = '0' + startTimeHour
    }
    if (startTimeMinute.length === 1) {
      startTimeMinute = '0' + startTimeMinute
    }
    if (endTimeHour.length === 1) {
      endTimeHour = '0' + endTimeHour
    }
    if (endTimeMinute.length === 1) {
      endTimeMinute = '0' + endTimeMinute
    }
    const startTime = thisPageDate + 'T' + startTimeHour + ':' + startTimeMinute + ':00';
    const endTime = thisPageDate + 'T' + endTimeHour + ':' + endTimeMinute + ':00';
    console.log(startTime);
    console.log(endTime);
    setInputItineraryStartTime(startTime);
    setInputItineraryEndTime(endTime);

    if (inputItineraryName === '') {
      alert('일정명을 입력해주세요');
    }
    else if (inputItineraryAddress === '') {
      alert('일정 주소를 입력해주세요');
    }
    else if (isTimeUnbalance(startTime, endTime)) {
      alert('종료 시간은 시작 시간 이후여야 합니다.');
    }
    else if (isItineraryConflict(inputItineraryId, startTime, endTime)) {
      alert('다른 일정과 시간이 겹치지 않도록 선택해주세요.');
    }
    else {
      commutePutUpdateItinerary(inputItineraryId, startTime, endTime);
      commuteGetItineraryInfo(params.day);
      setIsUpdateItineraryModal(false);
    }
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
    setInputItineraryId(itinerary.itineraryId);
    setInputItineraryName(itinerary.touristSpot.touristSpotName);
    setInputItineraryAddress(itinerary.touristSpot.touristSpotAddress);

    // setInputItineraryStartTime(itinerary.itineraryStartTime);
    // setInputItineraryEndTime(itinerary.itineraryEndTime);
    const startTimeHour = Number(itinerary.itineraryStartTime.substring(11, 13));
    const startTimeMinute = Number(itinerary.itineraryStartTime.substring(14, 16));
    const endTimeHour = Number(itinerary.itineraryEndTime.substring(11, 13));
    const endTimeMinute = Number(itinerary.itineraryEndTime.substring(14, 16));
    setInputItineraryStartTimeHour(startTimeHour);
    setInputItineraryStartTimeMinute(startTimeMinute);
    setInputItineraryEndTimeHour(endTimeHour);
    setInputItineraryEndTimeMinute(endTimeMinute);

    setInputItineraryHidden(itinerary.itineraryHidden);
    setInputItineraryDetail(itinerary.itineraryDetail);
    setInputItineraryCost(itinerary.itineraryCost);

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
  const socketJs = new SockJS("/socket");
  const stompcli = StompJs.over(socketJs);
  const commuteStomp = () => {
    stompcli.connect({},() => {
      stompcli.subscribe('/topic/'+String(params.courseId), (data) => {// -> 받을때
        alert('data: ' + data);
      });
    });
  };
  const sendStomp = () => {
    stompcli.send('/app/message', {}, params.courseId);
  };
  const disconnectStomp = () => {
    // 연결 해제
    if (stompcli !== null) {
      stompcli.disconnect();
    }
  };
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
    setLoading(false);
    fetch("/course/itinerary?courseId="+params.courseId+"&day="+day)
    .then((res)=>{
      return res.json();
    })
    .then((itinerayData)=>{
      setItineraryArray(itinerayData);
      setLoading(false);
    });
  }
  // 일정 등록
  const commutePostCreateItinerary = (itineraryName, itineraryAddress, startTime, endTime, isHidden) => {
    setInputItineraryName(itineraryName);
    setInputItineraryAddress(itineraryAddress);
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
        itineraryStartTime: startTime,
        itineraryEndTime: endTime,
        itineraryHidden: isHidden,
        itineraryDetail: inputItineraryDetail,
        itineraryCost: inputItineraryCost,
        itineraryDay: params.day,
        touristSpot: {
          touristSpotName: itineraryName,
          touristSpotAddress: itineraryAddress,
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
  const commutePutUpdateItinerary = (updateItineraryId, startTime, endTime) => {
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
        itineraryStartTime: startTime,
        itineraryEndTime: endTime,
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
      else if (itineraryId === 0) {
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
    console.log(preId)
    console.log(selectedId)
    setLoading(true);
    fetch("/course/itinerary/duplicate?preId="+preId+"&selectedId="+selectedId, {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res)=>{
      return res.json();
    })
    .then((ack)=>{
      // 중복일정 선택 성공 시  true
      if (ack) {
        alert('대표일정이 변경되었습니다.');
        commuteGetItineraryInfo(params.day);
        setIsOverlapItineraryModal(false);
      }
      else {
        alert('대표일정 변경에 실패하였습니다.');
      }
    });
    setLoading(false);
  }
  // 코스 확정
  const commutePutCourseCheck = () => {
    fetch("/course/check?courseId="+String(params.courseId), {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res)=>{
      return res.json();
    })
    .then((ack)=>{
      // 
      if (ack) {
        alert('해당 코스가 확정되었습니다.');
        // 이동?
      }
      else {
        alert('대표일정 변경에 실패하였습니다.');
      }
    });
  }

  const isItineraryConflict = (itineraryId, startTime, endTime) => {
    // 일정 등록이나 수정 시 다른 일정과 겹쳐질 경우 true 반환
    const startTimeToNum = Number(startTime.substring(11, 13) + startTime.substring(14, 16));
    const endTimeToNum = Number(endTime.substring(11, 13) + endTime.substring(14, 16));

    let isConflict = false;
    for (let i = 0; i < itineraryArray.length; i++) {
      const itinerary = itineraryArray[i];
      const compareStartTimeToNum = Number(itinerary.itineraryStartTime.substring(11, 13) + itinerary.itineraryStartTime.substring(14, 16));
      const compareEndTimeToNum = Number(itinerary.itineraryEndTime.substring(11, 13) + itinerary.itineraryEndTime.substring(14, 16));

      if (itineraryId !== 0 && (itineraryId === itinerary.itineraryId || itinerary.itineraryHidden)) {
        // 일정 수정시에는 같은 일정 비교 건너뛰어야하며 중복 일정의 경우에도 비교하지 않음(대표 일정으로 비교 가능)
        continue;
      }

      if (
        ((startTimeToNum > compareStartTimeToNum) && (startTimeToNum < compareEndTimeToNum)) || // 시작시간이 다른 일정 시간의 사이에 있는 경우
        ((endTimeToNum > compareStartTimeToNum) && (endTimeToNum < compareEndTimeToNum)) || // 종료시간이 다른 일정 시간의 사이에 있는 경우
        (startTimeToNum === compareStartTimeToNum) || // 시작시간이 다른 일정 시작시간과 같은 경우
        (endTimeToNum === compareEndTimeToNum) || // 종료시간이 다른 일정 종료시간과 같은 경우
        ((compareStartTimeToNum > startTimeToNum) && (compareStartTimeToNum < endTimeToNum))  // 종료시간이 다른 일정 종료시간과 같은 경우 
        ) 
      {
        isConflict = true;
        break;
      }
    }

    return isConflict;
  }

  const isTimeUnbalance = (startTime, endTime) => {
    // 종료 시간이 시작 시간 이전에 있을 경우 true 반환
    const startTimeToNum = Number(startTime.substring(11, 13) + startTime.substring(14, 16));
    const endTimeToNum = Number(endTime.substring(11, 13) + endTime.substring(14, 16));

    let isUnbalance = false;
    if (endTimeToNum <= startTimeToNum) {
      isUnbalance = true;
    }

    return isUnbalance;
  }

  const linkDate = (date) => {
    return '/course/'+params.courseId+'/'+(Number(params.day)+date)
  }

  const timeToStringFormat = (hour, minute) => {
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
    const HOUR = 24;

    for (let hour = 0; hour < HOUR; hour++) {
      renderResult.push(
        <div style={{display: 'flex', height: '60px'}}>
          <span style={{flexBasis: '20%', textAlign: 'right', marginRight: '5px', marginLeft: '-5px', marginTop: '-13px'}}>
            {hour !== 0 ? (
              <>{hour} : 00</>
            ) : null}
            <span style={{}}></span>
          </span>
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
    const MINUTE = 60;
    let itineraryTitle = null;

    for (let minute = 0; minute < MINUTE; minute+=10) {
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
            representativeStartTimeFormat = timeToStringFormat(thisItinerary.itineraryStartTime.substring(11, 13), thisItinerary.itineraryStartTime.substring(14, 16));
            representativeEndTimeFormat = timeToStringFormat(thisItinerary.itineraryEndTime.substring(11, 13), thisItinerary.itineraryEndTime.substring(14, 16));
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
            backgroundColor: (isRenderColor ? renderColor : null)
          }} 
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
          {isTitlePosition ? itineraryTitle : null}
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
      {/* <div>
        <span>시작 시간 : </span>
        <input name="inputItineraryStartTime" value={inputItineraryStartTime} onChange={onChangeInputItineraryStartTime} />
      </div>
      <div>
        <span>종료 시간 : </span>
        <input name="inputItineraryEndTime" value={inputItineraryEndTime} onChange={onChangeInputItineraryEndTime} />
      </div> */}
      <div>
        <span>시작 시간 : </span>
        <select onChange={onChangeInputItineraryStartTimeHour} value={inputItineraryStartTimeHour}>
          {HOURS.map((hour) => (
            <option value={hour} key={hour}>
              {hour}
            </option>
          ))}
        </select>시
        &nbsp; {/* 공백 */}
        <select onChange={onChangeInputItineraryStartTimeMinute} value={inputItineraryStartTimeMinute}>
          {MINUTES.map((minute) => (
            <option value={minute} key={minute}>
              {minute}
            </option>
          ))}
        </select>분
      </div>
      <div>
        <span>종료 시간 : </span>
        <select onChange={onChangeInputItineraryEndTimeHour} value={inputItineraryEndTimeHour}>
          {HOURS.map((hour) => (
            <option value={hour} key={hour}>
              {hour}
            </option>
          ))}
        </select>시
        &nbsp; {/* 공백 */}
        <select onChange={onChangeInputItineraryEndTimeMinute} value={inputItineraryEndTimeMinute}>
          {MINUTES.map((minute) => (
            <option value={minute} key={minute}>
              {minute}
            </option>
          ))}
        </select>분
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
      ariaHideApp={false} // allElement 경고창 제거
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
      {/* <div>
        <span>시작 시간 : </span>
        <input name="inputItineraryStartTime" value={inputItineraryStartTime} onChange={onChangeInputItineraryStartTime} />
      </div>
      <div>
        <span>종료 시간 : </span>
        <input name="inputItineraryEndTime" value={inputItineraryEndTime} onChange={onChangeInputItineraryEndTime} />
      </div> */}
      <div>
        <span>시작 시간 : </span>
        <select onChange={onChangeInputItineraryStartTimeHour} value={inputItineraryStartTimeHour}>
          {HOURS.map((hour) => (
            <option value={hour} key={hour}>
              {hour}
            </option>
          ))}
        </select>시
        &nbsp; {/* 공백 */}
        <select onChange={onChangeInputItineraryStartTimeMinute} value={inputItineraryStartTimeMinute}>
          {MINUTES.map((minute) => (
            <option value={minute} key={minute}>
              {minute}
            </option>
          ))}
        </select>분
      </div>
      <div>
        <span>종료 시간 : </span>
        <select onChange={onChangeInputItineraryEndTimeHour} value={inputItineraryEndTimeHour}>
          {HOURS.map((hour) => (
            <option value={hour} key={hour}>
              {hour}
            </option>
          ))}
        </select>시
        &nbsp; {/* 공백 */}
        <select onChange={onChangeInputItineraryEndTimeMinute} value={inputItineraryEndTimeMinute}>
          {MINUTES.map((minute) => (
            <option value={minute} key={minute}>
              {minute}
            </option>
          ))}
        </select>분
      </div>
      <div>
        <span>일정 상세 : </span>
        <input name="inputItineraryDetail" value={inputItineraryDetail} onChange={onChangeInputItineraryDetail} />
      </div>
      <div>
        <span>일정 비용 : </span>
        <input name="inputItineraryCost" type='number' value={inputItineraryCost} onChange={onChangeInputItineraryCost} />
      </div>
      <button onClick={onClickUpdateItinerary}>일정 수정</button>
      <button onClick={onClickDeleteItinerary}>일정 삭제</button>
      <button onClick={() => setIsUpdateItineraryModal(false)}>취소</button>
    </Modal>
  );

  // render
  return (
    <>
      {loading ? (
        <div style={{position: 'absolute', left: '50%', top: '45%'}}>
        <Ring 
          size={40}
          lineWeight={5}
          speed={2} 
          color="black"
        />
        </div>
      ) : (
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
              {isMarkerClicked ? (<div style={{textAlign:'center'}}>일정을 등록하고자 하는 시간을 클릭하세요.</div>) : null}
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
                <Link to={'/photoAlbum/'+String(params.courseId)+'/'+String(params.day)}>
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
      )}
    </>

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
