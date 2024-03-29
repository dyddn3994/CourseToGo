import React, { useState } from "react";
import styled, { css } from 'styled-components';

import Modal from 'react-modal';

// components
import InputForm from "../../components/InputForm";
import DatePickerItem from "../../components/Main/DatePickItem";
import SelectRegion from "../../components/Main/SelectRegion";
import CITY from "../../assets/City/City";

const CourseSettingModal = (props) => {
  const { 
    isCourseSettingModalOpen, 
    setIsCourseSettingModalOpen,  
    inputSettingCourse,
    setInputSettingCourse, 
    onChangeInputSettingCourse,
    onClickSettingCourseModal,
    onClickDeleteGroup,
    isCheckCourse
  } = props;
  
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const showDatePicker = () => {
    setOpenDatePicker(!openDatePicker);
  }
      
  const onDateStringSetting = (start, end) =>{    //선택된 날짜 문자열로 출력
    if (start&&end) {
      const startDay = start.getFullYear().toString() + '-'
        + (start.getMonth() +1).toString() + '-'
        + start.getDate().toString() ;
      const endDay = end.getFullYear().toString() + '-'
        + (end.getMonth() +1).toString()  + '-'
        + end.getDate().toString();

      return setDateSet({
        start: startDay,
        end: endDay
      });
    }
    else {
        return
    }
  }
  
  const dateOnChange = (dates) =>{
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    const startMonthNum = start.getMonth()+1
    const endMonthNum = end.getMonth()+1

    const startMonth = (startMonthNum.toString().length === 1 ? '0'+String(startMonthNum) : String(startMonthNum))
    const startDate = (start.getDate().toString().length === 1 ? '0'+start.getDate() : start.getDate())
    const endMonth = (endMonthNum.toString().length === 1 ? '0'+String(endMonthNum) : String(endMonthNum))
    const endDate = (end.getDate().toString().length === 1 ? '0'+end.getDate() : end.getDate())
    

    if (end!==null) {
      setInputSettingCourse({
        ...inputSettingCourse,
        inputCourseStartDate:start.getFullYear() + '-'+startMonth+'-'+startDate ,
        inputCourseEndDate:end.getFullYear() + '-'+endMonth+'-'+endDate
      });
    }
    
    onDateStringSetting(start, end);  //날짜 String으로

    if(start&&end) {    // 마지막일 클릭시 datepicker 사라짐
      showDatePicker();
    }
  }

  const [dateSet, setDateSet] = useState({start:inputSettingCourse.inputCourseStartDate, end:inputSettingCourse.inputCourseEndDate}); // 문자열로 날짜 넣을 곳

  // 지역 선택 시
  const selectOnChange = (e) => {
		console.log(e.target.value);
    setInputSettingCourse({
      ...inputSettingCourse,
      inputCity: e.target.value
    });
	};

  return (
    <Modal 
      ariaHideApp={false} // allElement 경고창 제거
      isOpen={isCourseSettingModalOpen} 
      onRequestClose={() => setIsCourseSettingModalOpen(false)}
      style={{
        overlay: {
          position: 'fixed',
          zIndex: '5'
        },
        content: {
          top: '200px',
          left: '380px',
          right: '380px',
          bottom: '200px',
          borderRadius: '1rem',
          boxShadow: '0px 0px 4px lightgray',
        }
      }}
    >
      <MainDiv>
      {!isCheckCourse ? (
        <>
          <div style={{margin: '3%' }}>수정할 코스의 정보를 입력하세요.</div>
          <InputDiv>
            <InputLabel>코스 명</InputLabel>
            <FormDiv>
              <CourseNameText  name="inputCourseName" value={inputSettingCourse.inputCourseName} onChange={onChangeInputSettingCourse } /> 
            </FormDiv>    
          </InputDiv>
    
          <InputDiv>
            <InputLabel style={{marginLeft:'2%'}}>여행 날짜</InputLabel>
            <DateFormDiv>
              <DateButton onClick={showDatePicker}>날짜 선택</DateButton>
              {dateSet.end === '' ? null :
              <DateResultView>
                {dateSet.start && dateSet.start} ~ {dateSet.end && dateSet.end}
              </DateResultView> }
            </DateFormDiv>   
          </InputDiv>
          <DatePickerItem   
            openDatePicker={openDatePicker}
            setOpenDatePicker={setOpenDatePicker}
            selected={startDate}
            onChange={dateOnChange}
            startDate={startDate}
            endDate={endDate} 
          />
          <InputDiv>
            <InputLabel>지역</InputLabel>
            <FormDiv>
              <SelectRegion options={CITY} selectOnChange={selectOnChange} defaultValue={inputSettingCourse.inputCity}/>
            </FormDiv>
          </InputDiv>
          <ButtonDiv>
            <OptionButton backgroundColor={'#4D9FE3'} color={'#FFFFFF'} onClick={onClickSettingCourseModal}>코스 설정</OptionButton>
            <OptionButton backgroundColor={'#FFFFFF'} color={'#4D9FE3'} onClick={() => setIsCourseSettingModalOpen(false)}>취소</OptionButton>
          </ButtonDiv>
        </>
      ) : (
        <>
          <div style={{margin: '3%' }}>코스 정보</div>
          <InputDiv>
            <InputLabel>코스 명</InputLabel>
            <FormDiv>
              <CourseNameText>{inputSettingCourse.inputCourseName}</CourseNameText> 
            </FormDiv>    
          </InputDiv>
    
          <InputDiv>
            <InputLabel style={{marginLeft:'2%'}}>여행 날짜</InputLabel>
            <DateFormDiv style={{marginLeft: '35%'}}>
              {dateSet.end === '' ? null :
              <DateResultView>
                {dateSet.start && dateSet.start} ~ {dateSet.end && dateSet.end}
              </DateResultView> }
            </DateFormDiv>   
          </InputDiv>
          <DatePickerItem   
            openDatePicker={openDatePicker}
            setOpenDatePicker={setOpenDatePicker}
            selected={startDate}
            onChange={dateOnChange}
            startDate={startDate}
            endDate={endDate} 
          />
          <InputDiv>
            <InputLabel>지역</InputLabel>
            <FormDiv>
              {inputSettingCourse.inputCity}
            </FormDiv>
          </InputDiv>
          <ButtonDiv>
            <OptionButton backgroundColor={'#FFFFFF'} color={'#4D9FE3'} onClick={() => setIsCourseSettingModalOpen(false)}>취소</OptionButton>
          </ButtonDiv>
        </>
      )}
        <ButtonDiv style={{marginTop: '-30px'}}>
          <OptionButton backgroundColor={'#FF0000'} color={'#FFFFFF'} onClick={onClickDeleteGroup}>그룹 탈퇴</OptionButton>
        </ButtonDiv>
      </MainDiv>
    </Modal>
  );
};

