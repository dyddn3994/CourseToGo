import React, { useState } from "react";
import styled, { css } from 'styled-components';

import MainLayout from "../../components/Login/MainLayout";
import LogoHeader from "../../components/Login/LogoHeader";
import InputForm from "../../components/InputForm";
import ButtonType from "../../components/Login/ButtonType";

    const SearchPwPage = () => {
       
      const [inputs, setInputs] = useState({
        userId: '',
        email: ''
      });
    
      const {userId, email} = inputs;
    
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
    if (inputs.userId === '') {
      alert('아이드를 입력하세요.');
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
      //     alert('< 비밀번호 > 입니다');
      //     navigate('/main');
      //   }
      //   else if (data === 3) {
      //      alert('등록되지 않은 회원 정보입니다');
      //   }
      // });
    }
  };


      return(
          <MainLayout>
            <LoginDiv>
              <LogoHeader />
              <InputForm label={"아이디"} name={"userId"} type={"text"} onChange={onChange} value = {userId}  onKeyPressLogin={onKeyPressLogin}/>
              <InputForm label={"이메일"} name={"email"} type={"text"} onChange={onChange} value = {email}  onKeyPressLogin={onKeyPressLogin}/>
              <ButtonType type='searchPw' clickedHandler={buttonClickHandler}/>
            </LoginDiv>
        </MainLayout> 

        );
      };

  const LoginDiv =  styled.div`
    text-align: center;
    margin-top:5%;
  `;
export default SearchPwPage;