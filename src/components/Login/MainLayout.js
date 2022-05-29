import React, { useState } from "react";
import styled, { css } from 'styled-components';

import Img from '../../assets/제주도.jpg';

// 로그인, 회원가입, 아이디찾기, 비번찾기, 로그인후 메인화면의 레이아웃

const MainLayout = ({children}) => {
  // render
  return (
    <MainScreenDiv>
      <LeftScreenDiv>
        {children}  
      </LeftScreenDiv>

      <RightScreenDiv>
          {/* 이미지 안 넣으면 하얗게 나옴 */}
           <Image src= {Img} alt='Img' /> 
      </RightScreenDiv>

    </MainScreenDiv>
  );
};

// styled components
// div


const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`;


const MainScreenDiv = styled.div`
  display: flex;
  height: 100vh;
  position: absolute; 
`;
const LeftScreenDiv = styled.div`
  background-color: #ffffff;
  flex-basis: 40%;
  float: left;
`;
const RightScreenDiv = styled.div`
  // background-color: #7777ff;
  position: fixed;
  height: 100vh;
  object-fit: cover; 
  width:60%; 
  margin-left:40%;
  box-shadow: 0px 0px 12px lightgray;
`;

export default MainLayout;