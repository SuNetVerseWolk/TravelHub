import getApi from "api/get";
import React from "react";
import LogInBtn from "./LogInBtn";

const UserBtn = ({ setIsOpenedUF, setIsOpened }) => {
  const {
   data: user,
   isLoading,
   isError,
  } = getApi({
   key: ['user'],
   path: "users/" + localStorage.getItem("id"),
  });

  return (
    // <>
    //  {localStorage.getItem("id") ? (
    //    isLoading ? (
		// 			<button type="button">Загрузка...</button>
    //    ) : !isError ? (
    //      <button onClick={e => {
    //        setIsOpenedUF(true);
    //        setIsOpened && setIsOpened(false);
    //      }}>{user?.number}</button>
    //    ) : (
    //      <LogInBtn />
    //    )
    //  ) : (
        <LogInBtn />
    //  )}
    //</>
  );
};

export default UserBtn;
