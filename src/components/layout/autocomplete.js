import React  from 'react';

const Autocomplete = ({cityAutoData}) => {

	return (
		<div className="search-autocomplete">
			<ul>
			{
				cityAutoData.map(city => {
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
	)
}

export default Autocomplete;