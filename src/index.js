import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'

import Result from './components/result';
import Home from './components/home';
import Layout from './components/layout';

import './css/style';

class App extends Component {
	render(){
		return (
			<Router>
				<Layout>
					<Switch>
						<Route exact path="/" component={Home} />
	      				<Route exact path="/result" component={Result} />
	      				<Route path="/:any" component={Home}/>
	      				<Route component={Home}/>
	      			</Switch>
				</Layout>
			</Router>
		)
	}
}

ReactDOM.render(<App />, document.querySelector('#container'));