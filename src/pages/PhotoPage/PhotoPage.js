import React, { useState , useEffect} from "react";
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

import data from '../../assets/Photo/Photo';
import userData from '../../assets/User/User';

import PhotoList from "../../components/PhotoAlbum/PhotoList";
import PhotoDetailView from "../../components/PhotoAlbum/PhotoDetailView";
import FilterinUserList from '../../components/PhotoAlbum/./FilteringUserList';

const CoursePhotoPage = () => {
  // url 파라미터 
  // courseId: 코스id(1, 2, ...)
  // day: 설정 일차(1, 2, ...)
  const params = useParams();
  
  // const outerDivRef = useRef();

  const [courseName, setCourseName] = useState("JEJU 제주");  //코스이름

  //필터링 유저 부분
  const [users, setUser] = useState(userData);    //회원 데이터
  const [checkedUsers, setCheckedUsers]  =  useState([]);  // 선택된 유저 아이디들 리스트 (유저의 아이디만을 담았음)

  // 사진 선택 부분
  const [datas, setData] = useState(data);    //사진 데이터
  const [currItem, setCurrItem] = useState(data[0]);  //선택된 사진(상세정보 보일 사진)
  const [checkedPhotos, setCheckedPhotos]  =  useState([]);   // 선택된 사진들 리스트
  const [initChecked, setInitChecked] = useState(false);  // 초기 사진 선택 유무


  // const [isCheckedAllPhoto, setIsCheckedAllPhoto] = useState(false); //사진 선택여부
  // const [isCheckedPhoto, setIsCheckedPhoto] = useState(false); //사진 선택여부

  // 사진 전체 선택 버튼 클릭 시
  const allCheckedHandler = (checked) => {
    const checkedItemsArray = [];
    datas.forEach(data=>checkedItemsArray.push(data));
    setCheckedPhotos(checkedItemsArray);
    console.log('list', checkedPhotos);
   
  };

  // 사진 선택 해제
  // 선택된 애들 테두리 초기화 시키는 코드 필요
  const clearCheckedHandler = () => {
    setCheckedPhotos([]);
    setInitChecked(false);
    // setIsCheckedAllPhoto(false);
    // setIsCheckedPhoto(false);...;
    console.log('list', checkedPhotos);

  };
  
   //다운로드 클릭 시
   const downloadCheckedHandler = (e) => {
    checkedPhotos.forEach((value, index, array) => {  
      const url =  value.image;
      const a = document.createElement("a")
      a.href = url
      a.download = `${value.itinerary}_${value.uploader}` //다운로드될 파일 이름
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url);
    })
  };

   // 삭제 버튼 클릭 시
   // 선택된 애들 테두리 초기화 시키는 코드 필요
   const deleteCheckedHandler = (e) => {
     alert("삭제되었습니다");
    console.log('list', checkedPhotos); //checkedPhotos에 삭제할 사진id가 포함되어 있음
  };

   // 필터링 선택 시
   const filteringCheckedHandler = (e) => {
    console.log('list', checkedUsers);  //  선택된 유저 아이디 리스트
    if( checkedUsers.length!==0){ // 선택된 유저가 있을 때
      setData([]);  // 알맞은 사진으로 setData
    }
    else{ // 선택된 유저가 없을 때
      setData(data);  //모든 이미지 보여주기
    }
   
  };

    // 필터링 유저 클릭 시
  const userCheckedHandler = (memberId) => { 
    if(checkedUsers.includes(memberId)) { // 이미 선택된 유저 한 번 더 클릭 시
      setCheckedUsers(checkedUsers.filter(element => element !== memberId));  // 리스트에서 삭제
    }
    else{ // 선택된 유저 리스트에 없다면
      setCheckedUsers(checkedUsers.concat(memberId)); //리스트에 추가    
    }
  };
    
  // 사진 리스트에서 하나 클릭해서 디테일 뷰 보여주기
  const onView = (id) => {
    setCurrItem(datas.find(item => item.id === id));
    setInitChecked(true); // 최초 선택 유무 판단 (최초 페이지에서 첫번째 사진이 기본으로 현재 사진으로 셋팅되어서)
    if(initChecked){  // 사용자가 선택한다면 선택된 리스트에 추가
      addElementPhotos(currItem);
    }
    
  };

  // 개별 체크 리스트에 추가 및 두 번 체크 시 해제
  const addElementPhotos = (currItem) => {
    if(checkedPhotos.includes(currItem)) { // 이미 선택된 사진한 번 더 클릭 시
      setCheckedPhotos(checkedPhotos.filter(element => element.id !== currItem.id));  // 리스트에서 삭제
    }
    else{ // 선택된 유저 리스트에 없다면
      setCheckedPhotos(checkedPhotos.concat(currItem)); //리스트에 추가    
    }
    console.log('list', checkedPhotos); 
  };
  
  
  // 통신
  


  // render
    return (
      <MainDiv>
         <div>
          {/* 코스명이 들어갈 부분 */}
            <HeaderDiv>
             <span style={{marginLeft: '20px'}}>{courseName}</span>
             <Link to={'/course/'+String(params.courseId)+'/'+String(params.day)} ><button style={{float: "right", marginRight: '20px'}}>뒤로가기</button></Link>
            </HeaderDiv>

          {/* 필터링 및 선택 다운로드 부분  */}
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
          </div>
            {/* 사진들... */}
          <PhotoDiv> 
            {/* 사진 리스트들 보여주는 화면 (왼쪽) */}
            <PhotoListDiv>
               <PhotoList  datas = {datas} onView={onView} />
            </PhotoListDiv>
            {/* 선택된 사진 크게 보여주는 뷰 (오른쪽 화면) */}
            <PhotoDetailView currItem = {currItem} />
          </PhotoDiv>
     </MainDiv>
  );
};

// styled components
// div
const MainDiv = styled.div`
  position: absolute; 
`;
const PhotoListDiv = styled.div`
  margin-top:12%;
  width:700px;
  // width:60%;
`;
const PhotoDiv = styled.div`
justify-content: space-between;
display: flex;
margin-top:11%;
background-color:#FFFFFF;
`;
const UserDiv = styled.div`
width:60%;
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


const FilteringAndButton =  styled.div`
  position:fixed;
  display: flex;
  justify-content: space-between;
  padding-left:2%;
  background-color:#FFFFFF;
  width:100%;
  margin-top:3.5%;
`;

 const ButtonDiv =  styled.div`
  width:50%;
  margin-right: 13%;
   margin-top:1%;
   
    
`;
const Button=  styled.button`
  margin-right:5%;
  background-color:#FFCC29;
  // background-color:#FF7F50;
   border-radius: 0.30rem;
   font-size: 0.8rem;
  line-height: 1.6;
  border: 1px solid lightgray;
  width:13%;
  height:40px;
  color:#FFFFFF;
  display: inline-block;
  margin:1%;
  float: right;
`;

export default CoursePhotoPage ;