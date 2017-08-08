import React, {Component}  from 'react';
import {ResponsiveContainer, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import CustomizeTooltip from 'components/result/tooltip';

const ResultBar = ({histories}) => {
	
	const historiesDataLen = Object.keys(histories).length;
	if (historiesDataLen === 0) return null;

	const barData = histories.weather.map(record => {
		return {
			time: record.time,
			humidity: record.humidity,
			rainfall: record.rainfall,
			temp: record.temperature
		}
	});

	return (
		<div className="search-container-cityBar">
			<div className="search-container-cityBar-header">
				<h2>過去數據</h2>
			</div>
			<div className="search-container-cityBar-lineChart">
				<ResponsiveContainer>
				    <ComposedChart width={600} height={400} data={barData} margin={{top: 0, right: 0, bottom: 0, left: 0}}>
				        <XAxis dataKey="time" stroke="#EEEEEE" fillOpacity="0.7" />
				        <YAxis hide={true} />
				        <Tooltip content={<CustomizeTooltip data={barData} town={histories.town} cursor={{fill: 'red', fillOpacity: 1}} />} />
				        <Legend wrapperStyle={{ color: '#EEEEEE', opacity: 0.7, padding: '12px' }} />
				        <CartesianGrid stroke="#8c8c8c" fillOpacity="0.1" />
				        <Area dataKey="humidity" name="濕度" unit="%" type="monotone" fill="#303841"stroke="#000000" fillOpacity="0.7" activeDot={{ stroke: '#000000', strokeWidth: 2, fillOpacity: 0.7 }} />
				        <Bar dataKey="rainfall" name="雨量" unit="mm" barSize={12} fill="#00939a" fillOpacity="0.7" />
				        <Line dataKey="temp" name="溫度" unit="°C" type="monotone" stroke="#FF5722" fillOpacity="0.7" activeDot={{ stroke: '#FF5722', strokeWidth: 2, fillOpacity: 0.7 }} dot={false}/>
				    </ComposedChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

export default ResultBar;