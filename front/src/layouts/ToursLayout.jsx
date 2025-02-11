import React, { useMemo } from "react";
import styles from "styles/main.module.css";
import toursStyles from "styles/tours.module.css";
import { Tours } from "./Tours";
import { RelaxTypes } from "api/enums";

const ToursLayout = ({ showAdminPanel }) => {
  return (
    <div id={styles.tours}>
      {!showAdminPanel && (
        <>
          <h2>Сложно определиться?</h2>
          <h5>
            Подберите идеальное направление с помощью фильтра по предпочтениям и
            датам
          </h5>
          <ul>
            {RelaxTypes.map((value, index) => (
              <li key={index}>
                <img src={value.src} alt="" />
                <span>{value.text}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      <h3>Выбор туров</h3>
      <div className={toursStyles.tours}>
        <Tours />
      </div>
    </div>
  );
};

export default ToursLayout;
