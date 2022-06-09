import React , {useState,useEffect }from 'react';
import styled, { css } from 'styled-components';


const UserInfo= ({userInfo}) => {

  return (
    <InfoDiv>
        <TextDiv>
        <div style={{fontSize:'1.5rem', fontWeight: '600'}}>{userInfo.name}님</div>
        <div>아이디: {userInfo.username}</div>
        <div>생일: {userInfo.brith}</div>
      
        {userInfo.gender==="FEMALE"? 
            <div>여자</div>
        :
            <div>남자</div>
        }
           
        </TextDiv>
    </InfoDiv>
  );
};
const InfoDiv = styled.div`
    width:75%;
    background-color:	#F5F5F5;
    margin-top:1%;
    margin-left:12%;
    height:150px;
`;

const TextDiv = styled.div`
width:70%;
  font-size:0.9rem;
  margin:3%;
  float:left;
  margin-left:10%;
`;

export default UserInfo;