import React, { useState, useRef } from "react";
import styled, { css } from 'styled-components';

import Modal from 'react-modal';
import InputForm from '../InputForm';
import DatePickerItem from "./DatePickItem";
import SelectRegion from "./SelectRegion";

import CITY from "../../assets/City/City";
const CourseCreateModal = ({isCourseCreateModalOpen, setIsCourseCreateModalOpen,  inputCreateCourse,setInputCreateCourse, onChangeInputCreatCourse ,onClickCreateCourseModal  }) => {
 
      const [openDatePicker, setOpenDatePicker] = useState(false);
      const [startDate, setStartDate] = useState('');
      const [endDate, setEndDate] = useState('');

      const showDatePicker = () => {
            setOpenDatePicker(!openDatePicker);
      }
      
    const onDateStringSetting = (start, end) =>{    //선택된 날짜 문자열로 출력
      if(start&&end){
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
      else{
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
      
      if(end!==null){
        setInputCreateCourse({
          ...inputCreateCourse,
          inputCourseStartDate:start.getFullYear() + '-'+startMonth+'-'+startDate ,
          inputCourseEndDate:end.getFullYear() + '-'+endMonth+'-'+endDate
        });
      }
     
      onDateStringSetting(start, end);  //날짜 String으로

      if(start&&end) {    // 마지막일 클릭시 datepicker 사라짐
          showDatePicker();
      }

  }

      const [dateSet, setDateSet] = useState({start:'', end:''}); // 문자열로 날짜 넣을 곳

      // 지역 선택 시
      const selectOnChange = (e) => {
		console.log(e.target.value);
            setInputCreateCourse({
                  ...inputCreateCourse,
                  inputCity:e.target.value
            });
	};

      return (
      <Modal 
      ariaHideApp={false} // allElement 경고창 제거
      isOpen={isCourseCreateModalOpen} 
      onRequestClose={() => setIsCourseCreateModalOpen(false)}
      style={{
        overlay: {
          position: 'fixed'
        },
        content: {
          top: '120px',
          left: '340px',
          right: '340px',
          bottom: '170px',
          borderRadius: '1rem',
          boxShadow: '0px 0px 4px lightgray',
        }
      }}
    >
      <MainDiv>
            <div   style={{margin: '3%' }}>추가할 코스의 정보를 입력하세요.</div>
            <InputDiv>
                  <InputLabel>코스 명</InputLabel>
                  <FormDiv>
                        <Form  name="inputCourseName" value={inputCreateCourse.inputCourseName} onChange={onChangeInputCreatCourse } /> 
                  </FormDiv>    
            </InputDiv>
      
            <InputDiv>
                  <InputLabel>여행 날짜</InputLabel>
                  <DateFormDiv>
                        <DateButton onClick={showDatePicker}>날짜 선택</DateButton>
                        {endDate === '' ? null :
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
                   endDate={endDate} />
            <InputDiv>
                  <InputLabel>지역</InputLabel>
                  <FormDiv>
                        <SelectRegion options={CITY} selectOnChange={selectOnChange} defaultValue="seoul"/>
                  </FormDiv>
            </InputDiv>
            <ButtonDiv>
                  <OptionButton backgroundColor={'#4D9FE3'} color={'#FFFFFF'} onClick={onClickCreateCourseModal}>코스 추가</OptionButton>
                  <OptionButton backgroundColor={'#FFFFFF'} color={'#4D9FE3'} onClick={() => setIsCourseCreateModalOpen(false)}>취소</OptionButton>
            </ButtonDiv>
      </MainDiv>
    </Modal>
  );
};

const MainDiv= styled.div`
      text-align: center;
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
`;

const Form = styled.input`
      border-radius: 0.30rem;
      line-height: 2;
      border: 1px solid lightgray;
      width:80%;
      box-shadow: 0px 0px 2px lightgray;
`;

const FormDiv=  styled.div`
      width:90%; 
      margin-bottom:2%;
      margin-left:10%;
`;

const DateFormDiv=  styled.div`
      display: flex;
      width:120%; 
      margin-bottom:2%;
    
      justify-content: space-between;
`;
const InputLabel =  styled.div`
      width:40%;
      font-size:0.9rem;
`;

const OptionButton = styled.button`
      margin:5%;
      width:15%;
      font-size:0.9rem;
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
`;


const DateButton = styled.button`
margin-left:24%;
      width:25%;
      height:1.8rem;
      font-size:0.7rem;
      border: 1px solid;
      border-radius: 0.30rem;
      background-color: #ffffff; 
      border: 1px solid  lightgray;
      box-shadow: 0 0 1px lightgray;
      font-weight: bold;
      &:hover{  
            border: 1px solid  gray;
            box-shadow: 0 0 3px  gray;
      }
`;


export default CourseCreateModal;