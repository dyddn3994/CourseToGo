import React , {useState}from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderInputButton= ({imgSrc, type, linkTo}) => {
  return (
    <div>
      <Link to={linkTo} style={{ textDecoration: 'none' }}>
        <InputButton>
            <TypeImg src = {imgSrc} />
            <TypeLabel>{type}</TypeLabel>
        </InputButton>
      </Link>
    </div>
  );
};
const InputButton = styled.div`
  text-align: center; 
  width:100%;
  
`;

const TypeImg = styled.img`
width: 45px;
`;

const TypeLabel = styled.div`
  font-size:0.8rem;
  width:100%;
  color:black;
`;
export default HeaderInputButton;