import React from "react";
import styled from 'styled-components';

import PhotoItem from './PhotoItem';

const PhotoList = ({datas, onView}) => {

	return (
		<PhotoListDiv>
			{/* 사진 리스트들  */}	
			<Photos>
				{
					datas.map(item => 
					<PhotoItem  key= {item.photoId} item={item}  onView = {onView} />)
				}
			</Photos> 
		</PhotoListDiv>
	);
};

const Photos = styled.div`
	list-style-type: none;
`;
const PhotoListDiv = styled.div`
	width:100%;
	height:100%
`;

export default PhotoList;