import React from 'react'
import cx from 'classnames'
import { ErrorCircle } from 'styled-icons/boxicons-regular'
import './error-icon.css'

interface Props {
  message?: string
  className?: string
}

const ErrorIcon: React.FC<Props> = ({ message, className }) => {
  return (
    <span
      className={cx('error-icon-box', className, { tooltip: message })}
      data-message={message}
    >
      <ErrorCircle size="26" fill="red" />
    </span>
  )
}

export default ErrorIcon
