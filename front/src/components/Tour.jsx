import React from "react";
import style from "styles/tour.module.css";
import { TourTypes } from "./TourTypes";
import { TourTitle } from "./TourTitle";
import { TourInfo } from "./TourInfo";
import { useNavigate } from "react-router-dom";

const Tour = ({data}) => {
  const navigate = useNavigate();

  return (
    <div className={style.main} style={{ "--img": `url(${data.src})` }}>
      <div onClick={() => navigate('/tour/' + data.id)} />
      <TourTypes types={data.restTypes} />
      <div>
        <TourTitle {...data} />
        <TourInfo {...data} />
      </div>
    </div>
  );
};

export default Tour;
