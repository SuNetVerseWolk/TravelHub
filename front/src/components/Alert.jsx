import React from 'react'
import { alert } from 'styles/alert.module.css'

const Alert = ({children}) => {
  return (
    <div className={alert}>
      <h3>
        {children}
      </h3>
    </div>
  )
}

export default Alert