import React, { useState , useEffect, useRef } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { Ring } from '@uiball/loaders'

import data from '../../assets/Photo/Photo';
import userData from '../../assets/User/User';

import PhotoList from "../../components/PhotoAlbum/PhotoList";
import PhotoDetailView from "../../components/PhotoAlbum/PhotoDetailView";
import FilterinUserList from '../../components/PhotoAlbum/./FilteringUserList';
import BodyBlackoutStyle from "../../components/PhotoAlbum/BodyBlackoutStyle";
import EditModal from "../../components/PhotoAlbum/EditModal";
import CourseHeader from "../../components/CourseHeader";

const CoursePhotoPage = () => {

  // url 파라미터 
  // courseId: 코스id(1, 2, ...)
  // day: 설정 일차(1, 2, ...)
  const params = useParams();

  // useEffect
  useEffect(() => {
    // new Promise((resolve, reject) => {
    //   commuteGetMemberInfo();
    //   commuteGetCoursePhoto();
    // .then(() => {
    //   setLoading(false);
    // })
    // .catch(() => {
    //   console.log('err')
    // })
    commuteGetMemberInfo();
    commuteGetCoursePhoto();
    setLoading(false);
  }, []);

  // useRef
  const photoInputRef = useRef(); // 사진 업로드 input을 버튼에서 클릭할 수 있게 하는 ref
  // const outerDivRef = useRef();

  const [courseName, setCourseName] = useState("JEJU 제주");  //코스이름


  //필터링 유저 부분
  const [users, setUser] = useState(userData);    //회원 데이터
  const [checkedUsers, setCheckedUsers]  =  useState([]);  // 선택된 유저 아이디들 리스트 (유저의 아이디만을 담았음)

  // 사진 선택 부분
  const [datas, setData] = useState(data);    //사진 데이터
  const [currItem, setCurrItem] = useState(data[0]);  //선택된 사진(상세정보 보일 사진)
  const [checkedPhotos, setCheckedPhotos]  =  useState([]);   // 선택된 사진들 리스트

  // 입력되는 정보
  const [inputs, setInputs] = useState({
    uploadPhotos: ''
  });
  const { uploadPhotos } = inputs;

  const [loading, setLoading] = useState(true); // 화면이 로딩중이라면 true
  
  // const [isCheckedAllPhoto, setIsCheckedAllPhoto] = useState(false); //사진 선택여부
  // const [isCheckedPhoto, setIsCheckedPhoto] = useState(false); //사진 선택여부
  // 사진 편집 클릭 유무
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 

  
  // useEffect(() => {
  //   getData(); 
  // }, [])

  useEffect(()=> {
    onView();
  },[checkedPhotos])

  // 사진 전체 선택 버튼 클릭 시
  const allCheckedHandler = (checked) => {
    const checkedItemsArray = [];
    datas.forEach(data=>checkedItemsArray.push(data));
    setCheckedPhotos(checkedItemsArray);
    console.log('list', checkedPhotos);
   
  };

  // 사진 선택 해제

  const clearCheckedHandler = ()=> {
    setCheckedPhotos([]); // 배열 초기화
    console.log('list', checkedPhotos);
  };
  
   //다운로드 클릭 시
   const downloadCheckedHandler = (e) => {
    checkedPhotos.forEach((value) => {    //선택된 사진들 다 다운로드 하기
      const url =  value.photoImage;
      const a = document.createElement("a")
      a.href = url
      a.download = `${value.itinerary}_${value.uploader}` //다운로드될 파일 이름
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url);
    })
  };

   // 삭제 버튼 클릭 시
   const deleteCheckedHandler = (e) => {
     alert("삭제되었습니다");
      console.log('list', checkedPhotos); //checkedPhotos에 삭제할 사진이 포함되어 있음
      setData([]); // 삭제된 후의 사진 데이터
   };
   // 필터링 선택 시
   const filteringCheckedHandler = (e) => {
    console.log('list', checkedUsers);  //  선택된 유저 아이디 리스트
    if( checkedUsers.length>0){ // 선택된 유저가 있을 때
      setData([]);  // 알맞은 사진으로 setData
    }
    else{ // 선택된 유저가 없을 때
      setData(data);  //모든 이미지 보여주기
    }
   
  };

    // 필터링 유저 클릭 시
  const userCheckedHandler = (memberItem) => { 
    if(checkedUsers.includes(memberItem)) { // 이미 선택된 유저 한 번 더 클릭 시
      setCheckedUsers(checkedUsers.filter(element => element.memberId !== memberItem.memberId));  // 리스트에서 삭제
    }
    else{ // 선택된 유저 리스트에 없다면
      setCheckedUsers(checkedUsers.concat(memberItem)); //리스트에 추가    
    }
    return checkedUsers;
  };

  // 사진 업로드 클릭 시
  const photoUploadHandler = () => {
    photoInputRef.current.click();
  }

  // 파일 input의 경우 e.targetvalue가 아닌 e.targetfiles로 처리
  const onChangeFile = (e) => {
    const { files, name } = e.target;

    setInputs({
      ...inputs,
      [name]: files
    });
  }
    
  // 사진 리스트에서 하나 클릭해서 디테일 뷰 보여주기
  const onView = () => {
    console.log(checkedPhotos);
    if(checkedPhotos.length >0){
      const lastValue = checkedPhotos[checkedPhotos.length - 1];
      setCurrItem(datas.find(element => element.photoId === lastValue.photoId));
      return currItem;
    }
  };
  
  
  // 통신
  

  // 개별 체크 리스트에 추가 및 두 번 체크 시 해제
  const addElementPhotos = (item) => {
  
    if(checkedPhotos.includes(item)) { // 이미 선택된 사진한 번 더 클릭 시
      setCheckedPhotos(checkedPhotos.filter(element => element.photoId !== item.photoId));  // 리스트에서 삭제
    }
    else{ // 선택된 사진 리스트에 없다면
      setCheckedPhotos(checkedPhotos.concat(item)); //리스트에 추가    
     }
     return checkedPhotos; 
  };
  
  
  // 통신
  // 코스 멤버 정보 조회
  const commuteGetMemberInfo = () => {
    fetch("/course/member?courseId="+params.courseId)
    .then((res)=>{
      return res.json();
    })
    .then((memberData)=>{
      setUser(memberData);
    });
  }
  // 코스 사진 가져오기
  const commuteGetCoursePhoto = () => {
    fetch("/course/photo?courseId="+params.courseId)
    .then((res)=>{
      return res.json();
    })
    .then((photoData)=>{
      setData(photoData);
    });
  }
  // 사진 등록
  const commutePostCoursePhoto = () => {
    fetch("/course/photo", {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        courseId: params.courseId,
        images: uploadPhotos
      })
    })
    .then((res)=>{
      return res.json();
    })
    .then((ack)=>{
      if (ack) {
        alert('사진 등록에 성공하였습니다.');
      }
      else {
        alert('사진 등록에 실패하였습니다.');
      }
    });
  }
  // 편집 클릭 시 
  const editClickedHandler = () => { 
    setIsEditModalOpen(true); //모달 오픈
    console.log('str',currItem.id); //편집될 사진은 currItem임
  };


  // render
    return (
      <MainDiv>
      {loading ? (
        <div style={{position: 'absolute', left: '50%', top: '45%'}}>
        <Ring 
          size={40}
          lineWeight={5}
          speed={2} 
          color="black"
        />
        </div>
      ) : (
        <>
          {/* 코스명이 들어갈 부분 */}
            <HeaderDiv>
             <span style={{marginLeft: '20px'}}>{courseName}</span>
             <Link to={'/course/'+String(params.courseId)+'/'+String(params.day)} ><button style={{float: "right", marginRight: '20px'}}>뒤로가기</button></Link>
            </HeaderDiv>

    
        {/* 코스명이 들어갈 부분 */}
        {/* <CourseHeader inputCourseName={'JEJU 제주도'}/> */}


        {/* 필터링 및 선택 다운로드 부분  */}
        <FixedButtonDiv>
          <FilteringAndButton>
            {/* 그룹원 필터링 선택 */}
            <UserDiv>
              <FilterinUserList users= {users}  checkedHandler={userCheckedHandler} /> 
            </UserDiv>
        
            <ButtonDiv>
              <Button onClick={()=>deleteCheckedHandler()}>삭제</Button>
              <Button onClick={()=>downloadCheckedHandler()}>다운로드</Button>
              <Button onClick={()=>clearCheckedHandler()}>선택해제</Button> 
              <Button onClick={(e) => allCheckedHandler(e)}>전체선택</Button>
              <Button onClick={(e) => filteringCheckedHandler(e)}>필터링</Button>
            </ButtonDiv>
          </FilteringAndButton>
        </FixedButtonDiv> 
      
        {/* 사진들... */}
        <PhotoDiv> 
          {/* 사진 리스트들 보여주는 화면 (왼쪽) */}
          <PhotoListDiv>
            <PhotoList  datas = {datas} checkedPhotos={checkedPhotos}  addElementPhotos={addElementPhotos} />
          </PhotoListDiv>
          {/* 선택된 사진 크게 보여주는 뷰 (오른쪽 화면) */}
          <PhotoDetailView currItem = {currItem} editClickedHandler={editClickedHandler}/>
        </PhotoDiv>

        {/* 사진 편집 모달 */}
        <div>
          {isEditModalOpen && <BodyBlackoutStyle setIsEditModalOpen={setIsEditModalOpen} />}
          {isEditModalOpen && (
            <EditModal setIsEditModalOpen={setIsEditModalOpen} />
          )}
        </div>
        </>
      )}
      
     </MainDiv>
  );
};

