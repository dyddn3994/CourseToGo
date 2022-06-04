import React, { useState } from "react";
import styled, { css } from 'styled-components';

const PhotoItem = ({item, checkedPhotos, addElementPhotos}) => {

  const {photoImage, photoId} = item;

  return (
    <Photoli clicked={checkedPhotos.includes(item) ? true : false}>
      <PhotoInput type='image' key={photoId} value={photoImage} src={photoImage}  onClick={()=>addElementPhotos(item)}/>
    </Photoli>
  );
};

const PhotoInput = styled.input`
  width: 150px;
  height: 150px;
  object-fit: cover;  
  margin:1.3%;  
`;

const Photoli = styled.li`
  width: 155px;
  height: 155px;
  background-color: ${(props)=>props.clicked? 'gray' :'#ffffff ' };
  float: left;
  appearance: none;
  box-shadow:3px lightgray;
  &:hover{  
    background-color : gray;
    
  }
`;

export default PhotoItem;