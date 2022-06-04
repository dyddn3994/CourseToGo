import React, { useState , useEffect} from "react";
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import CourseHeader from "../../components/CourseHeader";
import InputForm from "../../components/InputForm";
const  MyPage = () => {
  const navigate = useNavigate();

  // 프로필 사진을 얼굴 사진으로 쓸 것인지 체크 유무
  const [checkedFaceProfile, setCheckedFaceProfile] = useState(false);

  // 입력되는 정보
  const [inputMemberInfo, setInputMemberInfo] = useState({
    userId: 'dddd',
    pwd: 'ddd',
    memberName:'ddd',
    email:'ddd',
    phoneNumber:'010',
    age:'22',
    gender:'남성',
    memberProfile:'',
    memberFace:'',
  });

  const {userId,pwd,memberName,email,phoneNumber,age,gender, memberProfile, memberFace } = inputMemberInfo;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputMemberInfo({
      ...inputMemberInfo,
      [name]: value // name 키를 가진 값을 value 로
    });
  };
  const onChangeFile = (e) => {
    setInputMemberInfo({
      ...inputMemberInfo,
      [ e.target.name]: URL.createObjectURL(e.target.files[0]) // 파일 URL로 set
    });
    console.log(inputMemberInfo);
  }

  const faceProfileCheckedFandeler = () => {
    if(!checkedFaceProfile){ // 프로필 사진을 얼굴 사진으로 등록하기 O
         setInputMemberInfo({ 
        ...inputMemberInfo,
        memberFace: inputMemberInfo.memberProfile
      });
    }
    setCheckedFaceProfile(!checkedFaceProfile);
    return inputMemberInfo;
  }
  
  
    useEffect(() => {
        commuteGetMemberInfo();
      },[]);

    const  commuteGetMemberInfo = () => {
        fetch("/mypage")
          .then((res)=>{
            return res.json();
          })
          .then((memberData)=>{
            setInputMemberInfo({
              userId: memberData.userId,
              pwd: memberData.pwd,
              memberName:memberData.memberName,
              email:memberData.email,
              phoneNumber:memberData.phoneNumber,
              age:memberData.age,
              gender:memberData.gender,
              memberProfile:memberData.memberProfile,
              memberFace:memberData.memberFace,
          });
        });
      }
    const commutePutMemberInfo = () => {
      fetch("/mypage/update", {
        method: 'put',
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({
          userId:inputMemberInfo.userId,
          pwd: inputMemberInfo.pwd,
          memberName:inputMemberInfo.memberName,
          email:inputMemberInfo.email,
          phoneNumber:inputMemberInfo.phoneNumber,
          age:inputMemberInfo.age,
          gender:inputMemberInfo.gender,
          memberProfile:inputMemberInfo.memberProfile,
          memberFace:inputMemberInfo.memberFace,
       })
      })
      .then((res)=>{
        return res.json();
      })
      .then((updateResult)=>{
        if (updateResult) { // 수정 true 성공
          alert('회원 정보가 수정 되었습니다 ');
          navigate('../');
        }
        else {
          alert("회원 정보 수정에 실패 하였습니다");
        }
      });
    }
  
    const deleteMember = () => {
      commuteDeleteMemberInfo();
    };

    const commuteDeleteMemberInfo= () => {
        fetch("/mypage/withdraw", {
          method: 'put'
        })
        .then((res)=>{
          return res.json();
        })
        .then((deleteResult)=>{
          if (deleteResult) { // 회원 탈퇴 결과 성공 시
            alert('탈퇴 되었습니다');
            navigate('../');
          }
          else {
            alert("탈퇴 실패");
          }
        });
      }

    return (
      <MainDiv>
    
        {/* 코스명이 들어갈 부분 */}

        <CourseHeader inputCourseName={'마이페이지'} linkToBack={'/main'}/>
        <ScrollDiv>
          <InputDiv>
            <InputForm label={"이름"} name={"memberName"} type={"text"} onChange={onChange} value={memberName} />
            <InputFormDiv>  
              <InputLabel>
                <label>아이디</label>
              </InputLabel>
              <FormDiv>
                <label>{userId}</label>
              </FormDiv>   
            </InputFormDiv>
            {/* <InputForm label={"아이디"} name={"userId"} type={"text"} onChange={onChange} value={userId} /> */}
            <InputForm label={"비밀번호"} name={"pwd"} type={"text"} onChange={onChange} value={pwd} />
            <InputForm label={"전화번호"} name={"phoneNumber"} type={"number"} onChange={onChange} value={phoneNumber} />
            <InputForm label={"이메일"} name={"email"} type={"text"} onChange={onChange} value={email} />
            <InputForm label={"나이"} name={"age"} type={"number"} onChange={onChange} value={age} />
            <InputFormDiv>  
              <InputLabel>
                <label>성별</label>
              </InputLabel>
              <FormDiv>
                <label>{gender}</label>
              </FormDiv>   
            </InputFormDiv>

            {/* 프로필 사진 업로드 및 선택 부분 */}
            <InputForm  label={"프로필 사진"} name={"memberProfile"} type={"file"} onChange={onChangeFile} /> 
            {inputMemberInfo.memberProfile && (
              <ImageDiv>
                <UploadImg alt='profileImg' src={inputMemberInfo.memberProfile} style={{margin:'auto'}} />
              </ImageDiv>
             )}
            {!checkedFaceProfile &&
              <InputForm label={"얼굴 등록"} name={"memberFace"} type={"file"} onChange={onChangeFile} /> 
            }
            <ProfileCheckBoxDiv>
              <input  onClick={faceProfileCheckedFandeler} type="checkbox" />
              <label> 프로필 사진으로 얼굴 등록하기</label>
            </ProfileCheckBoxDiv>
            {(inputMemberInfo.memberFace && !checkedFaceProfile) && (
              <ImageDiv>
                <UploadImg alt='profileImg' src={inputMemberInfo.memberFace} style={{margin:'auto'}} />
              </ImageDiv>
             )}
          </InputDiv>     
          <SubmitButtonDiv>       
            < SubmitButton  buttonType={'update'} onClick={commutePutMemberInfo}>내 정보 수정</ SubmitButton>
            < SubmitButton onClick={deleteMember}>탈퇴</ SubmitButton>    
          </SubmitButtonDiv>
        </ScrollDiv>
     </MainDiv>
  );
};

