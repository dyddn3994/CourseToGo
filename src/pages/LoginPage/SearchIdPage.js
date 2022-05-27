import React, { useState } from "react";
import styled, { css } from 'styled-components';

import MainLayout from "../../components/Login/MainLayout";
import LogoHeader from "../../components/Login/LogoHeader";
import InputForm from "../../components/Login/InputForm";
import ButtonType from "../../components/Login/ButtonType";


    const SearchIdPage = () => {
      const [icCheckedId, setIsCheckedId] = useState('false');  //아이디 확인
      const [isCheckedPwd, setIsCheckedPwd] = useState('false');  //비밀번호 확인
      // 입력되는 아이디와 비밀번호
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
     
      const clickedHandler =(e) =>{
        alert("아이디입니다");
      };

      return(
          <MainLayout>
            <LoginDiv>
              <LogoHeader />
              <InputForm label={"이름"} name={"name"} type={"text"} onChange={onChange} value = {name}/>
              <InputForm label={"이메일"} name={"email"} type={"text"} onChange={onChange} value = {email}/>
              <ButtonType type='searchId' clickedHandler={clickedHandler}/>
            </LoginDiv>
        </MainLayout> 

        );
      };

  const LoginDiv =  styled.div`
    text-align: center;
    margin-top:5%;
  `;

export default SearchIdPage;