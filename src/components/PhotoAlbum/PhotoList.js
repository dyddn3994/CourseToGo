import React from "react";
import styled from 'styled-components';

import PhotoItem from './PhotoItem';

const PhotoList = ({datas, checkedPhotos, addElementPhotos}) => {

    return (
        <PhotoListDiv>
            {/* 사진 리스트들  */}
            <Photos>
                {
                datas.map(item => 
                    <PhotoItem  key= {item.photoId} item={item} checkedPhotos={checkedPhotos} addElementPhotos={addElementPhotos}/>)
                }
            </Photos> 
        </PhotoListDiv>
    );
};

const PhotoListDiv = styled.div`
    width:100%;
    height:100%
`;

const Photos = styled.div`
    list-style-type: none;
    margin-left:3%;
`;

export default PhotoList;