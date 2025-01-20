import React from 'react'
import Rooms from 'layouts/Rooms'
import { roomLayout } from 'styles/roomLayout.module.css'
import main from 'styles/main.module.css'
import BookedRooms from './BookedRooms'
import getApi from 'api/get'

const Room = ({ popupForm }) => {
	const { data: user, isLoading } = getApi({
    key: ['user'],
    path: '/users/' + localStorage.getItem('id')
  })

  return (
    <div id={main.rooms} className={roomLayout}>
      {!isLoading && user?.bookedRooms?.length > 0 && (
				<>
					<h2>Забронированные номера</h2>
          <div id={main.booked}>
					  <BookedRooms bookedRooms={user.bookedRooms} isBlack={true} />
          </div>
				</>
			)}

      <h2>Варианты номеров</h2>
      <Rooms popupForm={popupForm} />
    </div>
  )
}

export default Room