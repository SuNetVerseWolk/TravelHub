import { getUser } from "api/get";
import React, { useState } from "react";
import LogInBtn from "./LogInBtn";
import UserForm from "layouts/UserForm";
import useRole from "api/useRole";
import { formatPhoneNumber } from "api/formatData";

const UserBtn = () => {
	const { data: role} = useRole();
  const { data: user, isLoading } = getUser();

  const [popUpUserForm, setPopUpUserForm] = useState(false);

  return (
    <>
      {role === "user" ? (
				<LogInBtn value={formatPhoneNumber.userFriendly(user.number)} onClick={(e) => setPopUpUserForm(true)} />
      ) : (
        <LogInBtn />
      )}

      {popUpUserForm && (
        <UserForm
					user={user}
          popUpUserForm={popUpUserForm}
          setPopUpUserForm={setPopUpUserForm}
        />
      )}
    </>
  );
};

export default UserBtn;
