import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, HashRouter, Route, Link, Switch } from 'react-router-dom';

import Result from './components/result';
import Home from './components/home';
import Layout from './components/layout';
import Error404 from './components/error404';

import './css/style';

class App extends Component {
	render(){
		return (
			<HashRouter>
				<Layout>
					<Switch>
						<Route exact path="/" component={Home} />
	      				<Route exact path="/result" component={Result} />
	      				<Route exact path="/test" component={Error404} />
	      				<Route path="/:any" component={Home} />
	      				<Route component={Home} />
	      			</Switch>
				</Layout>
			</HashRouter>
		)
	}
}

ReactDOM.render(<App />, document.querySelector('#container'));

// import html from './result';
// import axios from 'axios';
// import './css/style';

// const API_KEY = '57f7ba81c61b976e022530435b760f1f';
// const ROOT_URL_current = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;

// axios.get(`${ROOT_URL_current}&lat=24.45&lon=121.47`).then(response => {
// 	console.log('-', response.data);
// })
// .catch(error => {
// 	console.log(error);
// });

// axios.get('https://json2jsonp.com/?url=https://works.ioa.tw/weather/api/towns/6.json&callback=resp').then(response => {
// 	console.log( 'towns', JSON.parse(response.data.match(/\((.*)\)/)[1]) );
// })
// .catch(error => {
// 	console.log(error);
// });

// axios.get('https://json2jsonp.com/?url=https://works.ioa.tw/weather/api/weathers/185.json&callback=resp').then(response => {
// 	console.log( 'weathers', JSON.parse(response.data.match(/\((.*)\)/)[1]) );
// })
// .catch(error => {
// 	console.log(error);
// });

// 空氣品質 (AQI)
// axios.get('https://json2jsonp.com/?url=http://opendata.epa.gov.tw/webapi/api/rest/datastore/355000000I-000259?sort=SiteName&offset=0&limit=1000&callback=resp').then(response => {
// 	console.log( JSON.parse(response.data.match(/\((.*)\)/)[1]).result.records );
// })
// .catch(error => {
// 	console.log(error);
// });

// function initLoadHtml() { return html }

// document.querySelector('#container').insertAdjacentHTML( 'beforeend', initLoadHtml() );