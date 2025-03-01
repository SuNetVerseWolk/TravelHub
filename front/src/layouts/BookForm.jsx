import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatPhoneNumber } from "api/formatData";
import getApi, { getFormData, getUser } from "api/get";
import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "styles/forms.module.css";
import headerstyles from "styles/header.module.css";

const BookForm = ({ setShowBookForm, tour }) => {
  const { type } = useParams();
  const queryClient = useQueryClient();
  const formRef = useRef();
  const { data: user } = getUser();
  const [data, setData] = useState({ ...user });

  const [price, setPrice] = useState(0);
  const countPrice = (e) => {
    const formData = getFormData(formRef);
    const [come, out] = formData.datePick.split(" - ");

    const days = datediff(new Date(come), new Date(out)) + 1;
    const price = tour.dates.find(
      (date) => date.date === formData.datePick
    )?.price;

    return (
      (formData.countAdults * price + formData.countChildren * price * 0.45) *
      (days || 1)
    );
  };

  function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  const changeForm = (e) => setPrice(countPrice());

  const { mutate, isSuccess, isError, isPending, error } = useMutation({
    mutationFn: (data) => axios.post("/api/books/book", data),
    onSuccess: (res) => {
      if (!localStorage.getItem("id")) localStorage.setItem("id", res.data.id);

      queryClient.invalidateQueries(["tours"]);
    },
  });

  const submit = (e) => {
    e.preventDefault();
		if (isSuccess) return setShowBookForm(false);
    const formData = getFormData(formRef);

    mutate({
      userId: user?.id,
      tourId: tour.id,
      countAdults: formData.countAdults,
      countChildren: formData.countChildren,
      price: price,
    });
  };

  useEffect((e) => setPrice(countPrice()), [type]);

  return (
    <div className={styles.popUpForm}>
      <form ref={formRef} onChange={changeForm} onSubmit={submit}>
        <button
          onClick={() => setShowBookForm(false)}
          className={`${styles.exit} ${headerstyles.exit}`}
        ></button>

        <h2>Бронь тура</h2>

        <input
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Фамилия"
          required
          defaultValue={user?.lastName || ""}
        />

        <input
          id="name"
          name="name"
          type="text"
          placeholder="Имя"
          required
          defaultValue={user?.name || ""}
        />

        <input
          id="fatherName"
          name="fatherName"
          type="text"
          placeholder="Отчество"
          required
          defaultValue={user?.fatherName || ""}
        />
        <input
          id="number"
          name="number"
          type="tel"
          placeholder="+7 (000) 000-00-00"
          required
          value={formatPhoneNumber.userFriendly(data.number)}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              number: formatPhoneNumber.dataFriendly(e.target.value),
            }))
          }
        />

        <input
          id="countAdults"
          name="countAdults"
          type="number"
          placeholder="Кол-во взрослых"
          required
          defaultValue={1}
          min={1}
          max={20}
        />

        <input
          id="countChildren"
          name="countChildren"
          type="number"
          required
          placeholder="Кол-во детей"
          defaultValue={0}
          min={0}
          max={13}
        />

        <select name="datePick" id="datePick">
          {tour?.dates?.map((value) => <option>{value.date}</option>) || (
            <option>Дат нет</option>
          )}
        </select>

        <span>{price} руб.</span>

        <button>{isSuccess ? "Готово" : isError ? error?.status === 409 ? "Превышенно кол-во мест." : "Зарегистрируйтесь сначала" : isPending ? "Подождите..." : "Забронировать"}</button>
      </form>
    </div>
  );
};

export default BookForm;
