import { Nodes } from "../reducers/nodesReducer";

export const select = (sampleId: string): Nodes.SelectAction => ({
  type: "SELECT_NODE",
  payload: { sampleId }
})

export const update = (sampleId: string, props: any): Nodes.UpdateAction => ({
  type: "UPDATE_NODE",
  payload: { sampleId, props }
})

export const upsertCustomNode = (sampleNodeId: string): Nodes.UpsertCustomNodeAction => ({
  type: "UPSERT_CUSTOM_NODE",
  payload: { sampleNodeId }
})

export const restoreCustomNode = (): Nodes.RestoreCustomNodeAction => ({
  type: "RESTORE_CUSTOM_NODE",
})