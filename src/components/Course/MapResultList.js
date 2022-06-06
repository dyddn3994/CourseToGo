import React,{useState} from 'react'
import styled, { css } from 'styled-components';

 const MapResultList = ({places, isOpenSearchList, onMouseOverList, overSearchList, listOnClieck}) => {
//const MapResultList = ({places, isOpenSearchList}) => {

  return (
    <>
    { (isOpenSearchList) &&
      <ResultList    onMouseOver={onMouseOverList } onMouseOut={onMouseOverList}>
        {places.map((item, i) => (
          <div key={i}>
            <TextBox onClick={()=>listOnClieck(item)}>
              <div style={{fontWeight:'880', fontSize:'0.95rem',marginBottom:'3%'}}>{item.place_name}</div>
              <div>주소: {item.address_name}</div>
              <div>전화번호: {item.phone}</div>
              {item.touristSpotAvgTime === 0 ? 
              null
              :<div>
              <div>평균시간: {item.touristSpotAvgTime}</div>
              <div>평균비용: {item.touristSpotAvgCost}</div>
            </div>
            }
            </TextBox>
          </div>
        ))}
        <div id="pagination"></div>
      </ResultList>

   }
   </>
  )
};

const ResultList = styled.div`
  overflow-y: scroll;
  height: 70%;
  background-color: #ffffff;
  opacity: 0.9;
  width:360px;
  position: fixed;
  margin-left:0.1%;
  top: 120px;
  padding: 5px;
  z-index:1;
  border-radius:1rem;
  margin-top:2%;
  box-shadow: 0px 0px 3px gray;
  &::-webkit-scrollbar {
    width:12px;
    border-radius:3%;
  }
  &::-webkit-scrollbar-thumb {
    background-color: lightgray ;
    border-radius:6px;
    background-clip: padding-box;
    border: 1px solid transparent;
  }
  &::-webkit-scrollbar-corner{
    background-color:#F5F5F5 ;
  }
  `;
  const TextBox = styled.div`
  // border-bottom: 1.5px solid  #4D9FE3;
  margin:2%;
  padding:5%;
  font-size:1rem;
  border-radius:1rem;
  &:hover{  
    background-color:lightgray ;
  }
  `;
export default MapResultList;