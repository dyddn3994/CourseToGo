import React, { useState, useRef } from "react";
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const CoursesList =( {group,  onClickCourseLi, courseDateRender}) => {

    return (
    group.courses.map((course, courseListIndex) => (
      <CourseUl>
        {course.check ? (
          <Link style={{textDecoration :'none'} }to={'/confirmCourse/'+String(course.courseId)+'/'+String(1)}>
            <CourseLi key={courseListIndex} onClick={(e) => onClickCourseLi(e)}>
              {course.courseName} <br />
              {courseDateRender(course.courseStartDate, course.courseEndDate)}   {course.city}
            </CourseLi>
          </Link>
        ) : (
          <Link style={{textDecoration :'none'} }to={'/course/'+String(course.courseId)+'/'+String(1)}>
            <CourseLi key={courseListIndex} onClick={(e) => onClickCourseLi(e)}>
              {course.courseName} <br />
              {courseDateRender(course.courseStartDate, course.courseEndDate)}   {course.city}
            </CourseLi>
          </Link>
        )}
      </CourseUl>
    ))
  );
};

const CourseUl = styled.ul`
  // list-style: none;
`;

const CourseLi = styled.li`
    font-size:1.1rem;
    color:black;
   
`;

export default CoursesList;