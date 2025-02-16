import React, { useState } from "react";
import styles from "styles/tour.module.css";
import typeStyles from "styles/TourTypes.module.css";
import { motion } from 'framer-motion';
import { getDateDiff, getTour } from "api/get";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const Book = ({ data }) => {
	const { data: tour } = getTour(data.tourId);

  return (
    <div className={styles.main} style={{ "--img": `url(${tour?.imgs?.at(0)})` }}>
      <BookTypes types={tour?.restTypes} />
      <div>
        <BookTitle {...tour} />
        <BookInfo {...tour} id={data.id} />
      </div>
    </div>
  );
};

export const BookTitle = ({location, title}) => {
  return (
    <div>
			<p>{location}</p>
			<h4>{title}</h4>
		</div>
  )
}

export const BookTypes = ({ types }) => {
  const [isHidden, setHidden] = useState(true);

  return (
    <ul className={typeStyles.main}>
      {isHidden ? (
        <>
          <li>{types?.at(0)}</li>
          {types?.length > 1 && <li onClick={() => setHidden(false)}>&gt;</li>}
        </>
      ) : (
        <>
          {types.map((value, id) => (
            <motion.li
              key={id}
              initial={{ scale: id === 0 ? 1 : 0.7 }}
              animate={{ scale: 1, transition: { delay: 0.01 * id } }}
            >
              {value}
            </motion.li>
          ))}
          <li onClick={() => setHidden(true)}>X</li>
        </>
      )}
    </ul>
  );
};

export const BookInfo = ({dates, id}) => {
	const getDate = (date) => {
		const [year, month, day] = date?.split('–')[0].trim().slice(0, 10).split('.') || [];
		const dateObject = new Date(`${year}-${month}-${day}`);
		return dateObject.toLocaleString('ru', { month: 'short', day: 'numeric'});
	}
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: () => axios.delete(`/api/books/${id}`),
		onSuccess: () => queryClient.invalidateQueries(['books'])
	})

  return (
    <div>
			<ul>
				<li>{getDate(dates?.at(0).date)}</li>
				<li><span>{dates?.at(0).price.toLocaleString('ru')}</span> руб.</li>
				<li>{getDateDiff(dates?.at(0)?.date)} дней</li>
			</ul>
			<button onClick={mutate}>Отменить</button>
		</div>
  )
}

export default Book;
