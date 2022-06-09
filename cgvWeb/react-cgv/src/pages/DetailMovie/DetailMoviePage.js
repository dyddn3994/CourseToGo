import React , {useState,useEffect }from 'react';
import styled, { css } from 'styled-components';

import Poster1 from '../../assets/images/test_85829_320.jpg';

import Header from '../../components/commons/Header';
import MovieInfoBox from './MovieInfoBox';
import ReviewList from './ReviewList';
import Statistics from './Statistics';


const DetailMoviePage= () => {
   // 임시 영화 데이터 
   const [movieInfo, setMovieInfo] = useState({
      movie_id: '1',
      title: '브로커',
      running_time:'120',
      genre:'드라마',
      rating:'15',
      poster: Poster1,
      synonpsis:'브로커 줄거리입니다~~',
      opening_date: '2022-06-08',
      director:'안은비',
      actor:'강동원, 아이유' 
    });

    const [genderStatisticsData, setGenderStatisticsData ] = useState([
      {id: "여",
      label: "여성",
      value: 35,
       
      },
      {id: "남",
      label: "남성",
      value: 65,
    }
    ]);
    const [ageStatisticsData, setAgeStatisticsData]= useState (
      [
        {
          age: '10대',
          rate:45,
        },
        {
          age: '20대',
          rate: 48,
       
        },
        {
          age: '30대',
          rate: 16,
         
      
        },
        {
          age: '40대',
          rate: 97,
      
        
        },
        {
          age: '50대',
          rate: 29,
         
        },
      
      ]
    );
     //  useEffect(() => {
  //   commuteGetMovieInfo();   
  // }, []);
    //영화 정보 받아오기
    const commuteGetMovieInfo = () => {
        fetch(
        //  
        )
        .then((res)=>{
          return res.json();
        })
        .then((movieData)=>{
           setMovieInfo({
 
            movie_id: movieData.movie_id,
            title: movieData.title,
            running_time:movieData.running_time,
            genre:movieData.genre,
            rating:movieData.rating,
            poster: movieData.poster,
            synonpsis:movieData.synonpsis,
            opening_date:movieData.opening_date,
            director:movieData.director,
            actor:movieData.actor
    
        });
    });
    }
    
  return (
      <div>
        <Header />
        {/* 영화 기본 정보 */}
        <MovieInfoBox movieInfo={movieInfo} />
        
        {/* 통계 */}
        <Statistics ageStatisticsData={ageStatisticsData} genderStatisticsData={genderStatisticsData} />
        {/* 평점 및 후기 */}
        <ReviewList />
   </div>
  );
};

export default DetailMoviePage;