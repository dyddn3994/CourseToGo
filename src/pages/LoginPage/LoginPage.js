import React, { useState } from "react";
import styled, { css } from 'styled-components';


import MainLayout from "../../components/Login/MainLayout";
import LogoHeader from "../../components/Login/LogoHeader";
import InputForm from "../../components/InputForm";
import ButtonType from "../../components/Login/ButtonType";

const LoginPage = () => {

  // 입력되는 아이디와 비밀번호
  const [inputs, setInputs] = useState({
    userId: '',
    pwd: ''
  });

  const {userId,pwd} = inputs;

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
    if (inputs.inputId === '') {
      alert('아이디를 입력하세요.');
    }
    else if (inputs.inputPwd === '') {
      alert('비밀번호를 입력하세요.');
    }
    else {
      fetch("/login?userId="+inputs.inputId+"&pwd="+inputs.inputPwd)
      .then((res)=>{
        return res.json();
      })
      .then((data)=>{
        if (data === 1) {
          alert('로그인 성공!');
          // navigate('/main');
        }
        else if (data === 2) {
          alert('탈퇴한 회원입니다. 다시 가입해주세요.');
        }
        else if (data === 3) {
          alert('로그인에 실패하였습니다. 아이디와 비밀번호를 다시 확인하세요.');
        }
      });
    }
  };

  return (
      <MainLayout>
        <LoginDiv>
        <LogoHeader />
       
    
          <InputForm label={"아이디"} name={"userId"} type={"text"} onChange={onChange} value = {userId}   onKeyPress={onKeyPressLogin}/>
          <InputForm label={"비밀번호"} name={"pwd"} type={"password"} onChange={onChange} value = {pwd}   onKeyPress={onKeyPressLogin}/>
   
        <ButtonType type='login' clickedHandler={buttonClickHandler}/>
        </LoginDiv>
      </MainLayout> 
  );
};
//}
// styled components
// div

const LoginDiv =  styled.div`
text-align: center;
margin-top:5%;
`;
export default LoginPage;