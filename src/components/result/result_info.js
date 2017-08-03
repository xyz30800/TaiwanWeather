import React, {Component}  from 'react';

import waringImg from '../../img/waring.png';
import loading from '../../img/loading.png';

const ResultInfo = ({result}) => {

	const resultDataLen = Object.keys(result).length;
	let dataEmpty = false;
	let imgWeatherAttr = {};
	let imgTownAttr = {};
	let specialWarn = '';
	if (resultDataLen === 0) {
		dataEmpty = true;
		imgTownAttr = {'src': loading};
		imgWeatherAttr = {'src': waringImg}
	} else {
		dataEmpty = false;
		imgTownAttr = {'src': result.town.img};
		imgWeatherAttr = {'src': `https://works.ioa.tw/weather/img/weathers/zeusdesign/${result.weather.img}`}

		if (result.weather.specials.length !== 0) {
			const specialdata = result.weather.specials[0];
			specialWarn = (
				<div className="search-container-cityInfo-special">
					<h3>- {specialdata.title} -</h3>
					<span>{specialdata.desc}</span>
					<p>Update Time: {specialdata.at}</p>
				</div>
			);
		}
	}
	
	return (
		<div className="search-container-cityInfo">
			<div className="search-container-cityInfo-header">
				<h2>{(dataEmpty)? '讀取中...': `${result.town.name} ${result.town.cate.name}`}</h2>
			</div>
			<div className="search-container-cityInfo-content">
				<div className="search-container-cityInfo-content-map">
					<img {...imgTownAttr} alt="" />
				</div>
				<div className="search-container-cityInfo-content-weatherInfo">
					<div className="search-container-cityInfo-content-weatherInfo-each">
						<span>體感溫度</span>
						<span>{(dataEmpty)? '讀取中...': result.weather.felt_air_temp} °C</span>
					</div>
					<div className="search-container-cityInfo-content-weatherInfo-each">
						<span>濕度</span>
						<span>{(dataEmpty)? '讀取中...': result.weather.humidity} %</span>
					</div>
					<div className="search-container-cityInfo-content-weatherInfo-each">
						<span>雨量</span>
						<span>{(dataEmpty)? '讀取中...': result.weather.rainfall} mm</span>
					</div>
					<div className="search-container-cityInfo-content-weatherInfo-each">
						<span>日出時間</span>
						<span>{(dataEmpty)? '讀取中...': result.weather.sunrise}</span>
					</div>
					<div className="search-container-cityInfo-content-weatherInfo-each">
						<span>日落時間</span>
						<span>{(dataEmpty)? '讀取中...': result.weather.sunset}</span>
					</div>
					<div className="search-container-cityInfo-content-weatherInfo-each">
						<span>天氣狀況</span>
						<span>{(dataEmpty)? '讀取中...': result.weather.desc}</span>
					</div>
					<p>Update Time: {(dataEmpty)? '讀取中...': result.weather.at}</p>
				</div>
				<div className="search-container-cityInfo-content-condtion">
					<img {...imgWeatherAttr} alt="" />
					<span>{(dataEmpty)? '讀取中...': result.weather.temperature} °C</span>
				</div>
			</div>
			{specialWarn}
		</div>
	)
}

export default ResultInfo;