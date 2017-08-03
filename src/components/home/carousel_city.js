import React, {Component}  from 'react';

import CarousalCityItem from './carousal_city_item';

const CarousalCity = ({carousalInfo}) => {
	
	return (
		<div className="index-container-cityInfo">
			<CarousalCityItem carousal={carousalInfo[0]} />
			<CarousalCityItem carousal={carousalInfo[1]} />
		</div>
	)
}

export default CarousalCity;