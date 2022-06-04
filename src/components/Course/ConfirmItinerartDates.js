import React, { useState } from "react";
import styled, { css } from 'styled-components';
import RenderItineraryList from './RenderItineraryList';
const ConfirmItinerartDates = ({itineraryDates,
    timeToStringFormat,
    colorList,
    onMouseOverItinerary,
    onMouseOutItinerary,
    onClickOverlap,
    onMouseOverOverlapItinerary }) => {
        const renderResult = [];
    
  
        <div>
            {itineraryDates.map((itineraryDate, index) => {
               renderResult.push(
                   <div>
                   <div>{index+1}</div>
                <ItineraryScreenDiv >
                    
                <RenderItineraryList 
                  itineraryArray={itineraryDate}
                  timeToStringFormat={timeToStringFormat}
                  colorList={colorList}
                  thisPageDate={index+1}
                //   onClickItinerary={onClickItinerary}
                  onMouseOverItinerary={onMouseOverItinerary}
                  onMouseOutItinerary={onMouseOutItinerary}
                  onClickOverlap={ onClickOverlap}
                  onMouseOverOverlapItinerary={onMouseOverOverlapItinerary} 
                  key={index}/>
                </ItineraryScreenDiv>
                </div>
               );
            })}
          </div>
  
    
        return renderResult;
        
//   return (
//     <>

//       <div>
//         {itineraryDates.map((itineraryDate, index) => {
//           return (
//             <ItineraryScreenDiv >
//             <RenderItineraryList 
//               itineraryArray={itineraryDate}
//               timeToStringFormat={timeToStringFormat}
//               colorList={colorList}
//               thisPageDate={index+1}
//             //   onClickItinerary={onClickItinerary}
//               onMouseOverItinerary={onMouseOverItinerary}
//               onMouseOutItinerary={onMouseOutItinerary}
//               onClickOverlap={ onClickOverlap}
//               onMouseOverOverlapItinerary={onMouseOverOverlapItinerary} 
//               key={index}/>
//             </ItineraryScreenDiv>
//           );
//         })}
//       </div>
//     </>
//   );
};
const ItineraryScreenDiv = styled.div`

  font-size:1.1rem;
  width: 450px;
  overflow-y: scroll;
  background-color:	white;
  height: 75vh;
  margin-top: 3%;
  box-shadow: 0px 0px 2px lightgray;
  border-radius: 0.6rem;
  &::-webkit-scrollbar {
    width:12px;
    border-radius:3%;
  }
  &::-webkit-scrollbar-thumb {
    background-color: lightgray ;
    border-radius:6px;
    background-clip: padding-box;
    border: 1px solid transparent;
  }
  &::-webkit-scrollbar-corner{
    background-color:#F5F5F5 ;
  }
  
`;
export default ConfirmItinerartDates;
