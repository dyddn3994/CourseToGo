import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import RenderItineraryMinutesList from './RenderItineraryMinutesList';
  const RenderItineraryList = ({renderItineraryMinutesList}) => {
    const renderResult = [];
    const HOURS = 24;

    for (let hour = 0; hour < HOURS; hour++) {
      renderResult.push(
        <div style={{display: 'flex', height: '60px'}}>
          <span style={{flexBasis: '20%', textAlign: 'right', marginRight: '5px', marginLeft: '-5px', marginTop: '-13px'}}>{hour} : 00</span>
          {/* <span style={{flexBasis: '110%' , paddingTop: (hour === 0 && '10px')}}> -- {renderItineraryMinutesList(hour)}</span> */}
          <span style={{flexBasis: '110%'}}>
              {/* <RenderItineraryMinutesList  /> */}
              {renderItineraryMinutesList(hour)}</span>
        </div>
      );
    }

    return renderResult;
  }
  export default RenderItineraryList;