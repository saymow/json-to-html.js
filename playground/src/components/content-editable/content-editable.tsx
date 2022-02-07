import React, { FormEvent, forwardRef } from 'react'
import cx from 'classnames'
import './content-editable.css'

interface Props extends React.HTMLProps<HTMLDivElement> {
  onChange?: (data: any) => void
  className?: string
}

const ContentEditable = forwardRef<HTMLDivElement, Props>(
  ({ onChange, className, children, ...props }, ref) => {
    function handleChanges(e: FormEvent<HTMLDivElement>) {
      onChange?.(e.currentTarget.textContent)
    }

    return (
      <div
        ref={ref}
        className={cx('content-editable', className)}
        contentEditable
        onInput={handleChanges}
        suppressContentEditableWarning={true}
        {...props}
      >
        {children}
      </div>
    )
  },
)

export default ContentEditable
