import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip';
import StompJs from 'stompjs';
import { Ring } from '@uiball/loaders'
import SockJS from 'sockjs-client';
// import * as StompJs from "@stomp/stompjs";
import { Client } from '@stomp/stompjs'
import { useNavigate } from 'react-router-dom';

// icons
import { IoMdSettings } from 'react-icons/io';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { CgChevronLeftR, CgChevronRightR } from 'react-icons/cg';

// components
import MapContainer from '../../components/Course/MapContainer';
import Memo from '../../components/Course/Memo.js'
import OverlapItineraryModal from './OverlapItineraryModal';
import OverlapItineraryTooltip from '../../components/Course/OverlapItineraryTooltip';
import ItineraryTimeTooltip from '../../components/Course/ItineraryTimeTooltip';
import AddItineraryModal from './AddItineraryModal';
import UpdateItineraryModal from './UpdateItineraryModal';
import CourseHeader from '../../components/CourseHeader';
import RenderItineraryList from '../../components/Course/RenderItineraryList';
import CourseSettingModal from './CourseSettingModal';
import CITY from '../../assets/City/City';
import ItineraryInfoTooltip from '../../components/Course/ItineraryInfoTooltip';

// 사용자별 색 인덱스에 따라 색 지정
const colorList = [
  '#aadc8e',
  '#FCCCD4',
  '#FBDEA2',
  '#BDECB6'
]
const HOURS = Array(24).fill().map((v, i)=>i);
const MINUTES = Array(6).fill().map((v, i)=>i*10);
const isCheckCourse = false;

var client = null; // stomp 연결용
var stompClient = null;

