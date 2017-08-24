import React, {Component} from 'react';

import CarousalCityItem from 'components/home/carousal_city_item';

const CarousalCity = ({carousalInfo}) => {
	
	const carousallDataLen = Object.keys(carousalInfo).length;

	const dataEmpty = (carousallDataLen === 0) ? true : false;

	return (
		<div className="index-container-cityInfo">
		{ 
			dataEmpty ? (
				<h2>讀取中...</h2>
			) : (
				carousalInfo.map((item, index) => <CarousalCityItem key={index} carousal={item} />)
			)
		}
		</div>
	)
}

export default CarousalCity;