import React from 'react'
import styles from 'styles/filter.module.css'

const Filter = () => {
  return (
    <>
        <div className={styles.filterContainer}>
            <div>
                <div className={styles.picture}></div>

                <h3>Ищите и бронируйте туры куда хотите!</h3>

                <p>Наша цель — сделать ваши приключения незабываемыми, предлагая широкий спектр услуг, которые помогут вам открыть новые горизонты и насладиться каждой минутой вашего путешествия.</p>

                <form>
                    <input id='from' type="text" placeholder='Откуда' />
                    <input id='where' type="text" placeholder='Куда' />
                    <input id='dateLeaving' type="date" value={'Дата вылета'}/>
                    <input id='nights' type="number" placeholder='Ночей' />
                    <input id='countAdults' type="number" placeholder='Кол-во взрослых' />
                    <input id='countChildren' type="number" placeholder='Кол-во детей' />

                    <button className={styles.buttonFind}>Найти</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Filter