// styled components
// div

const InputFormDiv =  styled.div`
width:70%;
height:100%;
display : flex; 
justify-content: space-around;
margin-left:12%;
font-size:1.2rem;
margin-bottom:1%;
`;

const ImageDiv =  styled.div`
width:100%;
text-align: center;
margin-bottom:3%;
`;

const UploadImg =  styled.img`
max-width:400px;
position:relative;
`;
const FormDiv=  styled.div`
width:80%; 
margin-bottom:3%;
margin-left:10%;
font-size:1.2rem;
`;
const InputLabel =  styled.div`
width:40%;
font-size:1.2rem;
`;
const MainDiv = styled.div`
  position: absolute; 
  background-color:	#F5F5F5;
  width:100%;
  height: 100vh;
`;

const ScrollDiv =  styled.div`
  background-color:#FFFFFF;
  width:65%;
  height:82%;
  margin-left:18%;
  border-radius: 1rem;
  box-shadow: 0px 0px 4px lightgray;
  margin-top:6%;
  overflow: scroll;
  &::-webkit-scrollbar {
    height:0px;
    width:15px
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cccccc ;
    border-radius:6px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-corner{
    background-color:#F5F5F5 ;
  }
`;

const InputDiv =  styled.div`
margin-top:3%;
`;

const ProfileCheckBoxDiv =  styled.div`
width:80%;
height:100%;
display : flex; 
margin-left:40%;
font-size:1.2rem;
margin-bottom:3%;

`;

const SubmitButtonDiv =  styled.div`
margin-top:5%;
  text-align: center;
    margin-left:8%;
  width:80%;
  margin-bottom:2%;
  justify-content: space-around;
`;

const SubmitButton = styled.button`
    margin-left:3%;
  background-color: ${(props)=>props.buttonType==='update' ? '#4D9FE3' :'#ffffff' };
  border-radius: 0.30rem;
  font-size: 1.3rem;
  line-height: 1.6;
 border: 1px solid lightgray;
 width:20%;
 color: ${(props)=>props.buttonType==='update' ? '#ffffff' :'#4D9FE3' };
 display: inline-block;
 font-weight:bold;
 border: 1.3px solid  #4D9FE3;
 box-shadow: 0px 0px 2px gray;
 &:hover{  
  border: 1px solid  lightgray;
  box-shadow: 0px 0px 4px gray;
}
`;

export default MyPage ;