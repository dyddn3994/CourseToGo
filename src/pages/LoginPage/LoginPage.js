import React, { useState } from "react";
import styled, { css } from 'styled-components';


import MainLayout from "../../components/Login/MainLayout";
import LogoHeader from "../../components/Login/LogoHeader";
import InputForm from "../../components/Login/InputForm";
import ButtonType from "../../components/Login/ButtonType";

const LoginPage = () => {

  const [icCheckedId, setIsCheckedId] = useState('false');  //아이디 확인
  const [isCheckedPwd, setIsCheckedPwd] = useState('false');  //비밀번호 확인
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
 
  const clickedHandler =(e) =>{
    
  };

  return (
      <MainLayout>
        <LoginDiv>
        <LogoHeader />
       
    
          <InputForm label={"아이디"} name={"userId"} type={"text"} onChange={onChange} value = {userId}/>
          <InputForm label={"비밀번호"} name={"pwd"} type={"password"} onChange={onChange} value = {pwd}/>
   
        <ButtonType type='login' clickedHandler={clickedHandler}/>
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