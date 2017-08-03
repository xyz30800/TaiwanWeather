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
		const mapApi = new google.maps.Map(document.querySelector('#ss'), {
			zoom: 15,
			center: location
		});

		new google.maps.Marker({
        	position: location,
        	map: mapApi,
        });
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (this.state.loading) {
			this.callGoogleMap(this.state.location)
		}
	}

	componentWillReceiveProps(nextProps) {
		if (isNaN(nextProps.lat)) {
			this.setState({ location: nextProps, loading: false });
		} else {
			this.setState({ location: nextProps, loading: true });
		}
	}

	render() {
		let mapEle = {};
		if (this.state.loading) {
			mapEle = <div id="ss" ref="map" style={{height: '100%'}}/>;	
		} else {
			mapEle = <div className="invalid-map">沒有地圖資料</div>;
		}
		return mapEle;
	}
}

export default LocationMap;