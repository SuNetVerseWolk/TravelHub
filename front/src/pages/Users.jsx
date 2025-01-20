import Header from 'layouts/Header'
import React, { useRef } from 'react'
import { roomLayout } from 'styles/roomLayout.module.css'
import main from 'styles/main.module.css'
import getApi from 'api/get'
import style from 'styles/main.module.css'
import ToursLayout from 'layouts/ToursLayout'
import BookForm from 'layouts/BookForm'

const Users = () => {
  const popupForm = useRef();
  const { data: users, isLoading } = getApi({
    key: ['users'],
    path: '/users'
  })

  return (
    <>
      <BookForm popupForm={popupForm} />
      <Header/>
      <main className={style.main}>
        <div id={main.rooms} className={roomLayout}>
          <div id={main.booked}>
            <h2>Варианты номеров</h2>
            <ToursLayout isBlack={true} popupForm={popupForm} />
          </div>

          {isLoading ? (
            <Alert children={'Загрузка...'} />
          ) : (
            users.map(user => {
              const hasBooked = user.bookedRooms?.length > 0;

              return hasBooked && (<>
                <h2>{user.number}</h2>
                {/* <BookedRooms bookedRooms={user.bookedRooms} userID={user.id} /> */}
              </>)
            })
          )}
        </div>
      </main>
    </>
  )
}

export default Users