import React, { useMemo } from "react";
import styles from "styles/adminPage.module.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";

const AdminPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const buttons = useMemo(() => [
    {
      id: 0,
      text: "Пользователи",
      checked: location.pathname.includes('/user'),
      page: "/users",
    },
    {
      id: 1,
      text: "Туры",
      checked: location.pathname.includes('/tour') || location.pathname === '/',
      page: "/",
    },
    {
      id: 2,
      text: "Добавить тур",
      checked: "/add" === location.pathname,
      page: "/",
    },
  ], [location.pathname]);
  const exit = (e) => {
    localStorage.removeItem("id");
    queryClient.invalidateQueries(["role"]);
    navigate("/");
  };

  return (
    <div className={styles.main}>
      <div>
        <div className={styles.items}>
          <Outlet />
        </div>
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
                onClick={(e) => navigate(btn.page)}
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
