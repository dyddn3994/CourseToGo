import React, { useState , useEffect} from "react";
import styled, { css } from 'styled-components';

import UserItem from './FilteringUserItem';
const FilteringUserList = ({users,checkedHandler}) => {

  // render
    return (

        <UserDiv>
          {users.map((item) => (
              <UserItem key={item.memberId} item={item} checkedHandler={checkedHandler}/>
          ))} 
        </UserDiv>
     
  );
};

// styled components
// div
const UserDiv =  styled.div`
  display: flex;
  overflow: scroll;
  &::-webkit-scrollbar {
    width:0px;
    height:8px;
    border-radius:3%;
   
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cccccc ;
    border-radius:6px;
    background-clip: padding-box;
    border: 1px solid transparent;
  }

`;
export default FilteringUserList;