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
          left: '200px',
          right: '200px',
          bottom: '200px',
          
          border: '1px solid',
        }
      }}
    >
      <>
        <div>중복 일정 리스트</div>
        <div style={{display: 'flex'}}>
          <span style={{border: '1px solid black', borderRadius:'5px', margin: '10px', padding: '5px'}}>
            <div>&lt;대표 일정&gt;</div>
            <div style={{textAlign: 'center', margin: '10px'}}>{(Object.keys(thisItinerary).length !== 0 && thisItinerary.touristSpot.touristSpotName)}</div>
          </span>
          <span style={{border: '1px solid black', margin: '10px', borderRadius:'5px', padding: '5px'}}>
            <div style={{textAlign: 'center'}}>&lt;중복 일정&gt;</div>
            <div style={{display: 'flex'}}>
              {overlapItineraryArray.map((overlapItinerary, overlapItineraryIndex) => (
                <span style={{margin: '10px'}}>
                  <div style={{textAlign: 'center'}}>{overlapItinerary.touristSpot.touristSpotName}</div>
                  <button onClick={() => onClickSetRepresentative(thisItinerary.itineraryId, overlapItinerary.itineraryId)}>대표 일정으로 설정</button>
                </span>
              ))}
            </div>
          </span>
        </div>
      </>
    </Modal>
  )
}

export default OverlapItineraryModal;