import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import styled, { css } from 'styled-components';
import { BiCopy } from 'react-icons/bi';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const GroupListDiv = forwardRef((props, ref) => {

  useEffect(() => {
    commuteGetGroupInfo();
  },[]);
  
  // useState
  const [groups, setGroups] = useState([
    { groupId: 1, groupName: 'A그룹', groupMemberCount: 4, groupKey: 972184357, groupClicked: false, courses: [
        { courseId: 1, courseName: '1코스', courseStartDate: '2021-10-14', courseEndDate: '2021-11-16', city: '제주', check: true },
        { courseId: 1, courseName: '2코스', courseStartDate: '2022-06-14', courseEndDate: '2022-06-15', city: '부산', check: false }
      ]
    },
    { groupId: 2, groupName: 'B그룹', groupMemberCount: 3, groupKey: 157195250, groupClicked: false, courses: [
        { courseId: 1, courseName: '1코스', courseStartDate: '2021-09-14', courseEndDate: '2021-09-16', city: '제주', check: false },
      ]
    }
  ]);
  const [inputCourseName, setInputCourseName] = useState('');
  const [inputCourseStartDate, setInputCourseStartDate] = useState('');
  const [inputCourseEndDate, setInputCourseEndDate] = useState('');
  const [inputCity, setInputCity] = useState('');
  const [createCourseGroupId, setCreateCourseGroupId] = useState(0); // 코스 추가할때 Modal에서 처리해서 어떤 그룹에서 코스를 추가하는지에 대한 데이터를 저장할 곳이 없음. 해당 값에 id 저장. 더 좋은 방법 있으면 수정

  const [isCourseCreateModalOpen, setIsCourseCreateModalOpen] = useState(false); // 코스 추가 Modal
  
  
  // 부모 컴포넌트에서 자식 함수 실행할 수 있도록 설정
  useImperativeHandle(ref, () => ({
    // 그룹 정보 조회
    commuteGetGroupInfo() {
      fetch("/group")
        .then((res)=>{
          return res.json();
        })
        .then((groupData)=>{
          let newGroups = groupData.map(group => ({ ...group, groupClicked: false }));
          newGroups.forEach((group) =>
            fetch("/group/course?groupId=" + group.groupId)
              .then((res)=>{
                return res.json();
              })
              .then((courseData)=>{
                newGroups = newGroups.map(item => (item.groupId === group.groupId ? { ...item, courses: courseData } : item));
                setGroups(newGroups);
              })
          )
          setGroups(newGroups);
        });
    }
  }));

  // 통신
  // 그룹 정보 조회
  const commuteGetGroupInfo = () => {
    fetch("/group")
      .then((res)=>{
        return res.json();
      })
      .then((groupData)=>{
        let newGroups = groupData.map(group => ({ ...group, groupClicked: false }));
        newGroups.forEach((group) =>
          fetch("/group/course?groupId=" + group.groupId)
            .then((res)=>{
              return res.json();
            })
            .then((courseData)=>{
              newGroups = newGroups.map(item => (item.groupId === group.groupId ? { ...item, courses: courseData } : item));
              setGroups(newGroups);
            })
        )
        setGroups(newGroups);
      });
  }
  // 코스 추가
  const commutePostCreateCourse = (groupId) => {
    fetch("/course", {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        group: {
          groupId: groupId
        },
        courseName: inputCourseName,
        courseStartDate: inputCourseStartDate,
        courseEndDate: inputCourseEndDate,
        city: inputCity,
        check: false // 코스 확정 여부
      })
    })
    .then((res)=>{
      return res.json();
    })
    .then((courseId)=>{
      // 등록 성공 시 코스 id값 반환, 실패시 -1
      if (courseId === -1) {
        alert('코스 등록에 실패하였습니다. ');
      }
      else {
        alert('test : ' + courseId);
        alert("코스 등록이 완료되었습니다");
        setIsCourseCreateModalOpen(false);
        resetInputs();
        commuteGetGroupInfo();
      }
    });
  }


  // onClick
  // 그룹이 클릭되면 코스 리스트 출력하기 위한 함수
  const onClickGroupLi = groupId => {
    setGroups(
      groups.map((group) => group.groupId === groupId ? { ...group, groupClicked: !group.groupClicked } : { ...group, groupClicked: false })
    );
  };
  // 초대 코드 복사 아이콘
  const onClickCopy = (e, groupName) => {
    e.stopPropagation();  // 부모 요소 클릭 방지
    alert(groupName + '의 초대 코드가 복사되었습니다.');
  };
  // ???
  const onClickCourseLi = (e) => {
    e.stopPropagation();  // 부모 요소 클릭 방지
  };
  // 코스 추가 버튼 클릭 (Modal 열기)
  const onClickCreateCourse = (e, groupId) => {
    e.stopPropagation(); // 부모 요소 클릭 방지
    setCreateCourseGroupId(groupId);
    setIsCourseCreateModalOpen(true);
  }
  // 모달 내 코스 추가 버튼 클릭
  const onClickCreateCourseModal = () => {
    commutePostCreateCourse(createCourseGroupId);
  }

  // onChange
  const onChangeInputCourseName = e => setInputCourseName(e.target.value);
  const onChangeInputCourseStartDate = e => setInputCourseStartDate(e.target.value);
  const onChangeInputCourseEndDate = e => setInputCourseEndDate(e.target.value);
  const onChangeInputCity = e => setInputCity(e.target.value);

  // groupKey를 화면 렌더링용으로 공백 추가하여 반환
  const groupKeySpacing = groupKey => {
    const groupKeyToStr = String(groupKey);

    const splitedGroupKey1 = groupKeyToStr.substring(0, 3);
    const splitedGroupKey2 = groupKeyToStr.substring(3, 6);
    const splitedGroupKey3 = groupKeyToStr.substring(6, 9);

    const spacedGroupKey = splitedGroupKey1 + " " + splitedGroupKey2 + " " + splitedGroupKey3;

    return spacedGroupKey;
  };

  // 등록이나 수정 등이 끝나면 state의 input값 비우기
  const resetInputs = () => {
    setInputCourseName('');
    setInputCourseStartDate('');
    setInputCourseEndDate('');
    setInputCity('');
    setCreateCourseGroupId(0);
  }

  // 코스 출발 날짜와 도착 날짜를 화면 렌더링용으로 반환
  const courseDateRender = (courseStartDate, courseEndDate) => {
    const courseStartDateToStr = (courseStartDate);
    const courseEndDateToStr = (courseEndDate);

    const startDateYear = courseStartDateToStr.substring(0, 4);
    const endDateYear = courseEndDateToStr.substring(0, 4);

    const startDateMonth = (courseStartDateToStr.substring(5, 6) === '0' ? courseStartDateToStr.substring(6, 7) : courseStartDateToStr.substring(5, 7));
    const endDateMonth = (courseEndDateToStr.substring(5, 6) === '0' ? courseEndDateToStr.substring(6, 7) : courseEndDateToStr.substring(5, 7));

    const startDateDay = courseStartDateToStr.substring(8, 10);
    const endDateDay = courseEndDateToStr.substring(8, 10);

    let renderDate;
    if (startDateYear === endDateYear) {
      renderDate = startDateYear + '년 ' + startDateMonth + '/' + startDateDay + ' ~ ' + endDateMonth + '/' + endDateDay;
    }
    else {
      renderDate = startDateYear + '년 ' + startDateMonth + '/' + startDateDay + ' ~ ' + endDateYear + '년 ' + endDateMonth + '/' + endDateDay;
    }

    return renderDate;
  };

  // 코스 리스트
  const coursesList = group => (
    group.courses.map((course, courseListIndex) => (
      <CourseUl>
        <Link to={'/course/'+String(course.courseId)+'/'+String(1)}>
          <CourseLi key={courseListIndex} onClick={(e) => onClickCourseLi(e)}>
            {course.courseName} {courseDateRender(course.courseStartDate, course.courseEndDate)} {course.city}
          </CourseLi>
        </Link>
      </CourseUl>
    ))
  );

  // // 그룹 리스트 
  // const renderGroupsList = groups.map((group, groupListIndex) => (
  //   <GroupLi key={groupListIndex} onClick={() => onClickGroupLi(group.groupId)}>
  //     <div>
  //       <b style={{paddingRight: '30px'}}>{group.groupName}</b>
  //       <span>인원 {group.groupMemberCount}명</span>
  //       <button style={{float: 'right', margin: '3px'}} onClick={(e) => onClickCreateCourse(e, group.groupId)}>코스 추가</button>
  //       <button style={{float: 'right', margin: '3px'}}>코스 조회</button>
  //     </div>
  //     <div>
  //       <span>초대 코드 : {groupKeySpacing(group.groupKey)} </span>
  //       {/* 클립보드 복사 */}
  //       <CopyToClipboard text={group.groupKey} >    
  //         {/* 복사 아이콘 */}
  //         <BiCopy onClick={(e) => onClickCopy(e, group.groupName)} /> 
  //       </CopyToClipboard>
  //     </div>
  //     {/* 그룹이 클릭되어 있으면 코스 리스트 출력 */}
  //     {group.groupClicked && coursesList(group)}
  //   </GroupLi>
  // ));

  // Modal
  const courseCreateModal = (
    // 코스 추가 모달
    <Modal 
      ariaHideApp={false} // allElement 경고창 제거
      isOpen={isCourseCreateModalOpen} 
      onRequestClose={() => setIsCourseCreateModalOpen(false)}
      style={{
        overlay: {
          position: 'fixed'
        },
        content: {
          top: '200px',
          left: '200px',
          right: '200px',
          bottom: '200px',

          border: '1px solid'
        }
      }}
    >
      <div>추가할 코스의 정보를 입력하세요.</div>
      <div>
        <span>코스 명 : </span>
        <input name="inputCourseName" value={inputCourseName} onChange={onChangeInputCourseName} />
      </div>
      <div>
        <span>코스 시작 날짜 : </span>
        <input name="inputCourseStartDate" value={inputCourseStartDate} onChange={onChangeInputCourseStartDate} />
      </div>
      <div>
        <span>코스 종료 날짜 : </span>
        <input name="inputCourseEndDate" value={inputCourseEndDate} onChange={onChangeInputCourseEndDate} />
      </div>
      <div>
        <span>도시 : </span>
        <input name="inputCity" value={inputCity} onChange={onChangeInputCity} />
      </div>
      <button onClick={onClickCreateCourseModal}>그룹 참가</button>
      <button onClick={() => setIsCourseCreateModalOpen(false)}>취소</button>
    </Modal>
  );

  return (
    <GroupUl>
      {groups.map((group, groupListIndex) => (
        <GroupLi key={groupListIndex} onClick={() => onClickGroupLi(group.groupId)}>
          <div>
            <b style={{paddingRight: '30px'}}>{group.groupName}</b>
            <span>인원 {group.groupMemberCount}명</span>
            <button style={{float: 'right', margin: '3px'}} onClick={(e) => onClickCreateCourse(e, group.groupId)}>코스 추가</button>
            <button style={{float: 'right', margin: '3px'}}>코스 조회</button>
          </div>
          <div>
            <span>초대 코드 : {groupKeySpacing(group.groupKey)} </span>
            {/* 클립보드 복사 */}
            <CopyToClipboard text={group.groupKey} >    
              {/* 복사 아이콘 */}
              <BiCopy onClick={(e) => onClickCopy(e, group.groupName)} /> 
            </CopyToClipboard>
          </div>
          {/* 그룹이 클릭되어 있으면 코스 리스트 출력 */}
          {group.groupClicked && coursesList(group)}
        </GroupLi>
      ))}
      {courseCreateModal}
    </GroupUl>
  );
});

// styled components
// div

// ul
const GroupUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  list-style: none;
  
  background-color: #E0E0E0;
`;
const CourseUl = styled.ul`
`;

// li
const GroupLi = styled.li`
  margin: 10px;
  margin-left: -30px;
  padding: 10px;

  background-color: white;
`;
const CourseLi = styled.li`
  background-color: skyblue;
`;

export default GroupListDiv;