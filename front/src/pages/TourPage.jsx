import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Difficulties, RelaxTypes, Roles, Types } from "api/enums";
import getApi, { getDateDiff, getDateFrom2day } from "api/get";
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
import loadStyles from "styles/load.module.css";

export const TourPage = () => {
  const { id } = useParams();
  const fileInputRef = useRef();
  const { data: role } = useRole();
  const isNew = useMemo(() => id === "new", [id]);

  const {
    data: tour,
    isLoading,
    isError,
  } = getApi({
    key: ["tour", id],
    path: [`tours/${id}`],
    enabled: !isNew,
  });
  const [data, setData] = useState();
  const currentData = useMemo(
    () => (role === "admin" ? data : tour),
    [data, tour, role]
  );

  const [imgsGlobalValue, setImgsGlobalValue] = useState({
    selected: 0,
    hovered: -1,
  });
  const imageHandler = (id) =>
    setImgsGlobalValue((prev) => {
      setData((prev) => ({
        ...prev,
        imgs: prev.imgs.filter((item, itemId) => itemId != id),
      }));

      return {
        ...prev,
        selected:
          prev.selected >= data.imgs.length - 1
            ? data.imgs.length - 2
            : prev.selected,
      };
    });

  useEffect(() => {
    setData(tour || { id: Date.now() });
  }, [tour]);

  return (
    <div>
      {!isNew && isError ? (
        <Alert>No tour data available.</Alert>
      ) : (
        <>
          {role != "admin" && <Header />}
          <div className={style.mainTourInfo}>
            <div>
              <div className={style.containerImgs}>
                <div>
                  <img
                    className={isLoading ? loadStyles.loading : ""}
                    src={currentData?.imgs?.at(imgsGlobalValue.selected)}
                    alt={
                      currentData?.title || isNew
                        ? "Добавьте изображение"
                        : "Изображение тура"
                    }
                  />
                </div>

                <div>
                  {isLoading
                    ? [0, 1, 2].map((i) => (
                        <TourImgItem isLoading={isLoading} />
                      ))
                    : (role === "admin" || currentData?.imgs?.length > 1) &&
                      currentData?.imgs?.map((img, id) => (
                        <TourImgItem
                          key={img + id}
                          id={id}
                          src={img}
                          isSelected={imgsGlobalValue.selected === id}
                          hoveredImgId={imgsGlobalValue.hovered}
                          setGlobalValue={setImgsGlobalValue}
                          onClick={() => imageHandler(id)}
                          role={role}
                        />
                      ))}
                  {role === "admin" &&
                    (currentData?.imgs?.length < 4 || !currentData?.imgs) && (
                      <span onClick={() => fileInputRef.current.click()}>
                        <input
                          ref={fileInputRef}
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => {
                            let reader = new FileReader();

                            reader.onload = (event) =>
                              setData((prev) => ({
                                ...prev,
                                imgs: [
                                  ...(prev?.imgs || []),
                                  event.target.result,
                                ],
                              }));
                            reader.readAsDataURL(e.target.files[0]);
                          }}
                        />
                        <button>+</button>
                      </span>
                    )}
                </div>
              </div>
              {role != "admin" ? (
                <TourInfo tour={currentData} />
              ) : (
                <TourInfoAdmin
                  data={data}
                  setData={setData}
                  tour={tour}
                  isNew={isNew}
                  id={id}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const TourInfo = ({ tour }) => {
  const [showBookForm, setShowBookForm] = useState(false);
  const unknown = useMemo(() => "Не УКАЗАННО", []);

  return (
    <div className={style.dataTourContainer}>
      <h1>Данные тура</h1>

      <h3>{tour?.title}</h3>

      <p>
        Вид тура: {Types[tour?.type] || unknown}. Сложность -{" "}
        {Difficulties[tour?.difficulty] || unknown}, разрешение с возроста{" "}
        {tour?.ageFrom || unknown}
      </p>
      <p>
        Категории:{" "}
        {tour?.restTypes?.map((type, id) => (
          <span key={id}>
            {type}
            {id < tour.restTypes.length - 1 ? "; " : ""}
          </span>
        )) || unknown}
      </p>
      <p>Место проведения: {tour?.location || unknown}</p>
      <p>Срок проведения: {tour?.dates?.map((date, id) => tour.dates.length - 1 === id ? getDateDiff(date.date) : `${getDateDiff(date.date)} / `) + ' дней' || unknown}</p>
      <p>
        Даты:{" "}
        {tour?.dates?.map((date, id) => (
          <span key={id}>
            {`${date.date}. Цена: ${date.price}`}
            {id < tour.dates.length - 1 ? ", " : ""}
          </span>
        )) || "Нет доступных дат"}
      </p>

      <h3>Описание</h3>
      <p>{tour?.text || unknown}</p>

      <button
        className={style.bookButton}
        onClick={() => setShowBookForm(true)}
      >
        Забронировать
      </button>
      {showBookForm ? (
        <BookForm setShowBookForm={setShowBookForm} tour={tour} />
      ) : (
        <></>
      )}
    </div>
  );
};

export const TourImgItem = ({
  src,
  id,
  isSelected,
  hoveredImgId,
  setGlobalValue,
  onClick,
  role,
  isLoading,
}) => {
  return (
    <motion.span
      onHoverStart={() => setGlobalValue((prev) => ({ ...prev, hovered: id }))}
      onHoverEnd={() => setGlobalValue((prev) => ({ ...prev, hovered: -1 }))}
      className={`${style.imgItem} ${isLoading ? loadStyles.loading : ""}`}
    >
      {!isLoading && (
        <img
          key={id}
          src={src}
          onClick={() => setGlobalValue((prev) => ({ ...prev, selected: id }))}
          className={`${style.thumnails} ${isSelected ? style.active : ""}`}
          alt={`Tour Image ${id + 1}`}
        />
      )}
      {role === Roles.Admin &&
        ((isSelected && hoveredImgId === -1) || hoveredImgId === id) && (
          <motion.button
            animate={{ scale: 1, transition: { delay: isSelected ? 0.15 : 0 } }}
            initial={{ scale: isSelected ? 0 : 0.5 }}
            onClick={onClick}
          >
            X
          </motion.button>
        )}
    </motion.span>
  );
};

export const TourInfoAdmin = ({ data, setData, id, isNew }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: saveChanges,
    isSaving,
    isSavingError,
  } = useMutation({
    mutationFn: (data) => axios.post(`/api/tours/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["tour", isNew ? data.id : id]);
      queryClient.invalidateQueries(["tours"]);
      if (isNew) navigate(`../tour/${data.id}`, { replace: true });
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
        ...(data?.dates || []),
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
          <p>Максимальное кол-во человек</p>
          <input
            name="maxAmount"
            type="number"
            placeholder="Макс. кол-во человек"
            value={data?.maxAmount}
            onChange={changeData}
          />
        </label>
        <label className={style.label}>
          <p>Типы отдыха</p>
          <ul>
            {RelaxTypes.map((value, index) => (
              <li
                className={
                  data?.restTypes?.includes(value.text) ? style.active : ""
                }
                onClick={(e) =>
                  setData((prev) => ({
                    ...prev,
                    restTypes: prev.restTypes?.includes(value.text)
                      ? prev.restTypes.filter(
                          (restType) => restType != value.text
                        )
                      : [...(prev.restTypes || []), value.text],
                  }))
                }
              >
                <img src={value.src} alt="" />
                <span>{value.text}</span>
              </li>
            ))}
          </ul>
        </label>

        <div className={`${style.label} ${style.dateBox}`}>
          <p>Даты</p>
          {data?.dates?.map((date) => (
            <div key={date.id}>
              <DatesUI
                date={date.date}
                onChange={(value) => setDate(date.id, { ...date, date: value })}
                unicId={date.id}
                data={date}
              />
              <input
                name="price"
                type="number"
                placeholder="Стоимость"
                value={date?.price}
                onChange={(e) =>
                  setDate(date.id, { ...date, price: +e.target.value })
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
              : isNew
              ? "Добавить"
              : "Сохранить"}
          </button>
        </Alert>
      </div>
    </div>
  );
};
