import React, { FormEvent, useEffect, useState } from 'react'
import cx from 'classnames'
import './node-presenter.css'
import ErrorIcon from '../error-icon/error-icon'

interface Props {
  onChange: (data: any) => void
  props: any
  className?: string
}

const invalidJSONMessage = (details: string) => `Invalid JSON: ${details}`

const NodePresenter: React.FC<Props> = ({ props, onChange, className }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    setErrorMessage(null)
  }, [props])

  function handleChanges(e: FormEvent<HTMLDivElement>) {
    try {
      const stringifiedJSON = e.currentTarget.textContent ?? ''
      const parsedJSON = JSON.parse(stringifiedJSON)

      setErrorMessage(null)
      onChange(parsedJSON)
    } catch (err: any) {
      setErrorMessage(invalidJSONMessage(err.message))
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
      {errorMessage && <ErrorIcon className="error-icon" message={errorMessage} />}
    </div>
  )
}

export default NodePresenter
