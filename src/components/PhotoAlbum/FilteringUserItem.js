import React, { useState } from "react";
import styled, { css } from 'styled-components';

const FilteringUserItem = ({item, checkedHandler}) => {
  
    const [backgroundColor, setBackgorundColor] = useState('#FFFFFF');  //버튼 클릭 시 색상 변경
    
    const {memberId, memberName, memberProfile} = item

    return (
        <UserButton style={{backgroundColor:backgroundColor }} onClick={()=>{checkedHandler(item);
                                                                        setBackgorundColor(backgroundColor==='#FFFFFF'? '#DCDCDC': '#FFFFFF'); }} >
            {/* 유저 프로필사진과 이름*/}
            <ProfileDiv>{memberProfile}</ProfileDiv>
            <InputUser type="button"  value={memberName}  />
        </UserButton>
    )

}
const InputUser=  styled.input`
border:0;
outline:0;
width: 50px;
text-align: center;
color:	#000000;
font-size:0.6rem;
`;

const ProfileDiv =  styled.div`
background-color:#FFCC29;
border-radius: 1rem;
height:40px;
width:40px;
display: inline-block;
`;

const UserButton =  styled.button`
margin-bottom:10%;
border:0;
outline:0;
width: 80px;
height:60px;
margin:0.2%;
margin-left:2%;
text-align: center;
// background-color:#FFFFFF;
box-sizing: border-box;
border-radius:5px;
`;

export default FilteringUserItem;