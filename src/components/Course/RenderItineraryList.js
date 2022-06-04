import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import RenderItineraryMinutesList from './RenderItineraryMinutesList';
  const RenderItineraryList = ({ itineraryArray,timeToStringFormat, colorList, thisPageDate, onClickItinerary,onMouseOverItinerary, onMouseOutItinerary,onClickOverlap,onMouseOverOverlapItinerary}) => {
    const renderResult = [];
    const HOURS = 24;

    for (let hour = 0; hour < HOURS; hour++) {
      renderResult.push(
        <div style={{display: 'flex', height: '60px', width:'100%'}}>
          <span style={{flexBasis: '20%', textAlign: 'right', marginRight: '5px', marginLeft: '-5px', marginTop: '-13px'}}>
            {hour !== 0 ? (
               <>{hour} : 00</>
              ) : null}
              <span style={{}}></span>
            </span>
          <span style={{flexBasis: '110%'}}>
              <RenderItineraryMinutesList 
                hour={hour}
                itineraryArray={itineraryArray}
                timeToStringFormat={timeToStringFormat}
                colorList={colorList}
                thisPageDate={thisPageDate}
                onClickItinerary={ onClickItinerary}
                onMouseOverItinerary={onMouseOverItinerary}
                onMouseOutItinerary={onMouseOutItinerary}
                onClickOverlap={ onClickOverlap}
                onMouseOverOverlapItinerary={onMouseOverOverlapItinerary}
              />
            </span>
        </div>
      );
    }

    return renderResult;
  }
  
  export default RenderItineraryList;