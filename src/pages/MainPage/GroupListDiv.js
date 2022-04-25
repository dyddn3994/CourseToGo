import React, { useState } from "react";
import styled, { css } from 'styled-components';
import { BiCopy } from 'react-icons/bi';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';

const GroupListDiv = () => {
  // useState
  const [groups, setGroups] = useState([
    { groupName: 'A그룹', groupMemberCnt: 4, groupKey: 972184357, groupClicked: false, courses: [
        { courseName: '1코스', courseStartDate: 20211014, courseEndDate: 20211116, courseCity: '제주' },
        { courseName: '2코스', courseStartDate: 20220614, courseEndDate: 20220615, courseCity: '부산' }
      ]
    },
    { groupName: 'B그룹', groupMemberCnt: 3, groupKey: 157195250, groupClicked: false, courses: [
      { courseName: '1코스', courseStartDate: 20210914, courseEndDate: 20210916, courseCity: '제주' },

    ] }
  ]);

  // onClick
  // 그룹이 클릭되면 코스 리스트 출력하기 위한 함수
  const onClickGroupLi = groupKey => {
    setGroups(
      groups.map((group) => group.groupKey === groupKey ? { ...group, groupClicked: !group.groupClicked } : { ...group, groupClicked: false })
    );
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
    const courseStartDateToStr = String(courseStartDate);
    const courseEndDateToStr = String(courseEndDate);

    const startDateYear = courseStartDateToStr.substring(0, 4);
    const endDateYear = courseEndDateToStr.substring(0, 4);

    const startDateMonth = (courseStartDateToStr.substring(4, 5) === '0' ? courseStartDateToStr.substring(5, 6) : courseStartDateToStr.substring(4, 6));
    const endDateMonth = (courseEndDateToStr.substring(4, 5) === '0' ? courseEndDateToStr.substring(5, 6) : courseEndDateToStr.substring(4, 6));

    const startDateDay = courseStartDateToStr.substring(6, 8);
    const endDateDay = courseEndDateToStr.substring(6, 8);

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
            {course.courseName} {courseDateRender(course.courseStartDate, course.courseEndDate)} {course.courseCity}
          </CourseLi>
        </Link>
      </CourseUl>
    ))
  );

  // 그룹 리스트 
  const groupsList = groups.map((group, groupListIndex) => (
    <GroupLi key={groupListIndex} onClick={() => onClickGroupLi(group.groupKey)}>
      <div>
        <b>{group.groupName}</b>
        <span>{group.groupMemberCnt}명</span>
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
      {groupsList}
    </GroupUl>
  );
}

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