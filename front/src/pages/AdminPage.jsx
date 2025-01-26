import React, { useState } from "react";
import styles from "styles/adminPage.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";

const AdminPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [buttons, setbuttons] = useState([
    {
      id: 0,
      text: "Пользователи",
      checked: false,
      page: "/users",
    },
    {
      id: 1,
      text: "Туры",
      checked: true,
      page: "/",
    },
    {
      id: 2,
      text: "Добавить тур",
      checked: false,
      page: "/",
    },
  ]);
  const exit = (e) => {
    localStorage.removeItem("id");
    queryClient.invalidateQueries(["role"]);
  };

  return (
    <div className={styles.main}>
      <div>
        <Outlet />
        <section>
          <div>
            <h1>АДМИН</h1>
            <button onClick={exit}>Выйти</button>
          </div>
          <ul>
            {buttons.map((btn) => (
              <motion.li
                key={btn.id}
                className={btn.checked && styles.checked}
                onClick={(e) => {
                  setbuttons((prevButtons) =>
                    prevButtons.map((b) =>
                      b.id == btn.id
                        ? { ...b, checked: true }
                        : { ...b, checked: false }
                    )
                  );
                  navigate(btn.page);
                }}
              >
                {btn.text}
              </motion.li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
