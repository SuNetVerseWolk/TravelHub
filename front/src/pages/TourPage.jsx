import React from 'react';
import { useLocation } from 'react-router-dom';

export const TourPage = () => {
  const location = useLocation();
  const { tour } = location.state || {};

  return (
    <div>
			{tour ? (
        <div>
          <h1>tour Details</h1>
					{Object.keys(tour).map((key, i) => typeof tour[key] != 'object' && <p key={i}>{key}: {tour[key]}</p>)}
        </div>
      ) : (
        <p>No tour data available.</p>
      )}
		</div>
  )
}
