import React, { useState, useRef } from "react";
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const CoursesList =( {group,  onClickCourseLi, courseDateRender}) => {

    return (
    group.courses.map((course, courseListIndex) => (
      <CourseUl>
        <Link style={{textDecoration :'none'} }to={'/course/'+String(course.courseId)+'/'+String(1)}>
          <CourseLi key={courseListIndex} onClick={(e) => onClickCourseLi(e)}>
            {course.courseName} <br />
            {courseDateRender(course.courseStartDate, course.courseEndDate)}   {course.city}
          </CourseLi>
        </Link>
      </CourseUl>
    ))
  );
};

const CourseUl = styled.ul`

`;

const CourseLi = styled.li`
    font-size:0.83rem;
    color:black;
   
`;

export default CoursesList;