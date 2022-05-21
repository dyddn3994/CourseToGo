import React, { useState } from "react";
import styled, { css } from 'styled-components';
import { BiCopy } from 'react-icons/bi';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';


// 그룹 사용자 .........
const USER_LIST = [

  ];
const FilteringButtonDiv = () => {
  // useState
  //데이터를 저장할 빈배열
 const [checkedUsers , setCheckedUsers] = useState(new Set());
  const onHandleCheckedUser = (id, isChecked) => {
    if(isChecked){
        checkedUsers.add(id);
        setCheckedUsers(checkedUsers);
    } else if(!isChecked && checkedUsers.has(id)){
        checkedUsers.delete(id);
        setCheckedUsers(checkedUsers);
    }
  };
  return (
 
         <UserDiv>
    

        </UserDiv>

    
    
  );
}

// styled components
// div

// ul

const UserDiv =  styled.div`
display: flex;
background-color:#FFCC29;
`;
const InputDiv =  styled.div`

`;
export default FilteringButtonDiv;