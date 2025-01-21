import React, { useState } from "react";
import styles from "styles/tourTypes.module.css";
import { motion } from "framer-motion";

export const TourTypes = ({ types }) => {
  const [isHidden, setHidden] = useState(true);

  return (
    <ul className={styles.main}>
      {isHidden ? (
        <>
          <li>{types[0]}</li>
          <li onClick={() => setHidden(false)}>&gt;</li>
        </>
      ) : (
        <>
          {types.map((value, id) => (
            <motion.li key={id} initial={{scale: id === 0 ? 1 : .7}} animate={{scale: 1, transition: {delay: .01 * id}}}>{value}</motion.li>
          ))}
          <li onClick={() => setHidden(true)}>X</li>
        </>
      )}
    </ul>
  );
};
