import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import Modal from 'react-modal';

import InputForm from '../../components/InputForm';

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
          zIndex: '2'
        },
        content: {
          top: '100px',
            left: '340px',
            right: '340px',
            bottom: '100px',
            borderRadius: '1rem',
            boxShadow: '0px 0px 4px lightgray',
        }
      }}
    >
     <MainDiv>
        <div   style={{margin: '3%' }}></div>  
        <InputForm label={'일정 이름'} name="inputItineraryName" value={inputItinerary.inputItineraryName} onChange={onChangeInputItinerary} />
        <InputForm label={'주소'} name="inputItineraryAddress" value={inputItinerary.inputItineraryAddress} onChange={onChangeInputItinerary} />
        <div>
        <span>시작 시간 : </span>
        <select onChange={onChangeInputItinerary}  name="inputItineraryStartTimeHour"  value={inputItinerary.inputItineraryStartTimeHour}>
          {HOURS.map((hour) => (
            <option value={hour} key={hour}>
              {hour}
            </option>
          ))}
        </select>시
        &nbsp; {/* 공백 */}
        <select onChange={onChangeInputItinerary}  name="inputItineraryStartTimeMinute"  value={inputItinerary.inputItineraryStartTimeMinute}>
          {MINUTES.map((minute) => (
            <option value={minute} key={minute}>
              {minute}
            </option>
          ))}
        </select>분
      </div>
      <div>
        <span>종료 시간 : </span>
        <select onChange={onChangeInputItinerary}  name="inputItineraryEndTimeHour"  value={inputItinerary.inputItineraryEndTimeHour}>
          {HOURS.map((hour) => (
            <option value={hour} key={hour}>
              {hour}
            </option>
          ))}
        </select>시
        &nbsp; {/* 공백 */}
        <select onChange={onChangeInputItinerary}  name="inputItineraryEndTimeMinute"  value={inputItinerary.inputItineraryEndTimeMinute}>
          {MINUTES.map((minute) => (
            <option value={minute} key={minute}>
              {minute}
            </option>
          ))}
        </select>분
      </div>
        <InputForm label={'상세'}name="inputItineraryDetail" value={inputItinerary.inputItineraryDetail} onChange={onChangeInputItinerary} />
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
    const ButtonDiv= styled.div`
      height:10%;
      text-align: center;
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
  export default  AddItineraryModal;