import React from 'react'
import main from 'styles/main.module.css'
import getApi from 'api/get'
import style from 'components/Tour'
import Alert from 'components/Alert'
import Tour from 'components/Tour'

const ToursLayout = ({ popupForm }) => {
  // const { data: user, isUserLoading } = getApi({
  //   key: ['user'],
  //   path: '/users/' + localStorage.getItem('id')
  // });

  const { data: rooms, isLoading, isError } = getApi({
      key: ['rooms'],
      path: 'rooms'
  });

  return (
    <div id={main.rooms}>
      <h2>Варианты номеров</h2>
      <div className={style.tours}>
        {isLoading ? (
          <Alert>Загрузка...</Alert>
        ) : isError ? (
          <Alert>Что-то пошло не так, или комнат нет</Alert>
        ) : rooms?.length <= 0 ? (
          <Alert>Свободных комнат нет!!!</Alert>
        ) : (
          rooms?.map(room => <Tour popupForm={popupForm} key={room.id} {...room} />)
        )}
      </div>
    </div>
  )
}

export default ToursLayout