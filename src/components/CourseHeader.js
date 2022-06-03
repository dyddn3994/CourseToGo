import React, { useState } from "react";
import styled, { css } from 'styled-components';
import ButtonType from '../components/Login/ButtonType'
import { Link } from 'react-router-dom';

import { IoMdSettings } from 'react-icons/io';
// import Img from '../assets/아무사진.jpg';


const CourseHeader = ({inputCourseName, onClickCourseSettingIcon, linkToBack}) => {

  return (
    <HeaderDiv>
      <CourseNameDiv>
        <span style={{fontSize: '34px', fontWeight: 'bold'}} onClick={() => window.location.reload()}> {inputCourseName}</span>
        {onClickCourseSettingIcon !== undefined && <span style={{fontSize: '25px'}} onClick={onClickCourseSettingIcon}> <IoMdSettings /> </span>}
        <Link to={linkToBack}>
          <button style={{float: 'right', marginRight: '25px', marginTop: '5px'}}>뒤로 가기</button>
        </Link>
      </CourseNameDiv>
    </HeaderDiv>
  );
};

// styled components
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