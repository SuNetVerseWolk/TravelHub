import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatPhoneNumber } from "api/formatData";
import { getFormData } from "api/get";
import axios from "axios";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "styles/forms.module.css";
import headerstyles from "styles/header.module.css";

const LogInPopUp = ({ popUpLogIn, setPopUpLogIn }) => {
  const ref = useRef();
  const queryClient = useQueryClient();
  const [data, setData] = useState(getFormData(ref));
  const { mutate } = useMutation({
    mutationFn: (data) => axios.post(`/api/users/logIn`, data),
    onSuccess: (res) => {
      if (res.data.id) {
        localStorage.setItem("id", res.data.id);
        queryClient.invalidateQueries(["user", "role"]);

        setPopUpLogIn(false);
      }
    },
    onError: (res) => {
      switch (res.response.status) {
        case 404:
          ref.current.number.setCustomValidity("Пользователь не найден!");
          ref.current.number.reportValidity();
          break;
        case 403:
          ref.current.password.setCustomValidity("Пароль не верный!");
          ref.current.password.reportValidity();
          break;
      }
    },
  });

  const submit = (e) => {
    e.preventDefault();

    mutate(getFormData(ref));
  };

  const setMissedFill = (e) => {
    if (e.target.value.length <= 0) {
      e.target.setCustomValidity("Вы пропустили это поле.");
      e.target.reportValidity();
    } else e.target.setCustomValidity("");
  };

  return (
    <>
      {popUpLogIn && (
        <div className={styles.containerForm}>
          <div>
            <div
              className={`${styles.exit} ${headerstyles.exit}`}
              onClick={() => setPopUpLogIn(false)}
            ></div>

            <h2>Авторизация</h2>

            <form ref={ref} onSubmit={submit}>
              <input
                id="number"
                name="number"
                type="text"
                placeholder="+7 (000) 000-00-00"
                value={formatPhoneNumber.userFriendly(data.number)}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    number: formatPhoneNumber.dataFriendly(e.target.value) || e.target.value,
                  }));
									setMissedFill(e);
								}}
                required
              />

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Пароль"
                //onChange={e => setData(prev => ({...prev, password: e.target.value}))}
                required
              />

              <Link to="/signUp">Зарегистрироваться</Link>

              <button>Войти</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LogInPopUp;
