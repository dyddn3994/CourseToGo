import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

import InputForm from '../InputForm';
const GroupCreateModal = props => {

  // useState
  // const [inputGroupName, setInputGroupName] = useState(''); // 그룹 이름 입력 input

  // props
  const { 
    inputGroupName,             // 그룹 이름 입력 input String
    setInputGroupName,          // 그룹 이름 입력 input setter
    isGroupCreateModalOpen,     // 그룹 생성 Modal 열림 상태 boolean
    setIsGroupCreateModalOpen,  // 그룹 생성 Modal 열림 상태 setter
    onClickGroupCreate          // 그룹 생성 버튼 onClick
  } = props;

  // onChnage
  const onChangeInputGroupName = e => setInputGroupName(e.target.value);

  return (
    <Modal 
      ariaHideApp={false} // allElement 경고창 제거
      isOpen={isGroupCreateModalOpen} 
      onRequestClose={() => setIsGroupCreateModalOpen(false)}
      style={{
        overlay: {
          position: 'fixed',
        },
        content: {
          top: '260px',
          left: '400px',
          right: '400px',
          bottom: '340px',
          borderRadius: '1rem',
          boxShadow: '0px 0px 4px lightgraray',
        }
      }}
    >
    <MainDiv>
      <div style={{margin: '5%'}}>생성할 그룹의 정보를 입력하세요.</div>
      <InputForm label={'그룹 명'}name="inputGroupName" value={inputGroupName} onChange={onChangeInputGroupName} />

      <OptionButton backgroundColor={'#4D9FE3'} color={'#FFFFFF'} onClick={onClickGroupCreate}>그룹 생성</OptionButton>
      <OptionButton backgroundColor={'#FFFFFF'} color={'#4D9FE3'}onClick={() => setIsGroupCreateModalOpen(false)}>취소</OptionButton>

    </MainDiv>
  </Modal>
  )
}
const MainDiv= styled.div`
      text-align: center;
      font-size:1.2rem;
`;
const OptionButton = styled.button`
      margin:5%;
      width:15%;
      font-size:1.3rem;
      line-height: 1.6;
      border: 1px solid;
      border-radius: 0.30rem;
      background-color: ${props => props.backgroundColor}; 
      color: ${props => props.color}; 
      border: 1px solid  #4D9FE3;
      box-shadow: 0 0 2px lightgray;
      font-weight: bold;
      &:hover{  
        border: 1px solid  gray;
        box-shadow: 0 0 3px  gray;
    }
`;

export default GroupCreateModal;