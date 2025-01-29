import { getUsers } from "api/get";
import React from "react";
import styles from "styles/users.module.css";
import { motion } from "framer-motion";

export const Users = ({ extraStyles }) => {
  const { data: users, refetch } = getUsers();

  return (
    <div className={`${extraStyles} ${styles.main}`}>
      {users?.map((user) => (
        <div key={user.id} className={styles.item}>
          <h2>{user.name}</h2>
          <p>{user.lastName}</p>
          <p>{user.fatherName}</p>
          <p>{user.email}</p>
          <p>{user.number}</p>
          <motion.button
            whileHover={{ background: "#000", color: "#fff" }}
            initial={{ background: "#fff", color: "#000" }}
						transition={{ duration: .3 }}
          >
            Редактировать
          </motion.button>
        </div>
      ))}
    </div>
  );
};
