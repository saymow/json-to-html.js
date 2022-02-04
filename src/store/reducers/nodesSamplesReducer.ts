import nodesSamples from "../../data/nodes-samples";
import { SampleNode } from "../../models/sample";

export namespace NodesSamples {
  export interface State {
    nodesSamples: SampleNode[],
    selectedNodeSample: SampleNode
  }

  export type SelectAction = {
    type: "SELECT_SAMPLE",
    payload: { sampleId: string }
  }

  export type UpdateAction = {
    type: 'UPDATE_SAMPLE'
    payload: {
      sampleId: string
      props: any
    }
  }

  export type Actions = SelectAction | UpdateAction
}

const initialNodesSamplesState: NodesSamples.State = {
  nodesSamples,
  selectedNodeSample: nodesSamples[0]
}

export const nodesSamplesReducer = (
  state: NodesSamples.State = initialNodesSamplesState,
  action: NodesSamples.Actions
): NodesSamples.State => {
  switch (action.type) {
    case "SELECT_SAMPLE": {
      const { sampleId } = action.payload
      const selectedNodeSample = state.nodesSamples.find((sample) => sample.id === sampleId) as SampleNode

      return { ...state, selectedNodeSample }
    }
    case "UPDATE_SAMPLE": {
      const { sampleId, props } = action.payload
      const oldSampleIndex = state.nodesSamples.findIndex((__sample) => __sample.id === sampleId)
      const oldSample = state.nodesSamples[oldSampleIndex]
      const newSample = { ...oldSample, props }
      const newNodesSamples = [...state.nodesSamples.slice(0, oldSampleIndex), newSample, ...state.nodesSamples.slice(oldSampleIndex + 1)]

      return {
        ...state,
        nodesSamples: newNodesSamples,
        selectedNodeSample: state.selectedNodeSample === oldSample
          ? newSample
          : state.selectedNodeSample
      }
    }
    default: return state
  }
}
