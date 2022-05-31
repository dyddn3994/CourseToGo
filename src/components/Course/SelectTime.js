import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

import SelectTimeItem from './SelectTimeItem';

  // Modal
  // 일정 추가 모달
  const SelectTime =({HOURS,MINUTES,inputItinerary,onChangeInputItinerary}) => {

  return (
    <div>
       <InputFormDiv>
        <InputLabel>   <label>시작 시간</label>   </InputLabel>
        <SelectTimeItem TIME={HOURS} onChangeInputItinerary={onChangeInputItinerary} name="inputItineraryStartTimeHour"  value={inputItinerary.inputItineraryStartTimeHour} />
        시
        &nbsp; {/* 공백 */}
        <SelectTimeItem TIME={MINUTES} onChangeInputItinerary={onChangeInputItinerary}name="inputItineraryStartTimeMinute"  value={inputItinerary.inputItineraryStartTimeMinute} />
        분
        </InputFormDiv>
        <InputFormDiv>
      <InputLabel>   <label>종료 시간</label>   </InputLabel>
        <SelectTimeItem TIME={HOURS} onChangeInputItinerary={onChangeInputItinerary} name="inputItineraryEndTimeHour"  value={inputItinerary.inputItineraryEndTimeHour} />
        시
        &nbsp; {/* 공백 */}
        <SelectTimeItem TIME={MINUTES} onChangeInputItinerary={onChangeInputItinerary}name="inputItineraryEndTimeMinute"  value={inputItinerary.inputItineraryEndTimeMinute} />
        분
        </InputFormDiv>
      </div>
  );
    };
    const InputLabel =  styled.div`
    margin-left:6%;
    font-size:0.9rem;
    width:90%;
  `;
  const InputFormDiv =  styled.div`
  width:70%;
  height:100%;
  display : flex; 
  justify-content: space-around;
  
  font-size:0.9rem;
  margin:2%;
`;
  export default SelectTime;