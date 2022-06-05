import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useParams } from 'react-router';

// components

const Memo = ({ setIsMemoOpen }) => {
  // url 파라미터 
  // courseId: 코스id(1, 2, ...)
  // day: 설정 일차(1, 2, ...)
  const params = useParams();
  
  // useState
  const [memoArray, setMemoArray] = useState([
    {memoId: 2, content: "모이기", createDate: "2022-05-15T02:00:00"},
    {memoId: 1, content: "칫솔 챙기기", createDate: "2022-05-14T12:13:00"},
    {memoId: 3, content: "모이기", createDate: "2022-05-15T02:00:00"},
    {memoId: 4, content: "칫솔 챙기기", createDate: "2022-05-14T12:13:00"},
    {memoId: 5, content: "모이기", createDate: "2022-05-15T02:00:00"},
    {memoId: 6, content: "칫솔 챙기기", createDate: "2022-05-14T12:13:00"},
  ])

  const [inputContent, setInputContent] = useState(''); // 메모 입력

  useEffect(() => {
    commuteGetMemos();
    sortMemos();
  }, []);

  // onClick
  const onClickCreateMemo = () => {
    if (window.confirm("메모를 등록하시겠습니까?") === true) {
      commutePostCreateMemo();
      commuteGetMemos();
      sortMemos();
      console.log(inputContent);
      setInputContent('');
    }
  }
  const onClickUpdateMemo = (memo) => {
    if (window.confirm("메모를 수정하시겠습니까?") === true) {
      commutePutUpdateMemo(memo);
      commuteGetMemos();
      sortMemos();
      setInputContent('');
    }
  }
  const onClickDeleteMemo = (memo) => {
    if (window.confirm("메모를 삭제하시겠습니까?") === true) {
      commuteDeleteMemo(memo);
      commuteGetMemos();
      sortMemos();
      setInputContent('');
    }
  }

  // onChange
  const onChangeInputContent = e => setInputContent(e.target.value);

  // onKeyPress
  // const onKeyPressCreateMemo = e => {
  //   if (e.key === 'Enter') {
  //     onClickCreateMemo();
  //   }
  // }


  // 통신
  // 메모 조회
  const commuteGetMemos = () => {
    fetch("/course/memo?courseId="+params.courseId)
      .then((res)=>{
        return res.json();
      })
      .then((memoData)=>{
        setMemoArray(memoData);
      });
  }
  // 메모 등록
  const commutePostCreateMemo = () => {
    fetch("/course/memo", {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        course: {
          courseId: params.courseId
        },
        content: inputContent
      })
    })
    .then((res)=>{
      return res.json();
    })
    .then((memoId)=>{
      // 등록 성공 시 일정 id값 반환, 실패시 -1
      if (memoId === -1) {
        alert('메모등록에 실패하였습니다. ');
      }
      else {
        alert('test : ' + memoId);
        commuteGetMemos();
      }
    });
  }
  // 메모 수정
  const commutePutUpdateMemo = (updateMemo) => {
    fetch("/course/memo", {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        memoId: updateMemo.memoId,
        course: {
          courseId: params.courseId
        },
        content: inputContent
      })
    })
    .then((res)=>{
      return res.json();
    })
    .then((memoId)=>{
      // 수정 성공 시 일정 id값 반환, 실패시 -1
      if (memoId === -1) {
        alert('메모수정에 실패하였습니다. ');
      }
      else {
        alert('test : ' + memoId);
        commuteGetMemos();
      }
    });
  }
  // 메모 삭제
  const commuteDeleteMemo = (deleteMemo) => {
    fetch("/course/memo?memoId="+deleteMemo.memoId, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res)=>{
      return res.json();
    })
    .then((ack)=>{
      // 삭제 성공 시 true
      if (!ack) {
        alert('메모삭제에 실패하였습니다. ');
      }
      else {
        alert('test : ' + ack);
        commuteGetMemos();
      }
    });
  }


  const sortMemos = () => {
    // 메모 생성날짜 오름차순으로 정렬
    const newMemosArray = memoArray.sort((first, second) => {
      if (first.createDate < second.createDate) {
        return -1;
      }
      else if (first.createDate > second.createDate) {
        return 1;
      }
      else {
        return 0;
      }
      setMemoArray(newMemosArray);
    })
  }
  const createDateFormatting = (createDate) => {
    // 2022-05-15 12:11와 같은 식으로 출력용 포맷
    const date = createDate.substring(0, 10);
    const hour = createDate.substring(11, 13);
    const minute = createDate.substring(14, 16);

    const returnDate = date + ' ' + hour + ':' + minute;
    return returnDate;
  }
  const createDateToNumber = (createDate) => {
    // 메모를 생성 순서대로 정렬하기 위해 createDate 숫자로 변환하여 반환
    const year = createDate.substring(0, 4);
    const month = createDate.substring(5, 7);
    const day = createDate.substring(8, 10);
    const hour = createDate.substring(11, 13);
    const minute = createDate.substring(14, 16);
    const second = createDate.substring(17, 19);
    const dayToNumber = Number(year + month + day + hour + minute + second);

    return dayToNumber;
  }

  // 렌더링할 메모 리스트
  const renderContentList = () => {
    const renderResult = [];

    sortMemos();
    memoArray.map((memo, memoIndex) => {
      renderResult.push(
        <ContentDiv>
          <TextDiv>
            <div>   
              {createDateFormatting(memo.createDate)}
            <span style={{marginLeft: '20px'}}>작성자 : {memo.member.memberName}</span>
            </div>
            {memo.content}
          </TextDiv>
          
          <ButtonDiv>
            <OptionButton onClick={() => onClickUpdateMemo(memo)}>수정</OptionButton>
            <OptionButton onClick={() => onClickDeleteMemo(memo)}>삭제</OptionButton>
          </ButtonDiv>
        </ContentDiv>
      )
    })

    return renderResult;
  }

  return (
    <MainDiv>
      
      <BackgroundDiv>
        <CancelButtonDiv>
          <CancelButton onClick={() => setIsMemoOpen(false)}>x</CancelButton>
        </CancelButtonDiv>
        <FlexDiv>
          {renderContentList()}
        </FlexDiv>
        
       <InputContentDiv>
        <ContentInputTextarea name="inputContent" value={inputContent} onChange={onChangeInputContent} />
        <CreateMemoButton onClick={onClickCreateMemo}>메모 추가</CreateMemoButton>
      </InputContentDiv>
     </BackgroundDiv>
    </MainDiv>
  );
};  

