import React, {Component}  from 'react';
import axios from 'axios';

const API_KEY = '57f7ba81c61b976e022530435b760f1f';
const ROOT_URL_forcast = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;
const ROOT_URL_current = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;
const ROOT_URL_uv = `http://api.openweathermap.org/data/2.5/uvi/forecast?appid=${API_KEY}`;
const ROOT_URL_map = `http://api.openweathermap.org/data/2.5/uvi/forecast?appid=${API_KEY}`;

const Content = () => {
	
	function tempConverter(type, temp) {
		// type = { :Celsius, f: Fahrenheit  }
		return (type === 'f') ? ((temp - 32) * 5 / 9) : (temp * ( 9 / 5 ) + 32 );
	}

	//console.log(tempConverter('c', 10));

	const url = `${ROOT_URL_forcast}&q=Taipei,us`;
	axios.get(url).then(function (response) {
    	console.log(response.data);
  	})
  	.catch(function (error) {
    	console.log(error);
  	});

 //  	const url2 = `${ROOT_URL_current}&q=Kaohsiung,us`;
	// axios.get(url2).then(function (response) {
 //    	console.log('-', response.data);
 //  	})
 //  	.catch(function (error) {
 //    	console.log(error);
 //  	});

 //  	const url3 = `${ROOT_URL_uv}&lat=22.62&lon=120.31`;
	// axios.get(url3).then(function (response) {
 //    	console.log('-', response.data);
 //  	})
 //  	.catch(function (error) {
 //    	console.log(error);
 //  	});


	return (

		<div className="content">
			<h1>Welcome ReactJS !!!!</h1>
			<form action="/form" >
				<input type="text"/>
				<input type="submit" value="Submit" />
			</form>
			<img src="http://tile.openweathermap.org/map/precipitation_new/8/30/-20.png?appid=57f7ba81c61b976e022530435b760f1f" />
		</div>
	)
}

export default Content;