import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import Modal from 'react-modal';

import InputForm from '../../components/InputForm';
import SelectTime from '../../components/Course/SelectTime';

  // Modal
  // 일정 추가 모달
  const AddItineraryModal =({HOURS,MINUTES, isAddItineraryModal,setIsAddItineraryModal,inputItinerary,onChangeInputItinerary, onClickAddItinerary}) => {

  return (
    <Modal 
      ariaHideApp={false} // allElement 경고창 제거
      isOpen={isAddItineraryModal} 
      onRequestClose={() => setIsAddItineraryModal(false)}
      style={{
        overlay: {
          position: 'fixed',
          zIndex: '5'
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
       <div   style={{margin: '3%' }}></div>  
       <InputForm label={'일정 이름'} name="inputItineraryName" value={inputItinerary.inputItineraryName} onChange={onChangeInputItinerary} />
        <InputForm label={'주소'} name="inputItineraryAddress" value={inputItinerary.inputItineraryAddress} onChange={onChangeInputItinerary} />
        <TimeDiv>
         <SelectTime HOURS ={HOURS} MINUTES={MINUTES} inputItinerary={inputItinerary} onChangeInputItinerary={onChangeInputItinerary} />
        </TimeDiv>
        <InputForm label={'상세 정보'}name="inputItineraryDetail" value={inputItinerary.inputItineraryDetail} onChange={onChangeInputItinerary} />
        <InputForm label={'예상 비용'}  type='number' name="inputItineraryCost" value={inputItinerary.inputItineraryCost} onChange={onChangeInputItinerary} />

        <ButtonDiv>
          <OptionButton   backgroundColor={'#4D9FE3'} color={'#FFFFFF'}  onClick={()=> onClickAddItinerary()}>일정 생성</OptionButton>
          <OptionButton  backgroundColor={'#FFFFFF'} color={'#4D9FE3'} onClick={() => setIsAddItineraryModal(false)}>취소</OptionButton>
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
  export default  AddItineraryModal;