import React, { useState } from 'react'
import UserBtn from "components/UserBtn";
import UserIconButton from "components/UserIconButton";
import headerstyles from "styles/header.module.css";
import getApi, { getFormData } from "api/get";
import useRole from "api/useRole";

const Header = () => {
    const { data: role } = useRole();
    const { data: book } = getApi({
        key: ["book"],
        path: "/books/" + localStorage.getItem("id"),
    });
    const [bookData, setBookData] = useState({ ...book });
    const { data: user } = getApi({
        key: ["book"],
        path: "/users/" + localStorage.getItem("id"),
    });
    const [userData, setData] = useState({ ...user });

    return (
        <header>
        <div className={headerstyles.container}>
            <a href="" to="">
                <div className={headerstyles.logo}></div>
            </a>
            <div>
                {role === 'user' && bookData.userId === userData.id && <button className={headerstyles.slotBooks}><img src="/destination.png" alt="" /></button>}
                <UserBtn />
                {role === 'guest' && <UserIconButton />}
            </div>
        </div>
        </header>
    )
}

export default Header