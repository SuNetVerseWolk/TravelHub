import LogInPopUp from "layouts/LogInPopUp";
import React, { useState } from "react";
import styles from "styles/header.module.css";

const LogInBtn = ({ value, onClick }) => {
  const [popUpLogIn, setPopUpLogIn] = useState(false);

  return (
    <>
      <button
        className={styles.buttonAccount}
        style={{ "--in": onClick ? "flex" : "none" }}
        onClick={() => (onClick ? onClick() : setPopUpLogIn(true))}
      >
        <div className={styles.user}>
          <img src="/user.png"></img>
        </div>
        {value ? value : "Личный кабинет"}
      </button>

      {popUpLogIn && (
        <LogInPopUp popUpLogIn={popUpLogIn} setPopUpLogIn={setPopUpLogIn} />
      )}
    </>
  );
};

export default LogInBtn;
