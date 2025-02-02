import React from 'react'
import UserBtn from "components/UserBtn";
import UserIconButton from "components/UserIconButton";
import headerstyles from "styles/header.module.css";
import Roles from "api/roles";
import useRole from "api/useRole";

const Header = () => {
    const { data: role } = useRole();

    return (
        <header>
        <div className={headerstyles.container}>
            <a href="" to="">
                <div className={headerstyles.logo}></div>
            </a>
            <UserBtn />
            {role === Roles.Guest && <UserIconButton />}
        </div>
        </header>
    )
}

export default Header