import React from 'react'
import styles from "styles/header.module.css";

const BurgerBtn = ({ setIsOpened }) => {
  return (
    <button onClick={e => setIsOpened(prev => prev ? false : true)} className={styles.burgerContainer}>
      <div className={styles.burgerMenu}></div>
    </button>
  )
}

export default BurgerBtn