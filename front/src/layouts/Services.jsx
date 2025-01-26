import React from "react";
import Service from "./Service";
import styles from "styles/service.module.css";

const Services = () => {
  const services = [
    {
      image: "service.png",
      title: "Поддержка",
      text: "Поддержка в выборе тура, удобное бронирование, доступ к личному кабинету, помощь персонального менеджера и наличие собственных принимающих офисов в большинстве стран.",
    },
    {
      image: "loan.png",
      title: "Оплата частями без процентов",
      text: "Остальную сумму необходимо оплатить в установленные сроки. Важно отметить, что окончательный платеж должен быть произведен не позднее чем за 10 рабочих дней до даты вылета.",
    },
    {
      image: "cancel.png",
      title: "Бесплатная отмена тура",
      text: "Не упустите возможность воспользоваться акцией на бесплатную отмену тура! Никаких рисков: вы сможете отменить тур позже, поэтому забронируйте сегодня по выгодной цене!",
    },
  ];

  return (
    <div id="services" className={styles.serviceContainer}>
      <div>
        {services.map((service, index) => (
          <Service
            key={index}
            image={service.image}
            title={service.title}
            text={service.text}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
