import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Content from './components/content';
import Form from './components/test';

import './css/style';

class App extends Component {
	render(){
		return (
			<Router >
				<div>
					<li><Link to="/form">About</Link></li>

					<Route exact path="/" component={Content}/>
					<Route path="/form" component={Form} />
				</div>
			</Router>
		)
	}
}

ReactDOM.render(<App />, document.querySelector('#container'));