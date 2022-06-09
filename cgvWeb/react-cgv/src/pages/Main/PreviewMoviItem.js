import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from 'styled-components';

const PreviewMoviItem= ({item, index}) => {
   
    const [hide, setHide] = useState(true);	// 마우스 오버에 따른 히든 여부

  return (
    <Movieli>      

            <div onMouseEnter={() => {setHide(false)}} onMouseLeave={() => {setHide(true)}}  >
                {!hide &&
                <MouseOverBox>  
                    <ButtonDiv>
                        <Link to='/'  style={{ textDecoration: 'none' }}>         {/* 나중에 영화 아이디 포함하여 영화 상세 페이지로 이동해야함 */}
                            <GoReservation  backgorundColor={'white'} color={'gray'}>상세보기</GoReservation>
                        </Link>
                        <Link to='/'  style={{ textDecoration: 'none' }}>         {/* 나중에 영화 아이디 포함하여 예매 페이지로 이동해야함 */}
                            <GoReservation  backgorundColor={'#FF4B4B'} color={'white'}>예매하기</GoReservation>
                        </Link>
                    </ButtonDiv>
              
                </MouseOverBox>
                }
         
                <PhotoInput type='image' src={item.poster} value={item.poster} />
            </div>
            <TextBox>{item.title}</TextBox>
    
    </Movieli>
  );
};

const PhotoInput = styled.input`
  width: 100%;
  height: 240px;
  object-fit: cover;  
  z-index:-1;
  positon :relative;
  border-radius:10px;
`;

const Movieli = styled.li`
  width: 14%;
  float: left;
  appearance: none;
  box-shadow:3px lightgray;
  margin:1%;
  text-align: center;
`;

const MouseOverBox = styled.div`
    width: 12.2%;
    height: 240px;
    background-color: black;
    background-color: rgba(0, 0, 0, 0.5);
    z-index:3;
    position: absolute;
    text-align: center;
    border-radius:10px;
`;

const NumberBox = styled.div`
  width: 10%;
  margin-bottom:5%;
  color:#ffffff;
  background-color: gray;
  text-align: center;
`;

const TextBox = styled.div`
    text-align: left;
    display:flex;
`;

const ButtonDiv= styled.div`
    width:80%;
    text-align: center;
    margin-top:50%;
`;

const GoReservation = styled.div`
    margin:10%;
    width:100%;
    height:1.6rem;
    line-height:1.6rem;
    padding:2%;
    border-radius:7px;
     background-color: ${(props)=>props.backgorundColor};
    color: ${(props)=>props.color};
    font-size:0.8rem;
`;

export default PreviewMoviItem;