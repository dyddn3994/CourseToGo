import React , {useState,useEffect }from 'react';
import styled, { css } from 'styled-components';

import MyResponsiveBar from './MyResponsiveBar';
import MyResponsivePie from './MyResponsivePie ';


const Statistics= ({genderStatisticsData, ageStatisticsData}) => {
    
  return (
    <StatisticsDiv>
       <ChartBox>
            <LabelDiv>성별 예매 분포</LabelDiv>
            <MyResponsivePie data={genderStatisticsData}/>
        </ChartBox>
        <ChartBox>
            <LabelDiv>연령별 예매 분포</LabelDiv>
            <MyResponsiveBar data={ageStatisticsData}/>
        </ChartBox>

   </StatisticsDiv>
  );
};
const StatisticsDiv = styled.div`
    width: 80%;
    display:flex;
    margin-left:15%;
`;
const ChartBox = styled.div`
  width: 35%;
  height:250px;
  text-align: center;
  font-size:0.9rem;
  margin-top:5%;
  border-bottom: solid 1px  black;
  padding:3%;
  margin-left:3%;
`;
const LabelDiv = styled.div`
    padding-bottom:7%;
    border-bottom: solid 1px  black;
`;
export default Statistics;