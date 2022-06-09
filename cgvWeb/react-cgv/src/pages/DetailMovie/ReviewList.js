import React , {useState,useEffect }from 'react';
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";
import ReviewItem from './ReviewItem';
import CreateReviewModal from './CreateReviewModal';



const ReviewList= () => {
    const [reviews, setReviews] = useState([
      {  review_id:'1', review:'영화가 정말 좋네요' , star:5, movie_id:'1', user_id:'ddddd' , likes_num:3},
      {  review_id:'2', review:'믿고 보는 배우입니다, 아이유와 강동원씨 앞으로도 기대가 되네요' , star:3, movie_id:'1', user_id:'dd33' ,likes_num:1},
      {  review_id:'3', review:'최고의 영화' , star:5, movie_id:'1', user_id:'qldms12' ,likes_num:1},
      {  review_id:'4', review:'댓글 알바인듯' , star:2, movie_id:'1', user_id:'dmsqlWkd' ,likes_num:0},
      {  review_id:'5', review:'최악이네여' , star:1, movie_id:'1', user_id:'itsme',likes_num:1 },
    ]);
    const [inputReview, setInputReview] = useState({
      review:'',
      star:'',
    }); // 후기 입력
    const {inputStar, setInputStar} = useState({
      selectList: ['1','2','3','4','5'],
      selectValue: "5"
  });
    const [isModalOpen, setIsModalOpen] = useState(false);  // 평점 작성 모달
   
    // onChange
  const onChangeInputReview = e =>  setInputReview(e.target.value);


    // const params = useParams();
    // useEffect(() => {
    //   commuteGetReviews();
    //   sortMemos();
    // }, []);
  
    // onClick
    const onClickCreateReview = () => {
      // 로그인 여부 파악하고
      setIsModalOpen(true);
      // if (window.confirm("리뷰를 등록하시겠습니까?") === true) {
      //   // commutePostCreatReview();
      //   // commuteGetReviews();
      //   // // sortMemos();
      //   // console.log(inputContent);
      //   // setInputContent('');
      // }
    }
    const onClickUpdateReview = (memo) => {
      if (window.confirm("리뷰를 수정하시겠습니까?") === true) {
        // commutePutUpdateReview(memo);
        // commuteGetReviews();
        // // sortMemos();
        // setInputContent('');
      }
    }
    const onClickDeleteReview = (memo) => {
      if (window.confirm("리뷰를 삭제하시겠습니까?") === true) {
        // commuteDeleteReview(memo);
        // commuteGetReviews();
        // // sortMemos();
        // setInputContent('');
      }
    }

    // 좋아요 등록
    const createLike=()=>{
      alert("좋아요~");
    }
  
    // // 메모 조회
    // const commuteGetReviews = () => {
    //   fetch(
    //   ///"course/memo?courseId="+params.courseId
    //   )
    //     .then((res)=>{
    //       return res.json();
    //     })
    //     .then((reviewData)=>{
    //       setReviews(...reviews,
    //         reviewData);
    //     });
    // }
    // // 메모 등록
    // const commutePostCreateReview = () => {
    //   fetch("/course/memo", {
    //     method: 'post',
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body : JSON.stringify({
    //       course: {
    //         courseId: params.courseId
    //       },
    //       content: inputContent
    //     })
    //   })
    //   .then((res)=>{
    //     return res.json();
    //   })
    //   .then((memoId)=>{
    //     // 등록 성공 시 일정 id값 반환, 실패시 -1
    //     if (memoId === -1) {
    //       alert('등록에 실패하였습니다. ');
    //     }
    //     else {
    //       alert('등록되었습니다.');
    //       commuteGetReviews();
    //     }
    //   });
    // }
    // // 메모 수정
    // const commutePutUpdateReview = (updateMemo) => {
    //   fetch("/course/memo", {
    //     method: 'put',
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body : JSON.stringify({
    //       memoId: updateMemo.memoId,
    //       course: {
    //         courseId: params.courseId
    //       },
    //       content: inputContent
    //     })
    //   })
    //   .then((res)=>{
    //     return res.json();
    //   })
    //   .then((memoId)=>{
    //     // 수정 성공 시 일정 id값 반환, 실패시 -1
    //     if (memoId === -1) {
    //       alert('메모수정에 실패하였습니다. ');
    //     }
    //     else if (memoId === -2) {
    //       alert('작성자만 수정이 가능합니다.');
    //     }
    //     else {
    //       alert('수정되었습니다.');
    //       commuteGetReviews();
    //     }
    //   });
    // }
    // // 메모 삭제
    // const commuteDeleteReview = (deleteMemo) => {
    //   fetch("/course/memo?memoId="+deleteMemo.memoId, {
    //     method: 'delete',
    //     headers: {
    //       "Content-Type": "application/json",
    //     }
    //   })
    //   .then((res)=>{
    //     return res.json();
    //   })
    //   .then((ack)=>{
    //     // 삭제 성공 시 true
    //     if (!ack) {
    //       alert('작성자만 삭제가 가능합니다. ');
    //     }
    //     else {
    //       alert('삭제되었습니다.');
    //       commuteGetReviews();
    //     }
    //   });
    // }
  
  
  return (

        <ReviewListBox>
           {/* 리뷰작성 부분 */}

          <InputContentDiv>
         
            <ReviewButton onClick={onClickCreateReview} >평점 작성</ReviewButton>
          </InputContentDiv>
 
           {/* 리뷰 목록 */}
            <Reviews>
              {
               reviews.map((item,index) =>      
                  <ReviewItem createLike={createLike} key={index} item={item} onClickUpdateReview={ onClickUpdateReview} onClickDeleteReview={onClickDeleteReview} />
               )} 
            </Reviews> 

      
    <CreateReviewModal 
    isModalOpen={ isModalOpen}
    setIsModalOpen={setIsModalOpen}
    inputReview={inputReview}
    onClickCreateReview={onClickCreateReview}
    onChangeInputReview={onChangeInputReview}
    inputStar={inputStar}
    setInputStar={setInputStar}
    />  
    </ReviewListBox>
  );
};
const ReviewButton = styled.button`
margin:1%; 
border-radius:8px;
background-color:#FF4B4B;
color:#ffffff;
font-size:0.9rem;
text-align: center;
border:#FF4B4B;
width:10%;
padding:1%;
`;
const InputContentDiv= styled.div`
  width:100%;
  margin-top:2%;
  margin-left:80%;
`;

const Reviews = styled.div`
  width:100%;
  display:flex;
  flex-wrap: wrap;
  margin-left:12%;
  margin-top:3%;
`;


const ReviewListBox= styled.div`
  width:80%;
  margin-top:2%;
  border-top: solid 3px black;
  margin-left:10%;

`;


export default ReviewList;