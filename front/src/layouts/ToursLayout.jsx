import React, { useMemo } from "react";
import styles from "styles/main.module.css";
import toursStyles from "styles/tours.module.css";
import { Tours } from "./Tours";

const ToursLayout = ({ showAdminPanel }) => {
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
    <div id={styles.tours}>
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
        <Tours />
      </div>
    </div>
  );
};

export default ToursLayout;
