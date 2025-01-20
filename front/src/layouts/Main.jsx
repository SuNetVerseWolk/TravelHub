import React from 'react'
import Room from 'layouts/Room'
import { main } from 'styles/main.module.css'
import Services from './Services'
import Filter from 'components/Filter'

const Main = ({ popupForm }) => {
  return (
    <main className={main}>
      <Filter />
      <Services />
      <Room popupForm={popupForm} />
    </main>
  )
}

export default Main