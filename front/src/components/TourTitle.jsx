import React from 'react'

export const TourTitle = ({location, title}) => {
  return (
    <div>
			<p>{location}</p>
			<h4>{title}</h4>
		</div>
  )
}
