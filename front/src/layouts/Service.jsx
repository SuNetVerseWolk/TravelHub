import React from "react";

const Service = ({ image, title, text }) => {
  return (
    <div>
      <div>
        <img src={image} alt="" />
      </div>

      <h3>{title}</h3>

      <p>{text}</p>
    </div>
  );
};

export default Service;
