import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

const OverlapItineraryModal = props => {

  const {
    isOverlapItineraryModal,
    setIsOverlapItineraryModal,
    thisItinerary,
    overlapItineraryArray,
    onClickSetRepresentative,
    representativeItineraryState
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
     
        <div style={{}}>
          <ContentBox>
            <div>&lt;대표 일정&gt;</div>
            <div style={{textAlign: 'center', margin: '10px', fontSize:'0.9rem'}}>{(Object.keys(representativeItineraryState).length !== 0 && representativeItineraryState.touristSpot.touristSpotName)}</div>
          </ContentBox>
          <ContentBox>
            <div>&lt;중복 일정&gt;</div>
            <div style={{display: 'flex'}}>
              {overlapItineraryArray.map((overlapItinerary, overlapItineraryIndex) => (
                <span style={{margin: '10px', fontSize:'1.2rem', fontWeight:'100'}}>
                  <div style={{textAlign: 'center'}}>{overlapItinerary.touristSpot.touristSpotName}</div>
                  <OptionButton onClick={() => onClickSetRepresentative(representativeItineraryState.itineraryId, overlapItinerary.itineraryId)}>대표 일정으로 설정</OptionButton>
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
display: flex;
 border-radius:5px;
 padding: 2%;
 border: 1px solid  #4D9FE3;
box-shadow: 0px 0px 2px lightgray;
font-weight: bold;
font-size:1.2rem;
margin:5%;
`;

const OptionButton = styled.button`
margin:5%;
width:100%;
font-size:1.1rem;
line-height: 1.6;
border: 1px solid;
border-radius: 0.30rem;
background-color: #ffffff;
color: #4D9FE3
border: 1px solid  #4D9FE3;
box-shadow: 0 0 2px lightgray;
&:hover{  
      border: 1px solid  gray;
      box-shadow: 0 0 3px  gray;
}
`;

export default OverlapItineraryModal;