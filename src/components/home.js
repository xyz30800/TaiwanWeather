import React, {Component}  from 'react';
import axios from 'axios';

import LocationCity from 'components/home/location_city';
import CarousalCity from 'components/home/carousel_city';

import cityAllList from 'json/city.list.tw.json';

// Home.propTypes = {
	
// };

class Home extends Component {

	constructor(props) {
		super(props);

		this.state = {
			localAllInfo: {},
			position: {},
			carousalAllInfo: {},
			locationError: '',
			interValId: 0,
		}
	}

	componentDidMount() {
		this.getUserCity();
		this.randomCityId();
	}

	randomCityId() {	
		this.getCarousalCity(['1', '257']);

		const interValId = setInterval(() => {

			const cityIds = Array.apply(null, Array(2)).map((i) => parseInt(Math.random() * (368 - 1) + 1))
			this.getCarousalCity(cityIds);
			
		}, 8000);

		this.setState({ interValId });
	}

	componentWillUnmount() {
		// 取消 setInterval
		clearInterval(this.state.interValId);
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

        		const latitude = parseFloat(pos.coords.latitude.toFixed(3));
        		const longitude = parseFloat(pos.coords.longitude.toFixed(3));

        		const position = { 'lat': latitude, 'lng': longitude }
 	
 				const geocoder = new google.maps.Geocoder();
 				const coord = new google.maps.LatLng(latitude, longitude);
 				
 				geocoder.geocode({'latLng': coord }, (results, status) => {
					if (status === google.maps.GeocoderStatus.OK) {
						// 如果有資料就會回傳
						if (results.length !== 1) {
							const cityNames = 
								results // ["106", "大安區", "台北市", "台灣"]
								.find(resp => resp.types[0] === 'postal_code').address_components
								.map(city => city.long_name);

							const townId = 
								cityAllList
								.filter(city => city.name === cityNames[2].substring(0, 2))
								.map(city => city.towns.filter(town => town.postal === cityNames[0]))
								.filter(city => city.length !== 0)[0][0].id;

							this.fetchLocalData(townId, position);
						} else {
							this.setState({ locationError: 'errorInfo' });
						}
					}
					// 經緯度資訊錯誤: locationError
					else {
						this.setState({ locationError: 'errorInfo' });
					}
				});
        	});
        // 不支援此 API: geolocationSupportError
	    } else {
	        this.setState({ locationError: 'errorSupport' });
	    }
	}

	fetchLocalData(townId, position) {

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
				
				this.setState({ localAllInfo, position });
			})
			.catch(error => console.log(error));
		})
		.catch(error => console.log(error));
	}

	render() {

		const locationCityAttr = {
			localInfo: this.state.localAllInfo,
			locationError: this.state.locationError,
			position: this.state.position
		};

		const carousalCityAttr = {
			carousalInfo: this.state.carousalAllInfo
		}

		return (
			<div className="container router-container">
				<LocationCity {...locationCityAttr} />
				<CarousalCity {...carousalCityAttr} />
			</div>
		)
	}
}

export default Home;