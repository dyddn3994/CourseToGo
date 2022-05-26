import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';


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
          top: '220px',
          left: '600px',
          right: '600px',
          bottom: '200px',

          border: '1px solid',

          textAlign: 'center'
        }
      }}
    >
      <div style={{marginTop: '5px'}}>생성할 그룹의 정보를 입력하세요.</div>
      <div style={{margin: '5px'}}>
        <span>그룹 명 : </span>
        <input name="inputGroupName" value={inputGroupName} onChange={onChangeInputGroupName} />
      </div>
      <div>
        <button style={{float: 'right', margin: '5px', marginRight: '30px'}} onClick={() => setIsGroupCreateModalOpen(false)}>취소</button>
        <button style={{float: 'right', margin: '5px'}} onClick={onClickGroupCreate}>그룹 생성</button>
      </div>
    </Modal>
  )
}

export default GroupCreateModal;