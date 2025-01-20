import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { bookBtn } from 'styles/bookBtn.module.css'
import booked from 'styles/bookedRooms.module.css'

const BookButton = ({ id, type, price, popupForm, userID, isBlack }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
	const { mutate } = useMutation({
		mutationFn: data => axios.delete(`/api/users/book/${id}?type=${type}&userID=${userID ? userID : localStorage.getItem('id')}`),
    onSuccess: res =>  queryClient.invalidateQueries()
	})

  return (
    <div className={bookBtn}>
        <h3>{price} / сутки</h3>

        <button className={isBlack && booked.bookBtn} onClick={e => {
          if (popupForm) {
            popupForm.current.style.display = 'grid';
            navigate(type, {replace: true})
          }
          else mutate();
        }}>{popupForm ? 'Забронировать' : 'Отменить'}</button>
    </div>
  )
}

export default BookButton