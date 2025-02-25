import React, { useMemo, useState } from "react";
import { getTours, splitAndParseDates } from "api/get";
import Alert from "components/Alert";
import Tour from "components/Tour";
import style from "styles/toursComponent.module.css";
import { TourLoading } from "components/load/TourLoading";
import useRole from "api/useRole";

export const Tours = ({ filters, extraFilters }) => {
  const { data: tours, isLoading, isError } = getTours();
  const { data: role } = useRole();

  const [showMore, setShowMore] = useState(false);

  const filtredList = useMemo(() => {
    let filtred = tours?.filter((tour) =>
      filters?.length
        ? filters.some((filter) => tour.restTypes?.includes(filter))
        : true
    );
    if (role != "admin") {
      filtred = filtred?.filter(
        (tour) =>
          (tour?.leftAmount != undefined ? tour?.leftAmount : tour?.maxAmount) >
          0
      );
    }

    if (extraFilters && !!Object.keys(extraFilters)?.length) {
      filtred = filtred?.filter((tour) => {
				let doesDateMatch;
				const countChildren = +extraFilters?.countChildren ? +extraFilters?.countChildren : 0;
				const countAdults = +extraFilters?.countAdults ? +extraFilters?.countAdults : 0;
				
				if (extraFilters?.date) {
					const [filterStartDate, filterEndDate] = splitAndParseDates(extraFilters?.date);

					tour.dates.forEach(date => {
						const [dateStart, dateEnd] = splitAndParseDates(date.date);

						if (dateStart >= filterStartDate && filterEndDate >= dateStart) {
							doesDateMatch = true;
						}
					});
				} else doesDateMatch = true;

        return (
          doesDateMatch && tour.location
            .toLowerCase()
            .includes(extraFilters?.where?.toLowerCase() || "") &&
          (tour.leftAmount >= 0 ? tour.leftAmount : tour.maxAmount) >=
            (countAdults + countChildren || 0)
        );
      });
    }

    return filtred;
  }, [tours, filters, extraFilters]);
  const displayedTours = useMemo(
    () => (showMore ? filtredList : filtredList?.slice(0, 4)),
    [showMore, filtredList]
  );

  return isLoading ? (
    [0, 1, 2, 3].map((i) => <TourLoading key={i + "loading"} i={i * 2} />)
  ) : isError ? (
    <Alert>Что-то пошло не так</Alert>
  ) : filtredList?.length <= 0 ? (
    <Alert>К сожалению туров нет</Alert>
  ) : (
    <>
      {displayedTours.map((tour) => (
        <Tour key={tour.id} data={tour} />
      ))}
      {filtredList.length > 4 && (
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
