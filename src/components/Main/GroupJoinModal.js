import React, { useState, useRef } from "react";
import styled, { css } from 'styled-components';

import Modal from 'react-modal';
import InputForm from '../InputForm';
const GroupJoinModal = ({isGroupJoinModalOpen,setIsGroupJoinModalOpen,inputGroupKey,onChangeInputGroupKey,onClickGroupJoin }) => {
    // 그룹 참가 모달;

    return (
    <Modal 
      ariaHideApp={false} // allElement 경고창 제거
      isOpen={isGroupJoinModalOpen} 
      onRequestClose={() => setIsGroupJoinModalOpen(false)}
      style={{
        overlay: {
            position: 'fixed'
          },
          content: {
            top: '150px',
            left: '340px',
            right: '340px',
            bottom: '200px',
            borderRadius: '1rem',
            boxShadow: '0px 0px 4px lightgray',
          }
      }}
    >
        <MainDiv>
            <div style={{margin: '5%'}}>참가할 그룹의 초대 코드를 입력하세요.</div>
            <InputForm label={'초대코드'} name="inputGroupKey" value={inputGroupKey} onChange={onChangeInputGroupKey}  />
            <OptionButton backgroundColor={'#4D9FE3'} color={'#FFFFFF'} onClick={onClickGroupJoin}>그룹 참가</OptionButton>
            <OptionButton backgroundColor={'#FFFFFF'} color={'#4D9FE3'} onClick={() => setIsGroupJoinModalOpen(false)}>취소</OptionButton>
        </MainDiv>
    </Modal>
  );
    };

const MainDiv= styled.div`
      text-align: center;
`;

const OptionButton = styled.button`
      margin:5%;
      width:15%;
      font-size:0.9rem;
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


export default GroupJoinModal;