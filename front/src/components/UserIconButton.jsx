import React, { useState } from 'react'
import styles from "styles/header.module.css";
import LogIn from 'layouts/LogInPopUp';

const UserIconButton = () => {
  const [popUpLogIn, setPopUpLogIn] = useState(false);

  return (
    <>
      <button className={styles.userIconContainer}
        onClick={() => setPopUpLogIn(true)}>
        <img src="/user.png" alt="" />
      </button>

      {popUpLogIn && <LogIn popUpLogIn={popUpLogIn} setPopUpLogIn={setPopUpLogIn} />}
    </>
  )
}

export default UserIconButton