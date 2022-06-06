import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

import InputForm from '../../components/InputForm';
import SelectTime from '../../components/Course/SelectTime';

//일정 수정 모달
const UpdateItineraryModal =({MINUTES,HOURS,isUpdateItineraryModal,setIsUpdateItineraryModal,inputItinerary,
                          onChangeInputItinerary,onClickUpdateItinerary,onClickDeleteItinerary  })=> {
  return(
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
          left: '340px',
          right: '340px',
          bottom: '200px',
          borderRadius: '1rem',
          boxShadow: '0px 0px 4px lightgray',
        }
      }}
    >
      <MainDiv>
        <div style={{margin: '3%' }}></div>  
        <InputFormDiv>
          <InputLabel>
            <label>일정 이름</label> 
          </InputLabel>
          <FormDiv>
            <Form>{inputItinerary.inputItineraryName}</Form>
          </FormDiv>    
        </InputFormDiv>
        {inputItinerary.inputItineraryAddress !== '' ? (
          <InputFormDiv>
            <InputLabel>
              <label>주소</label> 
            </InputLabel>
            <FormDiv>
              <Form>{inputItinerary.inputItineraryAddress}</Form>
            </FormDiv>    
          </InputFormDiv>
        ) : null}
        <TimeDiv>
          <SelectTime HOURS ={HOURS} MINUTES={MINUTES} inputItinerary={inputItinerary} onChangeInputItinerary={onChangeInputItinerary} />
        </TimeDiv>
        <InputForm label={'상세 정보'}name="inputItineraryDetail" value={inputItinerary.inputItineraryDetail} onChange={onChangeInputItinerary} />
        <InputForm label={'예상 비용'}  type='number' name="inputItineraryCost" value={inputItinerary.inputItineraryCost} onChange={onChangeInputItinerary} />

        <ButtonDiv>
            <OptionButton   backgroundColor={'#4D9FE3'} color={'#FFFFFF'} onClick={onClickUpdateItinerary}>일정 수정</OptionButton>
            <OptionButton  backgroundColor={'#FFFFFF'} color={'#4D9FE3'}  onClick={onClickDeleteItinerary}>일정 삭제</OptionButton>
            <OptionButton backgroundColor={'#FFFFFF'} color={'#4D9FE3'}  onClick={() => setIsUpdateItineraryModal(false)}>취소</OptionButton>
        </ButtonDiv>
      </MainDiv>
    </Modal>
  );
    };
    const MainDiv= styled.div`
    text-align: center;
`;

const TimeDiv= styled.div`
margin-right:32%;
`;

    const ButtonDiv= styled.div`
      height:10%;
      text-align: center;
`;
    const OptionButton = styled.button`
    margin:5%;
    width:15%;
    font-size:1.2rem;
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


const InputFormDiv =  styled.div`
  width:70%;
  height:100%;
  display : flex; 
  justify-content: space-around;
  margin-left:12%;
  font-size:1.2rem;
`;

const Form = styled.span`
  font-size:1.2rem;
`;

const FormDiv=  styled.div`
  width:80%; 
  margin-bottom:3%;
  margin-left:10%;
`;
const InputLabel =  styled.div`
  width:40%;
  font-size:1.2rem;
`;

export default UpdateItineraryModal;