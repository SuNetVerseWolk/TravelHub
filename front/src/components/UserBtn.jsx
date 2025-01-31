import { getUser } from "api/get";
import React, { useState } from "react";
import LogInBtn from "./LogInBtn";
import UserForm from "layouts/UserForm";
import useRole from "api/useRole";

const UserBtn = () => {
	const { data: role} = useRole();
  const { data: user, isLoading } = getUser();

  const [popUpUserForm, setPopUpUserForm] = useState(false);

  return (
    <>
      {isLoading ? (
        <LogInBtn value="Загрузка..." />
      ) : role === "user" ? (
				<LogInBtn value={user.number} onClick={(e) => setPopUpUserForm(true)} />
      ) : (
        <LogInBtn />
      )}

      {popUpUserForm && (
        <UserForm
          popUpUserForm={popUpUserForm}
          setPopUpUserForm={setPopUpUserForm}
        />
      )}
    </>
  );
};

export default UserBtn;
