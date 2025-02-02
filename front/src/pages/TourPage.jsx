import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import style from 'styles/tourInfo.module.css';

export const TourPage = () => {
  const location = useLocation();

  const { tour } = location.state || {};

  return (
    <div>
			{tour ? (
        <>
          <Header/>
          <div className={style.mainTourInfo}>
            <div>
              <div className={style.containerImgs}>
                <div>
                  <img src={`/${tour.src}`} alt={tour.title || 'Tour Image'} />
                </div>

                <div>
                  {/* {tour.imgs.map((img, id) => (
                    <img key={id} src={`/${img}`} alt={`Tour Image ${id + 1}`} />
                  ))} */}
                  <img src="/tour1.jpg" alt="" />
                  <img src="/tour1.jpg" alt="" />
                  <img src="/tour1.jpg" alt="" />
                  <img src="/tour1.jpg" alt="" />
                </div>
              </div>

              <div>
                <h1>Данные тура</h1>

                <h3>{tour.title}</h3>

                <p>Вид тура: {tour.type}. Сложность - {tour.difficulty}, разрешение с возроста {tour.ageFrom}</p>
                <p>Место проведения: {tour.location}</p>
                <p>Срок проведения: {tour.duration}</p>
                <p>Даты: {tour.dates.length > 0 ? tour.dates.map((date, id) => (
                  <span key={id}>{date.date}{`. Цена: ${date.price}`}{id < tour.dates.length - 1 ? ', ' : ''}</span>
                )) : 'Нет доступных дат'}</p>

                <h3>Описание</h3>
                <p>{tour.text}</p>

                <button className={style.bookButton}>Забронировать</button>
              </div>
            </div>
            {/* {Object.keys(tour).map((key, i) => typeof tour[key] != 'object' && <p key={i}>{key}: {tour[key]}</p>)} */}
          </div>
        </>
      ) : (
        <p>No tour data available.</p>
      )}
		</div>
  )
}
