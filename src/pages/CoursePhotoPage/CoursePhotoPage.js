import React, { useState } from "react";
import styled, { css } from 'styled-components';

// import Header from '../../components/InCourseHeader';
// import FilteringButtonDiv from './FilteringButtonDiv';
// import PhotoDiv from './PhotoDiv';
import Img from '../../assets/아무사진.jpg';
const CoursePhotoPage = () => {
  
  // useState


  // render
  return (
    <MainScreenDiv>
   {/* 코스명이 들어갈 부분 */}
   <CourseNameDiv>
          <h2>JEJU 제주</h2>
        </CourseNameDiv>

    {/* 필터링 및 부분선택 다운로드 부분  */}
    <ButtonDiv>
      {/* <FilteringButtonDiv /> */}
      <UserDiv>
           <InputDiv>
               <input type="checkbox" /> <h>김성동</h>
            </InputDiv>  
            <InputDiv>
               <input type="checkbox" /> <h>한현택</h>
            </InputDiv>  
            <InputDiv>
               <input type="checkbox" /> <h>정용우</h>
            </InputDiv>  
            <InputDiv>
               <input type="checkbox" /> <h>안은비</h>
            </InputDiv>  
          

        </UserDiv>
        
        <ChoiceButton>다운로드</ChoiceButton>
{/* 
      <ChoiceButtonDiv> */}
        
      {/* </ChoiceButtonDiv> */}
    </ButtonDiv>
   
   {/* 사진들... */}


  
    <PhotosDiv>
      <ImageDiv>
        <input type="checkbox" />
        <div>
          <Image src= {Img} alt='LogoImg'/> 
        </div>
      </ImageDiv>
      
      <ImageDiv>
        <input type="checkbox" />
        <div>
          <Image src= {Img} alt='LogoImg'/> 
        </div>
      </ImageDiv>
      <ImageDiv>
        <input type="checkbox" />
        <div>
          <Image src= {Img} alt='LogoImg'/> 
        </div>
      </ImageDiv>
      <ImageDiv>
        <input type="checkbox" />
        <div>
          <Image src= {Img} alt='LogoImg'/> 
        </div>
      </ImageDiv>
      <ImageDiv>
        <input type="checkbox" />
        <div>
          <Image src= {Img} alt='LogoImg'/> 
        </div>
      </ImageDiv>
      <ImageDiv>
        <input type="checkbox" />
        <div>
          <Image src= {Img} alt='LogoImg'/> 
        </div>
      </ImageDiv>
      <ImageDiv>
        <input type="checkbox" />
        <div>
          <Image src= {Img} alt='LogoImg'/> 
        </div>
      </ImageDiv>
      <ImageDiv>
        <input type="checkbox" />
        <div>
          <Image src= {Img} alt='LogoImg'/> 
        </div>
      </ImageDiv>
      <ImageDiv>
        <input type="checkbox" />
        <div>
          <Image src= {Img} alt='LogoImg'/> 
        </div>
      </ImageDiv>
      <ImageDiv>
        <input type="checkbox" />
        <div>
          <Image src= {Img} alt='LogoImg'/> 
        </div>
      </ImageDiv>
      <ImageDiv>
        <input type="checkbox" />
        <div>
          <Image src= {Img} alt='LogoImg'/> 
        </div>
      </ImageDiv>
      <ImageDiv>
        <input type="checkbox" />
        <div>
          <Image src= {Img} alt='LogoImg'/> 
        </div>
      </ImageDiv>
    </PhotosDiv>

    </MainScreenDiv>
  );
};

// styled components
// div
const MainScreenDiv = styled.div`


`;

const CourseNameDiv = styled.div`

  width:100%;
  height:50px;

`;

const ButtonDiv =  styled.div`
display: flex;
height:50px;
justify-content: space-between;
`;
const PhotosDiv =  styled.div`
display: flex;
flex-flow: row wrap;
margin-left:5%;
`;
const ImageDiv =  styled.div`
  margin:1%;

`;


const Image =  styled.img`
  width:180px;
  height:180px;

`;

const ChoiceButtonDiv =  styled.div`

`;
const ChoiceButton=  styled.button`
  margin-right:5%;
  background-color:#FFCC29;
  // background-color:#FF7F50;
   border-radius: 0.30rem;
   font-size: 0.8rem;
  line-height: 1.6;
  border: 1px solid lightgray;
  height:40px;
  width:8%;
  color:#FFFFFF;
  display: inline-block;
  font-weight:bold;
`;


const UserDiv =  styled.div`
display: flex;
`;
const InputDiv =  styled.div`

`;
export default CoursePhotoPage ;