import React, { useState } from "react";
import styled, { css } from 'styled-components';
import { IoMdSettings } from 'react-icons/io';
// import Img from '../assets/아무사진.jpg';


const CourseHeader = ({inputCourseName}) => {

  // render
  return (
        <HeaderDiv>
            <CourseNameDiv>
              <span style={{fontSize: '34px', fontWeight: 'bold'}}> {inputCourseName}</span>
              <span style={{fontSize: '25px'}}> <IoMdSettings /> </span>
            </CourseNameDiv>
        </HeaderDiv>

  );
};

// styled components
// div

const CourseNameDiv = styled.div`
  margin-left: 1%;
`;

const HeaderDiv = styled.div`
  width:100%;
  heiht:40%;
  background-color:#4D9FE3;
  color:#FFFFFF;
  padding-top:1%;
  position:fixed;
  box-shadow: 0 0  4px black;
  z-index: 3;
`;

export default CourseHeader;