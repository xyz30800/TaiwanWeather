import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Home from 'components/home';
import Result from 'components/result';
import Layout from 'components/layout';
import Error404 from 'components/error404';

import 'style/style';

class App extends Component {
	render(){
		return (
			<HashRouter>
  				<Layout>
  					<Switch>
  						<Route exact path="/" component={Home} />
  						<Route path="/result" component={Result} />
	      				<Route path="/:any" component={Error404}/>
	      				<Route component={Home}/>
  					</Switch>
  				</Layout>
			</HashRouter>
		)
	}
}

ReactDOM.render(<App />, document.querySelector('#container'));