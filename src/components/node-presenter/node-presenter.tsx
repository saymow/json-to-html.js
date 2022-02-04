import cx from 'classnames'
import React, { useEffect, useState } from 'react'
import ContentEditable from '../content-editable/content-editable'
import ErrorIcon from '../error-icon/error-icon'
import './node-presenter.css'

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

  function handleChanges(text: string) {
    try {
      const parsedJSON = JSON.parse(text)

      setErrorMessage(null)
      onChange(parsedJSON)
    } catch (err) {
      setErrorMessage(invalidJSONMessage(err.message))
    }
  }

  return (
    <div className={cx('node-presenter', className)}>
      <ContentEditable className="content-editable" onChange={handleChanges}>
        {JSON.stringify(props, null, 2)}
      </ContentEditable>
      {errorMessage && (
        <ErrorIcon className="error-icon" message={errorMessage} />
      )}
    </div>
  )
}

export default NodePresenter
