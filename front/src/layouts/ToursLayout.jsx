import React, { useMemo } from 'react'
import styles from 'styles/main.module.css'
import getApi from 'api/get'
import toursStyles from 'styles/tours.module.css'
import Alert from 'components/Alert'
import Tour from 'components/Tour'

const ToursLayout = ({ popupForm }) => {
  // const { data: user, isUserLoading } = getApi({
  //   key: ['user'],
  //   path: '/users/' + localStorage.getItem('id')
  // });

  const { data: tours, isLoading, isError } = getApi({
      key: ['tours'],
      path: 'tours'
  });
  const types = useMemo(() => [
    {text: 'Рыбалка', src: '/'},
    {text: 'Автобусный тур', src: '/'},
    {text: 'Фестивали', src: '/'},
    {text: 'Экскурсионный тур', src: '/'},
    {text: 'Экскурсия', src: '/'},
    {text: 'В горы', src: '/'},
    {text: 'Водная прогулка', src: '/'},
    {text: 'Термальные источники', src: '/'},
    {text: 'Активный тур', src: '/'},
    {text: 'На выходные', src: '/'},
    {text: 'Палатки', src: '/'},
    {text: 'Гастрономический тур', src: '/'},
    {text: 'Наблюдение за животными', src: '/'},
    {text: 'Винный тур', src: '/'},
    {text: 'Снегоходы', src: '/'},
  ], []);

  return (
    <div id={styles.tours}>
      <h2>Сложно определиться?</h2>
      <h5>Подберите идеальное направление с помощью фильтра по предпочтениям и датам</h5>
      <ul>
        {types.map((value, index) => (
          <li>
            <img src={value.src} alt="" />
            <span>{value.text}</span>
          </li>
        ))}
      </ul>
      <h3>Туры</h3>
      <div className={toursStyles.tours}>
        {isLoading ? (
          <Alert>Загрузка...</Alert>
        ) : isError ? (
          <Alert>Что-то пошло не так, или комнат нет</Alert>
        ) : tours?.length <= 0 ? (
          <Alert>Свободных комнат нет!!!</Alert>
        ) : (
          tours?.map(tour => <Tour key={tour.id} data={tour} />)
        )}
      </div>
    </div>
  )
}

export default ToursLayout