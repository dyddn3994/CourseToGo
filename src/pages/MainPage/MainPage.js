import React, { useState, useRef } from "react";
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

// components
import GroupListDiv from "./GroupListDiv.js";
import GroupCreateModal from './GroupCreateModal';

const MainPage = () => {
  // useState
  const [isGroupCreateModalOpen, setIsGroupCreateModalOpen] = useState(false);
  const [isGroupJoinModalOpen, setIsGroupJoinModalOpen] = useState(false);
  const [inputGroupName, setInputGroupName] = useState('');
  const [inputGroupKey, setInputGroupKey] = useState('');
  const [addGroupState, setAddGroupState] = useState('');

  // useRef
  const groupListDivRef = useRef();

  // onClick
  const onClickGroupAddModal = () => setIsGroupCreateModalOpen(true);
  const onClickGroupJoinModal = () => setIsGroupJoinModalOpen(true);
  const onClickLogout = () => {
    alert('logout');
  };
  const onClickGroupCreate = () => {
    if (inputGroupName) {
      fetch("/group", {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({groupName: inputGroupName})
      })
      .then((res)=>{
        return res.json();
      })
      .then((addedGroupId)=>{
        // 추가된 그룹 id, 실패시 -1, 이름이 겹칠시 -2
        if (addedGroupId === -1) {
          alert('그룹 생성에 실패하였습니다.');
        }
        else if (addedGroupId === -2) {
          alert('동일한 이름의 그룹에 참가중입니다. 다른 이름으로 생성하세요.');
        }
        else {
          alert(addedGroupId);
          
          setIsGroupCreateModalOpen(false);
          setInputGroupName('');
  
          groupListDivRef.current.commuteGetGroupInfo();
        }
      });
    }
    else {
      alert('그룹 명이 입력되지 않았습니다.');
    }
  };
  const onClickGroupJoin = () => {
    if (inputGroupKey) {
      fetch("/group/participate?code="+inputGroupKey, {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(inputGroupKey)
      })
      .then((res)=>{
        return res.json();
      })
      .then((ack)=>{
        // 1:성공 / 2:이미 참가중인 그룹 / 3:찾는 그룹 없음 / 4:이름 겹침 / 5:인원 초과
        if (ack === 1) {
          alert('그룹 참가에 성공하였습니다.');
          setIsGroupJoinModalOpen(false);
          setInputGroupKey('');

          groupListDivRef.current.commuteGetGroupInfo();
        }
        else if (ack === 2) {
          alert('이미 참가중인 그룹입니다.');
        }
        else if (ack === 3) {
          alert('그룹 키를 다시 확인하세요.');
        }
        else if (ack === 4) {
          alert('이미 참가중인 그룹의 이름과 동일합니다.');
        }
        else if (ack === 5) {
          alert('그룹 인원이 초과되었습니다.');
        }
      });
    }
    else {
      alert('그룹 초대 코드가 입력되지 않았습니다.');
    }
  };

  // onChange
  const onChangeInputGroupName = e => setInputGroupName(e.target.value);
  const onChangeInputGroupKey = e => setInputGroupKey(e.target.value);

  // Modal
  // const groupAddModal = (
  //   // 그룹 생성 모달
  //   <Modal 
  //     isOpen={isGroupCreateModalOpen} 
  //     onRequestClose={() => setIsGroupCreateModalOpen(false)}
  //     style={{
  //       overlay: {
  //         position: 'fixed',
  //       },
  //       content: {
  //         top: '220px',
  //         left: '600px',
  //         right: '600px',
  //         bottom: '200px',

  //         border: '1px solid',

  //         textAlign: 'center'
  //       }
  //     }}
  //   >
  //     <div style={{marginTop: '5px'}}>생성할 그룹의 정보를 입력하세요.</div>
  //     <div style={{margin: '5px'}}>
  //       <span>그룹 명 : </span>
  //       <input name="inputGroupName" value={inputGroupName} onChange={onChangeInputGroupName} />
  //     </div>
  //     <div>
  //       <button style={{float: 'right', margin: '5px', marginRight: '30px'}} onClick={() => setIsGroupCreateModalOpen(false)}>취소</button>
  //       <button style={{float: 'right', margin: '5px'}} onClick={onClickGroupCreate}>그룹 생성</button>
  //     </div>
  //   </Modal>
  // );
  const groupJoinModal = (
    // 그룹 참가 모달
    <Modal 
      ariaHideApp={false} // allElement 경고창 제거
      isOpen={isGroupJoinModalOpen} 
      onRequestClose={() => setIsGroupJoinModalOpen(false)}
      style={{
        overlay: {
          position: 'fixed'
        },
        content: {
          top: '220px',
          left: '600px',
          right: '600px',
          bottom: '200px',

          border: '1px solid',

          textAlign: 'center'
        }
      }}
    >
      <div style={{marginTop: '5px'}}>참가할 그룹의 초대 코드를 입력하세요.</div>
      <div style={{margin: '5px'}}>
        <span>초대 코드 : </span>
        <input name="inputGroupKey" value={inputGroupKey} onChange={onChangeInputGroupKey} />
      </div>
      <div>
        <button style={{float: 'right', margin: '5px', marginRight: '20px'}} onClick={() => setIsGroupJoinModalOpen(false)}>취소</button>
        <button style={{float: 'right', margin: '5px'}} onClick={onClickGroupJoin}>그룹 참가</button>
      </div>
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
              <GroupButton onClick={onClickGroupAddModal}>그룹 생성</GroupButton>
              <GroupButton onClick={onClickGroupJoinModal}>그룹 참가</GroupButton>
            </GroupButtonDiv>
          </GroupTitleDiv>
          <GroupListDiv ref={groupListDivRef} />
        </GroupDiv>
      </LeftScreenDiv>

      <RightScreenDiv>
        <MyPageButtonDiv>
        <Link to='/mypage'><MyPageButton>마이페이지</MyPageButton></Link>
          <MyPageButton onClick={onClickLogout}>로그아웃</MyPageButton>
        </MyPageButtonDiv>
      </RightScreenDiv>

      {/* 그룹 추가 버튼 Modal */}
      {/* {groupAddModal} */}
      <GroupCreateModal 
        inputGroupName={inputGroupName} 
        setInputGroupName={setInputGroupName} 
        isGroupCreateModalOpen={isGroupCreateModalOpen}
        setIsGroupCreateModalOpen={setIsGroupCreateModalOpen} 
        onClickGroupCreate={onClickGroupCreate}
      />

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
`;
const GroupTitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 5%;
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

  border-width: 1px;
  padding: 3px 5px;

  font-size: 13px;
  border-style: solid;
  border-radius: 10%;
  border-color: white;
  background-color: #3498DB;
  color: white;
`;
const MyPageButton = styled.button`
  padding: 3px 5px;
  border-width: 1px;
  
  border-style: solid;
  border-radius: 10%;
  border-color: #3498DB;
  font-size: 13px;
  background-color: gray;
  color: white;
`;

export default MainPage;