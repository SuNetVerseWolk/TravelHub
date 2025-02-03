import React from 'react'
import UserBtn from "components/UserBtn";
import UserIconButton from "components/UserIconButton";
import headerstyles from "styles/header.module.css";
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
            {role === 'guest' && <UserIconButton />}
        </div>
        </header>
    )
}

export default Header