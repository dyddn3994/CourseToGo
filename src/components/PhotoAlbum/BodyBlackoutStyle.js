import React, { useState , useEffect} from "react";
import styled, { css } from 'styled-components';

//편집 모달 켜졌을 때 뒷배경 까맣게
const BodyBlackoutStyle = ({setIsEditModalOpen }) => {
    return (
      <BackgroundStyle onClick={() => setIsEditModalOpen(false)}></BackgroundStyle>
    );
  };


  const BackgroundStyle = styled.div`

  width: 100%;
  height: 100%;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1010;
  background-color: rgba(0, 0, 0, 0.65);

  `;

  export default BodyBlackoutStyle;