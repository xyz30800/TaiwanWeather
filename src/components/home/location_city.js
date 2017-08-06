import React, {Component}  from 'react';
import { Link } from 'react-router-dom';

import waringIng from '../../img/waring.png';

import LocationMap from './location_map';

const LocationInfo = ({ localInfo }) => {
	
	const localDataLen = Object.keys(localInfo).length;
	let dataEmpty = false;
	let imgAttr = {};
	let weatherDetailLink = {};
	let lng_lat = {};
	const showInvalids = Array.apply(null, document.querySelectorAll('.invalid-value')); // 變為真正的 Array
	
	if (localDataLen === 0) { 
		dataEmpty = true;
		imgAttr = {'src': waringIng};
		weatherDetailLink = {'to': ''};
		lng_lat = {
			'lng': NaN,
			'lat': NaN
		}
		
		if (showInvalids.length !== 0) {
			showInvalids.map(el => {
				el.style['color'] = '#FF5722';
				el.style['font-style'] = 'italic';
			})
		}

	} else {
		console.log()
		dataEmpty = false;
		imgAttr = {'src': `https://works.ioa.tw/weather/img/weathers/zeusdesign/${localInfo.weather.img}`};
		weatherDetailLink = {'to': `/result?town=${localInfo.town.name}&city=${localInfo.town.cate.name}`};
		lng_lat = {
			'lng': parseFloat(localInfo.town.position.lng),
			'lat': parseFloat(localInfo.town.position.lat)
		};

		if (showInvalids.length !== 0) {
			showInvalids.map(el => {
				el.style['color'] = null;
				el.style['font-style'] = null;
			})
		}
	}
	
	return (
		<div className="index-container-localInfo" >
			<div className="google-map">
				<LocationMap lng={lng_lat.lng} lat={lng_lat.lat} />
			</div>
			<Link className="index-container-localInfo-detail" {...weatherDetailLink} >
				<div className="index-container-localInfo-detail-each main">
					<h2>所在城市 - </h2>
					<h3 className="invalid-value">{(dataEmpty)? '未開啟定位': `${localInfo.town.cate.name} ${localInfo.town.name}`}</h3>
				</div>
				<div className="index-container-localInfo-detail-each">
					<span className="index-container-localInfo-detail-each-title">天氣狀況</span>
					<span className="index-container-localInfo-detail-each-value invalid-value">{(dataEmpty)? '未開啟定位': localInfo.weather.desc}</span>
				</div>
				<div className="index-container-localInfo-detail-each">
					<span className="index-container-localInfo-detail-each-title">溫度</span>
					<span className="index-container-localInfo-detail-each-value invalid-value">{(dataEmpty)? '未開啟定位': `${localInfo.weather.temperature} °C`}</span>
				</div>
				<div className="index-container-localInfo-detail-each">
					<span className="index-container-localInfo-detail-each-title">濕度</span>
					<span className="index-container-localInfo-detail-each-value invalid-value">{(dataEmpty)? '未開啟定位': `${localInfo.weather.humidity} %`}</span>
				</div>
				<div className="index-container-localInfo-detail-each">
					<span className="index-container-localInfo-detail-each-title">雨量</span>
					<span className="index-container-localInfo-detail-each-value invalid-value">{(dataEmpty)? '未開啟定位': `${localInfo.weather.rainfall}`}</span>
				</div>
				<span className="index-container-localInfo-detail-uptime">Update Time: {(dataEmpty)? '未開啟定位': localInfo.weather.at}</span>
				<div className="index-container-localInfo-detail-img">
					<img {...imgAttr} alt="" />
				</div>
			</Link>
		</div>
	)
}

export default LocationInfo;