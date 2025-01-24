import React, { useState } from 'react'
import styles from 'styles/adminPage.module.css'
import { Outlet, useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'

const AdminPage = () => {
  // const popupForm = useRef();
  // const { data: users, isLoading } = getApi({
  //   key: ['users'],
  //   path: '/users'
  // })
  const navigate = useNavigate();
  const [buttons, setbuttons] = useState([
    {
      id: 0,
      text: 'Пользователи',
      checked: false,
      page: '/users'
    },
    {
      id: 1,
      text: 'Туры',
      checked: true,
      page: '/'
    },
    {
      id: 2,
      text: 'Добавить тур',
      checked: false,
      page: '/'
    },
  ])

  return (
    <div className={styles.main}>
      <div>
        <Outlet />
        <section>
          <h1>АДМИН</h1>
          <ul>
            {buttons.map(btn => (
              <motion.li key={btn.id} className={btn.checked && styles.checked} onClick={e => {
                setbuttons(prevButtons => prevButtons.map(b => 
                  b.id == btn.id ? { ...b, checked: true } : { ...b, checked: false }
                ));
                navigate(btn.page);
              }}>{btn.text}</motion.li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default AdminPage