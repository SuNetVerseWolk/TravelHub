import React from "react";
import styles from "styles/users.module.css";
import { motion } from "framer-motion";
import loadStyles from "styles/load.module.css";

export const UserLoading = () => {
  return (
    <div className={`${styles.item} ${loadStyles.loading}`}>
      <div className={styles.title}>
        <h2>Фамилия</h2>
        <p>Имя</p>
        <p>Отчество</p>
      </div>
      <p>Электронная почта</p>
      <p>+7 (000) 000-00-00</p>
      <motion.button
        whileHover={{ background: "#000", color: "#fff" }}
        whileTap={{ background: "#000", color: "#fff" }}
        initial={{ background: "#fff", color: "#000" }}
        transition={{ duration: 0.3 }}
      >
        Подождите...
      </motion.button>
    </div>
  );
};
