import React, {Component}  from 'react';
import {ResponsiveContainer, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import CustomizeTooltip from './tooltip';

const ResultBar = ({histories}) => {
	
	const historiesDataLen = Object.keys(histories).length;
	if (historiesDataLen === 0) return null;

	const barData = histories.map(record => {
		return {
			time: record.time,
			humidity: record.humidity,
			rainfall: record.rainfall,
			temp: record.temperature
		}
	});

	const data = [
			{time: '16:36', temp: 110, rainfall: 20, humidity: 70 },
			{time: '17:36', temp: 620, rainfall: 110, humidity: 16 },
			{time: '18:36', temp: 110, rainfall: 720, humidity: 99 },
			{time: '19:36', temp: 720, rainfall: 120, humidity: 28 },
			{time: '20:36', temp: 120, rainfall: 1120, humidity: 11 },
			{time: '21:36', temp: 220, rainfall: 120, humidity: 10 },
			{time: '22:36', temp: 320, rainfall: 160, humidity: 10 },
			{time: '23:36', temp: 110, rainfall: 120, humidity: 6 },
			{time: '24:36', temp: 120, rainfall: 720, humidity: 99 },
			{time: '01:36', temp: 120, rainfall: 20, humidity: 28 },
			{time: '02:36', temp: 110, rainfall: 20, humidity: 10 },
			{time: '03:36', temp: 88, rainfall: 99, humidity: 10 }
		];

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
				        <Tooltip content={<CustomizeTooltip data={barData} cursor={{fill: 'red', fillOpacity: 1}} />} />
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