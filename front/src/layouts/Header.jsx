import React, { useMemo } from 'react'
import UserBtn from "components/UserBtn";
import UserIconButton from "components/UserIconButton";
import headerstyles from "styles/header.module.css";
import { getBooks } from "api/get";
import useRole from "api/useRole";

const Header = () => {
    const { data: role } = useRole();
    const { data: books } = getBooks();
		const hasBooksUser = useMemo(() => role === 'user' && books?.some(book => book.userId === +localStorage.getItem("id")), [books, role])

    return (
        <header>
        <div className={headerstyles.container}>
            <a href="" to="">
                <div className={headerstyles.logo}></div>
            </a>
            <div>
                <button hidden={!hasBooksUser} className={headerstyles.slotBooks}><img src="/destination.png" alt="" /></button>
                <UserBtn />
                {role === 'guest' && <UserIconButton />}
            </div>
        </div>
        </header>
    )
}

export default Header