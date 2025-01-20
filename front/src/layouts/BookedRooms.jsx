import React, { useRef } from 'react'
import Room from 'components/Room';
import style from 'styles/rooms.module.css'
import booked from 'styles/bookedRooms.module.css'
import getApi from 'api/get';

const BookedRooms = ({ bookedRooms, isBlack, userID }) => {
	const { data: rooms } = getApi({
		key: ['rooms'],
		path: 'rooms'
	})
	const getRoomByType = type => rooms?.find(roomIn => roomIn.name === type);
	const roomContainer = useRef();

	return (
		<div className={`${style.rooms}`}>
			<button className={`${style.left} ${isBlack && booked.arrow}`} onClick={e => {
				const scrollEl = roomContainer.current;
				scrollEl.scrollTo({ behavior: 'smooth', left: scrollEl.scrollLeft - scrollEl.children[0].offsetWidth });
			}}>{'<'}</button>
			<div ref={roomContainer}>
				{bookedRooms?.map(roomType => roomType?.books?.map(room =>
					<Room
						black={isBlack && booked.room}
						key={room.id}
						id={room.id}
						name={roomType.typeRoom}
						price={room.price}
						description={(
							<>
								<p>Людей в номере: {room.countPeople}</p>
								<p>Дата приезда: {room.comeDate}</p>
								<p>Дата уезда: {room.outDate}</p>
							</>
						)}
						amount={room.countRooms}
						bookedAmount={0}
						src={getRoomByType(roomType.typeRoom)?.src}
						value={getRoomByType(roomType.typeRoom)?.value}
						userID={userID}
					/>
				))}
			</div>
			<button className={`${style.right} ${isBlack && booked.arrow}`} onClick={e => {
				const scrollEl = roomContainer.current;
				scrollEl.scrollTo({ behavior: 'smooth', left: scrollEl.scrollLeft + scrollEl.children[0].offsetWidth });
			}}>{'>'}</button>
		</div>
	)
}

export default BookedRooms