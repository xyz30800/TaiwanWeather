import React, {Component}  from 'react';
import { Link } from 'react-router-dom';

const CarousalCityItem = ({carousal}) => {
		
	return (
		<Link className="index-container-cityInfo-detail" to={`/result?town=${carousal.town.name}&city=${carousal.town.cate.name}`}>
			<h2>{carousal.town.cate.name} {carousal.town.name}</h2>
			<div className="index-container-cityInfo-detail-each">
				<span className="index-container-cityInfo-detail-each-title">天氣狀況</span>
				<span className="index-container-cityInfo-detail-each-value">{carousal.weather.desc}</span>
			</div>
			<div className="index-container-cityInfo-detail-each">
				<span className="index-container-cityInfo-detail-each-title">溫度</span>
				<span className="index-container-cityInfo-detail-each-value">{`${carousal.weather.temperature} °C`}</span>
			</div>
			<div className="index-container-cityInfo-detail-each">
				<span className="index-container-cityInfo-detail-each-title">濕度</span>
				<span className="index-container-cityInfo-detail-each-value">{`${carousal.weather.humidity} %`}</span>
			</div>
			<div className="index-container-cityInfo-detail-each">
				<span className="index-container-cityInfo-detail-each-title">雨量</span>
				<span className="index-container-cityInfo-detail-each-value">{`${carousal.weather.rainfall} mm`}</span>
			</div>
			<span className="index-container-cityInfo-detail-uptime">Update Time: { carousal.weather.at}</span>
			<div className="index-container-cityInfo-detail-img">
				<img src={`https://works.ioa.tw/weather/img/weathers/zeusdesign/${carousal.weather.img}`} alt={carousal.weather.desc} />
			</div>
		</Link>
	)
}

export default CarousalCityItem;