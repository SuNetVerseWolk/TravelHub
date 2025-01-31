import React, { useEffect, useState } from 'react';
import styles from 'styles/filter.module.css';

const Filter = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const convertToShortDate = (date) => 
    date ? new Date(date).toLocaleString('ru', { month: 'short', day: 'numeric' }) : '';
  
  const getDateFrom2day = (number = 0) => {
    let today = new Date();
    today.setDate(today.getDate() + number);
	
    return today.toLocaleString('ru', { month: 'short', day: 'numeric' });
  };

  return (
    <form>
      <input id='from' type="text" placeholder='Откуда' />
      <input id='where' type="text" placeholder='Куда' />

      <div className={styles.dates}>
        <button type='button' onClick={() => document.getElementById('startDateInput').showPicker()}>
          С <span>
            {startDate ? convertToShortDate(startDate) : getDateFrom2day()}
          </span>
          <input
            id='startDateInput'
            type='date'
            onChange={(e) => setStartDate(e.target.value)}
            style={{ width: 0, padding: 0, margin: 0 }}
          />
        </button>
        /
        <button type='button' onClick={() => document.getElementById('endDateInput').showPicker()}>
          По <span>
            {endDate ? convertToShortDate(endDate) : getDateFrom2day(1)}
          </span>
          <input
            id='endDateInput'
            type='date'
            onChange={(e) => setEndDate(e.target.value)}
            style={{ width: 0, padding: 0, margin: 0 }}
          />
        </button>
      </div>

      <input id='countAdults' type="number" placeholder='Кол-во взрослых' />
      <input id='countChildren' type="number" placeholder='Кол-во детей' />

      <button className={styles.buttonFind}>
        Найти
        <div className={styles.loupe}>
          <img src='/loupe.png' alt="Search Icon" />
        </div>
      </button>
    </form>
  );
};

export default Filter;