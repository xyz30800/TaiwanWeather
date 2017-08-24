import React, {Component}  from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import ResultInfo from 'components/result/result_info';
import ResultBar from 'components/result/result_bar';

import cityAllList from 'files/city.list.tw.json';

class Result extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			resp: {},
			histories: {},
			errorSearch: false,
			errorMsg: ''
		}
	}

	componentWillReceiveProps(nextProps) {
		this.getParameter(nextProps);
	}

	componentWillMount() {
		this.getParameter(this.props);
	}

	getParameter(props) {
		const params = new URLSearchParams(props.location.search);
		const paramsTown = params.get('town');
		const paramsCity = params.get('city');
		console.log(paramsTown, paramsCity)

		if (paramsCity === null || paramsTown === null || paramsTown.length === 0 || paramsCity.length === 0 ) {
			this.setState({ errorSearch: true, errorMsg: '404' });
			return;
		}

		this.getResultData(paramsTown, paramsCity);
	}

	getResultData(paramsTown, paramsCity) {

		const preDealResp = (resp) => JSON.parse(resp.data.match(/\((.*)\)/)[1]);

		const townId = 
			cityAllList
			.filter(cities => cities.name === paramsCity)
			.map(city => city.towns.filter(town => town.name === paramsTown))
			.filter(city => city.length !== 0)
			.map(city => parseInt(city[0].id))[0]

		if (townId === undefined) {
			this.setState({ errorSearch: true, errorMsg: '404' });
			return;
		}
		
		const getWeather = axios.get(`https://json2jsonp.com/?url=https://works.ioa.tw/weather/api/weathers/${townId}.json&callback=resp`);
		const getTown =  axios.get(`https://json2jsonp.com/?url=https://works.ioa.tw/weather/api/towns/${townId}.json&callback=resp`);

		const resp = {};
		const histories = {};
		
		axios
		.all([getWeather, getTown])
		.then(axios.spread((weather, town) => {

			const respWeather = preDealResp(weather);
			const respTown = preDealResp(town);
			
			const respHistories = respWeather.histories.map(record => {
				return {
					time: record.at.split(' ')[1].substring(0, 5),
					humidity: record.humidity,
					rainfall: record.rainfall,
					temperature: record.temperature,
				}
			});
			
			histories['weather'] = respHistories;
			histories['town'] = respTown.name;
				
			resp['weather'] = respWeather;
			resp['town'] = respTown;
			
			this.setState({ resp, histories });
		}));
	}

	render() {
		
		return (
			<div className="container router-container">
				{ this.state.errorSearch && <Redirect to={`/error/${this.state.errorMsg}`} /> }
				<ResultInfo result={this.state.resp}/>
				<ResultBar histories={this.state.histories} />
			</div>
		)
	}
}

export default Result;