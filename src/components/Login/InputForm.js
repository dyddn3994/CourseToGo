import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import LogoImg from '../../assets/logo.png';

const textMap = {
    login:'로그인',
    searchId: '아이디찾기',
    searchPw: '비밀번호찾기'
}

const Form = ({type,inputs,  onChange, clickedHandler}) => {    
    const text = textMap[type];

    return (
        <ClassDiv>
         {/* 로고 */}
            <LogoImgDiv> 
                <LogoImage src= {LogoImg} alt='LogoImg' />
            </LogoImgDiv> 
            <LoginDiv>
            <div>
                <InputDiv>
                    {type === 'login' ? (
                    <div>
                        <InputForm placeholder="아이디를 입력하세요"
                            type='text'
                            id='inputId'  
                            name='inputId'    
                            onChange={onChange}
                            value = {inputs.inputId}
                        />
                        <InputForm placeholder="비밀번호를 입력하세요"
                            type='password' 
                            id='inputPw' 
                            name='inputPw'
                            onChange={onChange} 
                            value = {inputs.inputPw}
                        />
                    </div>
                    ):(
            
           <div>
                <InputForm placeholder="이름을 입력하세요"
                    type='text'
                    id='inputName'  
                    name='inputName'    
                    onChange={onChange}
                     value = {inputs.inputName}
                />
                <InputForm placeholder="이메일을 입력하세요"
                    type='text' 
                    id='inputEmail' 
                    name='inputEmail'
                    onChange={onChange} 
                    value ={inputs.inputEmail} 
                />
               </div>
         
          )}  
           </InputDiv>
            <LoginButton onClick={e=>clickedHandler(e)}>{text}</LoginButton>

         </div>    
            <ButtonDiv>
                {type === 'login' ? (
                   <SearchDiv>
                     <div>
                        <Link to="/searchId">아이디찾기</Link>
                     </div>
                     <div>
                      <Link to="/searchPw">비밀번호찾기</Link>
                     </div>   
                    </SearchDiv>  

                ):(
                    <Link to="/"  >로그인</Link>
                )
                }
                
                <div>
                    <Link to ="/signUp" >회원가입</Link>
                </div>
               
            </ButtonDiv>

        </LoginDiv>
        </ClassDiv>
  );
};

const ClassDiv = styled.div`
    margin-top:10%;
`;
const LogoImgDiv = styled.div`
text-align: center;
height: 20%;
`;
const LogoImage = styled.img`
width: 80%;
display: inline-block;
`;

const SearchDiv =  styled.div`
display : flex; 
justify-content: space-around;
width:70%;

`;
const LoginDiv =  styled.div`
text-align: center;

`;
const InputDiv =  styled.div`



`;
const InputForm = styled.input`
   background-color:#4D9FE3;
   border-radius: 0.30rem;
   font-size: 1rem;
  line-height: 2;
  border: 1px solid lightgray;
  width:55%;

  color:#FFFFFF;
  margin:0 0 10px;


`;

const LoginButton = styled.button`
    margin-top:4%;
     background-color:#FFCC29;
   // background-color:#FF7F50;
    border-radius: 0.30rem;
    font-size: 1.2rem;
   line-height: 1.6;
   border: 1px solid lightgray;
   width:30%;
   color:#FFFFFF;
   display: inline-block;
   font-weight:bold;
`;

const ButtonDiv = styled.div`
font-size: 0.8rem;
margin-top:3rem;
display : flex; 
justify-content: space-around;
width:60%;
margin-left:17%;
a {
    color :#000000 ;
    text-decoration:none;
}
`;


export default Form;