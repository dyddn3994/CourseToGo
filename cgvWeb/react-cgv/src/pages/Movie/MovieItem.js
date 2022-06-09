import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from 'styled-components';

const MovieItem = ({item, index,checkedMovie}) => {

  return (
    <Movieli>      
        <NumberBox backgorundColor={index<3? '#FF4B4B' : 'gray'}>No.{index+1}</NumberBox>
        <MovieInfo onClick={()=>checkedMovie(item.movie_id)}>
            <PhotoInput type='image' src={item.poster} value={item.poster} />
            <TextBox>
                <div>{item.title}</div>
                <div style={{fontSize:'0.8rem'}}>{item.opening_date} 개봉</div>
            </TextBox>
        </MovieInfo>
        <Link to='/'  style={{ textDecoration: 'none' }}>
             <GoReservation>예매하기</GoReservation>
        </Link>
    </Movieli>
  );
};

const PhotoInput = styled.input`
  width: 100%;
  height: 240px;
  object-fit: cover;  
`;

const Movieli = styled.li`
  width: 14%;
//   background-color: gray;
  float: left;
  appearance: none;
  box-shadow:3px lightgray;
  margin:2%;
  text-align: center;
`;

const NumberBox = styled.div`
  width: 100%;
  margin-bottom:5%;
  color:#ffffff;
  background-color: ${(props)=>props.backgorundColor};
`;

const TextBox = styled.div`
    text-align: left;

`;

const MovieInfo= styled.div`

`;

const GoReservation = styled.div`
    margin-top:3%;
    width:60%;
    padding:2%;
    border-radius:7px;
    background-color:#FF4B4B;
    color:#ffffff;
    font-size:0.8rem;
    text-align: center;
`;

export default MovieItem;