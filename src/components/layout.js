import React, {Component}  from 'react';
import { Link } from 'react-router-dom';

import SearchBar from 'components/layout/search_bar';

const Layout = ({children}) => {
	
	return (
		<div className="content">
			<div className="container public-container">
				<div className="public-container-header">
					<h1><Link to="/" replace>台灣地區天氣資訊</Link></h1>
				</div>
				<SearchBar />
			</div>
			{children}
		</div>
	)
}

export default Layout;