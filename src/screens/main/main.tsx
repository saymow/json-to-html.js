import { Json2Html } from 'json2html'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../components/card/card'
import NodePresenter from '../../components/node-presenter/node-presenter'
import SelectBlock, {
  SelectOptionsProps
} from '../../components/select-block/select-block'
import { CustomNode } from '../../models/node'
import { GlobalState } from '../../store'
import * as nodesActions from '../../store/actions/nodesActions'
import { Nodes } from '../../store/reducers/nodesReducer'
import { instanceOfCustomNode } from '../../utils'
import './main.css'

const nodesSamplesToOptions = (
  sampleList: Nodes.Node[],
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
  const { nodes, selectedNode } = useSelector<GlobalState>(
    (state) => state.nodesReducer,
  ) as Nodes.State
  const [currentProps, setCurrentProps] = useState<any>(selectedNode.props)
  const [toSaveProps, setToSaveProps] = useState<any>(selectedNode.props)

  useEffect(() => {
    setCurrentProps(selectedNode.props)
    setToSaveProps(selectedNode.props)
  }, [selectedNode])

  useEffect(() => {
    containerRef.current!.innerHTML = ''
    new Json2Html(toSaveProps, containerRef.current).execute()
  }, [toSaveProps])

  const handleNodeSampleSelectChanges: React.ChangeEventHandler<HTMLSelectElement> = (
    e,
  ) => {
    dispatch(nodesActions.update(selectedNode.id, toSaveProps))
    dispatch(nodesActions.select(e.target.value))
  }

  const handleUpsertEditableNode = () => {
    dispatch(nodesActions.upsertCustomNode(selectedNode.id))
  }

  const handleUpdateSelectedNodeSample = (props: any) => {
    setToSaveProps(props)
  }

  const handleRestoreCustomNode = () => {
    dispatch(nodesActions.restoreCustomNode())
  }

  return (
    <div className="container">
      <section className="card-container input">
        <Card className="card scrollbar vertical">
          <SelectBlock
            id="mode-selector"
            title="Preset:"
            value={selectedNode.id}
            onChange={handleNodeSampleSelectChanges}
            variant="secondary"
            options={nodesSamplesToOptions(nodes)}
          />
          <NodePresenter
            readonly={!instanceOfCustomNode(selectedNode)}
            onTryEdit={handleUpsertEditableNode}
            onRestore={handleRestoreCustomNode}
            onChange={handleUpdateSelectedNodeSample}
            baseProps={
              instanceOfCustomNode(selectedNode)
                ? (selectedNode as CustomNode).baseProps
                : selectedNode.props
            }
            props={currentProps}
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
