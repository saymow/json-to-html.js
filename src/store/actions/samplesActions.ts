import { SamplesActions } from "../reducers/samplesReducer";

export const changeSelectedSample = (sampleId: string): SamplesActions => ({
  type: "CHANGE_SELECTED_SAMPLE",
  payload: { sampleId }
})