import samples from "../../data/samples";
import { Sample } from "../../models/sample";

export interface SamplesState {
  samples: Sample[],
  selectedSample: Sample
}

export type SamplesActions = {
  type: "CHANGE_SELECTED_SAMPLE",
  payload: { sampleId: string }
}

const initialSamplesState: SamplesState = {
  samples,
  selectedSample: samples[0]
}

export const samplesReducer = (
  state: SamplesState = initialSamplesState,
  action: SamplesActions
): SamplesState => {
  switch (action.type) {
    case "CHANGE_SELECTED_SAMPLE": {
      const { sampleId } = action.payload
      const selectedSample = state.samples.find((sample) => sample.id === sampleId) as Sample

      return { ...state, selectedSample }
    }
    default: return state
  }
}