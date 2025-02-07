import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Difficulties, Roles, Types } from "api/enums";
import getApi, { getDateFrom2day } from "api/get";
import useRole from "api/useRole";
import axios from "axios";
import Alert from "components/Alert";
import { DatesUI } from "components/Filter";
import BookForm from "layouts/BookForm";
import Header from "layouts/Header";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "styles/tourInfo.module.css";
import { motion } from "framer-motion";

export const TourPage = () => {
  const fileInputRef = useRef();
  const { data: role } = useRole();

  const { id } = useParams();
  const { data: tour } = getApi({
    key: ["tour", id],
    path: [`tours/${id}`],
  });
  const [data, setData] = useState();
	const currentData = useMemo(() => role === "admin" ? data : tour, [data, tour, role])

  const [selectedImg, setSelectedImg] = useState(0);
  const imageHandler = (id) =>
    setSelectedImg((prev) => {
      setData((prev) => ({
        ...prev,
        imgs: prev.imgs.filter((item, itemId) => itemId != id),
      }));

      return prev >= data.imgs.length - 1 ? data.imgs.length - 2 : prev;
    });

  useEffect(() => {
    setData(tour);
  }, [tour]);

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
                    src={currentData?.imgs[selectedImg]}
                    alt={currentData?.title || "Tour Image"}
                  />
                </div>

                <div>
                  {currentData?.imgs?.map((img, id) => (
                    <TourImgItem
                      key={img + id}
                      id={id}
                      src={img}
                      isSelected={selectedImg}
                      setSelected={setSelectedImg}
                      onClick={() => imageHandler(id)}
                      role={role}
                    />
                  ))}
                  {currentData?.imgs?.length < 4 && (
                    <span onClick={() => fileInputRef.current.click()}>
                      <input
                        ref={fileInputRef}
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => {
                          let reader = new FileReader();

                          reader.onload = (event) => setData(prev => ({...prev, imgs: [...prev.imgs, event.target.result]}))
                          reader.readAsDataURL(e.target.files[0]);
                        }}
                      />
                      <button>+</button>
                    </span>
                  )}
                </div>
              </div>
              {role != "admin" ? (
                <TourInfo tour={tour} />
              ) : (
                <TourInfoAdmin
                  data={data}
                  setData={setData}
                  tour={tour}
                  id={id}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <p>No tour data available.</p>
      )}
    </div>
  );
};

export const TourInfo = ({ tour }) => {
  const [showBookForm, setShowBookForm] = useState(false);

  return (
    <div>
      <h1>Данные тура</h1>

      <h3>{tour?.title}</h3>

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

      <button
        className={style.bookButton}
        onClick={() => setShowBookForm(true)}
      >
        Забронировать
      </button>
      {showBookForm ? <BookForm setShowBookForm={setShowBookForm} /> : <></>}
    </div>
  );
};

export const TourImgItem = ({
  src,
  id,
  isSelected,
  setSelected,
  onClick,
  role,
}) => {
  const [hovered, setHover] = useState(false);

  return (
    <motion.span
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className={style.imgItem}
    >
      <img
        key={id}
        src={src}
        onClick={() => setSelected(id)}
        className={`${style.thumnails} ${
          isSelected === id ? style.active : ""
        }`}
        alt={`Tour Image ${id + 1}`}
      />
      {role === Roles.Admin && hovered && (
        <motion.button
          animate={{ scale: 1 }}
          initial={{ scale: 0.5 }}
          onClick={onClick}
        >
          X
        </motion.button>
      )}
    </motion.span>
  );
};

export const TourInfoAdmin = ({ data, setData, id }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: saveChanges,
    isSaving,
    isSavingError,
  } = useMutation({
    mutationFn: (data) => axios.post(`/api/tours/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["tour", id]);
    },
  });
  const {
    mutate: getRidOf,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (data) => axios.delete(`/api/tours/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["tours"]);
      navigate("..");
    },
  });

  const changeData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const setDate = (id, value) =>
    setData((prev) => ({
      ...prev,
      dates: [...prev.dates.map((date) => (date.id === id ? value : date))],
    }));
  const addDate = (e) => {
    setData({
      ...data,
      dates: [
        ...data.dates,
        {
          id: Date.now(),
          date: `${getDateFrom2day().replaceAll("-", ".")} - ${getDateFrom2day(
            1
          ).replaceAll("-", ".")}`,
          price: 0,
        },
      ],
    });
  };
  const removeDate = (id) => {
    setData({ ...data, dates: data.dates.filter((item) => item.id !== id) });
  };

  return (
    <div>
      <h1>Данные тура</h1>
      <label className={style.label}>
        <h3>Заголовок</h3>
        <input
          name="title"
          placeholder="Заголовок"
          value={data?.title}
          onChange={changeData}
        />
      </label>
      <div className={style.scrollable}>
        <div className={style.itemsBox}>
          <label className={style.label}>
            <select
              name="type"
              id="type"
              value={data?.type}
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
              value={data?.difficulty}
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
              value={data?.ageFrom}
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
            value={data?.location}
            onChange={changeData}
          />
        </label>
        <label className={style.label}>
          <p>Длительность</p>
          <input
            name="duration"
            type="text"
            placeholder="Длительность"
            value={data?.duration}
            onChange={changeData}
          />
        </label>
        <div className={`${style.label} ${style.dateBox}`}>
          <p>Даты</p>
          {data?.dates?.map((date) => (
            <div key={date.id}>
              <DatesUI
                date={date.date}
                onChange={(value) => {
                  console.log(value);
                  setDate(date.id, { ...date, date: value });
                }}
                unicId={date.id}
                data={date}
              />
              <input
                name="price"
                type="number"
                placeholder="Стоимость"
                value={date?.price}
                onChange={(e) =>
                  setDate(date.id, { ...date, price: e.target.value })
                }
              />
              <button onClick={(e) => removeDate(date.id)}>X</button>
            </div>
          ))}
          <Alert isChildrenText={false}>
            <button className={style.bookButton} onClick={addDate}>
              Добавить дату
            </button>
          </Alert>
        </div>
        <label>
          <h3>Описание</h3>
          <textarea
            name="text"
            id="text"
            rows={5}
            onChange={changeData}
            defaultValue={data?.text}
          />
        </label>
        <Alert isChildrenText={false}>
          <button
            className={style.bookButton}
            style={{ background: "red", color: "white" }}
            onClick={(e) => getRidOf(id)}
          >
            {isPending
              ? "Удаляется..."
              : isError
              ? "Что-то пошло не так"
              : "Удалить"}
          </button>
          <button
            className={style.bookButton}
            onClick={(e) => saveChanges(data)}
          >
            {isSaving
              ? "Сохраняется..."
              : isSavingError
              ? "Что-то пошло не так"
              : "Сохранить"}
          </button>
        </Alert>
      </div>
    </div>
  );
};