const MainDiv= styled.div`
  text-align: center;
  font-size:1.2rem;
`;
const DatePickerDiv= styled.div`
  margin-left:30%;
`;
const ButtonDiv= styled.div`
  height:10%;
  text-align: center;
`;
const InputDiv= styled.div`
  width:80%;
  height:100%;
  display : flex; 
  justify-content: space-around;
  margin-left:10%;
  margin-top:2%;
`;

const Form = styled.input`
  border-radius: 0.30rem;
  line-height: 2;
  border: 1px solid lightgray;
  width:80%;
  box-shadow: 0px 0px 2px lightgray;
  font-size:1.2rem;
`;

const CourseNameText = styled.span`
  font-size:1.2rem;
`

const FormDiv=  styled.div`
  width:90%; 
  margin-bottom:2%;
  margin-left:10%;
`;

const DateFormDiv=  styled.div`
  display: flex;
  width:120%; 
  margin-bottom:2%;
  font-size:1.2rem;
  justify-content: space-between;
`;
const InputLabel =  styled.div`
  width:40%;
  font-size:1.2rem;
`;

const OptionButton = styled.button`
  margin:5%;
  width:15%;
  font-size:1.3rem;
  line-height: 1.6;
  border: 1px solid;
  border-radius: 0.30rem;
  background-color: ${props => props.backgroundColor}; 
  color: ${props => props.color}; 
  border: 1px solid  #4D9FE3;
  box-shadow: 0 0 2px lightgray;
  font-weight: bold;
  &:hover{  
        border: 1px solid  gray;
        box-shadow: 0 0 3px  gray;
  }
`;
const DateResultView=  styled.div`
  width:70%;
  font-size:0.9rem;
  margin-top:2%;
  font-size:1.2rem;
`;


const DateButton = styled.button`
  margin-left:23%;
  width:25%;
  height:1.8rem;
  font-size:1.2rem;
  border: 1px solid;
  border-radius: 0.30rem;
  background-color: #ffffff; 
  border: 1px solid  lightgray;
  box-shadow: 0 0 1px lightgray;
  &:hover{  
        border: 1px solid  gray;
        box-shadow: 0 0 3px  gray;
  }
`;


export default CourseSettingModal;