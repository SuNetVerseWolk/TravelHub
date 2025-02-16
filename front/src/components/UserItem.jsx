import React from "react";
import styles from "styles/users.module.css";
import { motion } from "framer-motion";
import { formatPhoneNumber } from "api/formatData";
import { useNavigate } from "react-router-dom";

export const UserItem = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.item}>
      <div className={styles.title}>
        <h2>{user.lastName}</h2>
        <p>{user.name}</p>
        <p>{user.fatherName}</p>
      </div>
      <p>{user.email}</p>
      <p>{formatPhoneNumber.userFriendly(user.number)}</p>
      <motion.button
        whileHover={{ background: "#000", color: "#fff" }}
        whileTap={{ background: "#000", color: "#fff" }}
        initial={{ background: "#fff", color: "#000" }}
        transition={{ duration: 0.3 }}
        onClick={(e) => navigate("/user/" + user.id, { state: { user } })}
      >
        Просмотр
      </motion.button>
    </div>
  );
};
