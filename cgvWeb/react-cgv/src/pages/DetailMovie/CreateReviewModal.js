import React, { useState } from "react";
import styled, { css } from 'styled-components';

import Modal from 'react-modal';

const CreateReviewModal = (props) => {
  const { 
    isModalOpen, 
    setIsModalOpen,  
    inputReview,
    onClickCreateReview,
    onChangeInputReview,
    } = props;
    // const [starList, setStarList] = useState([{'1'},{'2'},{3'},{value:'4'},{value:'5' }]);
    const [selectedStar, setSelectedStar] = useState('');
    const handleChange = (e) => {
    
        console.log(`선택한 값 : ${e.target.value}`);
      
        setSelectedStar( e.target.value);
      };

  return (
    <Modal 
      ariaHideApp={false} // allElement 경고창 제거
      isOpen={ isModalOpen} 
      onRequestClose={() => setIsModalOpen(false)}
      style={{
        overlay: {
          position: 'fixed',
          zIndex: '5'
        },
        content: {
          top: '150px',
          left: '380px',
          right: '380px',
          bottom: '100px',
          borderRadius: '1rem',
          boxShadow: '0px 0px 4px lightgray',
        }
      }}
    >
      <MainDiv>
      
        <div>
            {/* 평점 등록 */}
            <RatingDiv>
                <div>평점</div>
      
                 
                 {/* <div>
               
                <input  id={1} value={1} name="platform"type="radio" hecked={setSelectedStar(1)}  onChange={handleChange}>1</input>
                <input  id={2} value={2} name="platform"type="radio" hecked={setSelectedStar(2)}  onChange={handleChange}>1</input>
                <input  id={3} value={3} name="platform"type="radio" hecked={setSelectedStar(3)}  onChange={handleChange}>1</input>
                <input  id={4} value={4} name="platform"type="radio" hecked={setSelectedStar(4)}  onChange={handleChange}>1</input>
                <input  id={5} value={5} name="platform"type="radio" hecked={setSelectedStar(5)}  onChange={handleChange}>1</input>
               
             
                 </div> */}

            </RatingDiv>
            {/* 후기 작성 */}
            <ContentInputTextarea name="inputContent" value={inputReview} onChange={onChangeInputReview} />
          </div>
        <ButtonDiv> 
            <OptionButton backgroundColor={'#FF4B4B'} onClick={onClickCreateReview}>평점 작성</OptionButton>
            <OptionButton backgroundColor={'gray'}  onClick={() => setIsModalOpen(false)}>취소</OptionButton>
        </ButtonDiv>
    
      </MainDiv>
    </Modal>
  );
};

const ButtonDiv= styled.div`
  text-align: center;
  width:60%;
  display:flex;
  margin-left:20%;
  margin-top:5%;
`;

const OptionButton= styled.button`
    width:50%;
    padding:1%;
    margin:1%; 
    border-radius:8px;
    background-color:${(props)=>props.backgroundColor};
    color:#ffffff;
    font-size:0.9rem;
    text-align: center;
    border:#FF4B4B;
`;

const ContentInputTextarea= styled.input`
  width:80%;
  height:5rem;
  border: solid 2px lightgray;
  margin:1%;
  border-radius:9px;
`;

const MainDiv= styled.div`
  text-align: center;
  font-size:1.2rem;
`;


const  RateButtonDiv = styled.div`
  display:flex;
  font-weight:bold;
  margin-left:2%;
`;
const RatingDiv = styled.div`
text-align: center;
font-size:0.9rem;
`;

const RateButton= styled.button`
text-align: center;
backgorund-color:white;
margin:2%;
`;

export default CreateReviewModal;