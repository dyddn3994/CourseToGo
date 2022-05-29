
import React, {useState, Component } from "react";
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

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
    if (inputs.userId === '') {
      alert('아이디를 입력해주세요.');
    }
    else {
      fetch("/duplicate?userId="+String(inputs.userId))
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

  // // 텍스트 정보 회원가입
  // const commutePostJoin = () => {
  //   fetch("/join/info", {
  //     method: 'post',
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body : JSON.stringify({
  //       userId: inputs.userId,
  //       pwd: inputs.pwd,
  //       phoneNumber: inputs.phoneNumber,
  //       email: inputs.email,
  //       age: inputs.age,
  //       memberName: inputs.name,
  //       gender: inputs.gender,
  //       profileImage: inputs.memberProfile,
  //       faceImage: inputs.memberFace
  //     })
  //   })
  //   .then((res)=>{
  //     return res.json();
  //   })
  //   .then((memberId)=>{
  //     // 회원가입 성공 시 멤버 id값 반환, 실패시 -1
  //     if (memberId === -1) {
  //       alert('회원가입에 실패하였습니다');
  //     }
  //     else {
  //       commutePostJoinImage();
  //     }
  //   });
  // }
  // // 사진 이미지 정보 회원가입
  // const commutePostJoinImage = () => {
  //   const profileImage = new FormData();
  //   profileImage.append('profileImage', file1[0]);
  //   profileImage.append('profileImage', file2[0]);
  //   const config = {
  //     headers: {
  //       "content-type": "multipart/form-data"
  //     }
  //   };
  //   axios.post(`join/image`, profileImage, config)
  //   .then(res => console.log(res.data));
    
  //   alert('회원가입에 성공하였습니다.');
  //   // navigate('../');  //로그인 페이지로
  // }
  // 회원가입 
  const commutePostJoin = () => {
    const profileImage = new FormData();
    profileImage.append('profileImage', memberProfile[0]);
    profileImage.append('profileImage', memberFace[0]);
    profileImage.append('userId', new Blob([JSON.stringify(inputs.userId)], { type: 'application/json'}));
    profileImage.append('pwd', new Blob([JSON.stringify(inputs.pwd)], { type: 'application/json'}));
    profileImage.append('phoneNumber', new Blob([JSON.stringify(inputs.phoneNumber)], { type: 'application/json'}));
    profileImage.append('email', new Blob([JSON.stringify(inputs.email)], { type: 'application/json'}));
    profileImage.append('age', new Blob([JSON.stringify(inputs.age)], { type: 'application/json'}));
    profileImage.append('memberName', new Blob([JSON.stringify(inputs.name)], { type: 'application/json'}));
    profileImage.append('gender', new Blob([JSON.stringify(inputs.gender)], { type: 'application/json'}));
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios.post(`join`, profileImage, config)
    .then(res => console.log(res.data));
    
    alert('회원가입에 성공하였습니다.');
    // navigate('../');  //로그인 페이지로
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
    
          <InputForm accept="image/*" label={"프로필 사진"} name={"memberProfile"} type={"file"} onChange={onChangeFile} value={memberProfile} />
          {!(memberProfile==='') ?
            <div>
              {!checkedFaceProfile ?  <InputForm accept="image/*" label={"얼굴 등록"} name={"memberFace"} type={"file"} onChange={onChangeFile} value={memberFace} /> 
              :null}
              <GenderDiv>
                  <input  onClick={faceProfileCheckedFandeler} type="checkbox" />
                  <label> 프로필 사진으로 얼굴 등록하기</label>
              </GenderDiv>
            </div>
          :null}
          {/* <form>
          <input type='file' id='image1' accept='img/*' onChange={onLoadFile1} />
          <label htmlFor='image1'>파일 선택하기</label>
          </form>
          
          <form>

          <input type='file' id='image2' accept='img/*' onChange={onLoadFile2} />
          <label htmlFor='image2'>파일 선택하기</label>
          </form> */}
                 
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