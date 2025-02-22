import { getDateFrom2day } from "api/get";
import React, { useEffect, useMemo, useState } from "react";
import styles from "styles/filter.module.css";

const Filter = ({ setGlobalFilters }) => {
  const [filters, setFilters] = useState({});
  const changeHandler = (e) =>
    setFilters((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  return (
    <form>
      <input
        id="from"
        type="text"
        placeholder="Откуда"
        onChange={changeHandler}
      />
      <input
        id="where"
        type="text"
        placeholder="Куда"
        onChange={changeHandler}
      />
      <DatesUI onChange={date => setFilters(prev => ({...prev, date: date}))} />

      <input
        id="countAdults"
        min="1"
        max="20"
        type="number"
        placeholder="Кол-во взрослых"
        onChange={changeHandler}
      />
      <input
        id="countChildren"
        min="0"
        max="12"
        type="number"
        placeholder="Кол-во детей"
        onChange={changeHandler}
      />

      <button
        type="button"
        className={styles.buttonFind}
        onClick={(e) => setGlobalFilters(filters)}
      >
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
      date?.split(" - ")?.map((value) => value.replaceAll(".", "-")) || [
        getDateFrom2day(),
        getDateFrom2day(1),
      ],
    [date]
  );
  const [startDate, setStartDate] = useState(sDate);
  const [endDate, setEndDate] = useState(eDate);
  const [dateInputs, setInputs] = useState({ sInput: null, eInput: null });

  const convertToShortDate = (date) =>
    new Date(date).toLocaleString("ru", { month: "short", day: "numeric" });
  const changeHandler = (firstDate, secondDate, isFirstMain) => {
    (isFirstMain ? setStartDate : setEndDate)((prev) => {
      if (onChange) {
        onChange(
          `${firstDate.replaceAll("-", ".")} - ${secondDate.replaceAll(
            "-",
            "."
          )}`
        );
      }
      return isFirstMain ? firstDate : secondDate;
    });
  };

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
      <button type="button" onClick={() => dateInputs.eInput.showPicker()}>
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
