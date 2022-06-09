import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// components
import MainPage from './pages/Main/MainPage.js';
import MoviePage from './pages/Movie/MovieChartPage.js';
import DetailMovie from './pages/DetailMovie/DetailMoviePage.js';
import MyPage from './pages/MyPage/MyPage.js';
const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<MainPage />} exact={true} />
      <Route path="/movie" element={<MoviePage />}  />
      {/* <Route path="/detailMovie/:movie_id" element={<DetailMovie />}  /> */}
      <Route path="/detailMovie" element={<DetailMovie />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
    </Router>
  );
};

export default App;