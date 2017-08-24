import React from 'react';
import notFound from 'images/error-404.png';

const Error404 = ({match}) => {

	return (
		<div className="error-container router-container">
			<img src={notFound} />
			<span>Page Not Found</span>
		</div>
	)
}

export default Error404;