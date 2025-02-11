import { TourInfo, TourTitle, TourTypes } from "components/Tour";
import React, { useMemo } from "react";
import styles from "styles/tour.module.css";
import loadStyles from "styles/load.module.css";
import { getDateFrom2day } from "api/get";

export const TourLoading = ({i = 0}) => {
	const title = useMemo(() => 'загрузка', []);

  return (
    <div className={`${styles.main} ${loadStyles.loading}`}>
      <TourTypes types={[title]} />
      <div>
        <TourTitle location={title} title={title} />
        <TourInfo dates={[{date: getDateFrom2day(i), price: 999}]} duration={`${i + 1} дней`} />
      </div>
    </div>
  );
};
