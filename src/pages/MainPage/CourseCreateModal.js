// import React from 'react';
// import Modal from 'react-modal';
// const CourseCreateModal = () => {
//   return (
//     <Modal 
      // ariaHideApp={false} // allElement 경고창 제거
//       isOpen={isCourseCreateModalOpen} 
//       onRequestClose={() => setIsCourseCreateModalOpen(false)}
//       style={{
//         overlay: {
//           position: 'fixed'
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
//       <div>추가할 코스의 정보를 입력하세요.</div>
//       <div>
//         <span>코스 명 : </span>
//         <input name="inputCourseName" value={inputCourseName} onChange={onChangeInputCourseName} />
//       </div>
//       <div>
//         <span>코스 시작 날짜 : </span>
//         <input name="inputCourseStartDate" value={inputCourseStartDate} onChange={onChangeInputCourseStartDate} />
//       </div>
//       <div>
//         <span>코스 종료 날짜 : </span>
//         <input name="inputCourseEndDate" value={inputCourseEndDate} onChange={onChangeInputCourseEndDate} />
//       </div>
//       <div>
//         <span>도시 : </span>
//         <input name="inputCity" value={inputCity} onChange={onChangeInputCity} />
//       </div>
//       <button onClick={onClickCreateCourseModal}>그룹 참가</button>
//       <button onClick={() => setIsCourseCreateModalOpen(false)}>취소</button>
//     </Modal>
//   )
// }