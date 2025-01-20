import { useMutation, useQueryClient } from '@tanstack/react-query';
import getApi from 'api/get';
import axios from 'axios';
import React, { useRef } from 'react'
import styles from 'styles/forms.module.css'

const UserForm = ({ openUserForm, setIsOpenedUF }) => {
  const useClient = useQueryClient();
  const formRef = useRef();
  const getFormData = (e) => Object.fromEntries(new FormData(formRef.current).entries());
  const queryClient = useQueryClient();
  const { data: user } = getApi({
    key: ["user"],
    path: "/users/" + localStorage.getItem("id"),
  });

  const exit = e => {
    localStorage.removeItem('id')
    queryClient.setQueryData(['user'], {});
    setIsOpenedUF(false);
  }
  
  const { mutate: deleteUser } = useMutation({
    mutationFn: e => axios.delete('/api/users/' + localStorage.getItem('id')),
    onSuccess: res => {
      useClient.invalidateQueries(['rooms']);
      exit()
    }
  })
  const { mutate: changeUserData } = useMutation({
    mutationFn: data => axios.post('/api/users/' + localStorage.getItem('id'), data),
    onSuccess: res => {
      queryClient.setQueryData(['user'], { ...queryClient.getQueryData(['user']), ...getFormData()});
    }
  })

  return (
    <>
      {
        openUserForm && (
          <div className={styles.userPopupForm}>
            <button
              onClick={(e) => setIsOpenedUF(false)}
              className={styles.close}
            ></button>

            <form ref={formRef} onSubmit={e => {
              e.preventDefault();
              changeUserData(Object.fromEntries(new FormData(e.target).entries()))
            }}>
              <h2>Данные клиента</h2>

              <label htmlFor="lastName">
                Фамилия:
                <input id='lastName' name='lastName' type="text" defaultValue={user?.lastName} required />
              </label>
              <label htmlFor="name">
                Имя:
                <input id='name' name='name' type="text" defaultValue={user?.name} required />
              </label>
              <label htmlFor="fatherName">
                Отчество:
                <input id='fatherName' name='fatherName' defaultValue={user?.lastName} type="text" required />
              </label>
              <label htmlFor="email">
                Email:
                <input id='email' name='email' type="text" defaultValue={user?.email} required />
              </label>
              <label htmlFor="number">
                Номер:
                <input id='number' name='number' type="tel" defaultValue={user?.number}  required />
              </label>
              <label htmlFor="password">
                Пароль:
                <input id='password' name='password' defaultValue={user?.password}  required />
              </label>
      
              <button type='submit'>Изменить</button>
              <button onClick={e => exit()}>Выйти</button>
              <button onClick={e => deleteUser()}>Удалить</button>
            </form>
          </div>
        )
      }
    </>
  )
}

export default UserForm