const CoursePage = () => {
  // url 파라미터 
  // courseId: 코스id(1, 2, ...)
  // day: 설정 일차(1, 2, ...)
  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    commuteStomp();
    // connectStomp();
    commuteGetCourseInfo();
    return () => {
      disconnectStomp();
    }
  }, []);
  useEffect(() => {
    commuteGetItineraryDate(params.courseId, params.day);
    commuteGetItineraryInfo(params.day);
  }, [params]);

  const [thisPageDate, setThisPageDate] = useState('2021-09-12'); // 현재 일정 날짜
  const [endPageDate, setEndPageDate] = useState(''); // 마지막 일정 날짜
  const [thisCourseCity, setThisCourseCity] = useState('Jeju'); // 코스 도시 정보
  const [groupId, setGroupId] = useState(0); // 그룹 id

  const [searchPlace, setSearchPlace] = useState(''); // 장소 검색어
  const [thisItinerary ,setThisItinerary ] = useState('');
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
  const [isOpenSearchList, setISOpenSearchList] = useState(false);	// 검색 리스트 열고 닫기 상태 
  const [overSearchList, setOverSearchList] = useState(false);	// 검색 리스트 마우스 오버 상태
 
  const [overlapItineraryArrayState, setOverlapItineraryArrayState] = useState([]);
  const [representativeItineraryState, setRepresentativeItineraryState] = useState();
  const [thisItineraryTime, setThisItineraryTime] = useState(''); // 마커 클릭 후 일정에 mouseover시 표현할 툴팁 내 시간
  const [isMemoOpen, setIsMemoOpen] = useState(false); // 메모 열기 임시 state

  const [isAddItineraryModal, setIsAddItineraryModal] = useState(false); // 일정 추가 모달
  const [isUpdateItineraryModal, setIsUpdateItineraryModal] = useState(false); // 일정 수정 모달
  const [isOverlapItineraryModal, setIsOverlapItineraryModal] = useState(false); // 중복일정 모달
  const [isCourseSettingModalOpen, setIsCourseSettingModalOpen] = useState(false); // 코스 설정 모달
  const [isAddItineraryByIcon, setIsAddItineraryByIcon] = useState(false); // 일정 추가 아이콘을 클릭해서 추가할경우 주소 입력칸 없앰

  const [inputItinerary, setInputItinerary] = useState ({
    inputItineraryId: 0,// 일정 수정용 일정 id. Modal에 파라미터로 넘겨주는 방법을 몰라서 이렇게 처리. 알게되면 수정
    inputItineraryName:'',// 일정 추가 일정명 input
    inputItineraryAddress:'', // 일정 추가 주소 input
    inputItineraryStartTime: '',  // 일정 추가 시작시간 input
    inputItineraryEndTime: '',// 일정 추가 종료시간 input
    inputItineraryStartTimeHour:0, // 일정 시작 시간 input
    inputItineraryStartTimeMinute:0, // 일정 시작 분 input
    inputItineraryEndTimeHour:0, // 일정 종료 시간 input
    inputItineraryEndTimeMinute:0,// 일정 종료 분 input
    inputItineraryHidden: false,// 일정 추가 중복 일정 숨김 input
    inputItineraryDetail:'',// 일정 추가 일정 상세 input
    inputItineraryCost:0, // 일정 추가 일정 비용 input
    itineraryLat: '', // 위도
    itineraryLng: '', // 경도
  });
  const { inputItineraryId,inputItineraryName, inputItineraryAddress, inputItineraryStartTime,  inputItineraryEndTime, inputItineraryStartTimeHour, inputItineraryStartTimeMinute,  inputItineraryEndTimeHour,
    inputItineraryEndTimeMinute,inputItineraryHidden, inputItineraryDetail, inputItineraryCost, itineraryLat, itineraryLng }= inputItinerary;
  
  const [inputSettingCourse, setInputSettingCourse] = useState({
    // 코스 설정 Modal용 input
    inputCourseName: '',
    inputCourseStartDate: '',
    inputCourseEndDate: '',
    inputCity: ''
  });
  const { inputCourseName, inputCourseStartDate, inputCourseEndDate, inputCity } = inputSettingCourse;

  const [isMarkerClicked, setIsMarkerClicked] = useState(false); // 지도의 마커가 클릭되었을 때 true
  const [markerInfo, setMarkerInfo] = useState({}); // 클릭된 마커 정보

  const [loading, setLoading] = useState(true); // 화면 로딩. true일때 로딩 애니메이션 render

  const [searchInputTemp, setSearchInputTemp] = useState('');
  const [isMouseOverMapList, setIsMouseOverMapList] = useState(false); // 검색 리스트에 마우스오버 하고있을 시 true

  // const [isOverlapMouseOver, setIsOverlapMouseOver] = useState(false);

  // onChange
  // let searchInputTemp = ''; // 검색 input값 임시 저장
  const onChangeSearch = e => setSearchInputTemp(e.target.value);
  const onChangeInputItinerary= e => {
    const { value, name } = e.target;
    setInputItinerary({
      ...inputItinerary,
      [name]: value
    });
  }
  const onChangeInputSettingCourse = e => {
    const { value, name } = e.target;
    setInputSettingCourse({
      ...inputSettingCourse,
      [name]: value
    });
  }

  // onClick
  const onClickSearch = () => {
    setSearchPlace('');
    setSearchPlace(searchInputTemp);
  }
  const onClickItineraryAddIcon = () => {
    setInputItinerary({
      ...inputItinerary,
      inputItineraryName:'',// 일정 추가 일정명 input
      inputItineraryAddress:'', // 일정 추가 주소 input
      inputItineraryStartTimeHour:0, // 일정 시작 시간 input
      inputItineraryStartTimeMinute:0, // 일정 시작 분 input
      inputItineraryEndTimeHour:0, // 일정 종료 시간 input
      inputItineraryEndTimeMinute:0,// 일정 종료 분 input
      inputItineraryDetail:'',// 일정 추가 일정 상세 input
      inputItineraryCost:0 // 일정 추가 일정 비용 input
    });
    setIsAddItineraryByIcon(true);
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
    console.log('startTime: ', startTime)
    console.log('endTime: ', endTime)
    setInputItinerary({
      ...inputItinerary,
      inputItineraryStartTime:startTime,
      iInputItineraryEndTime:endTime, 
    });
    if (inputItineraryName === '') {
      alert('일정명을 입력해주세요');
    }
    // else if (inputItineraryAddress === '') {
    //   alert('일정 주소를 입력해주세요');
    // }
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
    setInputItinerary({
      ...inputItinerary,
      inputItineraryStartTime:startTime,
      iInputItineraryEndTime:endTime, 
    });
  

    if (inputItineraryName === '') {
      alert('일정명을 입력해주세요');
    }
    // else if (inputItineraryAddress === '') {
    //   alert('일정 주소를 입력해주세요');
    // }
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
  const onClickOverlap = ( e, thisItinerary ) => {
    e.stopPropagation();  // 부모 요소 클릭 방지
    // e.preventDefault();  // 부모 요소 클릭 방지
    // setThisItinerary(thisItinerary );
    setIsOverlapItineraryModal(true);
  }
  const onClickSetRepresentative = (representativeItineraryId, overlapItineraryId) => {
    // 중복 일정에서 대표 일정 설정
    // representativeItineraryId: 현재 설정되어 있는 대표 일정 id
    // overlapItineraryId: 대표 일정으로 바꿀 일정 id
    commutePutSelectOverlapItinerary(representativeItineraryId, overlapItineraryId);
  }
  const onClickCourseConfirm = () => {
    // 코스 확정 버튼 클릭
    commutePutCourseCheck();
  }
  const onClickSettingCourseModal = () => {
    // 코스 설정 Modal 설정 확인 클릭
    commutePutCourseUpdate();
  }
  const onClickCourseSettingIcon = () => {
    // 코스 설정 아이콘 클릭
    setIsCourseSettingModalOpen(true);
  }
  const onClickDeleteGroup = () => {
    // 그룹 탈퇴 버튼 클릭
    if (window.confirm("그룹을 탈퇴하시겠습니까?") == true) {
      commuteDeleteGroup();
    }
  }

  const addItineraryByMarker = (startTime, endTime, isHidden) => {
    // 마커 클릭 후 일정 등록
    if (isMarkerClicked) {
      const markerPlaceName = markerInfo.place_name;
      const markerPlaceAddress = markerInfo.address_name;
      const lat = markerInfo.x;
      const lng = markerInfo.y;

      // if (isItineraryConflict(0, startTime, endTime)) {
        // 한시간 안에 다른 일정이 있을 경우
        const startTimeHour = Number(startTime.substring(11, 13));
        const startTimeMinute = Number(startTime.substring(14, 16));
        const endTimeHour = Number(endTime.substring(11, 13));
        const endTimeMinute = Number(endTime.substring(14, 16));
        setInputItinerary({
          ...inputItinerary, 
          inputItineraryName: markerPlaceName, 
          inputItineraryAddress: markerPlaceAddress,
          inputItineraryStartTimeHour: startTimeHour,
          inputItineraryStartTimeMinute: startTimeMinute,
          inputItineraryEndTimeHour: endTimeHour,
          inputItineraryEndTimeMinute: endTimeMinute,
          itineraryLat: lat,
          itineraryLng: lng
        })
        if (isHidden) {
          commutePostCreateItinerary(markerPlaceName, markerPlaceAddress, startTime, endTime, isHidden);
        }
        else {
          setIsAddItineraryByIcon(false);
          setIsAddItineraryModal(true);
        }
      // }
      // else {
      //   // 한시간으로 등록
        // alert(markerPlaceName + '일정이 ' + startTime.substring(11,16) + '부터 ' + endTime.substring(11, 16) + '까지로 등록되었습니다.');
      // }
      setIsMarkerClicked(false);

      commuteGetItineraryInfo(params.day);
    }
  }

  const updateItinerary = (itinerary) => {
     // 일정 수정 Modal을 위한 세팅
    const startTimeHour = Number(itinerary.itineraryStartTime.substring(11, 13));
    const startTimeMinute = Number(itinerary.itineraryStartTime.substring(14, 16));
    const endTimeHour = Number(itinerary.itineraryEndTime.substring(11, 13));
    const endTimeMinute = Number(itinerary.itineraryEndTime.substring(14, 16));
   
    setInputItinerary({
      ...inputItinerary,
      inputItineraryId: itinerary.itineraryId,
      inputItineraryName:itinerary.touristSpot.touristSpotName,
      inputItineraryAddress:itinerary.touristSpot.touristSpotAddress,

      inputItineraryStartTimeHour: startTimeHour, 
      inputItineraryStartTimeMinute:startTimeMinute,
      inputItineraryEndTimeHour:endTimeHour,
      inputItineraryEndTimeMinute:endTimeMinute,

      inputItineraryHidden: itinerary.itineraryHidden,
      inputItineraryDetail:itinerary.itineraryDetail,
      inputItineraryCost:itinerary.itineraryCost,
    });

    setIsUpdateItineraryModal(true);
  }

  // onMouseOver
  const onMouseOverItinerary = (e, thisTimeFormat, thisItinerary) => {
    if (isMarkerClicked) {
      // 마커 클릭 후 일정표에서 마우스가 올라가 있을 경우 색상 변경
      e.currentTarget.style.background = '#7fd1f7';
      setThisItineraryTime(thisTimeFormat);
    }
    else {
      // 일정에 마우스 올릴경우 대표 일정 세부정보 툴팁 표시
      setRepresentativeItineraryState(thisItinerary);
    }
  }
  const onMouseOverOverlapItinerary = (e, representativeItinerary, overlapItineraryStartTime) => {
    // 중복 일정 숫자에 마우스 올리면 
    e.preventDefault();
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
      // sendStomp();
    }
  }


  // 통신
  const commuteStomp = () => {
    // stomp
    var socket = new SockJS('/socket');
    stompClient = StompJs.over(socket);
    stompClient.connect({},(frame) => {
      console.log('Connected: ' + frame);
      
      stompClient.subscribe('/topic/'+String(params.courseId), (data) => {// -> 받을때
        alert('data: ' + data);
      });
    });
  };
  const sendStomp = () => {
    stompClient.send('/app/message', {}, params.courseId);
  };
  const disconnectStomp = () => {
    // 연결 해제
    if (stompClient !== null) {
      stompClient.disconnect();
    }
  };
  // const connectStomp = () => {
  //   client = new Client({
  //     brokerURL: 'ws://122.199.121.202:9092/socket',
  //     debug: function (str) {
  //       console.log(str);
  //     },
  //     onConnect: () => {
  //       subscribe();
  //     },
  //   });

  //   client.activate();
  // }; 
  // const subscribe = () => {
  //   if (client != null) {
  //     client.subscribe('/topic/'+params.courseId, (data) => {
  //       alert(data);
  //     });
  //   }
  // };
  // const sendStomp = () => {
  //   if (client != null) {
  //     if (!client.connected) return;

  //     client.publish({
  //       destination: "/app/message",
  //       // body: JSON.stringify({
  //       //   message: message,
  //       // }),
  //       body: params.courseId,
  //     });
  //   }
  // };
  // const disconnectStomp = () => {
  //   if (client != null) {
  //     if (client.connected) client.deactivate();
  //   }
  // };
  const commuteGetItineraryDate = (courseId, day) => {
    // 일정 날짜 조회
    fetch("/course/date?courseId="+courseId+"&day="+day)
    .then(res => {
      return res.json();
    })
    .then((itineraryDateInfo) => {
      setThisPageDate(itineraryDateInfo.selectDate);
      setEndPageDate(itineraryDateInfo.endDate);
    })
  }
  const commuteGetItineraryInfo = (day) => {
    // 일정 정보 조회
    setLoading(true);
    fetch("/course/itinerary?courseId="+params.courseId+"&day="+day)
    .then((res)=>{
      return res.json();
    })
    .then((itinerayData)=>{
      setItineraryArray(itinerayData);
      setLoading(false);
    });
  }
  const commutePostCreateItinerary = (itineraryName, itineraryAddress, startTime, endTime, isHidden) => {
    // 일정 등록
    setInputItinerary({
      ...inputItinerary,
      inputItineraryName: itineraryName,
      inputItineraryAddress:itineraryAddress,
      inputItineraryStartTime:startTime,
      inputItineraryEndTime:endTime
    });
    console.log(itineraryLat);

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
          touristSpotAvgTime: 0,
          coordinateX: itineraryLat,
          coordinateY: itineraryLng,
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
        alert(itineraryName + '일정이 ' + startTime.substring(11,16) + '부터 ' + endTime.substring(11, 16) + '까지로 등록되었습니다.');
        commuteGetItineraryInfo(params.day);
      }
    });
  }
  const commutePutUpdateItinerary = (updateItineraryId, startTime, endTime) => {
    // 일정 수정
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
          touristSpotAvgTime: 0,
          coordinateX: '',
          coordinateY: '',
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
        alert('일정이 수정되었습니다.');
        commuteGetItineraryInfo(params.day);
      }
    });
  }
  const commuteDeleteItinerary = (inputItineraryId) => {
    // 일정 삭제
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
        alert('일정이 삭제되었습니다.');
        commuteGetItineraryInfo(params.day);
        setIsUpdateItineraryModal(false);
      }
    });
  }
  const commutePutSelectOverlapItinerary = (preId, selectedId) => {
    // 중복일정 선택
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
  const commutePutCourseUpdate = () => {
    // 코스 수정
    fetch("/course/update", {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId: Number(params.courseId),
        courseName: inputSettingCourse.inputCourseName,
        courseStartDate: inputSettingCourse.inputCourseStartDate,
        courseEndDate: inputSettingCourse.inputCourseEndDate,
        city: inputSettingCourse.inputCity,
        isCheck: false
      })
    })
    .then((res)=>{
      return res.json();
    })
    .then((courseId)=>{
      // 성공 시 courseId 반환
      if (courseId === -1) {
        alert('코스 재설정에 실패하였습니다.');
      }
      else {
        alert('코스가 재설정되었습니다. 다시 로그인해주세요.');
        navigate('../');  //로그인 페이지로
      }
    });
  }
  const commutePutCourseCheck = () => {
    // 코스 확정
    fetch("/course/check?courseId="+params.courseId, {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
      }
    })
    // .then((res)=>{
    //   return res.json();
    // })
    .then((ack)=>{
      // 
      if (ack) {
        alert('코스가 확정되었습니다.');
        navigate('../');  //로그인 페이지로
      }
      else {
        alert('코스 확정에 실패하였습니다.');
      }
    });
  }
  const commuteGetCourseInfo = () => {
    // 코스 정보 조회
    fetch("/course?courseId="+params.courseId)
    .then((res)=>{
      return res.json();
    })
    .then((courseInfo)=>{
      setThisCourseCity(courseInfo.city);
      setGroupId(courseInfo.group.groupId);
      setInputSettingCourse({
        inputCourseName: courseInfo.courseName,
        inputCourseStartDate: courseInfo.courseStartDate,
        inputCourseEndDate: courseInfo.courseEndDate,
        inputCity: courseInfo.city
      })
    });
  }
  const commuteDeleteGroup = () => {
    // 그룹 탈퇴
    fetch("/group/withdraw?groupId="+groupId, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json",
      }
    })
    // .then((res)=>{
    //   return res.json();
    // })
    .then((ack)=>{
      alert('탈퇴되었습니다.');
      // 
      // if (ack) {
      //   alert('코스가 확정되었습니다.');
        navigate('../');  //로그인 페이지로
      // }
      // else {
      //   alert('코스 확정에 실패하였습니다.');
      // }
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
  const onMouseOverList = () => {
    // setOverSearchList(!overSearchList);
  }
  const onMouseOverListOut = () => {
    // if(isOpenSearchList){
    //   setOverSearchList(!overSearchList);
    // }
  }
  const searchListHidden =()=> {  
      setISOpenSearchList(!isOpenSearchList);
  }
  const searchListHiddenOut =()=> {  
    if(overSearchList){
      setISOpenSearchList(!isOpenSearchList);
    }
    
}
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
        <CourseHeader thisCourseCity={thisCourseCity} onClickCourseSettingIcon={onClickCourseSettingIcon} linkToBack={'/main'} />
    
        <ContentDiv>
        <LeftScreenDiv>
          <SearchDiv>
            <SearchInput 
              type="text"
              placeholder='여행지를 입력하세요'
              onChange={onChangeSearch}
              onKeyPress={onKeyPressSearch}
              onMouseOver={searchListHidden}
              onMouseOut={searchListHiddenOut}
            />
              <SearchButton onClick={onClickSearch}>검색</SearchButton>
              <span style={{float: 'right', paddingRight: '10px', fontSize: '25px'}}> <BsFillPlusSquareFill onClick={() => onClickItineraryAddIcon()} /> </span>
            </SearchDiv>
            <MapDiv>          
                <MapContainer 
                  isOpenSearchList={isOpenSearchList} 
                  searchPlace={searchPlace}
                  setIsMarkerClicked={setIsMarkerClicked} 
                  setMarkerInfo={setMarkerInfo} 
                  thisCourseCity={thisCourseCity} 
                  onMouseOverList={onMouseOverList}
                  onMouseOverListOut ={ onMouseOverListOut} 
                ></MapContainer>
            </MapDiv>
          </LeftScreenDiv>

          <ItineraryDateScreenDiv>
            <div  style={{ width:"100%",display: "flex", justifyContent: "space-evenly"}}>
              <span> 
                {
                  // 1일차일 경우 일차 감소 클릭 방지
                  (params.day !== '1' ? (<Link to={linkDate(-1)}> <CgChevronLeftR /> </Link>) : (<CgChevronLeftR />))
                }
              </span>
              <ItineraryDateDiv>
                  <span>{thisPageDate} ({params.day}일차)</span>
              </ItineraryDateDiv>
              <span> 
                {
                  // 가장 마지막 일차일 경우 일차 증가 클릭 방지
                  (thisPageDate !== endPageDate ? (<Link to={linkDate(1)}> <CgChevronRightR /> </Link>) : <CgChevronRightR />)
                }
              </span>
            </div >
            <ItineraryScreenDiv style={isMarkerClicked ? {opacity: '0.5'} : {opacity: '1'}}>
                <RenderItineraryList 
                  itineraryArray={itineraryArray}
                  timeToStringFormat={timeToStringFormat}
                  colorList={colorList}
                  thisPageDate={thisPageDate}
                  onClickItinerary={ onClickItinerary}
                  onMouseOverItinerary={onMouseOverItinerary}
                  onMouseOutItinerary={onMouseOutItinerary}
                  onClickOverlap={ onClickOverlap}
                  onMouseOverOverlapItinerary={onMouseOverOverlapItinerary} 
                  isMarkerClicked={isMarkerClicked}
                />
            </ItineraryScreenDiv>
            {isMarkerClicked ? (<div style={{textAlign:'center', width: '380px'}}>일정을 등록하고자 하는 시간을 클릭하세요.</div>) : null}
          </ItineraryDateScreenDiv>

          <RightScreenDiv>
              {/* <RightScreenButton>히스토리</RightScreenButton>  */}
            <ButtonDiv>
              <RightScreenButton onClick={() => setIsMemoOpen(!isMemoOpen)}>메모</RightScreenButton>
            </ButtonDiv>
            <ButtonDiv>
              <Link to={'/photoAlbum/'+params.courseId+'/'+params.day}>
                <RightScreenButton>사진</RightScreenButton> 
              </Link>
            </ButtonDiv>
            <BlogSharchDiv>
              <BlogTitle>관광지 검색</BlogTitle>
              {/* <RightScreenButton>SNS</RightScreenButton> */}
              <RightScreenButton onClick={() => window.open('https://search.naver.com/search.naver?where=view&query='+CITY.find(item => item.value === thisCourseCity).name+' 관광지', '_blank')}>Blog</RightScreenButton>
            </BlogSharchDiv> 
            <ButtonDiv>
            {/* <Link to='/confirmCourse'> */}
              <RightScreenButton 
              onClick={() => onClickCourseConfirm()}
              >코스 확정</RightScreenButton> 
              {/* </Link> */}
            </ButtonDiv>
          </RightScreenDiv> 
        </ContentDiv>

        {/* 메모 오픈 */}
        {isMemoOpen && (
          <Memo setIsMemoOpen={setIsMemoOpen} isCheckCourse={isCheckCourse}/>
        )}

      {/* 중복 일정 리스트 */}
      { isOverlapItineraryModal &&
        <OverlapItineraryModal 
          isOverlapItineraryModal={  isOverlapItineraryModal}
          setIsOverlapItineraryModal={ setIsOverlapItineraryModal}
          overlapItineraryArray={overlapItineraryArrayState}
          onClickSetRepresentative={onClickSetRepresentative}
          representativeItineraryState={representativeItineraryState}
        />
      }

      
        {/* 일정 추가 Modal */}
        <AddItineraryModal
          HOURS={HOURS} MINUTES={MINUTES}
          isAddItineraryModal={ isAddItineraryModal}
          setIsAddItineraryModal={setIsAddItineraryModal}
          inputItinerary={inputItinerary}
          onChangeInputItinerary={onChangeInputItinerary}
          onClickAddItinerary={onClickAddItinerary}
          isAddItineraryByIcon={isAddItineraryByIcon}
          />

        {/* 일정 수정 Modal */}
        <UpdateItineraryModal
          HOURS={HOURS} MINUTES={MINUTES}
          isUpdateItineraryModal={isUpdateItineraryModal}
          setIsUpdateItineraryModal={setIsUpdateItineraryModal}
          inputItinerary={ inputItinerary}
          onChangeInputItinerary={ onChangeInputItinerary}
          onClickUpdateItinerary={onClickUpdateItinerary}
          onClickDeleteItinerary={onClickDeleteItinerary} 
        />
      
        {/* 코스 설정 Modal */}
        <CourseSettingModal
          isCourseSettingModalOpen={isCourseSettingModalOpen}
          setIsCourseSettingModalOpen={setIsCourseSettingModalOpen} 
          inputSettingCourse={inputSettingCourse}
          setInputSettingCourse={setInputSettingCourse}
          onChangeInputSettingCourse={onChangeInputSettingCourse}
          onClickSettingCourseModal={onClickSettingCourseModal}
          onClickDeleteGroup={onClickDeleteGroup}
          isCheckCourse={isCheckCourse}
        />
          
        {/* 중복 일정 툴팁, 마커 클릭 된 상태에서 띄우지 않음*/}
        {(!isMarkerClicked && 
          <OverlapItineraryTooltip
            overlapItineraryArray={overlapItineraryArrayState}
          />
        )}

        {/* 마커 클릭 후 일정 mouseover 툴팁 */}
        { (isMarkerClicked &&
          <ItineraryTimeTooltip
            thisItineraryTime={thisItineraryTime}
          />
        )}

        {/* 일정 정보 툴팁, 마커 클릭 된 상태에서 띄우지 않음 */}
        {(!isMarkerClicked && representativeItineraryState) ? (
          <ItineraryInfoTooltip
            itinerary={representativeItineraryState}
          />
        ) : null}
      </MainScreenDiv>
    )}

  </>
  )
};

