import React from 'react'
import cx from 'classnames'
import { ErrorCircle } from 'styled-icons/boxicons-regular'
import './error-icon.css'

interface Props {
  message?: string
  className?: string
  size?: string | number
  fill?: string
}

const ErrorIcon: React.FC<Props> = ({ message, className, size, fill }) => {
  return (
    <span
      className={cx('error-icon-box', className, { tooltip: message })}
      data-message={message}
    >
      <ErrorCircle size={size} fill={fill} />
    </span>
  )
}

export default ErrorIcon
