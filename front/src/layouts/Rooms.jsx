import React, { useMemo, useRef } from 'react'
import Alert from 'components/Alert';
import getApi from 'api/get';
import Room from 'components/Room';
import style from 'styles/rooms.module.css'
import booked from 'styles/bookedRooms.module.css'

const Rooms = ({ isBlack, popupForm }) => {
  const roomContainer = useRef();

  const { data: rooms, isLoading, isError} = getApi({
    key: ['rooms'],
    path: 'rooms'
  })

  return (
    <div className={style.rooms}>
      {isLoading ? (
        <Alert>Загрузка...</Alert>
      ) : isError ? (
        <Alert>Что-то пошло не так, или комнат нет</Alert>
      ) : rooms?.length <= 0 ? (
        <Alert>Свободных комнат нет!!!</Alert>
      ) : (
        <>
          <button className={`${style.left} ${isBlack && booked.arrow}`} onClick={e => {
            const scrollEl = roomContainer.current;
            scrollEl.scrollTo({ behavior: 'smooth', left: scrollEl.scrollLeft - scrollEl.children[0].offsetWidth});
          }}>{'<'}</button>
          <div ref={roomContainer}>
            {rooms?.map(room => <Room black={isBlack && booked.room} popupForm={popupForm} key={room.id} {...room} />)}
          </div>
          <button className={`${style.right} ${isBlack && booked.arrow}`} onClick={e => {
            const scrollEl = roomContainer.current;
            scrollEl.scrollTo({ behavior: 'smooth', left: scrollEl.scrollLeft + scrollEl.children[0].offsetWidth});
          }}>{'>'}</button>
        </>
      )}
    </div>
  )
}

export default Rooms