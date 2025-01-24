import React, { useRef } from 'react'
import Header from 'layouts/Header';
import Main from 'layouts/Main';
import Footer from 'layouts/Footer';

const Home = () => {
  const popupForm = useRef();

  return (
    <>
      <Header />  
      <Main popupForm={popupForm} />
      <Footer />
    </>
  )
}

export default Home