import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import styled, { css } from 'styled-components';
import { BiCopy } from 'react-icons/bi';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';

const GroupListDiv = forwardRef((props, ref) => {

  // useState
  const [groups, setGroups] = useState([
    { groupId: 1, groupName: 'A그룹', groupMemberCount: 4, groupKey: 972184357, groupClicked: false, courses: [
        { courseId: 1, courseName: '1코스', courseStartDate: 2021-10-14, courseEndDate: 2021-11-16, city: '제주', check: true },
        { courseId: 1, courseName: '2코스', courseStartDate: 20220614, courseEndDate: 20220615, city: '부산' }
      ]
    },
    { groupId: 2, groupName: 'B그룹', groupMemberCount: 3, groupKey: 157195250, groupClicked: false, courses: [
        { courseId: 1, courseName: '1코스', courseStartDate: 20210914, courseEndDate: 20210916, city: '제주' },
      ] 
    }
  ]);
  const [inputCourseName, setInputCourseName] = useState('');
  const [inputCourseStartDate, setInputCourseStartDate] = useState('');
  const [inputCourseEndDate, setInputCourseEndDate] = useState('');
  const [inputCity, setInputCity] = useState('');
  
  
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
        // 모달 종료, input값 리셋
        commuteGetGroupInfo();
      }
    });
  }

  // useEffect
  useEffect(()=>{
    commuteGetGroupInfo();
  },[]);

  // onClick
  // 그룹이 클릭되면 코스 리스트 출력하기 위한 함수
  const onClickGroupLi = groupKey => {
    setGroups(
      groups.map((group) => group.groupKey === groupKey ? { ...group, groupClicked: !group.groupClicked } : { ...group, groupClicked: false })
    );
    console.log(groups);
  };
  const onClickCopy = (e, groupName) => {
    e.stopPropagation();  // 부모 요소 클릭 방지
    alert(groupName + '의 초대 코드가 복사되었습니다.');
  };
  const onClickCourseLi = (e) => {
    e.stopPropagation();  // 부모 요소 클릭 방지
    
  };

  // groupKey를 화면 렌더링용으로 공백 추가하여 반환
  const groupKeySpacing = groupKey => {
    const groupKeyToStr = String(groupKey);

    const splitedGroupKey1 = groupKeyToStr.substring(0, 3);
    const splitedGroupKey2 = groupKeyToStr.substring(3, 6);
    const splitedGroupKey3 = groupKeyToStr.substring(6, 9);

    const spacedGroupKey = splitedGroupKey1 + " " + splitedGroupKey2 + " " + splitedGroupKey3;

    return spacedGroupKey;
  };

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
        <Link to='/course'>
          <CourseLi key={courseListIndex} onClick={(e) => onClickCourseLi(e)}>
            {course.courseName} {courseDateRender(course.courseStartDate, course.courseEndDate)} {course.city}
          </CourseLi>
        </Link>
      </CourseUl>
    ))
  );

  // 그룹 리스트 
  const renderGroupsList = groups.map((group, groupListIndex) => (
    <GroupLi key={groupListIndex} onClick={() => onClickGroupLi(group.groupKey)}>
      <div>
        <b style={{paddingRight: '30px'}}>{group.groupName}</b>
        <span>인원 {group.groupMemberCount}명</span>
        <button style={{float: 'right'}}>코스 추가</button>
        <button style={{float: 'right'}}>코스 조회</button>
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
  ));


  return (
    <GroupUl>
      {renderGroupsList}
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