import React from "react";
import style from "styles/tour.module.css";
import { TourTypes } from "./TourTypes";
import { TourTitle } from "./TourTitle";
import { TourInfo } from "./TourInfo";

const Tour = ({data}) => {
  return (
    <div className={style.main} style={{ "--img": `url(${data.src})` }}>
      <div />
      <TourTypes types={data.restTypes} />
      <div>
        <TourTitle {...data} />
        <TourInfo {...data} />
      </div>
    </div>
  );
};

export default Tour;
