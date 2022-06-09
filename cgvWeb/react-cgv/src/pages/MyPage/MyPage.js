import React , {useState,useEffect }from 'react';
import styled, { css } from 'styled-components';

import Header from '../../components/commons/Header';

import UserInfo from './UserInfo';


const MyPage= () => {
   // 임시 회원 데이터 
   const [userInfo, setUserInfo] = useState({
        user_id:'1',
        username:'dmsqlzzang',
        pwd:'1230',
        brith:'2000-09-28',
        name:'안은비',
        gender: "FEMALE"
    });
      //  useEffect(() => {
  //   commuteGetUserInfo(); // 회원 정보 받아오기
                                // 회원의 예매 정보 받아오기
  // }, []);
    //회원 정보 받아오기
    const commuteGetUserInfo = () => {
        fetch(
        //  
        )
        .then((res)=>{
          return res.json();
        })
        .then((data)=>{
            setUserInfo({
                user_id:data.user_id,
                username:data.username,
                pwd:data.pwd,
                brith:data.brith,
                name:data.name,
                gender:data.gender,
        });
    });
    }
    // 예매 정보 받아오기 념념

  return (
      <div>
        <Header />
        {/* 회원 정보 */}
        <UserInfo userInfo={userInfo} />
        {/* 예매 정보 */}
        
   </div>
  );
};

export default MyPage;