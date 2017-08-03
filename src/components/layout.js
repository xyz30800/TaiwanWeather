import React, {Component}  from 'react';

import SearchBar from './layout/search_bar';

import cityAllList from '../../files/city.list.tw.json';

const Layout = ({children}) => {
	
	return (
		<div className="content">
			<div className="container public-container">
				<div className="public-container-header">
					<h1><a href="/">台灣地區天氣資訊</a></h1>
				</div>
				<SearchBar />
			</div>
			{children}
		</div>
	)
}

export default Layout;