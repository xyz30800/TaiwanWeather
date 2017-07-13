import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Content from './components/content';

import './css/style';

class App extends Component {
	render(){
		return (
			<Content />
		)
	}
}

ReactDOM.render(<App />, document.querySelector('#container'));