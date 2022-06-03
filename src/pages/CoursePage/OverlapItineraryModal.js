import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

const OverlapItineraryModal = props => {

  const {
    isOverlapItineraryModal,
    setIsOverlapItineraryModal,
    thisItinerary,
    overlapItineraryArray,
    onClickSetRepresentative
  } = props;

  return (
    <Modal 
      ariaHideApp={false} // allElement 경고창 제거
      isOpen={isOverlapItineraryModal} 
      onRequestClose={() => setIsOverlapItineraryModal(false)}
      style={{
        overlay: {
          position: 'fixed',
          zIndex: '2'
        },
        content: {
          top: '200px',
          left: '340px',
          right: '340px',
          bottom: '200px',
          borderRadius: '1rem',
          boxShadow: '0px 0px 4px lightgray',  
          backgroundColor:	'white',
        }
      }}
    >
      <>
        <div>중복 일정 리스트</div>
        <div style={{display: 'flex'}}>
          <ContentBox>
            <div>&lt;대표 일정&gt;</div>
            <div style={{textAlign: 'center', margin: '10px', fontSize:'0.9rem'}}>{(Object.keys(thisItinerary).length !== 0 && thisItinerary.touristSpot.touristSpotName)}</div>
          </ContentBox>
          <ContentBox>
            <div style={{textAlign: 'center'}}>&lt;중복 일정&gt;</div>
            <div style={{display: 'flex'}}>
              {overlapItineraryArray.map((overlapItinerary, overlapItineraryIndex) => (
                <span style={{margin: '10px', fontSize:'0.9rem'}}>
                  <div style={{textAlign: 'center'}}>{overlapItinerary.touristSpot.touristSpotName}</div>
                  <button onClick={() => onClickSetRepresentative(thisItinerary.itineraryId, overlapItinerary.itineraryId)}>대표 일정으로 설정</button>
                </span>
              ))}
            </div>
          </ContentBox>
        </div>
      </>
    </Modal>
  )
}
const ContentBox = styled.span`
margin: 1%;
 border-radius:5px;
 padding: 2%;
 border: 1px solid  #4D9FE3;
box-shadow: 0px 0px 2px lightgray;
font-weight: bold;

&:hover{  
  border: 1px solid  gray;
  box-shadow: 0 0 2px  gray;
}
`;
export default OverlapItineraryModal;