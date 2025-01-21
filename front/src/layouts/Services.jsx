import React from 'react'
import Service from './Service'
import styles from 'styles/service.module.css'

const Services = () => {
    const services = [
        {
            image: 'parking-spot.png',
            mainText: 'Поддержка',
            text: 'Поддержка в выборе тура, удобное бронирование, доступ к личному кабинету, помощь персонального менеджера и наличие собственных принимающих офисов в большинстве стран. Если нужно внести дополнительные изменения или уточнения, дайте знать!'
        },
        {
            image: 'coffee-cup.png',
            mainText: 'Оплата частями без процентов',
            text: 'Остальную сумму необходимо оплатить до указанных сроков, но не позднее чем за 10 рабочих дней до вылета.'
        },
        {
            image: 'wifi.png',
            mainText: 'Бесплатная отмена тура',
            text: 'Не упустите возможность воспользоваться акцией на бесплатную отмену тура! Никаких рисков: вы сможете отменить тур позже, поэтому забронируйте сегодня по выгодной цене!'
        }
    ]

    return (
        <div id='services' className={styles.serviceContainer}>
            Straight up, it's none now
            <div>
                {
                    services.map((service, index) => (
                        <Service key={index} image={service.image} mainText={service.mainText} text={service.text} />
                    ))
                }
            </div>
        </div>
    )
}

export default Services