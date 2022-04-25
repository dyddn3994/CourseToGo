import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled, { css } from 'styled-components';

// components
import ItineraryTest from './pages/ItineraryTest.js';
import MainPage from './pages/MainPage/MainPage.js';
import MyPage from './pages/MyPage.js';
import CoursePage from './pages/CoursePage/CoursePage.js';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} exact={true} />
      <Route path="/test" element={<ItineraryTest />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/course" element={<CoursePage />} />
    </Routes>
  );
};

export default App;