import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getApi from "api/get";
import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "styles/forms.module.css";
import headerstyles from "styles/header.module.css";

const BookForm = ({ setShowBookForm }) => {
	const { type } = useParams();
	const nowDate = useMemo(e => new Date().toISOString().slice(0, 10), []);
	const queryClient = useQueryClient();
	const formRef = useRef();
	const getFormData = (e) =>
		Object.fromEntries(new FormData(formRef.current).entries());
	const getCurrentRoomData = (e) =>
		rooms?.find((room) => room.name === getFormData().typeRoom);
	const { data: user } = getApi({
		key: ["user"],
		path: "/users/" + localStorage.getItem("id"),
	});

	const booksKinds = useMemo(
		(e) => JSON.parse(import.meta.env.VITE_BOOKSKINDS),
		[]
	);
	const { data: rooms } = getApi({
		key: [booksKinds.rooms],
		path: booksKinds.rooms,
		onSuccess: date => setPrice(prev => prev <= 0 ? date?.[0].price : prev)
	});
	const countPrice = e => {
		const formData = getFormData();
		const come = new Date(formData.comeDate);
		const out = new Date(formData.outDate);
		const days = datediff(come, out) + 1;

		return getCurrentRoomData()?.price *
		formData.countPeople *
		formData.countRooms *
		(days || 1)
	}
	const [price, setPrice] = useState(0);

	function datediff(first, second) {
		return Math.round((second - first) / (1000 * 60 * 60 * 24));
	}

	const changeForm = (e) => setPrice(countPrice());

	const { mutate } = useMutation({
		mutationFn: data => axios.post('/api/users/book', data),
		onSuccess: res => {
			if (!localStorage.getItem('id'))
				localStorage.setItem('id', res.data.id)

			queryClient.invalidateQueries(['rooms'])
			// popupForm.current.style.display = 'none';
		}
	});

	const submit = e => {
		e.preventDefault();

		mutate({ ...Object.fromEntries(new FormData(e.target).entries()), price });
	}
	
	useEffect(e => setPrice(countPrice()), [type]);

	return (
		<div className={styles.popUpForm}>
			<form ref={formRef} onChange={changeForm} onSubmit={submit}>
				<button
					onClick={() => setShowBookForm(false)}
					className={`${styles.exit} ${headerstyles.exit}`}
				></button>

				<h2>Бронь тура</h2>

				<input
					id="lastName"
					name="lastName"
					type="text"
					placeholder="Фамилия"
					required
					defaultValue={user?.lastName || ""}
				/>
			
				<input
					id="name"
					name="name"
					type="text"
					placeholder="Имя"
					required
					defaultValue={user?.name || ""}
				/>
			
				<input
					id="fatherName"
					name="fatherName"
					type="text"
					placeholder="Отчество"
					required
					defaultValue={user?.fatherName || ""}
				/>
				<input
					id="number"
					name="number"
					type="tel"
					placeholder="Номер"
					required
					defaultValue={user?.number || ""}
				/>

				<input
					id="countAdults"
					name="countAdults"
					type="number"
					placeholder="Кол-во взрослых"
					required
					min={1}
					max={20}
				/>

				<input
					id="countChildren"
					name="countChildren"
					type="number"
					required
					placeholder="Кол-во детей"
					// onChange={(e) => {
					// 	const roomByType = getCurrentRoomData();

					// 	if (
					// 		+e.target.value + roomByType.bookedAmount >
					// 		roomByType.amount
					// 	)
					// 		e.target.value = roomByType.amount;
					// }}
					min={0}
					max={13}
				/>
				

				<select
					name="datePick"
					id="datePick"
					// defaultValue={popupForm.current?.getAttribute("data-type")}
					// onChange={(e) => {
					// 	formRef.current.countRooms.value = 1;
					// 	formRef.current.countPeople.value = 1;
					// }}
				>
					<option selected={type === 'Классика'}>27.01.2025пн – 31.01.2025пт</option>
					<option selected={type === 'Стандарт'}>27.01.2025пн – 31.01.2025пт</option>
					<option selected={type === 'Люкс'}>27.01.2025пн – 31.01.2025пт</option>
				</select>

				<span>{price} руб.</span>
				
				<button>Забронировать</button>
			</form>
		</div>
	);
};

export default BookForm;
