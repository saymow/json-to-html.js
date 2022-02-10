import { isArray } from './isArray'

export const isObject = (data: any): boolean =>
  typeof data === 'object' && !isArray(data) && data !== null && !(data instanceof Date)
