
import React from "react";
import styled, { css } from 'styled-components';


// 로그인페이지에 있는 로그인, 아이디찾기, 비번찾기, 회원가입 인풋폼
const InputForm = ({label, name, type, onChange, value, onKeyPressLogin}) => {

    return (
        <InputFormDiv>
            <InputLabel>
                <label>{label}</label>
            </InputLabel>
            <FormDiv>
                  <Form name={name} type={type} onChange={onChange} value={value} onKeyPress={onKeyPressLogin} accept={type==='file'?"image/*":''}/>
            </FormDiv>    
        </InputFormDiv> 
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
