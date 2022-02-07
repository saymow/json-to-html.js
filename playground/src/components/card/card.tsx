import React, { forwardRef } from 'react'
import cx from 'classnames'
import './card.css'

type Variant = 'primary' | 'secondary'

interface Props extends React.HTMLProps<HTMLElement> {
  variant?: Variant
}

const Card = forwardRef<HTMLElement, Props>(
  ({ children, variant = 'primary', className, ...props }, ref) => {
    return (
      <article ref={ref} className={cx('card', variant, className)} {...props}>
        {children}
      </article>
    )
  },
)

export default Card
