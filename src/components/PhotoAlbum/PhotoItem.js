import React, { useState } from "react";
import styled, { css } from 'styled-components';

const PhotoItem = ({item, onView}) => {

    const {image, itineray, id} = item;

    const [isCheckedPhoto, setIsCheckedPhoto] = useState(false); //사진 선택여부

    
    const onChange= () =>{
        // 사진 선택 해제 시 테두리 색 변경하는거 하다가 말았음
        // setIsCheckedPhoto(!isCheckedPhoto);
        // console.log('boolean',isCheckedAllPhoto );
        // if(isCheckedAllPhoto){
        //     setIsCheckedPhoto(true);
        //     console.log('boolean',isCheckedPhoto );
        // }
        // else{
        //     setIsCheckedPhoto(false);
        // }
        setIsCheckedPhoto(!isCheckedPhoto);
    };


    return (
        < Photoli border = {isCheckedPhoto ? true : false}>
            <PhotoInput type='image' key={id} value={image} src={image} onClick={()=>{onView(id); onChange()}} />
        </ Photoli>
    )
}
const PhotoInput = styled.input`
    width: 120px;
    height: 120px;
    object-fit: cover;    
`;


const Photoli = styled.li`
    width: 120px;
    height: 120px;
    border: ${(props)=>props.border? '3px #cccccc solid' :'3px #ffffff solid' };
    float: left;
 
    appearance: none;
    // border: 1.5px solid gainsboro;
    // border-radius: 0.35rem;
  
`;
export default PhotoItem;