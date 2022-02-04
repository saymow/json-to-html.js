import React, { FormEvent } from 'react'
import cx from 'classnames'
import './node-presenter.css'

interface Props {
  onChange: (data: any) => void
  props: any
  className?: string
}

const NodePresenter: React.FC<Props> = ({ props, onChange, className }) => {
  function handleChanges(e: FormEvent<HTMLDivElement>) {
    try {
      const stringifiedJSON = e.currentTarget.textContent ?? ""
      const parsedJSON = JSON.parse(stringifiedJSON)

      onChange(parsedJSON)
    } catch (err) {
      console.error('Invalid json: ' + err)
    }
  }

  return (
    <div
      contentEditable
      onInput={handleChanges}
      suppressContentEditableWarning={true}
      className={cx('node-presenter', className)}
    >
      {JSON.stringify(props, null, 2)}
    </div>
  )
}

export default NodePresenter
