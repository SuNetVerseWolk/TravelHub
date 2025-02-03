import React from 'react'
import { alert } from 'styles/alert.module.css'

const Alert = ({children, isChildrenText=true}) => {
  return (
    <div className={alert}>
      {isChildrenText ? (
				<h3>
					{children}
				</h3>
			) : (
				children
			)}
    </div>
  )
}

export default Alert