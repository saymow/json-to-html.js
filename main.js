import * as sampleList from './samples.js'
import { Builder } from './builder.js'

const contentContainerEl = document.querySelector(
  '[data-id="content-container"]',
)

new Builder(sampleList.sample4, contentContainerEl).execute()
