import React, { useRef } from 'react'
import Header from 'layouts/Header';
import Main from 'layouts/Main';
import Footer from 'layouts/Footer';
import BookForm from 'layouts/BookForm';

const Home = () => {
  const popupForm = useRef();

  return (
    <>
      <BookForm popupForm={popupForm} />
      <Header />  
      <Main popupForm={popupForm} />
      <Footer />
    </>
  )
}

export default Home