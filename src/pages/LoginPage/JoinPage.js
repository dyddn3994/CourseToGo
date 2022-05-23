
import React, {useState, Component } from "react";
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import MainLayout from "../../components/Login/MainLayout";
import InputForm from "../../components/Login/InputForm";
import LogoHeader from "../../components/Login/LogoHeader";

const Join = () => {
  const navigate = useNavigate();

  // 프로필 사진을 얼굴 사진으로 쓸 것인지 체크 유무
  const [checkedFaceProfile, setCheckedFaceProfile] = useState(false);
 
  // 입력되는 정보
  const [inputs, setInputs] = useState({
    userId: '',
    pwd: '',
    memberName:'',
    email:'',
    phoneNumber:'',
    age:'',
    gender:'',
    memberProfile:'',
    memberFace:'',
  });

  const {userId,pwd,memberName,email,phoneNumber,age,gender, memberProfile, memberFace } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value // name 키를 가진 값을 value 로
    });
  };

  const sinUpClickHandler = () => {
    console.log('list', inputs);

    // 프로필 사진과 얼굴 사진 전송하기 포함해야함
    // const formData = new FormData();
    // formData.append('memeberProfile', inputs.memberProfile);
    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data"
    //   }
    // };
    // axios.post(`uploadAPI`, formData, config);

    alert("회원가입되었습니다");
    navigate('../');  //로그인 페이지로
  }; 

  const duplicateClickedHandler = () =>{
    alert(inputs.userId);
    // alert("사용 가능한 아이디입니다");
    // alert("이미 사용중인 아이디입니다");
  }
  const faceProfileCheckedFandeler = () => {
   
    if(checkedFaceProfile){
      setInputs({
        ...inputs,
        memberFace: ''
      });
    }
    else{
      setInputs({
        ...inputs,
        memberFace: inputs.memberProfile
      });
    }
    setCheckedFaceProfile(!checkedFaceProfile);

    console.log('list',inputs);
  }

    return (
      <MainLayout>  
       <div>
        <LogoHeader /> 
        <InputForm label={"이름"} name={"memberName"} type={"text"} onChange={onChange} value={memberName} />
        <IdCheckDiv>
          <InputForm label={"아이디"} name={"userId"} type={"text"} onChange={onChange} value={userId} />
          <DuplicateButton onClick={e=>duplicateClickedHandler(e)}>중복확인</DuplicateButton>
        </IdCheckDiv>
        <InputForm label={"비밀번호"} name={"pwd"} type={"password"} onChange={onChange} value={pwd} />
        <InputForm label={"전화번호"} name={"phoneNumber"} type={"number"} onChange={onChange} value={phoneNumber} />
        <InputForm label={"이메일"} name={"email"} type={"text"} onChange={onChange} value={email} />
        <InputForm label={"나이"} name={"age"} type={"number"} onChange={onChange} value={age} />
           
        {/* 성별 선택 부분 */}
        <GenderDiv>
        <InputLabel>
          <label>성별</label>
        </InputLabel>
        <RadioDiv>
          <div>
            <input  name="gender" type="radio"value="남성" onChange={onChange}/>
            <label>남성</label>
          </div>
          <div>
            <input  name="gender" type="radio" value="여성" onChange={onChange}/>
            <label>여성</label>
          </div>
          </RadioDiv>
        </GenderDiv>
  
          {/* 프로필 사진 업로드 및 선택 부분 */}
    
          <InputForm  label={"프로필 사진"} name={"memberProfile"} type={"file"} onChange={onChange} value={memberProfile} />
          {!(memberProfile==='') ?
            <div>
              {!checkedFaceProfile ?  <InputForm accept="image/*" label={"얼굴 등록"} name={"memberFace"} type={"file"} onChange={onChange} value={memberFace} /> 
              :null}
              <GenderDiv>
                  <input  onClick={faceProfileCheckedFandeler} type="checkbox" />
                  <label> 프로필 사진으로 얼굴 등록하기</label>
              </GenderDiv>
            </div>
          :null}
     
                 
         <SubmitButtonDiv>
            <SubmitButton  type="submit"onClick={sinUpClickHandler} >회원가입</SubmitButton>
         </SubmitButtonDiv>
         </div>
      </MainLayout>
    );
  };
  

  const InputLabel =  styled.div`
  width:40%;
  font-size:0.9rem;
  `;
const DuplicateButton =styled.button`
    height:90%;
    width:13%;
    font-size:0.7rem;
    margin-left:3%;
    margin-top:1%;
    border-radius: 0.30rem;
   line-height: 1.6;
   border: 1px solid lightgray;
   
`;

const RadioDiv =  styled.div`
  width:40%;
  height:100%;
  display : flex; 
  justify-content: space-around;
`;

const GenderDiv =  styled.div`
  width:80%;
  height:100%;
  display : flex; 
  margin-left:10%;
  font-size:0.9rem;
  margin-top:1%;
  margin-bottom:3%;
`;

const IdCheckDiv=  styled.div`
  display : flex; 
  
`;
const SubmitButtonDiv =  styled.div`
    text-align: center;
    margin:8%;

`;

const SubmitButton = styled.button`
    margin-top:4%;
     background-color:#FFCC29;
    border-radius: 0.30rem;
    font-size: 1.1rem;
   line-height: 1.6;
   border: 1px solid lightgray;
   width:40%;
   color:#FFFFFF;
   display: inline-block;
   font-weight:bold;
   margin-bottom:20%;
`;
export default Join;