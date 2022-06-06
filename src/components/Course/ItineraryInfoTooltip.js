import React, { useState } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

const ItineraryInfoTooltip = props => {

  const {
    itinerary
  } = props;

  return (
    <>
      {itinerary ? (
        <ReactTooltip
          id='itineraryInfoTooltip'
          place='top'
          effect='float'
          type='dark'
          // getContent={dataTip => 'sss' + dataTip}
        >
          <div style={{fontSize:'1.2rem'}}>일정 이름 : {itinerary.touristSpot.touristSpotName}</div>
          <div style={{fontSize:'1.2rem'}}>주소 : {itinerary.touristSpot.touristSpotAddress}</div>
          <div style={{fontSize:'1.2rem'}}>시작 시간 : {itinerary.itineraryStartTime.substring(11, 16)}</div>
          <div style={{fontSize:'1.2rem'}}>종료 시간 : {itinerary.itineraryEndTime.substring(11, 16)}</div>
          {!(itinerary.itineraryDetail === '') ? (
            <div style={{fontSize:'1.2rem'}}>상세 정보 : {itinerary.itineraryDetail}</div>
          ) : null}
          {!(itinerary.itineraryCost === 0) ? (
            <div style={{fontSize:'1.2rem'}}>예상 비용 : {itinerary.itineraryCost}</div>
          ) : null}
        </ReactTooltip>
      ) : null}
    </>
  )
}

export default ItineraryInfoTooltip;