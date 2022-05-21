// import React, { useState } from "react";
// import styled, { css } from 'styled-components';
// import { useNavigate } from 'react-router-dom';


// // 로그인, 아이디찾기, 비번찾기, 회원가입 폼 작성

// function LoginForm () {
//   const [inputId, setInputId] = useState('');
//   const [inputPw, setInputPw] = useState('');
  
//   const navigate = useNavigate();

//   const handleInputId = event => {
//     setInputId(event.target.value);
//   };

//   const handleInputPw = event => {
//     setInputPw(event.target.value);
//     };

//     // login 버튼 클릭 이벤트
//     const onClickLogin  = async () => {
//         navigate("/main");
//       };

//     return (
//         <LoginDiv>
          
//             <div>
//                 <InputForm placeholder="아이디를 입력하세요"
//                     type='text'
//                     id='input_id'  
//                     name='input_id'    
//                     value={inputId}
//                     onChange={handleInputId} 
//                 />
//             </div>
//             <div>
//                 <InputForm placeholder="비밀번호를 입력하세요"
//                     type='password' 
//                     id='input_pw' 
//                     name='input_pw'
//                     value={inputPw}
//                     onChange={handleInputPw} 
//                 />
//             </div>
        
//             <div>
//                 <LoginButton type='button' onClick={onClickLogin}>여행가기</LoginButton>
//             </div>
//         </LoginDiv>
//     )
// }
 
// const LoginDiv =  styled.div`
// text-align: center;

// `;
// const InputForm = styled.input`
//    background-color:#4D9FE3;
//    border-radius: 0.30rem;
//    font-size: 1rem;
//   line-height: 2;
//   border: 1px solid lightgray;
//   width:60%;

//   color:#FFFFFF;
//   margin:0 0 10px;

// `;

// const LoginButton = styled.button`
//     margin-top:4%;
//      background-color:#FFCC29;
//    // background-color:#FF7F50;
//     border-radius: 0.30rem;
//     font-size: 1.2rem;
//    line-height: 1.8;
//    border: 1px solid lightgray;
//    width:40%;
//    color:#FFFFFF;
//    display: inline-block;
//    font-weight:bold;
// `;
// export default LoginForm;