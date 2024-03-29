import React, { useState, useRef } from "react";
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

// components
import GroupListDiv from "./GroupListDiv.js";
import GroupCreateModal from '../../components/Main/GroupCreateModal';
import MainLayout from "../../components/Login/MainLayout";
import GroupJoinModal from "../../components/Main/GroupJoinModal.js";

const MainPage = () => {
  const navigate = useNavigate();

  // useState
  const [isGroupCreateModalOpen, setIsGroupCreateModalOpen] = useState(false);
  const [isGroupJoinModalOpen, setIsGroupJoinModalOpen] = useState(false);
  const [inputGroupName, setInputGroupName] = useState('');
  const [inputGroupKey, setInputGroupKey] = useState('');
  const [addGroupState, setAddGroupState] = useState('');

  // const [loading, setLoading] = useState(false); // 로딩 시 화면 표현 

  // useRef
  const groupListDivRef = useRef();

  // onClick
  const onClickGroupAddModal = () => setIsGroupCreateModalOpen(true);
  const onClickGroupJoinModal = () => setIsGroupJoinModalOpen(true);
  const onClickLogout = () => {
    commuteGetLogout();
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
          alert('그룹이 생성되었습니다.');
          
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

  // 통신
  const commuteGetLogout = () => {
    // 로그아웃
    fetch("/logout")
    .then((res)=>{
      return res.json();
    })
    .then((ack)=>{
      // false일때 로그인이 안되어있는데 어짜피 그런 상태여도 로그인 화면으로 돌려야하므로 조건문 없음
      alert('로그아웃 되었습니다.');
      navigate('../');  //로그인 페이지로
    });
  }

  // render
  return (
    <>
      {/* {loading ? (
        <div style={{position: 'absolute', left: '50%', top: '45%'}}>
          <Ring 
            size={40}
            lineWeight={5}
            speed={2} 
            color="black"
          />
        </div> 
      ) : ( */}
        <MainLayout isLogin={true} onClickLogout={onClickLogout}>
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
          
        {/* 그룹 추가 버튼 Modal */}
          <GroupCreateModal 
            inputGroupName={inputGroupName} 
            setInputGroupName={setInputGroupName} 
            isGroupCreateModalOpen={isGroupCreateModalOpen}
            setIsGroupCreateModalOpen={setIsGroupCreateModalOpen} 
            onClickGroupCreate={onClickGroupCreate}
          />

          {/* 그룹 참가 버튼 Modal */}
          <GroupJoinModal  
            isGroupJoinModalOpen={isGroupJoinModalOpen}
            setIsGroupJoinModalOpen={setIsGroupJoinModalOpen}
            inputGroupKey={ inputGroupKey}
            onChangeInputGroupKey={onChangeInputGroupKey}
            onClickGroupJoin={onClickGroupJoin} />
        </MainLayout>
      {/* )}  */}
    </>
  );
};

// styled components
// div

const GroupDiv = styled.div`
  width:80vh;
  height: 95vh;
`;
const GroupTitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 5%;
  width: 100%;
  font-size:1.2rem;

`;
const GroupButtonDiv = styled.div`
  display: flex;
  padding-right: 10%;

`;

// button
const GroupButton = styled.button`
  align-self: center;
  background-color: #4D9FE3;
  border-radius: 0.30rem;
  font-size: 1.1rem;
  line-height: 1.6;
  width:120px;
  height:35px;
  color:#FFFFFF;
  display: inline-block;
  margin:3%;
  float: right;
  border: 1px solid  #4D9FE3;
  box-shadow: 0px 0px 2px lightgray;
  font-weight: bold;
  &:hover{  
    border: 1px solid  gray;
    box-shadow: 0 0 3px  gray;
}
`;

export default MainPage;