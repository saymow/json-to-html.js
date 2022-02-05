import cx from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import ContentEditable from '../content-editable/content-editable'
import ErrorIcon from '../error-icon/error-icon'
import { Undo } from '@styled-icons/fa-solid/Undo'
import { Edit } from '@styled-icons/boxicons-solid/Edit'
import './node-presenter.css'
import { isEqualShallow } from '../../utils'

interface Props {
  readonly?: boolean
  onChange?: (data: any) => void
  onRestore?: () => void
  onTryEdit?: () => void
  className?: string
  baseProps?: any
  props: any
}

const invalidJSONMessage = (details: string) => `Invalid JSON: ${details}`
const toFormattedJSON = (data: any) => JSON.stringify(data, null, 2)

const NodePresenter: React.FC<Props> = (props) => {
  const {
    readonly = true,
    props: nodeProps,
    baseProps: baseNodeProps,
    className,
    onChange,
    onRestore,
    onTryEdit,
  } = props
  const contentEditableRef = useRef<HTMLDivElement>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [editedText, setEditedText] = useState<any>(toFormattedJSON(nodeProps))
  const [hasChanges, setHasChanges] = useState<boolean>(
    !isEqualShallow(toFormattedJSON(baseNodeProps), editedText),
  )

  useEffect(() => {
    setErrorMessage(null)
    setEditedText(toFormattedJSON(nodeProps))
  }, [nodeProps])

  useEffect(() => {
    setHasChanges(!isEqualShallow(toFormattedJSON(baseNodeProps), editedText))
  }, [baseNodeProps, editedText])

  function handleChanges(text: string) {
    setEditedText(text)
    try {
      const data = JSON.parse(text)

      onChange?.(data)
      setErrorMessage(null)
    } catch (err) {
      setErrorMessage(invalidJSONMessage(err.message))
    }
  }

  function handleRestore() {
    contentEditableRef.current!.innerText = toFormattedJSON(baseNodeProps)
    setEditedText(toFormattedJSON(baseNodeProps))
    onRestore?.()
  }

  return (
    <article className={cx('node-presenter', className)}>
      <header className="actions-container">
        <ul>
          {!readonly && errorMessage && (
            <li className="action-item">
              <ErrorIcon
                message={errorMessage}
                className="error-icon"
                size="26"
                fill="red"
              />
            </li>
          )}
          {!readonly && onRestore && (
            <li
              data-disabled={!hasChanges}
              onClick={handleRestore}
              className="action-item"
              data-message="Restore"
            >
              <Undo size="22" />
            </li>
          )}
          {readonly && onTryEdit && (
            <li onClick={onTryEdit} className="action-item" data-message="Edit">
              <Edit size="22" />
            </li>
          )}
        </ul>
      </header>
      {readonly ? (
        <div className="content">{toFormattedJSON(nodeProps)} </div>
      ) : (
        <ContentEditable
          ref={contentEditableRef}
          className="content"
          onChange={handleChanges}
        >
          {toFormattedJSON(nodeProps)}
        </ContentEditable>
      )}
    </article>
  )
}

export default NodePresenter
