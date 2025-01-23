import Header from 'layouts/Header'
import React, { useRef } from 'react'
import { roomLayout } from 'styles/roomLayout.module.css'
import main from 'styles/main.module.css'
import getApi from 'api/get'
import style from 'styles/main.module.css'
import ToursLayout from 'layouts/ToursLayout'
import BookForm from 'layouts/BookForm'
import Alert from 'components/Alert'

const AdminPage = () => {
  const popupForm = useRef();
  const { data: users, isLoading } = getApi({
    key: ['users'],
    path: '/users'
  })

  return (
    <div>ADMIN</div>
  )
}

export default AdminPage