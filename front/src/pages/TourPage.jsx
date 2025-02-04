import { Difficulties, Types } from "api/enums";
import useRole from "api/useRole";
import Alert from "components/Alert";
import { DatesUI } from "components/Filter";
import Footer from "layouts/Footer";
import Header from "layouts/Header";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import style from "styles/tourInfo.module.css";

export const TourPage = () => {
  const location = useLocation();
  const { data: role } = useRole();

  const { tour } = location.state || {};

  const [selectedImg, setSelectedImg] = useState();

  return (
    <div>
      {tour ? (
        <>
          {role != "admin" && <Header />}
          <div className={style.mainTourInfo}>
            <div>
              <div className={style.containerImgs}>
                <div>
                  <img
                    src={selectedImg ? `/${tour.imgs[selectedImg]}`: `/${tour.imgs[0]}`}
                    alt={tour.title || "Tour Image"}
                  />
                </div>

                <div>
                  {tour.imgs.map((img, id) => (
                    <img
                      key={id}
                      src={`/${img}`}
                      onClick={() => setSelectedImg(id)}
                      className={`thumnails ${selectedImg === id ? 'active' : ''}`}
                      alt={`Tour Image ${id + 1}`}
                    />
                  ))}
                </div>
              </div>
              {role != "admin" ? (
                <TourInfo tour={tour} />
              ) : (
                <TourInfoAdmin tour={tour} />
              )}
            </div>
            {/* {Object.keys(tour).map((key, i) => typeof tour[key] != 'object' && <p key={i}>{key}: {tour[key]}</p>)} */}
          </div>
        </>
      ) : (
        <p>No tour data available.</p>
      )}
    </div>
  );
};

export const TourInfo = ({ tour }) => {
  console.log(Difficulties[tour.difficulty]);
  return (
    <div>
      <h1>Данные тура</h1>

      <h3>{tour.title}</h3>

      <p>
        Вид тура: {Types[tour.type]}. Сложность -{" "}
        {Difficulties[tour.difficulty]}, разрешение с возроста {tour.ageFrom}
      </p>
      <p>Место проведения: {tour.location}</p>
      <p>Срок проведения: {tour.duration}</p>
      <p>
        Даты:{" "}
        {tour.dates.length > 0
          ? tour.dates.map((date, id) => (
              <span key={id}>
                {`${date.date}. Цена: ${date.price}`}
                {id < tour.dates.length - 1 ? ", " : ""}
              </span>
            ))
          : "Нет доступных дат"}
      </p>

      <h3>Описание</h3>
      <p>{tour.text}</p>

      <button className={style.bookButton}>Забронировать</button>
    </div>
  );
};

export const TourInfoAdmin = ({ tour }) => {
  const [data, setData] = useState(tour);

  const changeData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Данные тура</h1>
      <label className={style.label}>
        <h3>Заголовок</h3>
        <input
          name="title"
          placeholder="Заголовок"
          value={data.title}
          onChange={changeData}
        />
      </label>
      <div className={style.scrollable}>
        <div className={style.itemsBox}>
          <label className={style.label}>
            <select
              name="type"
              id="type"
              value={data.type}
              onChange={changeData}
            >
              {Object.entries(Types).map((item) => (
                <option key={item[0]} value={item[0]}>
                  {item[1]}
                </option>
              ))}
            </select>
          </label>
          <label className={style.label}>
            <select
              name="difficulty"
              id="difficulty"
              value={data.difficulty}
              onChange={changeData}
            >
              {Object.entries(Difficulties).map((item) => (
                <option key={item[0]} value={item[0]}>
                  {item[1]}
                </option>
              ))}
            </select>
          </label>
          <label className={`${style.label} ${style.underline}`}>
            <p>от</p>
            <input
              name="ageFrom"
              type="number"
              placeholder="Минимальный возраст"
              value={data.ageFrom}
              onChange={changeData}
            />
          </label>
        </div>
        <label className={style.label}>
          <p>Место проведения</p>
          <input
            name="location"
            type="text"
            placeholder="Локация"
            value={data.location}
            onChange={changeData}
          />
        </label>
        <label className={style.label}>
          <p>Длительность</p>
          <input
            name="duration"
            type="text"
            placeholder="Длительность"
            value={data.duration}
            onChange={changeData}
          />
        </label>
        <div className={`${style.label} ${style.dateBox}`}>
          <p>Даты</p>
          {data.dates.map((date) => (
            <div key={date.id}>
              <DatesUI />
              <input type="number" placeholder="Стоимость" value={date.price} />
            </div>
          ))}
          <Alert isChildrenText={false}>
            <button className={style.bookButton}>Добавить дату</button>
          </Alert>
        </div>
        <label>
          <h3>Описание</h3>
          <textarea name="text" id="text" rows={5} onChange={changeData}>
            {data.text}
          </textarea>
        </label>
        <Alert isChildrenText={false}>
          <button className={style.bookButton}>Сохранить</button>
        </Alert>
      </div>
    </div>
  );
};
