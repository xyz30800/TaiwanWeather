import React, {Component} from 'react';

const Autocomplete = ({cityAutoData, selectTextCB, onMouseOverCB}) => {
	
	return (
		<div className="search-autocomplete" id="autocomplete">
			<ul>
			{
				cityAutoData.map((item) => {
					return (
						<li key={`${item.city}-${item.town}`} onClick={selectTextCB} data-town={item.town} data-city={item.city} onMouseOver={onMouseOverCB} >
							<span className="town">{item.town}</span> / 
							<span className="city">{item.city}</span>
						</li>
					)
				})
			}
			</ul>
		</div>
	)
}

export default Autocomplete;