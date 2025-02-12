import React, { useMemo, useState } from "react";
import styles from "styles/tour.module.css";
import typeStyles from "styles/tourTypes.module.css";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { getDateDiff } from "api/get";

const Tour = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.main} style={{ "--img": `url(${data?.imgs?.at(0)})` }}>
      <div onClick={() => navigate("/tour/" + data.id, { state: { tour: data } })} />
      <TourTypes types={data?.restTypes} />
      <div>
        <TourTitle {...data} />
        <TourInfo {...data} />
      </div>
    </div>
  );
};

export const TourTitle = ({location, title}) => {
  return (
    <div>
			<p>{location}</p>
			<h4>{title}</h4>
		</div>
  )
}

export const TourTypes = ({ types }) => {
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

export const TourInfo = ({dates, duration}) => {
	const getDate = (date) => {
		const [year, month, day] = date?.split('–')[0].trim().slice(0, 10).split('.') || [];
		const dateObject = new Date(`${year}-${month}-${day}`);
		return dateObject.toLocaleString('ru', { month: 'short', day: 'numeric'});
	}
	const date = useMemo(() => getDate(dates?.at(0).date), []);

  return (
    <div>
			<ul>
				<li>{date}</li>
				<li>ещё даты</li>
				<li>{getDateDiff(dates?.at(0).date)} дней</li>
			</ul>
			<button>от <span>{dates?.at(0).price.toLocaleString('ru')}</span> руб.</button>
		</div>
  )
}

export default Tour;