// styled components
// div


const MainDiv = styled.div`
  position: absolute; 
  background-color:	#F5F5F5;
  width:100%;
  height: 100vh;
`;

const HeaderDiv = styled.div`
  width:100%;
  height:40px;
  background-color:#4D9FE3;
  color:#FFFFFF;
  padding-top:1%;
  width:100%;
  position:fixed;
`;

const   FixedButtonDiv = styled.div`
  background-color:	#F5F5F5;
  position:fixed;
  width:100%; 
  padding-top:6%;
  padding-bottom:1%;
  z-index: 2;
`;

const FilteringAndButton =  styled.div`
  position:relative;
  display: flex;
  justify-content: space-between;
  padding-left:4%;
  background-color:#FFFFFF;
  width:87%;
  margin-left:4%;
  border-radius: 1rem;
  box-shadow: 0px 0px 3px lightgray;
`;
const UserDiv = styled.div`
  width:35%;
`;
 const ButtonDiv =  styled.div`
  width:60%;
   margin-right: 3%;
  margin-top:1%;
`;
const Button=  styled.button`
   background-color:#FFFFFF;
   border-radius: 0.30rem;
   font-size: 0.8rem;
  line-height: 1.6;
  width:15%;
  height:28px;
  color:#4D9FE3;
  display: inline-block;
  margin:1%;
  float: right;
  border: 1px solid  #4D9FE3;
  box-shadow: 0px 0px 2px lightgray;
  font-weight: bold;
  &:hover{  
    background-color :  #4D9FE3;
    color:#FFFFFF;
    border: 1px solid  lightgray;
  }
`;

const PhotoDiv = styled.div`
  justify-content: space-between;
  display: flex;
  margin-left:3%; 
  z-index: 1;  
  margin-top:8%;
  display: flex;
  height:70%;
`;
const PhotoListDiv = styled.div`

  margin-top:5%;
  width:50%;
  height:100%;
  overflow: scroll;
  &::-webkit-scrollbar {
    width:12px;
    border-radius:3%;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cccccc ;
    border-radius:6px;
    background-clip: padding-box;
    border: 1px solid transparent;
  }
  &::-webkit-scrollbar-corner{
    background-color:#F5F5F5 ;
  }
`;


export default CoursePhotoPage ;