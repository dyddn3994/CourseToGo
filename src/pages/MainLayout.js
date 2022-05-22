import React, { useState } from "react";
import styled, { css } from 'styled-components';

// import Img from '../assets/아무사진.jpg';

// 로그인, 회원가입, 아이디찾기, 비번찾기, 로그인후 메인화면의 레이아웃

const MainLayout = ({children}) => {
  // 부모 컴포넌트 안에 있는 자식 컴포넌트 요소 띄우기

  // useState


  // render
  return (
    <MainScreenDiv>
      <LeftScreenDiv>
        {children}  
      </LeftScreenDiv>

      <RightScreenDiv>
          {/* <Image src= {Img} alt='Img' /> */}
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
`;
const LeftScreenDiv = styled.div`
  /* background-color: #ffffd0; */
  flex-basis: 40%;
  float: left;
`;
const RightScreenDiv = styled.div`
  background-color: #7777ff;
  flex-basis: 60%;
  float: right;
`;

export default MainLayout;