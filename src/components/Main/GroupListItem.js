import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import styled, { css } from 'styled-components';
import { BiCopy } from 'react-icons/bi';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';

const GroupListItem = ({group, onClickCreateCourse,groupKeySpacing,onClickCopy}) => {

  return (   
    <div>
        <div>
            <b style={{paddingRight: '30px'}}>{group.groupName}</b>
            <span>인원 {group.groupMemberCount}명</span>
            <GroupButton onClick={(e) => onClickCreateCourse(e, group.groupId)}>코스 추가</GroupButton>
            <GroupButton >코스 조회</GroupButton>
        </div>
        <div>
            <span>초대 코드 : {groupKeySpacing(group.groupKey)} </span>
            {/* 클립보드 복사 */}
            <CopyToClipboard text={group.groupKey} >    
                {/* 복사 아이콘 */}
                <BiCopy onClick={(e) => onClickCopy(e, group.groupName)} /> 
            </CopyToClipboard>
        </div> 
  </div>
  );
};

// styled components
// div

// ul
const GroupButton = styled.button`
  align-self: center;
  background-color:#FFFFFF;
  border-radius: 0.30rem;
  font-size: 0.7rem;
  line-height: 1.6;
  width:80px;
  height:25px;
  color:#4D9FE3;
  display: inline-block;
  margin:1%;
  float: right;
  border: 1px solid  #4D9FE3;
  box-shadow: 0px 0px 2px lightgray;
  font-weight: bold;
  float: right;
  &:hover{  
    border: 1px solid  gray;
    box-shadow: 0 0 3px  gray;
}
`;


export default GroupListItem;