import React from 'react'
import cx from 'classnames'
import SelectOption, {
  Props as SelectOptionProps,
} from '../select-option/select-option'
import './select-block.css'

export type SelectOptionsProps = (SelectOptionProps & { key: any })[]

type Variant = 'primary' | 'secondary'

interface Props {
  id: string
  title?: string
  value: string
  onChange: React.ChangeEventHandler<HTMLSelectElement>
  variant?: Variant
  options: SelectOptionsProps
}

const SelectBlock: React.FC<Props> = (props) => {
  const { id, title, options, variant = 'primary', onChange, value } = props

  return (
    <div className={cx('select-block', variant)}>
      <label htmlFor={id}>{title}</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={cx('select', variant)}
      >
        {options.map(({ key, ...optionProps }) => (
          <SelectOption key={key} {...optionProps} />
        ))}
      </select>
    </div>
  )
}

export default SelectBlock
