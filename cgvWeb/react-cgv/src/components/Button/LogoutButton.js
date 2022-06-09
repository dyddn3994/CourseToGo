import React , {useState}from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import LoginPassword from '../../assets/images/loginPassword.png';
import HeaderInputButton from './HeaderInputButton';
import MyPageIcon from '../../assets/images/MyPageIcon.png';


const LogoutButton= () => { 
  return (
      <HeaderLayout>
          <HeaderInputButton  imgSrc={LoginPassword} type={'로그아웃'} linkTo={'/'}/>
          <HeaderInputButton  imgSrc={MyPageIcon} type={'MY CGV'} linkTo={'/mypage'}/>
      </HeaderLayout>
  );
};
const HeaderLayout = styled.div`
    width:50%;
    display:felx;
    justify-content: space-between;
`;

export default LogoutButton;