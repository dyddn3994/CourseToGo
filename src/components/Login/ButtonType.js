
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

//로그인, 아이디찾기, 비번찾기 페이지에 따른 버튼 
const textMap = {
    login:'로그인',
    searchId: '아이디찾기',
    searchPw: '비밀번호찾기'
}

const ButtonType = ({type, clickedHandler}) => {    
    const text = textMap[type];

    return (
       <ButtonTypeDiv>
           <SubmitButtonDiv>
                <SubmitButton onClick={e=>clickedHandler(e)}>{text}</SubmitButton>
            </SubmitButtonDiv>
            <ButtonDiv>
                {type === 'login' ? (
                    null
                ):(
                    <Link to="/"  >로그인</Link>
                )}
                
                <div>
                    <Link to ="/join" >회원가입</Link>
                </div>
               
            </ButtonDiv>
        </ButtonTypeDiv>
  );
};


const SearchDiv =  styled.div`
    display : flex; 
    justify-content: space-around;
    width:70%;
`;

const ButtonTypeDiv =  styled.div`
    width:100%;
    text-align: center;
    margin:5%;
`;

const SubmitButtonDiv =  styled.div`
    text-align: center;
    margin:8%;

`;
const SubmitButton = styled.button`
    background-color:  #ffffff;
    border-radius: 0.30rem;
    font-size: 1.3rem;
    line-height: 1.6;
    width:40%;
    color:#4D9FE3;
    font-weight:bold;
    border: 1.3px solid  #4D9FE3;
    box-shadow: 0px 0px 2px gray;
    &:hover{  
        background-color: #4D9FE3;
        color:#ffffff;
        box-shadow: 0px 0px 4px gray;
    }
`;
const ButtonDiv = styled.div`
font-size: 1.1rem;
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


export default ButtonType;