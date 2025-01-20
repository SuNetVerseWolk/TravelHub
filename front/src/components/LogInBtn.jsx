import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "styles/header.module.css";

const LogInBtn = () => {
  const navigate = useNavigate();

  return (
    <button className={styles.buttonAccount} onClick={e => navigate('/logIn')}>Войти</button>
  )
}

export default LogInBtn