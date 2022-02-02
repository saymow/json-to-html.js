import React, { useEffect, useRef, useState } from 'react'
import Card from '../../components/card/card'
import SamplePresenter from '../../components/sample-presenter/sample-presenter'
import SelectBlock, {
  SelectOptionsProps,
} from '../../components/select-block/select-block'
import samples from '../../data/samples'
import { Builder } from '../../helpers/builder'
import { Sample } from '../../models/sample'
import './main.css'

const samplesToOptions = (sampleList: Sample[]): SelectOptionsProps => {
  return sampleList.map(({ id, name }) => ({
    key: id,
    value: id,
    text: name,
  }))
}

const Main: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null)
  const [mode, setMode] = useState<string>(samples[0].id)
  const [sampleProps, setSampleProps] = useState<any>(
    samples.find((sample) => sample.id === mode)!.props,
  )

  useEffect(() => {
    const newSampleProps = samples.find((sample) => sample.id === mode)!.props
    setSampleProps(newSampleProps)
  }, [mode])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = ''
      new Builder(sampleProps, containerRef.current).execute()
    }
  }, [containerRef, sampleProps])

  return (
    <div className="container">
      <section className="card-container input">
        <Card className="card scrollbar vertical">
          <SelectBlock
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="select"
            options={samplesToOptions(samples)}
          />
          <SamplePresenter props={sampleProps} className="sample-presenter" />
        </Card>
      </section>
      <section className="card-container result">
        <Card
          ref={containerRef}
          className="card scrollbar vertical"
          variant="secondary"
        />
      </section>
    </div>
  )
}

export default Main
