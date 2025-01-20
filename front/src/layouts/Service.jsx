import React from 'react'

const Service = ({ image, mainText, text }) => {
  return (
    <div>
        <div>
            <img src={image} alt="" />
        </div>

        <h3>{mainText}</h3>
        
        <p>{text}</p>
    </div>
  )
}

export default Service