import React, { useState , useEffect} from "react";
import styled, { css } from 'styled-components';

import PhotoItem from './PhotoItem';

const PhotoList = ({datas, onView}) => {

    return (
     
        <PhotoListDiv>
            {/* 사진 리스트들  */}
            <Photos>
                {
                datas.map(item => 
                    <PhotoItem  key= {item.id} item={item}  onView = {onView} />)
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
   
`;

export default PhotoList;
