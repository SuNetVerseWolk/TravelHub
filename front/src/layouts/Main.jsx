import React from 'react'
import ToursLayout from 'layouts/ToursLayout'
import { main } from 'styles/main.module.css'
import Services from './Services'
import Filter from 'components/HomeTitle'

const Main = ({ popupForm }) => {
  return (
    <main className={main}>
      <Filter />
      <ToursLayout popupForm={popupForm} />
      <Services />
    </main>
  )
}

export default Main