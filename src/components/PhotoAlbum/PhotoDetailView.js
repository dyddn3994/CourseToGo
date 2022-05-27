import React from 'react';
import styled, { css } from 'styled-components';

const PhotoDetailView = ({currItem}) => {
    const {image, itinerary, uploader} = currItem
    return (
        <OnclickedPhotoDiv>
            {/* 클릭된 이미지 */}
            <OnclickedPhoto src = {image} alt = {itinerary}/> 
            {/* 사진 정보 */}
            <InfoDiv>
                <InfoString>
                    <h3>{itinerary}</h3>
                    <p>{uploader}</p>
                </InfoString>
                <InfoButton>
                    <EditButton>편집</EditButton>
                </InfoButton>
            </InfoDiv>
           
        </OnclickedPhotoDiv>
    );
};


const OnclickedPhoto = styled.img`
    max-width: 75%;
    margin-right:6%;
`;

const OnclickedPhotoDiv = styled.div`
    text-align: center;
    margin-bottom: 2%;
    height:90%;
    position:fixed;
    width:40%;
    margin-left:55%;
    background-color:#FFFFFF;
    margin-top:5%;
`;
const InfoDiv = styled.div`

`;
const InfoString = styled.div`
    text-align: left;
    font-size: 0.8rem;
`;
const InfoButton = styled.div`

`;
const EditButton = styled.button`

`;
const DownloadButton = styled.button`

`;
export default PhotoDetailView;