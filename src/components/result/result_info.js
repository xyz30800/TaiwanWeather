import React, {Component}  from 'react';

import waringImg from 'images/waring';
import loading from 'images/loading';

const ResultInfo = ({result}) => {
	
	const resultDataLen = Object.keys(result).length;
	const errorText = '讀取中...';
	let dataEmpty = false;
	let imgWeatherAttr = {};
	let imgTownAttr = {};
	let specialWarn = '';

	if (resultDataLen === 0) {
		dataEmpty = true;
		imgTownAttr = {'src': loading};
		imgWeatherAttr = {'src': waringImg};
	} else {
		dataEmpty = false;
		imgTownAttr = {
			'src': result.town.img,
			'alt': `${result.town.cate.name} ${result.town.name}`
		};
		imgWeatherAttr = {
			'src': `https://works.ioa.tw/weather/img/weathers/zeusdesign/${result.weather.img}`,
			'alt': result.weather.desc
		}

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
				<h2>{(dataEmpty)? errorText: `${result.town.name} ${result.town.cate.name}`}</h2>
			</div>
			<div className="search-container-cityInfo-content">
				<div className="search-container-cityInfo-content-map">
					<img {...imgTownAttr} />
				</div>
				<div className="search-container-cityInfo-content-weatherInfo">
					<div className="search-container-cityInfo-content-weatherInfo-each">
						<span>體感溫度</span>
						<span>{(dataEmpty)? errorText: `${result.weather.felt_air_temp} °C`}</span>
					</div>
					<div className="search-container-cityInfo-content-weatherInfo-each">
						<span>濕度</span>
						<span>{(dataEmpty)? errorText: `${result.weather.humidity} %`}</span>
					</div>
					<div className="search-container-cityInfo-content-weatherInfo-each">
						<span>雨量</span>
						<span>{(dataEmpty)? errorText: `${result.weather.rainfall} mm`}</span>
					</div>
					<div className="search-container-cityInfo-content-weatherInfo-each">
						<span>日出時間</span>
						<span>{(dataEmpty)? errorText: result.weather.sunrise}</span>
					</div>
					<div className="search-container-cityInfo-content-weatherInfo-each">
						<span>日落時間</span>
						<span>{(dataEmpty)? errorText: result.weather.sunset}</span>
					</div>
					<div className="search-container-cityInfo-content-weatherInfo-each">
						<span>天氣狀況</span>
						<span>{(dataEmpty)? errorText: result.weather.desc}</span>
					</div>
					<p>Update Time: {(dataEmpty)? errorText: result.weather.at}</p>
				</div>
				<div className="search-container-cityInfo-content-condtion">
					<img {...imgWeatherAttr} />
					<span>{(dataEmpty)? errorText: result.weather.temperature} °C</span>
				</div>
			</div>
			{specialWarn}
		</div>
	)
}

export default ResultInfo;