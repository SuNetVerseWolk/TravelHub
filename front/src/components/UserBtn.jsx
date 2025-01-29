import getApi from "api/get";
import React, { useState} from "react";
import LogInBtn from "./LogInBtn";
import style from '../styles/userBtn.module.css'
import UserForm from "layouts/UserForm";

const UserBtn = ({ isUser, setIsUser }) => {
  const {
   data: user,
   isLoading,
   isError,
  } = getApi({
   key: ['user'],
   path: "users/" + localStorage.getItem("id"),
  });
    
  const [popUpUserForm, setPopUpUserForm] = useState(false);
  
  return (
    <>
     {isUser && localStorage.getItem("id") ? (
       isLoading ? (
					<button type="button">Загрузка...</button>
       ) : !isError ? (
         <button className={style.userBtn} onClick={e => {
          setPopUpUserForm(true)
         }}>{user?.number}</button>
       ) : (
         <LogInBtn setIsUser={setIsUser} />
       )
     ) : (
        <LogInBtn setIsUser={setIsUser} />
     )}

      {popUpUserForm && <UserForm popUpUserForm={popUpUserForm} setPopUpUserForm={setPopUpUserForm} />}
    </>
  );
};

export default UserBtn;
