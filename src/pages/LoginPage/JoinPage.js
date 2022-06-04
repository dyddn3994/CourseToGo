
import React, {useState, Component } from "react";
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

// components
import MainLayout from "../../components/Login/MainLayout";
import InputForm from "../../components/InputForm";
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
    memberFace: ''
  });
  const [isCheckedIdDuplicate, setIsCheckedIdDuplicate] = useState(false); // 중복 아이디 체크. true일때 중복확인 완료

  const {userId, pwd, memberName, email, phoneNumber, age, gender, memberProfile, memberFace } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;

    // 아이디 중복확인의 경우 중복확인을 한 후에 아이디를 새로 입력할 경우 다시 중복확인을 하지 않은 상태로 돌려야함
    if (name === 'userId') {
      setIsCheckedIdDuplicate(false);
    }

    setInputs({
      ...inputs,
      [name]: value // name 키를 가진 값을 value 로
    });
  };
  // 파일 input의 경우 e.targetvalue가 아닌 e.targetfiles로 처리
  const onChangeFile = (e) => {
    const { files, name } = e.target;

    setInputs({
      ...inputs,
      [name]: files
    });
  }

  const sinUpClickHandler = () => {
    if (!isCheckedIdDuplicate) {
      // 아이디 중복확인이 되지 않았을경우
      alert('아이디 중복확인이 필요합니다.');
    }
    else {
      console.log('list', inputs);

      commutePostJoin();
    }
  }; 

  // 아이디 중복 체크
  const duplicateClickedHandler = () => {
    if (userId === '') {
      alert('아이디를 입력해주세요.');
    }
    else {
      fetch("/duplicate?userId="+String(userId))
      .then((res)=>{
        return res.json();
      })
      .then((ack)=>{
        // 아이디가 있을 경우 true
        if (!ack) {
          alert('사용 가능한 아이디입니다.');
          setIsCheckedIdDuplicate(true);
        }
        else {
          alert('이미 사용중인 아이디입니다.');
        }
      });
    }
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

  // 회원가입 
  const commutePostJoin = () => {
    // input이 비어있을 경우 예외처리
    if (pwd === '') {
      alert('비밀번호를 입력해주세요');
    }
    else if (memberName === '') {
      alert('이름을 입력해주세요');
    }
    else if (phoneNumber === '') {
      alert('전화번호를 입력해주세요');
    }
    else if (email === '') {
      alert('이메일을 입력해주세요');
    }
    else if (age === '') {
      alert('나이를 입력해주세요');
    }
    else if (gender === '') {
      alert('성별을 선택해주세요');
    }
    else if (memberProfile === '') {
      alert('프로필 사진을 선택해주세요');
    }
    else if (!checkedFaceProfile && memberFace === '') {
      alert('얼굴로 등록할 사진을 선택해주세요');
    }
    else {
      const formData = new FormData();
      const memberDto1 = {
        userId: userId,
        pwd: pwd,
        phoneNumber: phoneNumber,
        email: email,
        age: age,
        memberName: memberName,
        gender: gender
      }
      formData.append('memberDto', new Blob([JSON.stringify(memberDto1)], { type: 'application/json'}));
      formData.append('profileImage', memberProfile[0]);
      formData.append('faceImage', memberFace[0]);
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      axios.post(`join`, formData, config)
      .then(res => {
        console.log(res.data)
        alert('회원가입에 성공하였습니다.');
        navigate('../');  //로그인 페이지로
      });
      
    }
  }

  // const [file1, setFile1] = useState('');
  // const [file2, setFile2] = useState('');

  // const onLoadFile1 = e => {
  //   const file = e.target.files;
  //   console.log(file);
  //   setFile1(file);
  // }
  // const onLoadFile2 = e => {
  //   const file = e.target.files;
  //   console.log(file);
  //   setFile2(file);
  // }

    return (
      <MainLayout>  
       <div>
        <LogoHeader /> 
        <IdCheckDiv>
          <InputForm label={"아이디"} name={"userId"} type={"text"} onChange={onChange} value={userId} />
          <DuplicateButton onClick={e=>duplicateClickedHandler(e)}>중복확인</DuplicateButton>
        </IdCheckDiv>
        <InputForm label={"비밀번호"} name={"pwd"} type={"password"} onChange={onChange} value={pwd} />
        <InputForm label={"이름"} name={"memberName"} type={"text"} onChange={onChange} value={memberName} />
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
    
          <InputForm accept="image/*" label={"프로필 사진"} name={"memberProfile"} type={"file"} onChange={onChangeFile} /> 
          {!(memberProfile==='') ?
            <div>
              {!checkedFaceProfile ?  <InputForm accept="image/*" label={"얼굴 등록"} name={"memberFace"} type={"file"} onChange={onChangeFile} /> 
              :null}
              <GenderDiv>
                  <input onClick={faceProfileCheckedFandeler} type="checkbox" />
                  <label> 프로필 사진으로 얼굴 등록하기</label>
              </GenderDiv>
            </div>
          :null}
                 
         <SubmitButtonDiv>
            <SubmitButton  type="submit" onClick={sinUpClickHandler} >회원가입</SubmitButton>
            <SubmitButton onClick={() => navigate('../')} >로그인 화면</SubmitButton>
         </SubmitButtonDiv>
         </div>
      </MainLayout>
    );
  };
  

  const InputLabel =  styled.div`
  width:40%;
  font-size:1.2rem;
  `;
const DuplicateButton =styled.button`
    height:90%;
    width:14%;
    font-size:1.1rem;
    margin-left:3%;
    margin-top:1%;
    border-radius: 0.30rem;
   line-height: 1.6;
   background-color:  #ffffff;
   color:#4D9FE3;
border: 1.3px solid  #4D9FE3;
box-shadow: 0px 0px 2px gray;
&:hover{  
    background-color: #4D9FE3;
    color:#ffffff;
    box-shadow: 0px 0px 4px gray;
}
`;

const RadioDiv =  styled.div`
  width:40%;
  height:100%;
  display : flex; 
  justify-content: space-around;
  font-size:1.2rem;
`;

const GenderDiv =  styled.div`
font-size:1.2rem;
  width:80%;
  height:100%;
  display : flex; 
  margin-left:11.8%;
  margin-top:1%;
  margin-bottom:3%;
`;

const IdCheckDiv=  styled.div`
  display : flex; 
  
`;
const SubmitButtonDiv =  styled.div`
    text-align: center;
    margin:8%;
    margin-left:10%;

`;

const SubmitButton = styled.button`
margin-left:2%;
background-color:  #ffffff;
border-radius: 0.30rem;
font-size: 1.3rem;
line-height: 1.6;
width:30%;
color:#4D9FE3;
font-weight:bold;
border: 1.3px solid  #4D9FE3;
box-shadow: 0px 0px 2px gray;
&:hover{  
    background-color: #4D9FE3;
    color:#ffffff;
    box-shadow: 0px 0px 4px gray;
}
`;
export default Join;