import React, { useState } from 'react'
import styles from "styles/header.module.css";
import LogInPopUp from 'layouts/LogInPopUp';

const UserIconButton = () => {
  const [popUpLogIn, setPopUpLogIn] = useState(false);

  return (
    <>
      <button className={styles.userIconContainer}
        onClick={() => setPopUpLogIn(true)}>
        <img src="/user.png" alt="" />
      </button>

      {popUpLogIn && <LogInPopUp popUpLogIn={popUpLogIn} setPopUpLogIn={setPopUpLogIn} />}
    </>
  )
}

export default UserIconButton