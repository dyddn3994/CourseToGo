import React from "react";
import styled from 'styled-components';
import PreviewMoviItem from "../Main/PreviewMoviItem";
import MovieItem from "./MovieItem";

const MovieList = ({movieDatas, checkedMovie}) => {

    return (
            <Movies>
            {
               movieDatas.map((item,index) =>            
                    <MovieItem  key={index} index={index} item={item} checkedMovie={checkedMovie}/>    
            )}
            </Movies> 
    );
};

const Movies= styled.div`
    list-style-type: none;
    margin-left:3%;
`;

export default MovieList ;