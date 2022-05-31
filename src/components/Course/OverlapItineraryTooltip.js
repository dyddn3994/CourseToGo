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
      place='right'
      effect='solid'
      type='dark'
      // getContent={dataTip => 'sss' + dataTip}
    >
      <div>동일 시간대 중복 일정</div>
      {overlapItineraryArray.map((overlapItinerary, overlapItineraryIndex) => (
        <div>{overlapItineraryIndex+1}. {overlapItinerary.touristSpot.touristSpotName}</div>
      ))}
    </ReactTooltip>
  )
}

export default OverlapItineraryTooltip;