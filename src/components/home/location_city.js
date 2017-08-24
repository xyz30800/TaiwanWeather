import React, {Component}  from 'react';
import { Link } from 'react-router-dom';

import waringIng from 'images/waring';

import LocationMap from 'components/home/location_map';

const LocationInfo = ({ localInfo, locationError, position }) => {

	const localDataLen = Object.keys(localInfo).length;
	// 變為真正的 Array
	const showInvalidEls = Array.apply(null, document.querySelectorAll('.invalid-value'));

	let dataEmpty = false;
	let imgAttr = {};
	let weatherDetailLink = {};
	let lng_lat = {};
	
	if (localDataLen === 0) { 
		dataEmpty = true;
		imgAttr = {'src': waringIng}
		weatherDetailLink = {'to': '/'};
		lng_lat = {
			'lng': NaN,
			'lat': NaN
		}
		if (showInvalidEls.length !== 0) {
			showInvalidEls.map(el => {
				el.style['color'] = '#FF5722';
				el.style['font-style'] = 'italic';
			})
		}

	} else {
		dataEmpty = false;
		imgAttr = {
			'src': `https://works.ioa.tw/weather/img/weathers/zeusdesign/${localInfo.weather.img}`,
			'alt': localInfo.weather.desc
		};
		weatherDetailLink = {'to': `/result?town=${localInfo.town.name}&city=${localInfo.town.cate.name}`};
		lng_lat = position;

		if (showInvalidEls.length !== 0) {
			showInvalidEls.map(el => {
				el.style['color'] = null;
				el.style['font-style'] = null;
			})
		}
	}

	const errorMsg = (type) => {

		const text = {
			errorSupport: () => '定位API不支援',
			errorInfo: () => '經緯度發生錯誤',
			other: () => '未開啟定位'
		}
		
		return (text[type] || text['other'])();
	}

	const errorText = errorMsg(locationError);
	
	return (
		<div className="index-container-localInfo" >
			<div className="google-map">
				<LocationMap lng={lng_lat.lng} lat={lng_lat.lat} />
			</div>
			<Link className="index-container-localInfo-detail" {...weatherDetailLink} >
				<div className="index-container-localInfo-detail-each main">
					<h2>所在城市 - </h2>
					<h3 className="invalid-value">{(dataEmpty)? errorText: `${localInfo.town.cate.name} ${localInfo.town.name}`}</h3>
				</div>
				<div className="index-container-localInfo-detail-each">
					<span className="index-container-localInfo-detail-each-title">天氣狀況</span>
					<span className="index-container-localInfo-detail-each-value invalid-value">{(dataEmpty)? errorText: localInfo.weather.desc}</span>
				</div>
				<div className="index-container-localInfo-detail-each">
					<span className="index-container-localInfo-detail-each-title">溫度</span>
					<span className="index-container-localInfo-detail-each-value invalid-value">{(dataEmpty)? errorText: `${localInfo.weather.temperature} °C`}</span>
				</div>
				<div className="index-container-localInfo-detail-each">
					<span className="index-container-localInfo-detail-each-title">濕度</span>
					<span className="index-container-localInfo-detail-each-value invalid-value">{(dataEmpty)? errorText: `${localInfo.weather.humidity} %`}</span>
				</div>
				<div className="index-container-localInfo-detail-each">
					<span className="index-container-localInfo-detail-each-title">雨量</span>
					<span className="index-container-localInfo-detail-each-value invalid-value">{(dataEmpty)? errorText: `${localInfo.weather.rainfall} mm`}</span>
				</div>
				<span className="index-container-localInfo-detail-uptime">Update Time: {(dataEmpty)? errorText: localInfo.weather.at}</span>
				<div className="index-container-localInfo-detail-img">
					<img {...imgAttr} />
				</div>
			</Link>
		</div>
	)
}

export default LocationInfo;