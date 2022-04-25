import React, { useState } from "react";
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

// components
import GroupListDiv from "./GroupListDiv.js";

const MainPage = () => {
  // useState
  const [groupAddModalIsOpen, setGroupAddModalIsOpen] = useState(false);
  const [groupJoinModalIsOpen, setGroupJoinModalIsOpen] = useState(false);
  const [inputGroupName, setInputGroupName] = useState('');
  const [inputGroupKey, setInputGroupKey] = useState('');

  // onClick
  const onClickGroupAddModal = () => {
    setGroupAddModalIsOpen(true);
  };
  const onClickGroupJoinModal = () => {
    setGroupJoinModalIsOpen(true);
  };
  const onClickLogout = () => {
    alert('logout');
  };
  const onClickGroupAdd = () => {
    if (inputGroupName) {
      alert('created group name : ' + inputGroupName);
      setGroupAddModalIsOpen(false);
      setInputGroupName('');
    }
    else {
      alert('그룹 명이 입력되지 않았습니다.');
    }
  };
  const onClickGroupJoin = () => {
    if (inputGroupKey) {
      alert('input group key : ' + inputGroupKey);
      setGroupJoinModalIsOpen(false);
      setInputGroupKey('');
    }
    else {
      alert('그룹 초대 코드가 입력되지 않았습니다.');
    }
  };

  // onChange
  const onChangeInputGroupName = e => {
    setInputGroupName(e.target.value);
  }
  const onChangeInputGroupKey = e => {
    setInputGroupKey(e.target.value);
  }

  // Modal
  const groupAddModal = (
    // 그룹 추가 모달
    <Modal 
      isOpen={groupAddModalIsOpen} 
      onRequestClose={() => setGroupAddModalIsOpen(false)}
      style={{
        overlay: {
          position: 'fixed',
        },
        content: {
          top: '200px',
          left: '200px',
          right: '200px',
          bottom: '200px',

          border: '1px solid'
        }
      }}
    >
      <div>추가할 그룹의 정보를 입력하세요.</div>
      <div>
        <span>그룹 명 : </span>
        <input name="inputGroupName" value={inputGroupName} onChange={onChangeInputGroupName} />
      </div>
      <button onClick={onClickGroupAdd}>그룹 생성</button>
      <button onClick={() => setGroupAddModalIsOpen(false)}>취소</button>
    </Modal>
  );
  const groupJoinModal = (
    // 그룹 참가 모달
    <Modal 
      isOpen={groupJoinModalIsOpen} 
      onRequestClose={() => setGroupJoinModalIsOpen(false)}
      style={{
        overlay: {
          position: 'fixed'
        },
        content: {
          top: '200px',
          left: '200px',
          right: '200px',
          bottom: '200px',

          border: '1px solid'
        }
      }}
    >
      <div>참가할 그룹의 초대 코드를 입력하세요.</div>
      <div>
        <span>초대 코드 : </span>
        <input name="inputGroupKey" value={inputGroupKey} onChange={onChangeInputGroupKey} />
      </div>
      <button onClick={onClickGroupJoin}>그룹 참가</button>
      <button onClick={() => setGroupJoinModalIsOpen(false)}>취소</button>
    </Modal>
  );

  // render
  return (
    <MainScreenDiv>
      <LeftScreenDiv>
        <GroupDiv>
          <GroupTitleDiv>
            <h1>그룹</h1>
            <GroupButtonDiv>
              <GroupButton onClick={onClickGroupAddModal}>그룹 추가</GroupButton>
              <GroupButton onClick={onClickGroupJoinModal}>그룹 참가</GroupButton>
            </GroupButtonDiv>
          </GroupTitleDiv>
          <GroupListDiv />
        </GroupDiv>
      </LeftScreenDiv>

      <RightScreenDiv>
        <MyPageButtonDiv>
        <Link to='/mypage'><MyPageButton>마이페이지</MyPageButton></Link>
          <MyPageButton onClick={onClickLogout}>로그아웃</MyPageButton>
        </MyPageButtonDiv>
      </RightScreenDiv>

      {/* 그룹 추가 버튼 Modal */}
      {groupAddModal}

      {/* 그룹 참가 버튼 Modal */}
      {groupJoinModal}

    </MainScreenDiv>
  );
};

// styled components
// div
const MainScreenDiv = styled.div`
  display: flex;

  height: 100vh;
`;
const LeftScreenDiv = styled.div`
  /* background-color: #ffffd0; */
  flex-basis: 40%;
  float: left;
`;
const RightScreenDiv = styled.div`
  background-color: #7777ff;
  flex-basis: 60%;
  float: right;
`;
const GroupDiv = styled.div`
  float: left;
  margin-left: 5%;
  margin-top: 5%;

  width: 85%;
  /* background-color: #d0ffff; */
`;
const GroupTitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 5%;
  /* background-color: #ffd0ff; */
`;
const GroupButtonDiv = styled.div`
  display: flex;
  padding-right: 5%;
`;
const MyPageButtonDiv = styled.div`
  float: right;
  margin-right: 5%;
  margin-top: 5%;
`;

// button
const GroupButton = styled.button`
  align-self: center;
  float: right;

  border-style: solid;
  border-radius: 10%;
  border-color: white;
  border-width: 1px;
  font-size: 13px;
  padding: 3px 5px;

  background-color: #3498DB;
  color: white;
`;
const MyPageButton = styled.button`
  border-style: solid;
  border-radius: 10%;
  border-color: #3498DB;
  border-width: 1px;
  font-size: 13px;
  padding: 3px 5px;

  background-color: gray;
  color: white;
`;

export default MainPage;