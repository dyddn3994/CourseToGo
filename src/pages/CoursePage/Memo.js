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
          {createDateFormatting(memo.createDate)} {memo.content}
          <div>
            <button style={{margin: '3px 5px 3px 0px'}} onClick={() => onClickUpdateMemo(memo)}>수정</button>
            <button style={{margin: '3px 5px 3px 0px'}} onClick={() => onClickDeleteMemo(memo)}>삭제</button>
          </div>
        </ContentDiv>
      )
    })

    return renderResult;
  }

  return (
    <>
      <BackgroundDiv>
        <CancelButton onClick={() => setIsMemoOpen(false)}>x</CancelButton>
        <FlexDiv>
          {renderContentList()}
        </FlexDiv>
        <ContentInputTextarea name="inputContent" value={inputContent} onChange={onChangeInputContent} />
        <CreateMemoButton onClick={onClickCreateMemo}>메모 추가</CreateMemoButton>
      </BackgroundDiv>
    </>
  );
};  

// styled compoents
// div
const BackgroundDiv = styled.div`
  background-color: #AFCFE7;
  width: 50vh;
  height: 80vh;
  position: absolute;
  transition: visibility 0.3s, right 0.3s;
`;
const FlexDiv = styled.div`
  display: flex;
  /* flex-direction: column-reverse; */
  flex-direction: column;
  justify-content: flex-end;
`;
const ContentDiv = styled.div`
  border: 1px solid black;
  margin: 10px;
  border-radius: 5px;
  padding: 5px;
`;

// button
const CancelButton = styled.button`
  float: right;
  margin-right: 10px;
  margin-top: 10px;
`;
const CreateMemoButton = styled.button`
  float: right;
  margin-right: 38px;
`

// textarea
const ContentInputTextarea = styled.textarea`
  margin: 10px;
  width: 85%;
  height: 100px;
  
  resize: none;
`;
export default Memo;