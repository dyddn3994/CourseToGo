import React, { useState } from "react";
import styled, { css } from 'styled-components';

import MainLayout from "../../components/Login/MainLayout";
import LogoHeader from "../../components/Login/LogoHeader";
import InputForm from "../../components/Login/InputForm";
import ButtonType from "../../components/Login/ButtonType";


    const SearchIdPage = () => {
      const [inputs, setInputs] = useState({
        name: '',
        email: ''
      });
    
      const {name, email} = inputs;
    
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
    if (inputs.name === '') {
      alert('이름를 입력하세요.');
    }
    else if (inputs.email === '') {
      alert('이메일를 입력하세요.');
    }
    else {
      // fetch("/login?userId="+inputs.inputId+"&pwd="+inputs.inputPwd)
      // .then((res)=>{
      //   return res.json();
      // })
      // .then((data)=>{
      //   if (data === 1) {
      //     alert('< 아이디 > 입니다');
      //     navigate('/main');
      //   }
      //   else if (data === 2) {
      //     alert('탈퇴한 회원입니다. 다시 가입해주세요.');
      //   }
      //   else if (data === 3) {
      //     alert('등록되지 않은 회원 정보입니다');
      //   }
      // });
    }
  };

      return(
          <MainLayout>
            <LoginDiv>
              <LogoHeader />
              <InputForm label={"이름"} name={"name"} type={"text"} onChange={onChange} value = {name} onKeyPressLogin={onKeyPressLogin}/>
              <InputForm label={"이메일"} name={"email"} type={"text"} onChange={onChange} value = {email} onKeyPressLogin={onKeyPressLogin}/>
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