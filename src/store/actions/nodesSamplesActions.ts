import { NodesSamples } from "../reducers/nodesSamplesReducer";

export const select = (sampleId: string): NodesSamples.SelectAction => ({
  type: "SELECT_SAMPLE",
  payload: { sampleId }
})

export const update = (sampleId: string, props: any): NodesSamples.UpdateAction => ({
  type: "UPDATE_SAMPLE",
  payload: { sampleId, props  }
})