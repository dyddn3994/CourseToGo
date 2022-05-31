import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
  const RenderItineraryMinutesList = (
      {hour, itineraryArray,formatTime, colorList, thisPageDate, onClickItinerary,onMouseOverItinerary, onMouseOutItinerary,onClickOverlap,onMouseOverOverlapItinerary}) => {
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
          }
          else {
            renderColor = colorList[itinerary.itineraryColor];
            thisItinerary = itinerary;
            representativeStartTimeFormat = formatTime(thisItinerary.itineraryStartTime.substring(11, 13), thisItinerary.itineraryStartTime.substring(14, 16));
            representativeEndTimeFormat = formatTime(thisItinerary.itineraryEndTime.substring(11, 13), thisItinerary.itineraryEndTime.substring(14, 16));
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
            backgroundColor: (isRenderColor && renderColor),
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
          {isTitlePosition && itineraryTitle}
          {(isHidden && isTitlePosition) && 
          <>
            <span 
              style={{
                float: 'right',
                marginRight: '5px', 
                color:'#FF0000',
                fontWeight :'600'
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
  export default RenderItineraryMinutesList;