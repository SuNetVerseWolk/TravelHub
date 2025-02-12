import React, { useState } from "react";
import styles from "styles/main.module.css";
import toursStyles from "styles/tours.module.css";
import { Tours } from "./Tours";
import { RelaxTypes } from "api/enums";
import { motion } from "framer-motion";

const ToursLayout = ({ showAdminPanel, extraFilters }) => {
  const [filters, setFilters] = useState([]);

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
              <motion.li
                key={index}
                className={filters.includes(value.text) ? styles.active : ""}
                whileTap={{ scale: filters.includes(value.text) ? .97 : 1.03 }}
                onClick={(e) =>
                  setFilters((prev) =>
                    prev.includes(value.text)
                      ? prev.filter((text) => text != value.text)
                      : [...prev, value.text]
                  )
                }
              >
                <img src={value.src} alt="" />
                <span>{value.text}</span>
              </motion.li>
            ))}
          </ul>
        </>
      )}
      <h3>Выбор туров</h3>
      <div className={toursStyles.tours}>
        <Tours filters={filters} extraFilters={extraFilters} />
      </div>
    </div>
  );
};

export default ToursLayout;
