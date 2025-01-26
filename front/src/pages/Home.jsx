import React, { useRef } from "react";
import { main } from 'styles/main.module.css'
import headerstyles from "styles/header.module.css";
import UserBtn from "components/UserBtn";
import UserIconButton from "components/UserIconButton";
import HomeTitle from "components/HomeTitle";
import ToursLayout from "layouts/ToursLayout";
import Services from "layouts/Services";

const Home = () => {
  const popupForm = useRef();

  return (
    <>
      <header>
        <div className={headerstyles.container}>
          <a href="" to="">
            <div className={headerstyles.logo}></div>
          </a>
          <UserBtn />
          <UserIconButton />
        </div>
      </header>
			<main className={main}>
				<HomeTitle />
				<ToursLayout popupForm={popupForm} />
				<Services />
			</main>
      <footer>
        <div>
          <p>
            © 2025 "Виста" Все права защищены. Используя сайт, вы принимаете
            условия пользовательского соглашения. Информация на сайте не
            является публичной офертой. Условия сотрудничества.. This site is
            protected by reCAPTCHA and the Google Privacy Policy and Terms of
            Service apply.
          </p>

          <div>
            <h3>Контакты</h3>

            <p>Телефон: +7 (900) 300-30-30</p>
            <p>E-mail: vista@mail.com</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;