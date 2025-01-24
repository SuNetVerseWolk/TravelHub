import React from 'react'
import styles from 'styles/filter.module.css'
import Filter from './Filter';

const HomeTitle = () => {
  return (
    <>
        <div className={styles.filterContainer}>
            <div>
                <div className={styles.picture}></div>

                <h3>Ищите и бронируйте туры куда хотите!</h3>

                <p>Наша цель — сделать ваши приключения незабываемыми, предлагая широкий спектр услуг, которые помогут вам открыть новые горизонты и насладиться каждой минутой вашего путешествия.</p>

                <Filter/>
            </div>
        </div>
    </>
  )
}

export default HomeTitle