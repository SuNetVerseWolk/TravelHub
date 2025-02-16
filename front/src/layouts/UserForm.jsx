import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatPhoneNumber } from "api/formatData";
import { getFormData } from "api/get";
import axios from "axios";
import React, { useRef, useState } from "react";
import styles from "styles/forms.module.css";
import headerstyles from "styles/header.module.css";

const UserForm = ({ popUpUserForm, setPopUpUserForm, user }) => {
  const formRef = useRef();
  const queryClient = useQueryClient();
  const [data, setData] = useState(user || {});

  const exit = (e) => {
    localStorage.removeItem("id");
    queryClient.setQueryData(["user"], {});
    queryClient.invalidateQueries(["user"]);
    queryClient.invalidateQueries(["role"]);
    setPopUpUserForm(false);
  };

  const { mutate: deleteUser } = useMutation({
    mutationFn: (e) => axios.delete("/api/users/" + localStorage.getItem("id")),
    onSuccess: (res) => {
      queryClient.invalidateQueries(["user"]);
      exit();
    },
  });
  const { mutate: submitUserData, isPending } = useMutation({
    mutationFn: (data) =>
      axios.post("/api/users/" + localStorage.getItem("id"), data),
    onSuccess: (res) => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  return (
    <>
      {popUpUserForm && (
        <div className={styles.userPopupForm}>
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              submitUserData({ ...getFormData(formRef), number: data.number });
            }}
          >
            <button
              onClick={(e) => setPopUpUserForm(false)}
              className={`${styles.exit} ${headerstyles.exit}`}
            ></button>
            <h3>Данные клиента</h3>

            <input
              id="lastName"
              name="lastName"
              type="text"
              defaultValue={user?.lastName}
              required
            />

            <input
              id="name"
              name="name"
              type="text"
              defaultValue={user?.name}
              required
            />

            <input
              id="fatherName"
              name="fatherName"
              defaultValue={user?.lastName}
              type="text"
              required
            />

            <input
              id="email"
              name="email"
              type="text"
              defaultValue={user?.email}
              required
            />

            <input
              id="number"
              name="number"
              type="tel"
              value={formatPhoneNumber.userFriendly(data.number)}
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  number:
                    formatPhoneNumber.dataFriendly(e.target.value) ||
                    e.target.value,
                }));
              }}
              required
            />

            <input
              id="password"
              name="password"
              defaultValue={user?.password}
              required
            />

            <button type="submit">{isPending ? "Подождите" : "Изменить"}</button>
            <button onClick={(e) => exit()}>Выйти</button>
            <button onClick={(e) => deleteUser()}>Удалить</button>
          </form>
        </div>
      )}
    </>
  );
};

export default UserForm;
