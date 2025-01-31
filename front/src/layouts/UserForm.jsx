import { useMutation, useQueryClient } from '@tanstack/react-query';
import getApi from 'api/get';
import axios from 'axios';
import React, { useRef } from 'react'
import styles from 'styles/forms.module.css'
import headerstyles from "styles/header.module.css";

const UserForm = ({ popUpUserForm, setPopUpUserForm }) => {
  const formRef = useRef();
  const getFormData = (e) => Object.fromEntries(new FormData(formRef.current).entries());
  const queryClient = useQueryClient();
  const { data: user } = getApi({
    key: ["user"],
    path: "/users/" + localStorage.getItem("id"),
  });

  const exit = e => {
    localStorage.removeItem('id')
		queryClient.setQueryData(['user'], {})
    queryClient.invalidateQueries(['user', 'role']);
    setPopUpUserForm(false);
  }
  
  const { mutate: deleteUser } = useMutation({
    mutationFn: e => axios.delete('/api/users/' + localStorage.getItem('id')),
    onSuccess: res => {
      queryClient.invalidateQueries(['rooms']);
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
        popUpUserForm && (
          <div className={styles.userPopupForm}>
            <form ref={formRef} onSubmit={e => {
              e.preventDefault();
              changeUserData(Object.fromEntries(new FormData(e.target).entries()))
            }}>
              <button
                onClick={(e) => setPopUpUserForm(false)}
                className={`${styles.exit} ${headerstyles.exit}`}
              ></button>
              <h3>Данные клиента</h3>

              <input id='lastName' name='lastName' type="text" defaultValue={user?.lastName} required />
              
              <input id='name' name='name' type="text" defaultValue={user?.name} required />

              <input id='fatherName' name='fatherName' defaultValue={user?.lastName} type="text" required />
              
              <input id='email' name='email' type="text" defaultValue={user?.email} required />
              
              <input id='number' name='number' type="tel" defaultValue={user?.number}  required />
              
              <input id='password' name='password' defaultValue={user?.password}  required />
              
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