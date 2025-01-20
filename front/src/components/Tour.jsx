import React from 'react'
import BookButton from './BookButton'
import apart1 from '/apart1.jpg'
import apart2 from '/apart2.jpg'
import apart3 from '/apart3.jpg'

const getImgBySrc = (src) => {
  if (src === 'apart1.jpg') return apart1
  else if (src === 'apart2.jpg') return apart2
  else if (src === 'apart3.jpg') return apart3
  return ''
}

const Tour = ({ src, id, name, price, description, value, amount, bookedAmount, popupForm, black, userID }) => {
  return (
    <div className={`${black}`}>
      <img src={getImgBySrc(src)} alt="..." />
      <div>
        <h1>{name}</h1>
        <p>{value} <b><i> Номеров \ {amount - bookedAmount}</i></b></p>
        
        <p>{description}</p>
        <div>
          <BookButton isBlack={!!black} id={id} type={name} popupForm={popupForm} price={price} userID={userID} />
        </div>
      </div>
    </div>
  )
}

export default Tour