// styled components
// div
const MainScreenDiv = styled.div`
position: absolute; 
background-color:	#F5F5F5;
width:100%;
height: 100vh;
`;
const ItineraryDateScreenDiv = styled.div`

  position:fixed;
margin-left:60%;
  margin-top:1%;
`;

const ItineraryDateDiv = styled.div`
  background-color:white;
  width:40%;
  border-radius: 0.6rem;
  text-align :center;
  font-size:1.3rem;
  font-weight:600;
  padding:2%;
`;
const ContentDiv = styled.div`
  display: flex;
  padding-top:6%;
  background-color:	#F5F5F5;
  height: 100vh;
  position:fixed;
  
`;
const LeftScreenDiv = styled.div`
  width:900px;  
  margin-left: 7%;
`;
const ItineraryScreenDiv = styled.div`
  font-size:1rem;
  flex-basis: 50%;
  width: 480px;
  overflow-y: scroll;
  background-color:	white;
  height: 75vh;
  margin-top: 3%;
  box-shadow: 0px 0px 2px lightgray;
  border-radius: 0.6rem;
  &::-webkit-scrollbar {
    width:12px;
    border-radius:3%;
  }
  &::-webkit-scrollbar-thumb {
    background-color: lightgray ;
    border-radius:6px;
    background-clip: padding-box;
    border: 1px solid transparent;
  }
  &::-webkit-scrollbar-corner{
    background-color:#F5F5F5 ;
  }
  
`;
const RightScreenDiv = styled.div`
position:fixed;
margin-left:92%;
  margin-top: 2%;
  height: 100vh;
  text-align: center;
  z-index:1;
`;
const SearchDiv = styled.div`
  margin-bottom:2%;
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
  font-size:1.2rem;
  margin-bottom:5%;
`;
// input
const SearchInput = styled.input`
  border-radius: 0.30rem;
  line-height: 2;
  border: 1px solid lightgray;
  width:350px;
  height: 40px;
  box-shadow: 0px 0px 2px lightgray;
  margin-left: 2%;
  font-size: 1.2rem;
`;

// button
const SearchButton = styled.button`
  background-color:#FFFFFF;
  border-radius: 0.30rem;
  font-size: 1.1rem;
  height: 40px;
  width:15%;
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
font-size: 1.1rem;
line-height: 1.6;
width:100%;
height:40px;
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