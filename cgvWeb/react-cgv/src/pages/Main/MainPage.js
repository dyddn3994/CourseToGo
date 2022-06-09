import React , {useState, useEffect}from 'react';
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";

import Poster1 from '../../assets/images/test_85829_320.jpg';
import Poster2 from '../../assets/images/test_85813_320.jpg';
import Poster3 from '../../assets/images/test_85689_320.jpg';
import Poster4 from '../../assets/images/test_85871_320.jpg';

import Header from '../../components/commons/Header';
import PaginationMovieList from './PaginationMovieList.js';
import Pagination from './Pagination';


const MainPage = () => {
  // 임시 영화 데이터 
  const [tempData, setTempData] = useState([
    {  movie_id: '1',
      title: '브로커',
      poster: Poster1,
      opening_date: '2022-06-08'},
    { movie_id: '2',
      title: '범죄도시2',
      poster: Poster2,
      opening_date: '2022-06-08'},
      {  movie_id: '4',
      title: '쥬라기월드',
      poster: Poster3,
      opening_date: '2022-06-01'},
    { movie_id: '5',
      title: '마녀2',
      poster: Poster4,
      opening_date: '2022-06-15'},
      {  movie_id: '6',
      title: '브로커',
      poster: Poster1,
      opening_date: '2022-06-08'},
    { movie_id: '7',
      title: '범죄도시2',
      poster: Poster2,
      opening_date: '2022-06-08'},
      {  movie_id: '8',
      title: '쥬라기월드',
      poster: Poster3,
      opening_date: '2022-06-01'},
    { movie_id: '9',
      title: '마녀2',
      poster: Poster4,
      opening_date: '2022-06-15'},
      {  movie_id: '10',
      title: '브로커',
      poster: Poster1,
      opening_date: '2022-06-08'},
    { movie_id: '11',
      title: '범죄도시2',
      poster: Poster2,
      opening_date: '2022-06-08'},
      {  movie_id: '12',
      title: '쥬라기월드',
      poster: Poster3,
      opening_date: '2022-06-01'},

  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  // useEffect(() => {
  //   const fetchData = async () => {
  
  //   };
  //   fetchData();
  // }, []);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  return (
        <div>
            <Header />
            <Link to='/movie'  style={{ textDecoration: 'none' }}>
              <GoMovieButton>전체보기</GoMovieButton>
            </Link>
            <MenuName>무비차트</MenuName>
          
          
            <div style={{ marginLeft:'10%',position: 'fix', marginTop:'1%', textAlign: 'center'}}>
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={tempData.length}
                paginate={setCurrentPage}
              />
              <PaginationMovieList movieDatas={currentPosts(tempData)}  type={'main'}/>
 
           </div>
          
        </div>
      

  );
};
const MenuName= styled.div`
  font-size:1.5rem;
  font-weight:550;
  width:30%;
  margin-top:2%;
  margin-left:14%;
  position: fix;
`;
const GoMovieButton  = styled.div`
position: fix;
float: right;
margin-top:3%;
width:7%;
padding:0.5%;
border-radius:20px;
color:black;
font-size:0.8rem;
text-align: center;
box-shadow: 0px 0px 4px lightgray;
margin-right:14%;
`;
export default MainPage;