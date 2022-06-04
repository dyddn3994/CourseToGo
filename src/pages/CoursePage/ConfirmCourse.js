
import React, { useState, useEffect, useRef } from 'react';
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
import Memo from '../../components/Course/Memo.js'
import OverlapItineraryTooltip from '../../components/Course/OverlapItineraryTooltip';
import ItineraryTimeTooltip from '../../components/Course/ItineraryTimeTooltip';
import UpdateItineraryModal from './UpdateItineraryModal';
import CourseHeader from '../../components/CourseHeader';
import ConfirmItinerartDates from '../../components/Course/ConfirmItinerartDates';
import CourseSettingModal from './CourseSettingModal';
import CITY from '../../assets/City/City';

// 사용자별 색 인덱스에 따라 색 지정
const colorList = [
  '#aadc8e',
  '#FCCCD4',
  '#FBDEA2',
  '#BDECB6'
]
const HOURS = Array(24).fill().map((v, i)=>i);
const MINUTES = Array(6).fill().map((v, i)=>i*10);

var client = null; // stomp 연결용
var stompClient = null;

const ConfirmCourse= () => {
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

    rendItineraryDates();
  }, [params]);


  const [thisPageDate, setThisPageDate] = useState('2021-09-12'); // 현재 일정 날짜
  const [endPageDate, setEndPageDate] = useState(''); // 마지막 일정 날짜
  const [thisCourseCity, setThisCourseCity] = useState('Busan'); // 코스 도시 정보
  const [groupId, setGroupId] = useState(0); // 그룹 id

  const [itineraryArray, setItineraryArray] = useState([]);  

  const [overlapItineraryArrayState, setOverlapItineraryArrayState] = useState([]);
  const [representativeItineraryState, setRepresentativeItineraryState] = useState({});
  const [thisItineraryTime, setThisItineraryTime] = useState(''); // 마커 클릭 후 일정에 mouseover시 표현할 툴팁 내 시간
  const [isMemoOpen, setIsMemoOpen] = useState(false); // 메모 열기 임시 state

  const [isUpdateItineraryModal, setIsUpdateItineraryModal] = useState(false); // 일정 수정 모달
  const [isOverlapItineraryModal, setIsOverlapItineraryModal] = useState(false); // 중복일정 모달
  const [isCourseSettingModalOpen, setIsCourseSettingModalOpen] = useState(false); // 코스 설정 모달

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
    inputItineraryCost:0 // 일정 추가 일정 비용 input
  });
  const { inputItineraryId,inputItineraryName, inputItineraryAddress, inputItineraryStartTime,  inputItineraryEndTime,
    inputItineraryStartTimeHour, inputItineraryStartTimeMinute,  inputItineraryEndTimeHour,inputItineraryEndTimeMinute,inputItineraryHidden, inputItineraryDetail, inputItineraryCost }= inputItinerary;
  
  const [inputSettingCourse, setInputSettingCourse] = useState({
    // 코스 설정 Modal용 input
    inputCourseName: '',
    inputCourseStartDate: '',
    inputCourseEndDate: '',
    inputCity: ''
  });


  const [loading, setLoading] = useState(true); // 화면 로딩. true일때 로딩 애니메이션 render

  const [itineraryDates, setItineraryDates] = useState([]);
  // const [isOverlapMouseOver, setIsOverlapMouseOver] = useState(false);

  // onChange
  const rendItineraryDates = () => {
    console.log('date', endPageDate);
    for (var i = 1;thisPageDate <= endPageDate ;  i++) {
      commuteGetItineraryInfo(i);
      commuteGetItineraryDate(i+1);
    } 
    console.log('list', itineraryDates);   
    return itineraryDates;
  }

  const onChangeInputSettingCourse = e => {
    const { value, name } = e.target;
    setInputSettingCourse({
      ...inputSettingCourse,
      [name]: value
    });
  }

  const onClickOverlap = ( e, thisItinerary ) => {
    e.stopPropagation();  // 부모 요소 클릭 방지
    setIsOverlapItineraryModal(true);
  }

  const onClickSettingCourseModal = () => {
    // 코스 설정 Modal 설정 확인 클릭
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

const onMouseOverOverlapItinerary = (representativeItinerary, overlapItineraryStartTime) => {
  // 중복 일정 숫자에 마우스 올리면 
  const overlapItineraryArray = itineraryArray.filter(itinerary => (((itinerary.itineraryStartTime === overlapItineraryStartTime) && (itinerary.itineraryHidden)) && itinerary))
  setOverlapItineraryArrayState(overlapItineraryArray);
  setRepresentativeItineraryState(representativeItinerary);
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
      setItineraryDates([...itineraryDates, itinerayData]);
      setItineraryArray(itinerayData);
      setLoading(false);
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
        commuteGetItineraryInfo(params.day);
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
      // mapContainerRef.current.setMapCity(courseInfo.city);
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
      alert(ack);
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
        <CourseHeader inputCourseName={thisCourseCity} onClickCourseSettingIcon={onClickCourseSettingIcon} linkToBack={'/main'} />
        <ContentDiv>
    
           <ItineraryScreen>
            <ConfirmItinerartDates itineraryDates={itineraryDates}
                          timeToStringFormat={timeToStringFormat}
                          colorList={colorList}
                          // onClickItinerary={onClickItinerary}
                          onClickOverlap={ onClickOverlap}
                          onMouseOverOverlapItinerary={onMouseOverOverlapItinerary} />
           </ItineraryScreen>
          <RightScreenDiv>
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
              <RightScreenButton onClick={() => window.open('https://search.naver.com/search.naver?where=view&query='+CITY.find(item => item.value === thisCourseCity).name+' 관광지', '_blank')}>Blog</RightScreenButton>
            </BlogSharchDiv> 
          </RightScreenDiv> 
        </ContentDiv>

        {/* 메모 오픈 */}
        {isMemoOpen && (
          <Memo setIsMemoOpen={setIsMemoOpen}/>
        )}

        {/* 일정 수정 Modal */}
        <UpdateItineraryModal
          HOURS={HOURS} MINUTES={MINUTES}
          isUpdateItineraryModal={isUpdateItineraryModal}
          setIsUpdateItineraryModal={setIsUpdateItineraryModal}
          inputItinerary={ inputItinerary}
          // onChangeInputItinerary={ onChangeInputItinerary}
          // onClickUpdateItinerary={onClickUpdateItinerary}
          // onClickDeleteItinerary={onClickDeleteItinerary} 
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
        />
          
    
            <OverlapItineraryTooltip
              overlapItineraryArray={overlapItineraryArrayState}
            />
  

      
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

const ItineraryScreen = styled.div`
  position:fixed;
  width:80%;
  height: 80vh;
  display:flex;
  overflow-y: scroll;
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

export default ConfirmCourse;
