import React, {Component}  from 'react';
import axios from 'axios';

import ResultInfo from './result/result_info';
import ResultBar from './result/result_bar';

import cityAllList from '../../files/city.list.tw.json';

class Result extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			resp: {},
			histories: {}
		}
	}

	componentDidMount() {
		const params = new URLSearchParams(this.props.location.search);
		const paramsTown = params.get('town');
		const paramsCity = params.get('city');

		if (paramsTown === null || paramsTown.length === 0 || paramsCity === null || paramsCity.length === 0 ) this.navigateIndex();

		this.getResultData(paramsTown, paramsCity);
	}

	getResultData(paramsTown, paramsCity) {

		const result = {};
		const preDealResp = (resp) => JSON.parse(resp.data.match(/\((.*)\)/)[1]);

		const townId = 
			cityAllList
			.filter(cities => cities.name === paramsCity)
			.map(city => city.towns.filter(town => town.name === paramsTown))
			.map(city => parseInt(city[0].id))[0]

		if (townId === undefined) this.navigateIndex();
		
		const getWeather = axios.get(`https://json2jsonp.com/?url=https://works.ioa.tw/weather/api/weathers/${townId}.json&callback=resp`);
		const getTown =  axios.get(`https://json2jsonp.com/?url=https://works.ioa.tw/weather/api/towns/${townId}.json&callback=resp`);

		const resp = {};
		axios
		.all([getWeather, getTown])
		.then(axios.spread((weather, town) => {

			const respWeather = preDealResp(weather);
			const respTown = preDealResp(town);

			const histories = respWeather.histories.map(record => {
				return {
					time: record.at.split(' ')[1].substring(0, 5),
					humidity: record.humidity,
					rainfall: record.rainfall,
					temperature: record.temperature,
				}
			});

			resp['weather'] = respWeather;
			resp['town'] = respTown;
			
			this.setState({ resp, histories });
		}));
	}

	navigateIndex() {
		window.location.href = '/';
	}

	render() {
		
		return (
			<div className="container router-container">
				<ResultInfo result={this.state.resp}/>
				<ResultBar histories={this.state.histories} />
			</div>
		)
	}
}

export default Result;