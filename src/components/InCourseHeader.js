import React, { useState } from "react";
import styled, { css } from 'styled-components';
import LogoImg from '../assets/logo.png';
// import Img from '../assets/아무사진.jpg';

// 로그인, 회원가입, 아이디찾기, 비번찾기, 로그인후 메인화면의 레이아웃

const InCourseHeader = ({children}) => {
  // 부모 컴포넌트 안에 있는 자식 컴포넌트 요소 띄우기

  // useState


  // render
  return (
    <div>

  
        {/* 코스 이름 명시 */}
        <CourseNameDiv>
          {children}
        </CourseNameDiv>  </div>
  );
};

// styled components
// div

const CourseNameDiv = styled.div`
  background-color:#FF7F50;
  width:100%;
  height:50px;
`;
const MainScreenDiv = styled.div`
  display: flex;
  height: 100vh;
`;


export default InCourseHeader;