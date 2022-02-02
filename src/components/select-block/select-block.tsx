import React from 'react'
import cx from 'classnames'
import SelectOption, {
  Props as SelectOptionProps,
} from '../select-option/select-option'
import './select-block.css'

export type SelectOptionsProps = (SelectOptionProps & { key: any })[]

interface Props
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: SelectOptionsProps
}

const SelectBlock: React.FC<Props> = ({ options, className, ...props }) => {
  return (
    <select className={cx('select', className)} {...props}>
      {options.map(({ key, ...optionProps }) => (
        <SelectOption key={key} {...optionProps} />
      ))}
    </select>
  )
}

export default SelectBlock
