import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled, { css } from 'styled-components';

// components
import ItineraryTest from './pages/ItineraryTest.js';
import MainPage from './pages/MainPage/MainPage.js';
import MyPage from './pages/MyPage.js';
import CoursePage from './pages/CoursePage/CoursePage.js';

import LoginPage from './pages/LoginPage/LoginPage'
import SignUpPage from './pages/LoginPage/SignUpPage'
import SearchIdPage from './pages/LoginPage/SearchIdPage'
import SearchPwPage from './pages/LoginPage/SearchPwPage'
import CoursePhotoPage from './pages/CoursePhotoPage/CoursePhotoPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} exact={true} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/course" element={<CoursePage />} />

      <Route path="/main" element={<MainPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route path="/searchId" element={<SearchIdPage />} />
      <Route path="/searchPw" element={<SearchPwPage />} />
      <Route path="/coursePhoto" element={<CoursePhotoPage />} />
    </Routes>
  );
};

export default App;