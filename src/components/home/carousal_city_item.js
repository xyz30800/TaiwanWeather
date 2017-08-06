import React, {Component}  from 'react';
import { Link } from 'react-router-dom';

const CarousalCityItem = ({carousal}) => {
	
	let imgAttr = {};
	let weatherDetailLink = {};
	let dataEmpty = false;
	let errorText = '';
	if (carousal === undefined) {
		dataEmpty = true;
		weatherDetailLink = {'to': '/'}
		errorText = '讀取中...';
	} else {
		dataEmpty = false;
		imgAttr = {'src': `https://works.ioa.tw/weather/img/weathers/zeusdesign/${carousal.weather.img}`}
		weatherDetailLink = {'to': `/result?town=${carousal.town.name}&city=${carousal.town.cate.name}`}
	}
	
	return (
		<Link className="index-container-cityInfo-detail" {...weatherDetailLink}>
			<h2>{(dataEmpty)? errorText: `${carousal.town.cate.name} ${carousal.town.name}`}</h2>
			<div className="index-container-cityInfo-detail-each">
				<span className="index-container-cityInfo-detail-each-title">天氣狀況</span>
				<span className="index-container-cityInfo-detail-each-value">{(dataEmpty)? errorText: carousal.weather.desc}</span>
			</div>
			<div className="index-container-cityInfo-detail-each">
				<span className="index-container-cityInfo-detail-each-title">溫度</span>
				<span className="index-container-cityInfo-detail-each-value">{(dataEmpty)? errorText: `${carousal.weather.temperature} °C`}</span>
			</div>
			<div className="index-container-cityInfo-detail-each">
				<span className="index-container-cityInfo-detail-each-title">濕度</span>
				<span className="index-container-cityInfo-detail-each-value">{(dataEmpty)? errorText: `${carousal.weather.humidity} %`}</span>
			</div>
			<div className="index-container-cityInfo-detail-each">
				<span className="index-container-cityInfo-detail-each-title">雨量</span>
				<span className="index-container-cityInfo-detail-each-value">{(dataEmpty)? errorText: `${carousal.weather.rainfall} mm`}</span>
			</div>
			<span className="index-container-cityInfo-detail-uptime">Update Time: {(dataEmpty)? 'loading': carousal.weather.at}</span>
			<div className="index-container-cityInfo-detail-img">
				<img { ...imgAttr} alt="" />
			</div>
		</Link>
	)
}

export default CarousalCityItem;