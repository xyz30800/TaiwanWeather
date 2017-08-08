import React, {Component}  from 'react';

const CustomizeTooltip = ({payload, label, town}) => {

	if (payload.length === 0) { return null }
	
	const [rain, humidity, temp] = payload;
	
	return (
		<div className="customizeTooltip">
			<h2>{town}</h2>
			<h2>{label}</h2>
			<span style={{color: rain.fill}} >{rain.name}: {rain.value} {rain.unit}</span>
			<span style={{color: temp.stroke}} >{temp.name}: {temp.value} {temp.unit}</span>
			<span style={{color: humidity.fill}} >{humidity.name}: {humidity.value} {humidity.unit}</span>
		</div>
	)
}

export default CustomizeTooltip;