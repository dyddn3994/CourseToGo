import React , {useState,useEffect }from 'react';
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";



const MovieInfoBox= ({movieInfo}) => {
    const {movie_id, title,running_time, genre, rating,poster,synonpsis,opening_date, director,actor}= movieInfo;
  return (

        <MovieInfo>
            <PhotoInput type='image' src={poster} value={poster} />
            <div>
                <TitleBox>
                    <div>{title}</div>
                    {/* <div>예매율</div> */}
                </TitleBox>
                <TextBox>
                    <div style={{display:'flex'}}>
                         <div>감독: {director} / </div> <div>배우: {actor}</div> 
                    </div>
                    <div style={{display:'flex'}}>
                        <div>장르: {genre} / </div> 
                        <div>기본: {rating} , {running_time}</div>
                    </div>
                    <div>개봉: {opening_date}</div>
                    <div>줄거리: {synonpsis}</div>
                </TextBox>
            </div>
            <Link to='/'  style={{ textDecoration: 'none' }}>
                <GoReservation>예매하기</GoReservation>
            </Link>           
        </MovieInfo>

  );
};
const PhotoInput = styled.input`
  width: 180px;
  height: 250px;
  object-fit: cover;
  margin:0% 2% 2%;  
`;


const TextBox = styled.div`
  font-size:0.8rem;
  margin-top:10%;
  height:30%;
`;

const TitleBox= styled.div`
width:100%;
 font-size:1.6rem;
 font-weight:600;
 border-bottom: solid 1px black;
 margin:3%;
 padding-bottom:10%;
`;
const MovieInfo= styled.div`
  width:80%;
  margin-top:2%;
  border-bottom: solid 3px black;
  margin-left:10%;
  display:flex;

`;

const GoReservation = styled.div`
    margin-top:17%;
    margin-left:35%;
    width:10%;
    height:2.3rem;
    line-height:2.3rem;
    border-radius:7px;
    background-color:#FF4B4B;
    color:#ffffff;
    font-size:0.8rem;
    text-align: center;
    position: absolute;
`;
export default MovieInfoBox;