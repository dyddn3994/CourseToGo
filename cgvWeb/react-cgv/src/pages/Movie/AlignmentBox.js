import React , {useState,useEffect }from 'react';
import styled, { css } from 'styled-components';

const AlignmentBox= (props) => {
    // const [alignment, setAlignment] =useState('1');
    // const selectOnChange = (e) => {
    //     setAlignment(e.target.value);
    // }
  return (
    <div >
        {/* 정렬 */}
        <Alignment>
           <div>
               <SelectDiv onChange={(e)=>props.selectOnChange(e.target.value)} >  
				    <option key='1' value='1'> 예매율순 </option>
                    <option key='2' value='2' > 평점순 </option>    
		        </SelectDiv>
            </div>

          {/* <AlignmentButton onClick={props.onClickAlignment(alignment)}>GO</AlignmentButton> */}
        </Alignment>
    </div>
  );
};


const Alignment= styled.div`
  display: felx;
  float: right;
  width:10%;
  margin-right:6.4%;
  margin-top:0.5%;
`;


const SelectDiv = styled.select`
    border: 1px solid lightgray;
    width:100%;
    font-size:0.9rem;
    height:25px;
    display: inline-block;
`;

export default AlignmentBox;