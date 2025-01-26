import LogIn from 'layouts/LogInPopUp';
import React, { useState } from 'react'
import styles from "styles/header.module.css";

const LogInBtn = () => {
  // const navigate = useNavigate();
  const [popUpLogIn, setPopUpLogIn] = useState(false);

  return (
    <>
      <button className={styles.buttonAccount} onClick={() => setPopUpLogIn(true)} ><div className={styles.user}><img src='/user.png'></img></div>Личный кабинет</button>

      {popUpLogIn && <LogIn popUpLogIn={popUpLogIn} setPopUpLogIn={setPopUpLogIn} />}
    </>
  )
}

export default LogInBtn