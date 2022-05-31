import React , {useState}from 'react';
import { Routes, Route } from 'react-router-dom';
import styled, { css } from 'styled-components';

// components
import MainPage from './pages/MainPage/MainPage.js';
import MyPage from './pages/MyPage/MyPage.js';

import LoginPage from './pages/LoginPage/LoginPage.js';
import SearchIdPage from './pages/LoginPage/SearchIdPage.js';
import SearchPwPage from './pages/LoginPage/SearchPwPage.js';
import JoinPage from './pages/LoginPage/JoinPage.js';
import PhotoPage from './pages/PhotoPage/PhotoPage.js';
import CoursePage from './pages/CoursePage/CoursePage'
import CoursePhotoPage from './pages/CoursePhotoPage/CoursePhotoPage'

const App = () => {
  return (

    <Routes>
      <Route path="/" element={<LoginPage />} exact={true} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/course/:courseId/:day" element={<CoursePage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/searchId" element={<SearchIdPage />} />
      <Route path="/searchPw" element={<SearchPwPage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/photoAlbum/:courseId/:day" element={<PhotoPage />} />
    </Routes>
  );
};

export default App;