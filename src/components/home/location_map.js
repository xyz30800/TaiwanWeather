import React, {Component} from 'react';

class LocationMap extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			location: {},
			loading: false
		};

		this.callGoogleMap = this.callGoogleMap.bind(this);
	}

	callGoogleMap(location) {
		const mapApi = new google.maps.Map(document.querySelector('#mapEl'), {
			zoom: 15,
			center: location
		});

		new google.maps.Marker({
        	position: location,
        	map: mapApi,
        });
	}

	shouldComponentUpdate(nextProps) {
		return this.props.lat != nextProps.lat;
	}
	
	componentDidUpdate(prevProps, prevState) {
		this.state.loading && this.callGoogleMap(this.state.location);
	}

	componentWillReceiveProps(nextProps) {
		isNaN(nextProps.lat) ? this.setState({ location: nextProps, loading: false }) : this.setState({ location: nextProps, loading: true });
	}

	render() {
		return (this.state.loading) ? <div id="mapEl" ref="map" style={{height: '100%'}}/> : <div className="invalid-map">沒有地圖資料</div>;
	}
}

export default LocationMap;