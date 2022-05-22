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
  
`;
export default FilteringUserList;