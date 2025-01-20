import React from 'react'
import styles from 'styles/filter.module.css'

const Filter = () => {
  return (
    <>
        <div className={styles.filterContainer}>
            <div>
                <h3>Ищите и бронируйте туры куда хотите!</h3>

                <form>
                    <input id='from' type="text" />
                    <input id='where' type="text" />
                    <input id='dateLeaving' type="date" />
                    <input id='nights' type="number" />
                    <input id='countAdults' type="number" />
                    <input id='countChildren' type="number" />

                    <button className={styles.buttonFind}>Найти</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Filter