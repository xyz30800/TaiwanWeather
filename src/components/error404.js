import React, {Component} from 'react';

class Error404 extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const params = new URLSearchParams(this.props.location.search);
		const paramsTown = params.get('town');
		const paramsCity = params.get('city');
		console.log(this.props.location)
		console.log(paramsTown, paramsCity)
	}

	render() {
		return <p>Not Found</p>
	}
}

export default Error404;