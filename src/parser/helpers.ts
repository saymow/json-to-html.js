export const isPrimitive = (data: any): boolean => data !== Object(data) || data instanceof Date

export const isArray = (data: any): boolean => Array.isArray(data)

export const isObject = (data: any): boolean =>
  typeof data === 'object' && !isArray(data) && data !== null && !(data instanceof Date)
