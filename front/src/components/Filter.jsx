import React, { useEffect, useState } from 'react'
import styles from 'styles/filter.module.css'

const Filter = () => {
  const [startDateInput, setStartDateInput] = useState();
  const [endDateInput, setEndDateInput] = useState();

  const convertToShortDate = (date) => date ? new Date(date).toLocaleString('ru', {month: 'short', day: 'numeric'}) : '';
  const getDateFrom2day = (number = 0) => {
    let today = new Date();
    today.setDate(new Date().getDate() + number);

    return today.toLocaleString('ru', {month: 'short', day: 'numeric'});
  }

  useEffect(() => {
    setStartDateInput(document.getElementById('startDateInput'));
    setEndDateInput(document.getElementById('endDateInput'));
  }, []);

  return (
    <form>
			<input id='from' type="text" placeholder='Откуда' />
			<input id='where' type="text" placeholder='Куда' />

			<div className={styles.dates}>
				<button type='button' onClick={e => startDateInput.showPicker()}>
					С <span>
						{startDateInput?.value ? convertToShortDate(startDateInput?.value) : getDateFrom2day()}
					</span>
					<input
						id='startDateInput'
						type='date'
						onChange={(e) => setStartDate(e.target.value)}
						style={{width: 0, padding: 0, margin: 0}}
					/>
				</button>
				/
				<button type='button' onClick={e => endDateInput.showPicker()}>
					По <span>{endDateInput?.value ? convertToShortDate(endDateInput?.value) : getDateFrom2day(1) }</span>
					<input
						id='endDateInput'
						type='date'
						onChange={(e) => setEndDate(e.target.value)}
						style={{width: 0, padding: 0, margin: 0}}
					/>
				</button>
			</div>

			<input id='countAdults' type="number" placeholder='Кол-во взрослых' />
			<input id='countChildren' type="number" placeholder='Кол-во детей' />

			<button className={styles.buttonFind}>
				Найти
				<div className={styles.loupe}>
					<img src='/loupe.png' />
				</div>
			</button>
    </form>
  )
}

export default Filter