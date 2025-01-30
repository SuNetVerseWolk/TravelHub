import { getUsers } from "api/get";
import React from "react";
import styles from "styles/users.module.css";
import { motion } from "framer-motion";
import formatPhoneNumberForDisplay from "api/formatPhoneNumber";

export const Users = ({ extraStyles }) => {
  const { data: users, refetch } = getUsers();

  return (
    <div className={`${extraStyles} ${styles.main}`}>
      {users?.map((user) => (
        <div key={user.id} className={styles.item}>
					<div className={styles.title}>
						<h2>{user.lastName}</h2>
						<p>{user.name}</p>
						<p>{user.fatherName}</p>
					</div>
          <p>{user.email}</p>
          <p>{formatPhoneNumberForDisplay(user.number)}</p>
          <motion.button
            whileHover={{ background: "#000", color: "#fff" }}
            whileTap={{ background: "#000", color: "#fff" }}
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
