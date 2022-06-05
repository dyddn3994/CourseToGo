import React, { useState } from 'react';
import styled from 'styled-components';

const SelectRegion = (props) => {
	return (
		<SelectDiv onChange={props.selectOnChange} defaultValue={props.defaultValue}>
			{console.log('props: ', props.defaultValue)}
			{props.options.map((option) => (
				<option
					key={option.value}
					value={option.value}
				>
					{option.name}
				</option>
			))}
		</SelectDiv>
	);
};

const SelectDiv = styled.select`
border-radius: 0.30rem;
line-height: 2;
border: 1px solid lightgray;
width:82%;
height:140%;
font-size:1.2rem;
text-align: center;
box-shadow: 0px 0px 2px lightgray;

`;
export default SelectRegion;