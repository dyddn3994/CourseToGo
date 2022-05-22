
import React, {useState, Component } from "react";
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import MainLayout from "../MainLayout";
const SignUp = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    userId: '',
    pwd: '',
    memberName:'',
    email:'',
    phoneNumber:'',
    age:'',
    gender:''
  });

  const {userId,pwd,memberName,email,phoneNumber,age,gender } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value // name 키를 가진 값을 value 로
    });
  };
 
  const sinUpClickHandler = () => {
    alert(gender);
    navigate('../');
   
  //   const { email, password } = this.state;
  //   // fetch("http://10.58.2.17:8000/auth/login", {
  //   //   method: "POST",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   //   body: JSON.stringify({
  //   //     email,
  //   //     password,
  //   //   }),
  //   // })
  //   //   .then((res) => res.json())
  //   //   .then((res) => console.log(res));
  }; 

    return (
      <MainLayout>   
          <LoginDiv>
                <InputForm
                    name="memberName"
                    type="text"
                    placeholder="이름"
                    onChange={onChange}
                    value={memberName}
                  />

                <InputForm
                    name="userId"
                    type="text"
                    placeholder="아이디"
                    onChange={onChange}
                    value={userId}
                  />
                 <InputForm
                    name="pwd"
                    type="password"
                    placeholder="비밀번호"
                    onChange={onChange}
                    value={pwd}
                  />
                  <InputForm
                    name="email"
                    type="text"
                    placeholder="이메일"
                    onChange={onChange}
                    value={email}
                  />
                  <InputForm
                    name="phoneNumber"
                    type="text"
                    placeholder="전화번호"
                    onChange={onChange}
                    value={phoneNumber}
                  />
                    <InputForm
                    name="age"
                    type="text"
                    placeholder="나이"
                    onChange={onChange}
                    value={age}
                  />

                  <GenderDiv>

                    <div>
                      <input
                        name="gender"
                        type="radio"
                        value="1"
                        placeholder="성별"
                        onChange={onChange}
                      />
                      <label>
                        남자
                      </label>
                    </div>

                    <div>
                      <input
                        name="gender"
                        type="radio"
                        value="2"
                        placeholder="성별"
                        onChange={onChange}
                      />
                      <label>
                        여자
                      </label>
                    </div>
                  </GenderDiv>

                  <SignUpButton   type="submit"onClick={sinUpClickHandler} >회원가입</SignUpButton>

          </LoginDiv>
          </MainLayout>
    );
        };
  
const LoginDiv =  styled.div`
text-align: center;
margin-top:25%;

`;
const InputForm = styled.input`
   border-radius: 0.30rem;
   font-size: 1rem;
  line-height: 2;
  border: 1px solid lightgray;
  width:55%;
  margin:0 0 10px;

`;

const SignUpButton = styled.button`
    margin-top:7%;
   background-color:#FF7F50;
    border-radius: 0.30rem;
    font-size: 1.2rem;
   line-height: 1.8;
   border: 1px solid lightgray;
   width:40%;
   color:#FFFFFF;
   display: inline-block;
   font-weight:bold;
`;

const GenderDiv =  styled.div`
  display : flex; 
  justify-content: space-around;
  width:60%;
  margin-left:15%;
`;
export default SignUp;