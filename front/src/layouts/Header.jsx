// import BurgerMenu from 'components/BurgerMenu';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import styles from "styles/header.module.css";
import LogInBtn from 'components/LogInBtn';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import getApi from 'api/get';
import UserBtn from 'components/UserBtn';
import BurgerBtn from 'components/BurgerBtn';
import UserForm from './UserForm';

function Header() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [open, setIsOpened] = useState(false);
  const [openUserForm, setIsOpenedUF] = useState(false);

  const checkWorker = localStorage.getItem('id') != import.meta.env.VITE_WORKER_ID;

  const exit = e => {
    localStorage.removeItem('id')
    queryClient.setQueryData(['user'], {});
    setIsOpenedUF(false);
    navigate('/logIn', {replace: true})
  }

  return (
    <>
      <UserForm openUserForm={openUserForm} setIsOpenedUF={setIsOpenedUF}/>

      <header className={!checkWorker && styles.headerBlack}>
        {open && (
          <div className={styles.popup}>
            <UserBtn setIsOpened={setIsOpened} setIsOpenedUF={setIsOpenedUF} />
          </div>
        )}
        <div className={styles.container}>
          <a href='' to=''><div className={styles.logo}></div></a>

          {checkWorker ? (
            <>
              <UserBtn setIsOpenedUF={setIsOpenedUF} />
              <BurgerBtn setIsOpened={setIsOpened} />
            </>
          ) : (
            <button className={styles.exit} onClick={exit}>Выйти</button>
          )}
        </div>
      </header>
    </>
  )
}

export default Header