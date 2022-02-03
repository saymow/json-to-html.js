import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../components/card/card'
import SamplePresenter from '../../components/sample-presenter/sample-presenter'
import SelectBlock, {
  SelectOptionsProps
} from '../../components/select-block/select-block'
import { Json2Html } from 'json2html'
import { Sample } from '../../models/sample'
import { GlobalState } from '../../store'
import { changeSelectedSample } from '../../store/actions'
import { SamplesState } from '../../store/reducers/samplesReducer'
import './main.css'

const samplesToOptions = (sampleList: Sample[]): SelectOptionsProps => {
  return sampleList.map(({ id, name }) => ({
    key: id,
    value: id,
    text: name,
  }))
}

const Main: React.FC = () => {
  const dispatch = useDispatch()
  const { samples, selectedSample } = useSelector<GlobalState>(
    (state) => state.samplesReducer,
  ) as SamplesState
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = ''
      new Json2Html(selectedSample.props, containerRef.current).execute()
    }
  }, [containerRef, selectedSample])

  const handleSampleSelectChanges: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    dispatch(changeSelectedSample(e.target.value))
  }

  return (
    <div className="container">
      <section className="card-container input">
        <Card className="card scrollbar vertical">
          <SelectBlock
            value={selectedSample.id}
            onChange={handleSampleSelectChanges}
            className="select"
            options={samplesToOptions(samples)}
          />
          <SamplePresenter
            props={selectedSample.props}
            className="sample-presenter"
          />
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
