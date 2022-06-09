import React , {useState,useEffect }from 'react';
import styled, { css } from 'styled-components';

import Poster1 from '../../assets/images/test_85829_320.jpg';
import Poster2 from '../../assets/images/test_85813_320.jpg';
import Poster3 from '../../assets/images/test_85689_320.jpg';
import Poster4 from '../../assets/images/test_85871_320.jpg';

import Header from '../../components/commons/Header';
import MovieList from './MovieList';
import AlignmentBox from './AlignmentBox';

const MovieChartPage= () => {
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
  const [ movieInfos, setMovieInfos] = useState({});  // 영화 정보를 받아서 set 할 곳
  const [alignment, setAlignment] =useState('1'); // 정렬 선택 1: 예매율순 2: 정렬순
  const [ searchInput ,setSearchInput] = useState('');  //  검색어
  //  // useEffect
  //  useEffect(() => {
  //   commuteGetMovieInfo();   
  // }, []);

  // 영화 정보 클릭 시 해당 영화 상세 페이지로
  const onClickedMovie = (movieItemId) => { 
    alert(movieItemId + ' 선택되었습니다');
  }
  // 정렬 선택 시
  const selectOnChange = (value) => {
    setAlignment(value);
    return alignment;
}
  // // 정렬 선택 시 렌더링
     // useEffect
   useEffect(() => {
    onClickAlignment();   
  }, [alignment]);

  const onClickAlignment = () => {
   
    if(alignment === 1){  //예매율순으로 정렬 요청
      alert('예매율순으로 정렬합니다');
    }
    else if(alignment === 2){ //평점순으로 정렬 요청
      alert('평점순으로 정렬합니다');
    }
    // alert('예매율순으로 정렬합니다');
  }
  const onChangeSearch = (e) => {
    setSearchInput(e.target.value)
  }

  const onClickSearch = () => {
    //검색 결과 받아서 보여주기
  }
    // onKeyPress
    const onKeyPressSearch = e => {
      if (e.key === 'Enter') {
        // searchListHiddenOut();
        onClickSearch();
      }
    }

  const commuteGetMovieInfo = () => {
    fetch(
    // "/course/photo?courseId="+params.courseId
      )
    .then((res)=>{
      return res.json();
    })
    .then((movieData)=>{
    // const movie = movieData.map(data => ({ 
    //   ...data, 
    //   memberProfile: SERVER_URL+data.memberProfile 
    
    // })); // 서버 url 연결해야 조회 가능
      setMovieInfos({
        ...movieInfos,
        movie_id: movieData.movie_id,
        title: movieData.title,
        poster: movieData.poster,
        opening_date: movieData.opening_date,

    });
    });
  }


  return (
      <div>
        <Header />
        <div>
          <div style={{ display:'flex'}}>
             <MenuName>무비차트</MenuName>
             <SearchDiv>
                <SearchInput 
                  type="text"
                  placeholder='검색어를 입력하세요'
                  onChange={onChangeSearch}
                  onKeyPress={onKeyPressSearch}
                />
              <SearchButton onClick={onClickSearch}>검색</SearchButton>
            </SearchDiv>
          </div>
         

            {/* 정렬 */}
          <AlignmentBox selectOnChange={selectOnChange}/>
            {/* 영화 차트 */}
          <ChartBox>  
            <MovieList movieDatas={tempData} checkedMovie={onClickedMovie}/>
          </ChartBox>
        </div>
   </div>
  );
};

const ChartBox= styled.div`
  text-align: center;
  margin-left:4%;
  margin-top:3%;
`;
const MenuName= styled.div`
  font-size:2rem;
  font-weight:550;
  width:80%;
  margin-top:1%;
  border-bottom: solid 3px black;
  height:52px;
  margin-left:10%;
  positon :relative;
`;
const SearchDiv= styled.div`
  display:flex;
  width:20%;
  margin-left:70%;
  height:6%;
  margin-top:1%;
  position: absolute;
`;
const SearchInput= styled.input`
  font-size:0.9rem;
  background-color:#ffffff;
  width:80%;
  border: solid 1px lightgray;
`;
const SearchButton = styled.button`
font-size:0.9rem;
background-color:#ffffff;
width:20%;
border: solid 1px lightgray;
`;
export default MovieChartPage;