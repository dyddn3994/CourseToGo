import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

  const SelectTimeItem =({TIME,onChangeInputItinerary,name , value}) => {

  return (
        <Form  onChange={onChangeInputItinerary}  name={name}  value={value}>
          {TIME.map((timeType) => (
            <option value={timeType} key={timeType}>
              {timeType}
            </option>
          ))}
        </Form >
  );
    };
    const Form = styled.select`
    border-radius: 0.30rem;
    line-height: 2;
    border: 1px solid lightgray;
    width:40%;
    height:30px;
    box-shadow: 0px 0px 2px lightgray;
    margin-left:2%;
    &::-webkit-scrollbar {
      width:12px;
      border-radius:3%;
    }
    &::-webkit-scrollbar-thumb {
      background-color: lightgray ;
      border-radius:6px;
      background-clip: padding-box;
      border: 1px solid transparent;
    }
    &::-webkit-scrollbar-corner{
      background-color:#F5F5F5 ;
    }
  `;

  export default SelectTimeItem;