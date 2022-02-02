import React from 'react'
import cx from 'classnames'
import './sample-presenter.css'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  props: any
}

const SamplePresenter: React.FC<Props> = ({ props, className, ...rest }) => {
  return (
    <div {...rest} className={cx('sample-presenter', className)}>
      {JSON.stringify(props, null, 2)}
    </div>
  )
}

export default SamplePresenter
