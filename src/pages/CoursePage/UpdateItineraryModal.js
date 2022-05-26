// import React, { useState } from 'react';
// import styled from 'styled-components';
// import Modal from 'react-modal';

// const UpdateItineraryModal = props => {

//   const {
//     isUpdateItineraryModal,
//     setIsUpdateItineraryModal,
//     inputItineraryName,
//     inputItineraryAddress,
//     inputItineraryStartTime,
//     inputItineraryEndTime,
//     inputItineraryDetail,
//     inputItineraryCost,
//     onClickUpdateItinerary,
//     onClickDeleteItinerary
//   } = props;

//   // onChange
//   const onChangeInputItineraryName = e => setInputItineraryName(e.target.value);
//   const onChangeInputItineraryAddress = e => setInputItineraryAddress(e.target.value);
//   const onChangeInputItineraryStartTime = e => setInputItineraryStartTime(e.target.value);
//   const onChangeInputItineraryEndTime = e => setInputItineraryEndTime(e.target.value);
//   const onChangeInputItineraryDetail = e => setInputItineraryDetail(e.target.value);
//   const onChangeInputItineraryCost = e => setInputItineraryCost(e.target.value);

//   return (
//     <Modal 
//       isOpen={isUpdateItineraryModal} 
//       onRequestClose={() => setIsUpdateItineraryModal(false)}
//       style={{
//         overlay: {
//           position: 'fixed',
//           zIndex: '2'
//         },
//         content: {
//           top: '200px',
//           left: '200px',
//           right: '200px',
//           bottom: '200px',

//           border: '1px solid'
//         }
//       }}
//     >
//       <div>수정할 일정의 정보를 입력하세요.</div>
//       <div>
//         <span>일정 명 : </span>
//         <input name="inputItineraryName" value={inputItineraryName} onChange={onChangeInputItineraryName} />
//       </div>
//       <div>
//         <span>일정 주소 : </span>
//         <input name="inputItineraryAddress" value={inputItineraryAddress} onChange={onChangeInputItineraryAddress} />
//       </div>
//       <div>
//         <span>시작 시간 : </span>
//         <input name="inputItineraryStartTime" value={inputItineraryStartTime} onChange={onChangeInputItineraryStartTime} />
//       </div>
//       <div>
//         <span>종료 시간 : </span>
//         <input name="inputItineraryEndTime" value={inputItineraryEndTime} onChange={onChangeInputItineraryEndTime} />
//       </div>
//       <div>
//         <span>일정 상세 : </span>
//         <input name="inputItineraryDetail" value={inputItineraryDetail} onChange={onChangeInputItineraryDetail} />
//       </div>
//       <div>
//         <span>일정 비용 : </span>
//         <input name="inputItineraryCost" value={inputItineraryCost} onChange={onChangeInputItineraryCost} />
//       </div>
//       <button onClick={onClickUpdateItinerary}>일정 수정</button>
//       <button onClick={onClickDeleteItinerary}>일정 삭제</button>
//       <button onClick={() => setIsUpdateItineraryModal(false)}>취소</button>
//     </Modal>
//   )
// }

// export default UpdateItineraryModal;