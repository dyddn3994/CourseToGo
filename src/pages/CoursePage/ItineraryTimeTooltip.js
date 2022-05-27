import React, { useState } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

const ItineraryTimeTooltip = props => {

  const {
    thisItineraryTime
  } = props;

  return (
    <ReactTooltip
      id='itineraryTimeTooltip'
      place='right'
      effect='solid'
      type='dark'
      // getContent={dataTip => 'sss' + dataTip}
    >
      <div>{thisItineraryTime}</div>
    </ReactTooltip>
  )
}

export default ItineraryTimeTooltip;