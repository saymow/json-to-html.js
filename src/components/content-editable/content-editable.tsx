import React, { FormEvent } from 'react'
import cx from 'classnames'
import './content-editable.css'


interface Props {
  onChange?: (data: any) => void
  className?: string
}

const ContentEditable: React.FC<Props> = ({ onChange, className, children }) => {
  function handleChanges(e: FormEvent<HTMLDivElement>) {
    onChange?.(e.currentTarget.textContent)
  }

  return (
    <div
      className={cx('content-editable', className)}
      contentEditable
      onInput={handleChanges}
      suppressContentEditableWarning={true}
    >
      {children}
    </div>
  )
}

export default ContentEditable
