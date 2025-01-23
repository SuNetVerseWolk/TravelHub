import React, { useMemo, useRef } from 'react'
import Header from 'layouts/Header';
import Main from 'layouts/Main';
import Footer from 'layouts/Footer';  
import AdminPage from './AdminPage';

const Home = () => {
  const popupForm = useRef();
  const userId = useMemo(() => localStorage.getItem('id'), [localStorage]);

  console.log(userId === import.meta.env.VITE_ADMIN_ID)
  return (
    userId === import.meta.env.VITE_ADMIN_ID ? <AdminPage /> : (
      <>
        <Header />  
        <Main popupForm={popupForm} />
        <Footer />
      </>
    )
  )
}

export default Home