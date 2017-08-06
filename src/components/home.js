import React, {Component}  from 'react';
import axios from 'axios';

import LocationCity from './home/location_city';
import CarousalCity from './home/carousel_city';

import cityAllList from '../../files/city.list.tw.json';

class Home extends Component {

	constructor(props) {
		super(props);

		this.state = {
			localAllInfo: {},
			carousalAllInfo: {},
			geolocationSupport: true,
			intervalId: 0
		}
	}

	componentDidMount() {
		this.getCarousalCity(['1', '257']);
		this.getUserCity();
		this.randomCityId();
	}

	randomCityId() {	
		const intervalId = setInterval(() => {

			const cityIds = Array.apply(null, Array(2)).map((i) => parseInt(Math.random() * (368 - 1) + 1))
			this.getCarousalCity(cityIds);
			
		}, 5000);

		this.setState({ intervalId });
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
	}

	getCarousalCity(cityIds) {

		const preDealResp = (resp) => JSON.parse(resp.data.match(/\((.*)\)/)[1]);

		const carousalPormises = cityIds.map(id => axios.get(`https://json2jsonp.com/?url=https://works.ioa.tw/weather/api/towns/${id}.json&callback=resp`));

		axios
		.all([...carousalPormises])
		.then(axios.spread((...carousalWeatherResp) => {

			// Carousal city
	  		const carousalTowns = carousalWeatherResp.map(city => preDealResp(city));

			const promises = cityIds.map(id => axios.get(`https://json2jsonp.com/?url=https://works.ioa.tw/weather/api/weathers/${id}.json&callback=resp`))

			axios
			.all(promises)
			.then(promise => {

				// 處理每一筆Promise資料
			    const totalWeatherInfo = promise.map(resp => preDealResp(resp))

				// 重新整理 Carousal city 資料輸出一個 Object
				const carousalAllInfo = carousalTowns.map((city, index) => {
					return {
						'town': city,
						'weather': totalWeatherInfo[index]
					}
				})
				
				this.setState({ carousalAllInfo });
			});
		}));
	}

	getUserCity() {
		if (navigator.geolocation) {
        	navigator.geolocation.getCurrentPosition((pos) => {
        		const { latitude, longitude } = pos.coords;
        		const position = { 'lat': parseFloat(latitude.toFixed(3)), 'lng': parseFloat(longitude.toFixed(3)) }
 	
 				var geocoder = new google.maps.Geocoder();
 				var coord = new google.maps.LatLng(parseFloat(latitude.toFixed(3)), parseFloat(longitude.toFixed(3)));
 				
 				geocoder.geocode({'latLng': coord }, (results, status) => {
					if (status === google.maps.GeocoderStatus.OK) {
						// 如果有資料就會回傳
						if (results) {
							const cityNames = results // ["106", "大安區", "台北市", "台灣"]
												.find(resp => resp.types[0] === 'postal_code').address_components
												.map(city => city.long_name);

							const townId = cityAllList
											.filter(city => city.name === cityNames[2].substring(0, 2))
											.map(city => city.towns.filter(town => town.postal === cityNames[0]))
											.filter(city => city.length !== 0)[0][0].id;
											
							this.fetchLocalData(townId);
						}
					}
					// 經緯度資訊錯誤
					else {
						console.log("Reverse Geocoding failed because: " + status);
						this.fetchLocalData(null);
					}
				});
        	});
        // 不支援此 API
	    } else {
	        this.setState({ geolocationSupport: false });
	    }
	}

	fetchLocalData(townId) {
		if (townId === null) return;

		const preDealResp = (resp) => JSON.parse(resp.data.match(/\((.*)\)/)[1]);

		axios
		.get(`https://json2jsonp.com/?url=https://works.ioa.tw/weather/api/towns/${townId}.json&callback=resp`)
		.then(resp => {

			const localTownInfo = preDealResp(resp);

			axios
			.get(`https://json2jsonp.com/?url=https://works.ioa.tw/weather/api/weathers/${localTownInfo.id}.json&callback=resp`)
			.then(resp => {

				const localAllInfo = {};
			    localAllInfo['town'] = localTownInfo;
				localAllInfo['weather'] = preDealResp(resp);
				
				this.setState({ localAllInfo });
			})
			.catch(error => console.log(error));
		})
		.catch(error => console.log(error));
	}

	render() {
		return (
			<div className="container router-container">
				<LocationCity localInfo={this.state.localAllInfo} support={this.state.geolocationSupport}/>
				<CarousalCity carousalInfo={this.state.carousalAllInfo} />
			</div>
		)
	}
}

export default Home;