import React, {Component}  from 'react';
import { Redirect } from 'react-router-dom';

import cityAllList from '../../../files/city.list.tw.json';

class SearchBar extends Component {

	constructor(props) {
		super(props);

		this.state = {
			cityAutoData: [],
			searchSubmit: false,
			townPara: '',
			cityPara: ''
		}
	}
	componentWillMount() {
		document.querySelector('body').addEventListener('click', () => {
			const autocompleteEl = document.querySelector('.search-autocomplete').style['display'] = 'none';
		})
	}
	showAutocomplete(e) {
		const searchText = e.target.value;
		const autocompleteEl = document.querySelector('.search-autocomplete');

		if (searchText.length === 0) {
			autocompleteEl.style['display'] = 'none';
			return;
		}

		const cityAutoData = cityAllList
		.map(cities => {
			return {
				'name': cities.name,
				'towns': cities.towns
			}
		})
		.map(city => {
			return {
				'city': city.name,
				'towns': city.towns.filter(town => town.name.includes(searchText))
			}
		})
		.filter(city => city.towns.length !== 0)

		if (cityAutoData.length === 0) return;

		autocompleteEl.style['display'] = 'inline-block';

		this.setState({cityAutoData});
	}

	selectText(e) {
		const {town, city} = e.target.dataset;
		document.querySelector('.search-autocomplete').style['display'] = 'none';
		document.querySelector('[name="town"]').value = town;
		// document.querySelector('[name="city"]').value = city;
		this.setState({ townPara: town,  cityPara: city });
	}

	submitForm(e) {
		e.preventDefault();
		this.setState({searchSubmit: true});
	}

	render() {
		return (
			<div className="public-container-search">
				{/*<form action="/result" method="get" onSubmit={e => this.submitForm(e)}>*/}
				<form onSubmit={e => this.submitForm(e)}>
					<label htmlFor ="">輸入鄉市鎮: </label>
					<input type="text" name="town" onKeyUp={e => this.showAutocomplete(e)} required />
					<input type="hidden" name="city" />
					<button type="submit">Search</button>
				</form>
				{
					this.state.searchSubmit && <Redirect to={{
													pathname: '/result',
													search: `?town=${this.state.townPara}&city=${this.state.cityPara}`
												}}/>
		        }
				<div className="search-autocomplete">
					<ul>
					{
						this.state.cityAutoData.map(city => {
							return city.towns.map(town => {
								return (
									<li key={town.name} onClick={e => this.selectText(e)} data-town={town.name} data-city={city.city}>
										<span className="town" data-town={town.name} data-city={city.city}>{town.name}</span> / 
										<span className="city" data-town={town.name} data-city={city.city}>{city.city}</span>
									</li>
								)
							})
						})
					}
					</ul>
				</div>
			</div>
		)
	}
}

export default SearchBar;