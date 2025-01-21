import React, { useMemo } from 'react'

export const TourInfo = ({dates, duration}) => {
	const getDate = (date) => {
		const [day, month, year] = date.split('–')[0].trim().slice(0, 10).split('.');
		const dateObject = new Date(`${year}-${month}-${day}`);
		return dateObject.toLocaleString('ru', { month: 'short', day: 'numeric'});
	}
	const date = useMemo(() => getDate(dates[0].date), []);

  return (
    <div>
			<ul>
				<li>{date}</li>
				<li>ещё даты</li>
				<li>{duration.split('/')[0].trim()}</li>
			</ul>
			<button>от <span>{dates[0].price.toLocaleString('ru')}</span> руб.</button>
		</div>
  )
}
