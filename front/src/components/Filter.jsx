import { getDateFrom2day } from "api/get";
import React, { useEffect, useMemo, useState } from "react";
import styles from "styles/filter.module.css";

const Filter = () => {
  return (
    <form>
      <input id="from" type="text" placeholder="Откуда" />
      <input id="where" type="text" placeholder="Куда" />
      <DatesUI />

      <input
        id="countAdults"
        min="1"
        max="20"
        type="number"
        placeholder="Кол-во взрослых"
      />
      <input
        id="countChildren"
        min="0"
        max="12"
        type="number"
        placeholder="Кол-во детей"
      />

      <button className={styles.buttonFind}>
        Найти
        <div className={styles.loupe}>
          <img src="/loupe.png" alt="Search Icon" />
        </div>
      </button>
    </form>
  );
};

export const DatesUI = ({ date, onChange, unicId }) => {
  const [sDate, eDate] = useMemo(
    () =>
      date?.match(/\d{2}\.\d{2}\.\d{4}/g)?.map((value) => {
        const [date, month, year] = value.split(".");
        return `${year}-${month}-${date}`;
      }) || [getDateFrom2day(), getDateFrom2day(1)],
    [date]
  );
  const [startDate, setStartDate] = useState(sDate);
  const [endDate, setEndDate] = useState(eDate);
  const [dateInputs, setInputs] = useState({ sInput: null, eInput: null });

  const convertToShortDate = (date) => new Date(date).toLocaleString("ru", { month: "short", day: "numeric" });
	const changeHandler = (firstDate, secondDate, isFirstMain) => {
		(isFirstMain ? setStartDate : setEndDate)(prev => {
			if (onChange) {
				onChange(`${firstDate.replaceAll('-', '.')} - ${secondDate.replaceAll('-', '.')}`)
			}
			return isFirstMain ? firstDate : secondDate;
		})
	}

  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      sInput: document.getElementById("startDateInput" + unicId),
      eInput: document.getElementById("endDateInput" + unicId),
    }));
  }, []);

  return (
    <div className={styles.dates}>
      <button type="button" onClick={() => dateInputs.sInput.showPicker()}>
        С <span>{convertToShortDate(startDate)}</span>
        <input
          id={"startDateInput" + unicId}
          type="date"
					value={startDate}
          onChange={(e) => changeHandler(e.target.value, endDate, true)}
          style={{ width: 0, padding: 0, margin: 0 }}
        />
      </button>
      /
      <button
        type="button"
        onClick={() => dateInputs.eInput.showPicker()}
      >
        По <span>{convertToShortDate(endDate)}</span>
        <input
          id={"endDateInput" + unicId}
          type="date"
					value={endDate}
          onChange={(e) => changeHandler(startDate, e.target.value, false)}
          style={{ width: 0, padding: 0, margin: 0 }}
        />
      </button>
    </div>
  );
};

export default Filter;
