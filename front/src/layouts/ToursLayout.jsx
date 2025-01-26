import React, { useMemo } from "react";
import styles from "styles/main.module.css";
import getApi from "api/get";
import toursStyles from "styles/tours.module.css";
import Alert from "components/Alert";
import Tour from "components/Tour";

const ToursLayout = ({ showAdminPanel, extraStyles }) => {
  const {
    data: tours,
    isLoading,
    isError,
  } = getApi({
    key: ["tours"],
    path: "tours",
  });

  const types = useMemo(() => [
		{ text: "Рыбалка", src: "/koi-fish.png" },
		{ text: "Автобусный тур", src: "/school-bus.png" },
		{ text: "Фестивали", src: "/fireworks.png" },
		{ text: "Экскурсионный тур", src: "/bus-tour.png" },
		{ text: "Экскурсия", src: "/government.png" },
		{ text: "В горы", src: "/mountain.png" },
		{ text: "Водная прогулка", src: "/ferry-boat.png" },
		{ text: "Термальные источники", src: "/hot-spring.png" },
		{ text: "Активный тур", src: "/climbing.png" },
		{ text: "На выходные", src: "/sunbathing.png" },
		{ text: "Палатки", src: "/tent.png" },
		{ text: "Гастрономический тур", src: "/citizenship.png" },
		{ text: "Наблюдение за животными", src: "/animal-care.png" },
		{ text: "Винный тур", src: "/drink.png" },
		{ text: "Снегоходы", src: "/snowmobile.png" },
	], []);

  return (
    <div id={styles.tours} className={extraStyles}>
      {!showAdminPanel && (
        <>
          <h2>Сложно определиться?</h2>
          <h5>
            Подберите идеальное направление с помощью фильтра по предпочтениям и
            датам
          </h5>
          <ul>
            {types.map((value, index) => (
              <li key={index}>
                <img src={value.src} alt="" />
                <span>{value.text}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      <h3>Туры</h3>
      <div className={toursStyles.tours}>
        {isLoading ? (
          <Alert>Загрузка...</Alert>
        ) : isError ? (
          <Alert>Что-то пошло не так, или комнат нет</Alert>
        ) : tours?.length <= 0 ? (
          <Alert>Свободных комнат нет!!!</Alert>
        ) : (
          tours?.map((tour) => <Tour key={tour.id} data={tour} />)
        )}
      </div>
    </div>
  );
};

export default ToursLayout;
