import React, { useState } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

const OverlapItineraryTooltip = props => {

  const {
    overlapItineraryArray
  } = props;

  return (
    <ReactTooltip
      id='tooltip'
      place='bottom'
      effect='solid'
      type='dark'
      // getContent={dataTip => 'sss' + dataTip}
    >
      <div style={{fontSize:'1.2rem'}}>동일 시간대 중복 일정</div>
      {overlapItineraryArray.map((overlapItinerary, overlapItineraryIndex) => (
        <div style={{fontSize:'1.2rem'}}>{overlapItineraryIndex+1}. {overlapItinerary.touristSpot.touristSpotName}</div>
      ))}
    </ReactTooltip>
  )
}

export default OverlapItineraryTooltip;