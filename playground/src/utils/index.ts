import { v4 } from 'uuid'
import { cloneDeep } from 'lodash'
import { BaseNode, CustomNode } from '../models/node'

export const randomId = () => {
  return v4()
}

export const instanceOfCustomNode = (node: BaseNode | CustomNode) => "baseProps" in node

export const deepClone = (data: any) => cloneDeep(data)

export const isEqualShallow = (data: any, toCompareData: any) => JSON.stringify(data) === JSON.stringify(toCompareData)