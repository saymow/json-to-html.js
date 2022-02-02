import React, { useEffect, useRef } from 'react'
import { Builder } from '../../helpers/builder'
import { sample4 } from '../../helpers/samples'
import './main.css'

const Main: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    new Builder(sample4, containerRef.current as HTMLElement).execute()
  }, [containerRef])

  return <div ref={containerRef} className="content-container"></div>
}

export default Main
