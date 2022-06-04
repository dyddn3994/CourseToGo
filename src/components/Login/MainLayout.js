import React, { useState } from "react";
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import Img from '../../assets/제주도.jpg';

// 로그인, 회원가입, 아이디찾기, 비번찾기, 로그인후 메인화면의 레이아웃

const MainLayout = ({children, isLogin, onClickLogout}) => {
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

      {isLogin &&
      <MyPageButtonDiv>
        <Link to='/mypage'><MyPageButton>마이페이지</MyPageButton></Link>
        <MyPageButton onClick={onClickLogout}>로그아웃</MyPageButton>
      </MyPageButtonDiv>
      }
    </MainScreenDiv>
  );
};

// styled components
// div
const MyPageButtonDiv = styled.div`

  display: flex;
  justify-content: space-between;
  width:15%;
  position:fixed;
  z-index: 3;
  margin-left:83%;
  margin-top: 1%;
`;

const MyPageButton = styled.button`
  background-color:#FFFFFF;
  border-radius: 0.30rem;
  font-size: 1.2rem;
  line-height: 1.6;
  width:120px;
  height:32px;
  color:#4D9FE3;
  display: inline-block;
  margin:1%;
  float: right;
  border: 1px solid  #4D9FE3;
  box-shadow: 0px 0px 2px lightgray;
  font-weight: bold;
  &:hover{  
    border: 1px solid  gray;
    box-shadow: 0 0 3px  gray;
}
`;

const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
z-index: -1;
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
  width:55%; 
  margin-left:45%;
  box-shadow: 0px 0px 12px lightgray;
`;

export default MainLayout;