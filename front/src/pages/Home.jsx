import React, { useRef, useState } from "react";
import { main } from 'styles/main.module.css'
import HomeTitle from "components/HomeTitle";
import ToursLayout from "layouts/ToursLayout";
import Services from "layouts/Services";
import Header from "layouts/Header";
import Footer from "layouts/Footer";

const Home = () => {
  const popupForm = useRef();
	const [filters, setFilters] = useState({});

  return (
    <>
      <Header/>
			<main className={main}>
        <HomeTitle setFilters={setFilters} />
        <ToursLayout popupForm={popupForm} extraFilters={filters} />
        <Services />
			</main>
      <Footer />
    </>
  );
};

export default Home;