// styled compoents
// div
const MainDiv = styled.div`
margin-left:22%;
background-color: white;
width: 90%;
height: 100%;
overflow-y: auto;
position: fixed;
left: 50%;
top: 10%;
text-align: center; 
border-radius:1rem;
margin-top:2%;
z-index:3;
font-size:1.2rem;
line-height: 1.6;
border: 1px solid;
border-radius: 0.5rem;
border: 1px solid  lightgray;
box-shadow: 0 0 4px gray;
`;
const BackgroundDiv = styled.div`
background-color: white;
  width: 50vh;
  height: 80vh;
  position: absolute;
  transition: visibility 0.3s, right 0.3s;
`;
const CancelButtonDiv = styled.div`
  width:100%;
`;
const FlexDiv = styled.div`
  margin-top:15%;
  /* flex-direction: column-reverse; */
  flex-direction: column;
   justify-content: flex-end;
   overflow-y: scroll;
   height:63%;
   border-radius: 0.6rem;
   &::-webkit-scrollbar {
     width:12px;
     border-radius:3%;
   }
   &::-webkit-scrollbar-thumb {
     background-color: lightgray ;
     border-radius:6px;
     background-clip: padding-box;
     border: 1px solid transparent;
   }
   &::-webkit-scrollbar-corner{
     background-color:#F5F5F5 ;
   }
`;
const ContentDiv = styled.div`
  display:flex;
  margin:3%;
  font-size:1.2rem;
  line-height: 1.6;
  border: 1px solid;
  border-radius: 0.5rem;
  border: 1px solid  lightgray;
  box-shadow: 0 0 3px lightgray;
`;

// button
const CancelButton = styled.button`
  float: right;
  margin-right: 10px;
  margin-top: 10px;

`;
const CreateMemoButton = styled.button`
background-color:#FFFFFF;
  border-radius: 0.30rem;
  font-size: 1.3rem;
  line-height: 1.6;
  width:60%;
  color:#4D9FE3;
  display: inline-block;
  margin:1%;
  border: 1px solid  #4D9FE3;
  box-shadow: 0px 0px 2px lightgray;
  &:hover{  
    border: 1px solid  gray;
    box-shadow: 0 0 3px  gray;
}
`

const  TextDiv = styled.div`
  width:100%;
  text-align:left;
  margin:2%;
`;


const   ButtonDiv = styled.div`
  width:40%;
  height:10px;
  margin-left:10%;
`;

const InputContentDiv = styled.div`
position: absolute;
border-radius: 0.5rem;
margin-left:2%;  
width:90%;
`;

// textarea
const ContentInputTextarea = styled.textarea`
  margin-top:7%;
  width: 100%;
  height: 120px;
  resize: none;
  font-size:1.3rem;
line-height: 1.6;
border: 1px solid;
border-radius: 0.5rem;
border: 1.3px solid gray;

`;
const OptionButton = styled.button`
    font-size:1rem;
    line-height: 1.6;
    border: 1px solid #ffffff;
    border-radius: 0.30rem;
    background-color :  white;
    color: gray;
    &:hover{  
  
      color:black;

    }
  `;


export default Memo;