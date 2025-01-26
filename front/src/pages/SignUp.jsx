import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "styles/forms.module.css";

const SignUp = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const ref = useRef();
  const { mutate } = useMutation({
    mutationFn: (data) => axios.post(`/api/users/signUp`, data),
    onSuccess: (res) => {
      localStorage.setItem("id", res.data.id);
      queryClient.invalidateQueries(["user"]);
      navigate("..");
    },
    onError: (res) => {
      switch (res.response.status) {
        case 403:
          ref.current.lastName.setCustomValidity("Пользователь уже имеется!");
          ref.current.lastName.reportValidity();
          break;
        case 500:
          ref.current.lastName.setCustomValidity("Что-то пошло не так...");
          ref.current.lastName.reportValidity();
          break;
      }
    },
  });

  const submit = (e) => {
    e.preventDefault();
    queryClient.invalidateQueries(["user"]);
    mutate(Object.fromEntries(new FormData(e.target).entries()));
  };

  const setMissedFill = (e) => {
    if (e.target.value.length <= 0) {
      e.target.setCustomValidity("Вы пропустили это поле.");
      e.target.reportValidity();
    } else e.target.setCustomValidity("");
  };

  return (
    <div className={styles.containerForm}>
      <div id={styles.signUp}>
        <h2>Регистрация</h2>

        <img id={styles.i1} src="/woowNature.jpg" alt="" />

        <form ref={ref} onSubmit={submit}>
          <div>
            <div>
              <input
                id="lastName"
                placeholder="Фамилия"
                onChange={setMissedFill}
                name="lastName"
                type="text"
                required
              />

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Имя"
                required
              />

              <input
                id="fatherName"
                name="fatherName"
                type="text"
                placeholder="Отчество"
                required
              />
            </div>
            <div>
              <input
                id="number"
                name="number"
                type="tel"
                placeholder="Номер"
                required
              />

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
              />

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Пароль"
                required
              />
            </div>
          </div>
          <button>Зарегистрироваться</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
