import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from 'styled-components';
import LikeIcon from '../../assets/images/likeIcon.png';
const ReviewItem = ({item, onClickUpdateReview,  onClickDeleteReview, createLike}) => {

  

  return (
    <Reviewli>   
        <ContentDiv>
          <TextDiv>
            <div>작성자 : {item.user_id}</div>
            <div>평점 : {item.star}</div>
            <div style={{fontSize: '0.8rem'}}>  {item.review}</div>
            <LikeBox>
              <LikeImg onClick={createLike}  src={LikeIcon} alt={LikeIcon}/>
              <span>{item.likes_num}</span> 
           </LikeBox>
            

          </TextDiv>
             
          <ButtonDiv>
            <OptionButton onClick={() => onClickUpdateReview(item)}>수정</OptionButton>
            <OptionButton onClick={() => onClickDeleteReview(item)}>삭제</OptionButton>
          </ButtonDiv>
         
        </ContentDiv>
    </Reviewli>
  );
};

const LikeImg = styled.img`
width: 15px;
height:15px;
margin-top:2%;
padding:2%;
`;

const Reviewli = styled.li`
  display:flex;
  appearance: none;
  box-shadow:3px lightgray;
  text-align: center;
  justify-content: flex-end;
  flex-direction: column;
  hegiht:50px;
  line-height: 1.6rem;
  border: 2px solid  lightgray;
  width:400px; 
  margin:0.5%;
`;

const ContentDiv = styled.div`
  display:flex;
`;

const LikeBox = styled.div`
  display:flex;
  width:60%;
`;

const  TextDiv = styled.div`
  width:100%;
  text-align:left;
  padding:4%;
  font-size:0.7rem;
`;


const   ButtonDiv = styled.div`
  width:40%;
  font-size:0.8rem;
  margin-left:8%;
`;

const OptionButton = styled.button`
    border: #ffffff;
    background-color :  white;
    color: gray;
    &:hover{  
      color:black;
    }
  `;


export default ReviewItem;
