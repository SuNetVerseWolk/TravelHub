import React from 'react'
import ToursLayout from 'layouts/ToursLayout'
import { main } from 'styles/main.module.css'
import Services from './Services'
import Filter from 'components/Filter'

const Main = ({ popupForm }) => {
  return (
    <main className={main}>
      <Filter />
      <Services />
      <ToursLayout popupForm={popupForm} />
    </main>
  )
}

export default Main