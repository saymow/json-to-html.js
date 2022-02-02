import React, { DetailedHTMLProps, OptionHTMLAttributes } from 'react'
import cx from 'classnames'
import './select-option.css'

export type Props = DetailedHTMLProps<
  OptionHTMLAttributes<HTMLOptionElement>,
  HTMLOptionElement
> & {
  text: string
}

const SelectOption: React.FC<Props> = ({ text, className, ...attrs }) => {
  return (
    <option className={cx('option', className)} {...attrs}>
      {text}
    </option>
  )
}

export default SelectOption
