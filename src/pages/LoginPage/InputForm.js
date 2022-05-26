import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const textMap = {
  login:'로그인',
  searchId: '아이디찾기',
  searchPw: '비밀번호찾기'
}

const Form = ({type}) => {
  // useState
  const [inputId, setInputId] = useState('');
  const [inputPwd, setInputPwd] = useState('');
  
  // onChange
  const onChangeInputId = e => setInputId(e.target.value);
  const onChangeInputPwd = e => setInputPwd(e.target.value);
  
  // onKeyPress
  const onKeyPressLogin = e => {
    if (e.key === 'Enter') {
      buttonClickHandler();
    }
  }

  const navigate = useNavigate();
  const text = textMap[type];
  
  const buttonClickHandler = () => {
    if (inputId === '') {
      alert('아이디를 입력하세요.');
    }
    else if (inputPwd === '') {
      alert('비밀번호를 입력하세요.');
    }
    else {
      fetch("/login?userId="+inputId+"&pwd="+inputPwd)
      .then((res)=>{
        return res.json();
      })
      .then((data)=>{
        if (data === 1) {
          alert('로그인 성공!');
          navigate('/main');
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
    <LoginDiv>
      <div>
        <InputDiv>
      {type === 'login' ? (
        <div>
            <InputForm placeholder="아이디를 입력하세요"
                type='text'
                id='inputId'  
                name='inputId'    
                onChange={onChangeInputId}
                onKeyPress={onKeyPressLogin}
                // value = {form.username}
            />
            <InputForm placeholder="비밀번호를 입력하세요"
                type='password' 
                id='inputPwd' 
                name='inputPwd'
                onChange={onChangeInputPwd} 
                onKeyPress={onKeyPressLogin}
                // value ={form.password} 
            />
            </div>
            ):(
        
        <div>
            <InputForm placeholder="이름을 입력하세요"
                type='text'
                id='inputName'  
                name='inputName'    
                // onChange={onChange}
                // value = {form.username}
            />
            <InputForm placeholder="이메일을 입력하세요"
                type='text' 
                id='inputEmail' 
                name='inputEmail'
                // onChange={onChange} 
                // value ={form.password} 
            />
            </div>
      
      )}  
        </InputDiv>
        <LoginButton onClick={buttonClickHandler}>{text}</LoginButton>

      </div>    
        <ButtonDiv>
            {type === 'login' ? (
                <SearchDiv>
                  <div>
                    <Link to="/searchId">아이디찾기</Link>
                  </div>
                  <div>
                  <Link to="/searchPw">비밀번호찾기</Link>
                  </div>   
                </SearchDiv>  

            ):(
                <Link to="/"  >로그인</Link>
            )
            }
            
            <div>
                <Link to ="/signUp" >회원가입</Link>
            </div>
            
        </ButtonDiv>

    </LoginDiv>
  );
};

const SearchDiv =  styled.div`
display : flex; 
justify-content: space-around;
width:70%;

`;
const LoginDiv =  styled.div`
text-align: center;

`;
const InputDiv =  styled.div`

margin-top:8%;

`;
const InputForm = styled.input`
   background-color:#4D9FE3;
   border-radius: 0.30rem;
   font-size: 1rem;
  line-height: 2;
  border: 1px solid lightgray;
  width:55%;

  color:#FFFFFF;
  margin:0 0 10px;


`;

const LoginButton = styled.button`
    margin-top:4%;
     background-color:#FFCC29;
   // background-color:#FF7F50;
    border-radius: 0.30rem;
    font-size: 1.2rem;
   line-height: 1.6;
   border: 1px solid lightgray;
   width:30%;
   color:#FFFFFF;
   display: inline-block;
   font-weight:bold;
`;

const ButtonDiv = styled.div`
font-size: 0.8rem;
margin-top:3rem;
display : flex; 
justify-content: space-around;
width:60%;
margin-left:17%;
a {
    color :#000000 ;
    text-decoration:none;
}
`;


export default Form;