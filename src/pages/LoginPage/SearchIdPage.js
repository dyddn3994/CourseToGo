import React, { useState } from "react";
import styled, { css } from 'styled-components';

import MainLayout from "../../components/Login/MainLayout";
import LogoHeader from "../../components/Login/LogoHeader";
import InputForm from "../../components/InputForm";
import ButtonType from "../../components/Login/ButtonType";


    const SearchIdPage = () => {
      const [inputs, setInputs] = useState({
        name: '',
        phoneNumber: ''
      });
    
      const {name, phoneNumber} = inputs;
    
      const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
          ...inputs,
          [name]: value // name 키를 가진 값을 value 로
        });
      };
     

  const onKeyPressLogin = e => {
    if (e.key === 'Enter') {
      buttonClickHandler();
    }
  }

  const buttonClickHandler = () => {
    if (name === '') {
      alert('이름를 입력하세요.');
    }
    else if (phoneNumber === '') {
      alert('전화번호를 입력하세요.');
    }
    else {
      commuteGetFindId();
    }
  };

  const commuteGetFindId = () => {
    fetch("/find/id", {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        memberName: name,
        phoneNumber: phoneNumber
      })
    })
    .then((res)=>{
      return res.json();
    })
    .then((findId)=>{
      // 찾는 id가 있으면 반환, 없으면 공백 반환
      if (findId === '') {
        alert('입력을 다시 확인해주세요.')
      }
      else {
        alert('아이디: ' + findId)
      }
    });
  }

      return(
          <MainLayout>
            <LoginDiv>
              <LogoHeader />
              <InputForm label={"이름"} name={"name"} type={"text"} onChange={onChange} value = {name} onKeyPressLogin={onKeyPressLogin}/>
              <InputForm label={"전화번호"} name={"phoneNumber"} type={"number"} onChange={onChange} value = {phoneNumber} onKeyPressLogin={onKeyPressLogin}/>
              <ButtonType type='searchId' clickedHandler={buttonClickHandler}/>
            </LoginDiv>
        </MainLayout> 

        );
      };

  const LoginDiv =  styled.div`
    text-align: center;
    margin-top:5%;
  `;

export default SearchIdPage;