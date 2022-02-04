import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../components/card/card'
import NodePresenter from '../../components/node-presenter/node-presenter'
import SelectBlock, {
  SelectOptionsProps,
} from '../../components/select-block/select-block'
import { Json2Html } from 'json2html'
import { SampleNode } from '../../models/sample'
import { GlobalState } from '../../store'
import * as nodesSamplesActions from '../../store/actions/nodesSamplesActions'
import { NodesSamples } from '../../store/reducers/nodesSamplesReducer'
import './main.css'

const nodesSamplesToOptions = (
  sampleList: SampleNode[],
): SelectOptionsProps => {
  return sampleList.map(({ id, name }) => ({
    key: id,
    value: id,
    text: name,
  }))
}

const Main: React.FC = () => {
  const dispatch = useDispatch()
  const containerRef = useRef<HTMLElement | null>(null)
  const { nodesSamples, selectedNodeSample } = useSelector<GlobalState>(
    (state) => state.nodesSamplesReducer,
  ) as NodesSamples.State
  const [activeNode, setActiveNode] = useState<SampleNode>(selectedNodeSample)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = ''
      new Json2Html(selectedNodeSample.props, containerRef.current).execute()
    }
  }, [containerRef, selectedNodeSample])

  useEffect(() => {
    if (activeNode.id !== selectedNodeSample.id) {
      setActiveNode(selectedNodeSample)
    }
  }, [activeNode, selectedNodeSample])

  const handleNodeSampleSelectChanges: React.ChangeEventHandler<HTMLSelectElement> = (
    e,
  ) => {
    dispatch(nodesSamplesActions.select(e.target.value))
  }

  const handleUpdateSelectedNodeSample = (props: any) => {
    dispatch(nodesSamplesActions.update(selectedNodeSample.id, props))
  }

  return (
    <div className="container">
      <section className="card-container input">
        <Card className="card scrollbar vertical">
          <SelectBlock
            id="mode-selector"
            title="Preset:"
            value={activeNode.id}
            onChange={handleNodeSampleSelectChanges}
            variant="secondary"
            options={nodesSamplesToOptions(nodesSamples)}
          />
          <NodePresenter
            onChange={handleUpdateSelectedNodeSample}
            props={activeNode.props}
            className="node-presenter"
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
