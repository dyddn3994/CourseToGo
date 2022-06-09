import React , {useState}from 'react';
import styled, { css } from 'styled-components';
import LogoImg from '../../assets/images/logoRed.png';
import HeaderInputButton from '../Button/HeaderInputButton';
import LoginJoinButton from '../Button/LoginJoinButton';
import HeaderNav from './HeaderNav';

const Header = () => {
  return (
    <FixHeader>

   
        <HeaderLayout>
          
            <LogoImage src = {LogoImg}  alt='LogoImg' />
            
           
            {/* 로그인 안되어있을때 */}
            <ButtonDiv>
                  <LoginJoinButton />
            </ButtonDiv>
          
            {/* 로그인되어있다면 로그아웃으로 */}
            
        </HeaderLayout>
        <HeaderNav />
        </FixHeader>

  );
};
const FixHeader = styled.div`
    position: fix; 
    width:100%;
    height:130px;
`;
const HeaderLayout = styled.div`
    width:100%;
    height:80px;

    justify-content: space-between;
    box-shadow: 0px 0px 2px lightgray;
    display:felx;
`;

const LogoImage = styled.img`
  width: 120px;
  display: inline-block;
  margin-left:10%;
    margin-top:1%;
`;
const ButtonDiv = styled.div`
    width:20%;
    margin-top:1%;
`;
export default Header;