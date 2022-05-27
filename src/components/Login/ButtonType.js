
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
margin-top:10%;
`;

const SubmitButtonDiv =  styled.div`
    text-align: center;
    margin:8%;

`;

const SubmitButton = styled.button`
    margin-top:4%;
     background-color:#FFCC29;
   // background-color:#FF7F50;
    border-radius: 0.30rem;
    font-size: 1.1rem;
   line-height: 1.6;
   border: 1px solid lightgray;
   width:40%;
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


export default ButtonType;