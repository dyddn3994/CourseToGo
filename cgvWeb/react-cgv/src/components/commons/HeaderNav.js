import React , {useState}from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderNav = () => {
  return (
    <NavBar>
      <ButtonDiv>
        <Link to='/movie' style={{ textDecoration: 'none' , color:'black'}}>
           영화
         </Link>
      </ButtonDiv>
      <ButtonDiv>
         <div>상영시간표</div>
      </ButtonDiv>
    </NavBar>
      

  );
};
const NavBar= styled.nav`
    width:100%;
    height:45px;
    position: absolute; 
    border-bottom: solid 1.8px red;
    display:felx;
`;

const ButtonDiv = styled.div`
   
    margin-top:1%;
    margin-left:4%;
    font-size:1.2rem;
    font-weight:bold;
`;
export default HeaderNav;