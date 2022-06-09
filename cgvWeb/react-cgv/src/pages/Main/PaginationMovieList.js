import React from "react";
import styled from 'styled-components';
import PreviewMoviItem from "./PreviewMoviItem";


const PaginationMovieList = ({movieDatas}) => {

    return (
            <Movies>
            {
               movieDatas.map((item,index) =>            
                    <PreviewMoviItem key={index} index={index} item={item} />         
            )}
            </Movies> 
    );
};

const Movies= styled.div`
    list-style-type: none;
    margin-left:3%;
`;

export default PaginationMovieList;