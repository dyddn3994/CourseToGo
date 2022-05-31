import React, { useState } from "react";
import styled, { css } from 'styled-components';

const PhotoItem = ({item,checkedPhotos, addElementPhotos}) => {

    const {photoImage, photoId} = item;

    return (
        < Photoli clicked = {checkedPhotos.includes(item) ? true : false}>
            <PhotoInput type='image' key={photoId} value={photoImage} src={photoImage}  onClick={()=>addElementPhotos(item)}/>
        </ Photoli>
    );
};

const PhotoInput = styled.input`
    width: 90px;
    height: 90px;
    object-fit: cover;  
    margin:2%;  
`;

const Photoli = styled.li`
    width: 95px;
    height: 95px;
    background-color: ${(props)=>props.clicked? 'gray' :'#ffffff ' };
    float: left;
    appearance: none;
    
    box-shadow: 0 0  3px lightgray;
    &:hover{  
        background-color : gray;
      
    }
`;

export default PhotoItem;