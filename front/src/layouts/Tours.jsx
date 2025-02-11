import React, { useState } from "react";
import getApi from "api/get";
import Alert from "components/Alert";
import Tour from "components/Tour";
import style from "styles/toursComponent.module.css";
import loadStyles from "styles/load.module.css";
import { TourLoading } from "components/load/TourLoading";

export const Tours = () => {
  const {
    data: tours,
    isLoading,
    isError,
  } = getApi({
    key: ["tours"],
    path: "tours",
  });

  const [showMore, setShowMore] = useState(false);

  const displayedTours = showMore ? tours : tours?.slice(0, 4);

  return isLoading ? [0,1,2,3].map(i => (
		<TourLoading key={i + 'loading'} i={i * 2} />
	)) : isError ? (
    <Alert>Что-то пошло не так</Alert>
  ) : tours?.length <= 0 ? (
    <Alert>К сожалению туров нет</Alert>
  ) : (
    <>
      {displayedTours.map((tour) => (
        <Tour key={tour.id} data={tour} />
      ))}
      {tours.length > 4 && (
        <div className={style.containerButton}>
          <button
            className={style.buttonShowMoreAndHide}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Скрыть" : "Показать еще"}
          </button>
        </div>
      )}
    </>
  );
};
