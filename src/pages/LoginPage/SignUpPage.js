
import React, { useState, Component } from "react";
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import MainLayout from "../MainLayout";
const SignUp = () => {
  const navigate = useNavigate();
  
  // useState
  const [inputId, setInputId] = useState('');
  const [inputPwd, setInputPwd] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputAge, setInputAge] = useState('');
  const [inputGender, setInputGender] = useState('');

  // onChange
  const onChangeInputId = e => setInputId(e.target.value);
  const onChangeInputPwd = e => setInputPwd(e.target.value);
  const onChangeInputName = e => setInputName(e.target.value);
  const onChangeInputEmail = e => setInputEmail(e.target.value);
  const onChangeInputPhone = e => setInputPhone(e.target.value);
  const onChangeInputAge = e => setInputAge(e.target.value);
  const onChangeInputGender = e => {
    // 1이면 남자, 2이면 여자
    const genderNum = e.target.value;
    if (genderNum === 1) {
      setInputGender('남성');
    }
    else {
      setInputGender('여성');
    }
  }

  // sinUpHandler = (e) => {
  //   const { memberName, value } = e.target;
  //   this.setState({ [memberName]: value });
  // };   ////계산된 속성명 사용

  // onKeyPress
  const onKeyPressSignUp = e => {
    // input에 커서를 두고 키보드의 엔터 클릭 시 버튼 동작 
    if (e.key === 'Enter') {
      sinUpClickHandler();
    }
  }

  const commutePostSignUp = () => {
    fetch("/join", {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        userId: inputId,
        pwd: inputPwd,
        memberName: inputName,
        email: inputEmail,
        phoneNumber: inputPhone,
        age: inputAge,
        gender: inputGender,
        // 아래 두 값은 임의로 둔 상태. 수정할것
        memberProfile: 1,
        memberFace: 0
      })
    })
    .then((res)=>{
      return res.json();
    })
    .then((memberId)=>{
      // 가입 성공 시 table상의 id값 반환, 실패시 -1
      if (memberId === -1) {
        alert('회원가입에 실패하였습니다. ');
      }
      else {
        alert('test : ' + memberId);
        alert("회원가입 되었습니다");
        navigate('../');
      }
    });
  }

  const sinUpClickHandler = () => {
    if (inputId === '') {
      alert('id를 입력하세요');
    }
    else if (inputPwd === '') {
      alert('비밀번호를 입력하세요');
    }
    else if (inputName === '') {
      alert('이름을 입력하세요');
    }
    else if (inputEmail === '') {
      alert('이메일을 입력하세요');
    }
    else if (inputPhone === '') {
      alert('전화번호를 입력하세요');
    }
    else if (inputAge === '') {
      alert('나이를 입력하세요');
    }
    else if (inputGender === 0) {
      alert('성별을 선택하세요');
    }
    else {
      // commutePostSignUp();
    }
   
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


  // const { isOpen, close } = props; 
    return (
      <MainLayout> 
          <LoginDiv>

                <InputForm
                    name="userId"
                    type="text"
                    placeholder="아이디"
                    // value={this.state.userName}
                    onChange={onChangeInputId}
                    onKeyPress={onKeyPressSignUp}
                  />
                 <InputForm
                    name="pwd"
                    type="password"
                    placeholder="비밀번호"
                    // value={this.state.pwd}
                    onChange={onChangeInputPwd}
                    onKeyPress={onKeyPressSignUp}
                  />
                  <InputForm
                      name="memberName"
                      type="text"
                      placeholder="이름"
                      onChange={onChangeInputName}
                      onKeyPress={onKeyPressSignUp}
                    />
                  <InputForm
                    name="email"
                    type="text"
                    placeholder="이메일"
                    // value={this.state.email}
                    onChange={onChangeInputEmail}
                    onKeyPress={onKeyPressSignUp}
                  />
                  <InputForm
                    name="phoneNumber"
                    type="text"
                    placeholder="전화번호"
                    // value={this.state.phoneNumber}
                    onChange={onChangeInputPhone}
                    onKeyPress={onKeyPressSignUp}
                  />
                    <InputForm
                    name="age"
                    type="text"
                    placeholder="나이"
                    // value={this.state.age}
                    onChange={onChangeInputAge}
                    onKeyPress={onKeyPressSignUp}
                  />

                  <GenderDiv>

                    <div>
                      <input
                        name="gender"
                        type="radio"
                        value="1"
                        placeholder="성별"
                        onChange={onChangeInputGender}
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
                        onChange={onChangeInputGender}
                      />
                      <label>
                        여자
                      </label>
                    </div>
                  </GenderDiv>

                  <SignUpButton   type="submit"onClick={sinUpClickHandler} >
                    회원가입
                  </SignUpButton>
                 

          </LoginDiv>
          </MainLayout>
    );
        };
  


const LoginDiv =  styled.div`
text-align: center;

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