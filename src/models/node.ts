export interface BaseNode {
  id: string
  name: string
  props: any
}

export interface CustomNode extends BaseNode {
  baseProps: any
}