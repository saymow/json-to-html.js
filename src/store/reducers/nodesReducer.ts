import nodesSamples from "../../data/nodes-samples";
import { BaseNode, CustomNode } from "../../models/node";
import { deepClone, instanceOfCustomNode, randomId } from "../../utils";

export namespace Nodes {
  export interface State {
    nodes: Node[],
    selectedNode: BaseNode
  }

  export type Node = BaseNode | CustomNode

  export type SelectAction = {
    type: "SELECT_NODE",
    payload: { sampleId: string }
  }

  export type UpdateAction = {
    type: 'UPDATE_NODE'
    payload: {
      sampleId: string
      props: any
    }
  }

  export type UpsertCustomNodeAction = {
    type: 'UPSERT_CUSTOM_NODE'
    payload: {
      sampleNodeId: string
    }
  }

  export type RestoreCustomNodeAction = {
    type: 'RESTORE_CUSTOM_NODE'
  }

  export type Actions = SelectAction | UpdateAction | UpsertCustomNodeAction | RestoreCustomNodeAction
}

const initialNodesState: Nodes.State = {
  nodes: nodesSamples,
  selectedNode: nodesSamples[0]
}

export const nodesReducer = (
  state: Nodes.State = initialNodesState,
  action: Nodes.Actions
): Nodes.State => {
  switch (action.type) {
    case "SELECT_NODE": {
      const { sampleId } = action.payload
      const selectedNodeSample = state.nodes.find((sample) => sample.id === sampleId) as BaseNode

      return { ...state, selectedNode: selectedNodeSample }
    }
    case "UPDATE_NODE": {
      const { sampleId, props } = action.payload
      const oldSampleIndex = state.nodes.findIndex((__sample) => __sample.id === sampleId)
      const oldSample = state.nodes[oldSampleIndex]
      const newSample = { ...oldSample, props }
      const newNodes = [...state.nodes.slice(0, oldSampleIndex), newSample, ...state.nodes.slice(oldSampleIndex + 1)]

      return {
        ...state,
        nodes: newNodes,
        selectedNode: state.selectedNode === oldSample
          ? newSample
          : state.selectedNode
      }
    }
    case "UPSERT_CUSTOM_NODE": {
      const { sampleNodeId } = action.payload
      const sampleBaseNode = state.nodes.find(node => node.id === sampleNodeId) as Nodes.Node
      const baseProps = deepClone(sampleBaseNode.props)
      const customNodeIndex = state.nodes.findIndex((node) => instanceOfCustomNode(node))

      if (customNodeIndex !== -1) {
        const oldNode = state.nodes[customNodeIndex]
        const newNode = { ...oldNode, props: deepClone(baseProps), baseProps }
        const newNodes = [...state.nodes.slice(0, customNodeIndex), newNode, ...state.nodes.slice(customNodeIndex + 1)]

        return {
          ...state,
          nodes: newNodes,
          selectedNode: newNode
        }
      } else {
        const newNode: CustomNode = {
          id: randomId(),
          name: 'Custom',
          props: deepClone(baseProps),
          baseProps
        }
        const newNodes = [...state.nodes, newNode]

        return {
          ...state,
          nodes: newNodes,
          selectedNode: newNode
        }
      }
    }
    case "RESTORE_CUSTOM_NODE": {
      const customNodeIndex = state.nodes.findIndex((node) => instanceOfCustomNode(node))
      const customNode = state.nodes[customNodeIndex] as CustomNode
      const newCustomNode: CustomNode = {
        ...customNode,
        props: deepClone(customNode.baseProps)
      }
      const newNodes = [...state.nodes.slice(0, customNodeIndex), newCustomNode, ...state.nodes.slice(customNodeIndex + 1)]

      return {
        ...state,
        nodes: newNodes,
        selectedNode: state.selectedNode === customNode ? newCustomNode : state.selectedNode
      }
    }
    default: return state
  }
}
