import React, { useState } from "react";
import styled, { css } from 'styled-components';
import ReactTooltip from 'react-tooltip';

// icons
import { BsQuestionSquareFill } from 'react-icons/bs';


// 로그인페이지에 있는 로그인, 아이디찾기, 비번찾기, 회원가입 인풋폼
const InputForm = ({label, name, type, onChange, value, onKeyPressLogin}) => {
  const [isPhotoUploadInfoTooltip, setIsPhotoUploadInfoTooltip] = useState(true);
  
  return (
    <>
    <InputFormDiv>
      <InputLabel>
        <label>{label}</label> 
        {label==='프로필 사진' ? 
        <span 
          onMouseOver={() => setIsPhotoUploadInfoTooltip(true)} 
          onMouseOut={() => setIsPhotoUploadInfoTooltip(false)}
          data-tip data-for='infoTooltip'
        >
          <BsQuestionSquareFill />
        </span> : null}
      </InputLabel>
      <FormDiv>
        <Form name={name} type={type} onChange={onChange} value={value} onKeyPress={onKeyPressLogin} accept={type==='file'?"image/*":''}/>
      </FormDiv>    
    </InputFormDiv>
      {isPhotoUploadInfoTooltip ? (
        <ReactTooltip
          id='infoTooltip'
          // place='right'
          effect='solid'
          type='dark'
          // getContent={dataTip => 'sss' + dataTip}
        >
          <div>프로필 사진은 다른 사람들에게 보여질 프로필 이미지이며 <br />얼굴 등록은 이미지 필터링에서 사용될 이미지입니다. <br /> </div>
        </ReactTooltip>
      ) : null} 
    </>
  );
 };
    

const InputFormDiv =  styled.div`
  width:70%;
  height:100%;
  display : flex; 
  justify-content: space-around;
  margin-left:10%;
`;

const Form = styled.input`
  border-radius: 0.30rem;
  line-height: 2;
  border: 1px solid lightgray;
  width:100%;
  box-shadow: 0px 0px 2px lightgray;
`;

const FormDiv=  styled.div`
  width:80%; 
  margin-bottom:3%;
  margin-left:10%;
`;
const InputLabel =  styled.div`
  width:40%;
  font-size:0.9rem;
`;

export default InputForm;
