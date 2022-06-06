
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import LogoImg from '../../assets/logo.png';

const LogoHeader = () => {    
  
  return (
    //로그인페이지폴더에 있는 페이지들 로고 넣기위한 
    <LogoImgDiv>
      <LogoImage src= {LogoImg} alt='LogoImg' />
    </LogoImgDiv> 
  );
};

const LogoImgDiv = styled.div`
  text-align: center;
  height: 20%;
`;
const LogoImage = styled.img`
  width: 80%;
  display: inline-block;
  margin-left:10%;
`;


export default LogoHeader;