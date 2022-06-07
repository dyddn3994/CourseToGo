import React, { useState , useEffect} from "react";
import styled, { css } from 'styled-components';

import Img from '../../assets/제주도.jpg';

const EditModal = ({currItem, setIsEditModalOpen, editedPhoto }) => {

    // 결과 이미지
    const [resultImage, setResultImage] = useState();

    // 저장 클릭 시 <= 제대로 확인 못해봄
    const saveClieckedHandler = () => {
      //[this.content] : 서버에서 받은 편집된 사진으로 바꿔야함
      // const blob = new Blob([this.content], {type: 'image/jpg'});
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement("a");
      // a.href = url;
      // a.download = `${currItem.itinerary}_${currItem.id}_edit`
      // a.click()
      // a.remove()
      // window.URL.revokeObjectURL(url);
    };

    // 취소 버튼 클릭 시
    const exitClieckedHandler = () => {
        setIsEditModalOpen(false);
    };

    return (
        <EditModalDiv>
            <ResultImageDiv>
                {/* 편집된 결과 이미지 */}
                <Image  src= {editedPhoto} /> {/* 이건 보여주기용으로 넣은거임 */}
                {/* <Image  src= {resultImage} /> */}
            </ResultImageDiv>  
            <ButtonDiv>
                <OptionButton backgroundColor={'#4D9FE3'} color={'#FFFFFF'} onClick={()=>saveClieckedHandler()}>저장</OptionButton>
                <OptionButton backgroundColor={'#FFFFFF'} color={'#4D9FE3'} onClick={()=>exitClieckedHandler()}>취소</OptionButton>
            </ButtonDiv>    
        </EditModalDiv>
    
    );
  };
  const Image = styled.img`
    min-width: 300px;
    max-width: 800px;
`;

  const EditModalDiv = styled.div`
    background-color: white;
    width: 60%;
    height: 75%;
    overflow-y: auto;
    position: fixed;
    left: 50%;
    top: 45%;
    padding: 5px;
    transform: translate(-50%, -50%);
    z-index: 1011;
    text-align: center; 
    border-radius:1rem;
    margin-top:2%;
  `;

  const ResultImageDiv = styled.div`
    margin-top:1%;
  `;

  const ButtonDiv = styled.div`
    // background-color:#FFCC29;
    width:30%;
    justify-content: space-between;
    display: flex;
    margin-left:35%;
  `;
  const OptionButton = styled.button`
    margin:5%;
    width:40%;
    font-size:1.2rem;
    line-height: 1.6;
    border: 1px solid;
    border-radius: 0.30rem;
    background-color: ${props => props.backgroundColor}; 
    color: ${props => props.color}; 

    border: 1px solid  #4D9FE3;
    box-shadow: 0 0 2px lightgray;
    font-weight: bold;
    &:hover{  
      background-color :  lightgray;
      color:#FFFFFF;
      border: 1px solid  lightgray;
    }
  `;

export default EditModal;