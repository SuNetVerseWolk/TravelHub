import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from 'styles/forms.module.css'

const LogIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: data => axios.post(`/api/users/logIn`, data),
    onSuccess: res => {
      if (res.data.id) {
        localStorage.setItem('id', res.data.id);
        queryClient.invalidateQueries(['user']);
        navigate('..');
      }
    },
    onError: res => {
      switch (res.response.status) {
        case 404:
          ref.current.number.setCustomValidity('Пользователь не найден!');
          ref.current.number.reportValidity();
          break;
        case 403:
          ref.current.password.setCustomValidity('Пароль не верный!');
          ref.current.password.reportValidity();
          break;
      }
    }
  })
  const ref = useRef();

  const submit = e => {
    e.preventDefault();

    mutate(Object.fromEntries(new FormData(e.target).entries()));
  }

  const setMissedFill = e => {
    if (e.target.value.length <= 0) {
      e.target.setCustomValidity('Вы пропустили это поле.');
      e.target.reportValidity();
    }
    else e.target.setCustomValidity('');
  }

  return (
    <div className={styles.containerForm}>
       <div>
          <img id={styles.i1} src="apart8.jpg" alt="..." />
          <img id={styles.i2} src="apart10.jpg" alt="..." />

          <h2>Авторизация</h2>

          <form ref={ref} onSubmit={submit}>
            <label htmlFor="number">
              Номер:
              <input id='number' name='number' type="text" onChange={setMissedFill} required />
            </label>
            <label htmlFor="password">
              Пароль:
              <input id='password' name='password' type="password" onChange={setMissedFill} required />
            </label>

            <Link to='/signUp'>Зарегистрироваться</Link>
            
            <button>Войти</button>
          </form>
       </div>
    </div>
  )
}

export default LogIn