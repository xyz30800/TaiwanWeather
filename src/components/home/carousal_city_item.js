import React, {Component}  from 'react';

const CarousalCityItem = ({carousal}) => {
	
	let imgAttr = {};
	let weatherDetailLink = {};
	let dataEmpty = false;
	if (carousal === undefined) {
		dataEmpty = true;
	} else {
		dataEmpty = false;
		imgAttr = {'src': `https://works.ioa.tw/weather/img/weathers/zeusdesign/${carousal.weather.img}`}
		weatherDetailLink = {'href': `/result?town=${carousal.town.name}&city=${carousal.town.cate.name}`}
	}
	
	return (
		<a className="index-container-cityInfo-detail" {...weatherDetailLink}>
			<h2>{(dataEmpty)? '讀取中...': `${carousal.town.cate.name} ${carousal.town.name}`}</h2>
			<div className="index-container-cityInfo-detail-each">
				<span className="index-container-cityInfo-detail-each-title">天氣狀況</span>
				<span className="index-container-cityInfo-detail-each-value">{(dataEmpty)? '讀取中...': carousal.weather.desc}</span>
			</div>
			<div className="index-container-cityInfo-detail-each">
				<span className="index-container-cityInfo-detail-each-title">溫度</span>
				<span className="index-container-cityInfo-detail-each-value">{(dataEmpty)? '讀取中...': `${carousal.weather.temperature} °C`}</span>
			</div>
			<div className="index-container-cityInfo-detail-each">
				<span className="index-container-cityInfo-detail-each-title">濕度</span>
				<span className="index-container-cityInfo-detail-each-value">{(dataEmpty)? '讀取中...': `${carousal.weather.humidity} %`}</span>
			</div>
			<div className="index-container-cityInfo-detail-each">
				<span className="index-container-cityInfo-detail-each-title">雨量</span>
				<span className="index-container-cityInfo-detail-each-value">{(dataEmpty)? '讀取中...': `${carousal.weather.rainfall} mm`}</span>
			</div>
			<span className="index-container-cityInfo-detail-uptime">Update Time: {(dataEmpty)? '未開啟定位': carousal.weather.at}</span>
			<div className="index-container-cityInfo-detail-img">
				<img { ...imgAttr} alt="" />
			</div>
		</a>
	)
}

export default CarousalCityItem;