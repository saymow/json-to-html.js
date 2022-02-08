export const isPrimitive = (data: any): boolean => data !== Object(data)

export const isArray = (data: any): boolean => Array.isArray(data)

export const isObject = (data: any): boolean =>
  typeof data === 'object' && !isArray(data) && data !== null
