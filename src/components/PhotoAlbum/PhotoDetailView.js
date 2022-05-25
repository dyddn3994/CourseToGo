import React from 'react';
import styled, { css } from 'styled-components';

const PhotoDetailView = ({currItem, editClickedHandler}) => {
    const {image, itinerary, uploader} = currItem
    return (
   
        <DetailVeiw>
             <OnclickedPhotoDiv>
            {/* 클릭된 이미지 */}
                <OnclickedPhoto src = {image} alt = {itinerary}/> 
            </OnclickedPhotoDiv>
            {/* 사진 정보 */}
            <InfoDiv>
                <InfoString>
                    <span>{itinerary}</span>
                    <div></div>
                    <span>{uploader}</span>
                </InfoString>
                <InfoButtonDiv>
                    <EditButton onClick={()=>editClickedHandler()}>편집</EditButton>
                </InfoButtonDiv>
            </InfoDiv>
           
        </DetailVeiw>
      
    );
};

const DetailVeiw = styled.div`
    text-align: center;
    margin-bottom: 2%;
    height:68%;
    position:fixed;
    width:40%;
    margin-left:52%;
    background-color:	#FFFFFF;
    margin-top:5%;
    border-radius: 1rem;
    box-shadow: 0 0 3px lightgray;
`;
const OnclickedPhotoDiv = styled.div`
    width:100%;
    height:85%;

`;
const OnclickedPhoto = styled.img`
    margin-top:1%;
    max-width: 380px;
    max-height:320px;
`;

const InfoDiv = styled.div`
    width:100%;
    margin-top:1%;
    display: flex;
    justify-content: space-between;
`;

const InfoString = styled.div`
    width:100%;
    text-align: left;
    font-size: 0.8rem;
`;
const InfoButtonDiv = styled.div`
    width:50%;
`;
const EditButton = styled.button`
    background-color:#FFFFFF;
    border-radius: 0.30rem;
    font-size: 0.8rem;
    line-height: 1.6;
    border: 1px solid lightgray;
    width:50%;
    color: #4D9FE3;
    font-weight: bold;
    border: 1px solid  #4D9FE3;
    box-shadow: 0 0 2px lightgray;
    margin:1%;
    &:hover{  
        background-color :  #4D9FE3;
        color:#FFFFFF;
        border: 1px solid  lightgray;
    }
`;

export default PhotoDetailView;